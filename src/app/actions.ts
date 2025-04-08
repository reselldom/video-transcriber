'use server'

interface Word {
  word: string;
  start: number;
  end: number;
}

interface Segment {
  start: number;
  end: number;
  text: string;
}

export interface TranscriptionResponse {
  text: string;
  segments: Segment[];
}

export async function transcribe(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    
    if (!file) {
      throw new Error('No file provided');
    }
    
    // Update the formData to request verbose_json format
    formData.set('response_format', 'verbose_json');
    
    const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Transcription request failed: ${errorData.error?.message || 'Unknown error'}`);
    }
    
    const result = await response.json();
    console.log('Transcription result:', result);
    return result as TranscriptionResponse;
  } catch (error) {
    console.error('Error in transcribe action:', error);
    throw error;
  }
}

function formatTimestamp(seconds: number, format: 'srt' | 'vtt'): string {
  const pad = (num: number) => num.toString().padStart(2, '0');
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  
  if (format === 'vtt') {
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}.${ms.toString().padStart(3, '0')}`;
  } else {
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)},${ms.toString().padStart(3, '0')}`;
  }
}

function splitTextIntoLines(text: string, maxChars: number = 42): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine: string[] = [];
  let currentLength = 0;
  
  for (const word of words) {
    if (currentLength + word.length + 1 > maxChars && currentLine.length > 0) {
      lines.push(currentLine.join(' '));
      currentLine = [word];
      currentLength = word.length;
    } else {
      currentLine.push(word);
      currentLength += word.length + (currentLine.length > 0 ? 1 : 0);
    }
  }
  
  if (currentLine.length > 0) {
    lines.push(currentLine.join(' '));
  }
  
  return lines;
}

function cleanText(text: string): string {
  // Remove filler sounds and clean up the text
  return text.replace(/\b(um|uh|er|ah|like)\b/gi, '').replace(/\s+/g, ' ').trim();
}

export async function generateSubtitleFiles(result: any) {
  const segments = result.segments;
  let srtContent = '';
  let vttContent = 'WEBVTT\n\n';
  let txtContent = '';
  let index = 1;
  
  const firstSegmentStart = segments[0]?.start || 0;
  
  // Add initial segment if there's a delay before the first spoken content
  if (firstSegmentStart > 0) {
    const initialEndTime = formatTimestamp(firstSegmentStart, 'vtt');
    srtContent += `1\n00:00:00,000 --> ${formatTimestamp(firstSegmentStart, 'srt')}\n[Music]\n\n`;
    vttContent += `00:00:00.000 --> ${initialEndTime}\n[Music]\n\n`;
    index++;
  }
  
  segments.forEach((segment: any) => {
    const cleanedText = cleanText(segment.text);
    const lines = splitTextIntoLines(cleanedText);
    
    if (lines.length === 0) return;
    
    const durationPerChar = (segment.end - segment.start) / cleanedText.length;
    const minDuration = 1.5; // Minimum duration in seconds
    let lineStart = segment.start;
    
    for (const line of lines) {
      const lineDuration = Math.max(line.length * durationPerChar, minDuration);
      const lineEnd = Math.min(lineStart + lineDuration, segment.end);
      
      const startTime = formatTimestamp(lineStart, 'vtt');
      const endTime = formatTimestamp(lineEnd, 'vtt');
      
      // SRT
      srtContent += `${index}\n${formatTimestamp(lineStart, 'srt')} --> ${formatTimestamp(lineEnd, 'srt')}\n${line}\n\n`;
      
      // VTT
      vttContent += `${startTime} --> ${endTime}\n${line}\n\n`;
      
      index++;
      lineStart = lineEnd;
    }
    
    // Plain text
    txtContent += `${cleanedText} `;
  });
  
  return {
    srt: srtContent.trim(),
    vtt: vttContent.trim(),
    txt: txtContent.trim()
  };
}