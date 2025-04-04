// Helper function to format timestamps
export function formatTimestamp(seconds: number, format: 'srt' | 'vtt'): string {
  const date = new Date(seconds * 1000);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const secs = date.getUTCSeconds().toString().padStart(2, '0');
  const ms = date.getUTCMilliseconds().toString().padStart(3, '0');
  
  if (format === 'vtt') {
    return `${hours}:${minutes}:${secs}.${ms}`;
  } else {
    return `${hours}:${minutes}:${secs},${ms}`;
  }
}

// Helper function to split text into lines
export function splitTextIntoLines(text: string, maxChars: number = 42): string[] {
  const lines: string[] = [];
  let currentLine = '';
  
  const words = text.split(' ');
  
  for (const word of words) {
    if (currentLine.length + word.length > maxChars) {
      if (currentLine.length > 0) {
        lines.push(currentLine);
        currentLine = '';
      }
      if (word.length > maxChars) {
        // If the word itself is longer than maxChars, we might want to split it
        lines.push(word);
      } else {
        currentLine = word;
      }
    } else {
      if (currentLine.length > 0) {
        currentLine += ' ' + word;
      } else {
        currentLine = word;
      }
    }
  }
  
  if (currentLine.length > 0) {
    lines.push(currentLine);
  }
  
  return lines;
}

export interface TranscriptionSegment {
  start: number;
  end: number;
  text: string;
}

export interface TranscriptionResponse {
  text: string;
  segments: TranscriptionSegment[];
}

// Generate subtitle files locally from transcription result
export function generateLocalSubtitles(result: TranscriptionResponse): { txt: string; vtt: string; srt: string } {
  if (!result || !result.text) {
    return { txt: '', vtt: '', srt: '' };
  }
  
  const txt = result.text;
  let vtt = 'WEBVTT\n\n';
  let srt = '';
  
  // Generate subtitles if segments are available
  if (result.segments && Array.isArray(result.segments)) {
    result.segments.forEach((segment, index) => {
      if (segment.start !== undefined && segment.end !== undefined && segment.text) {
        const startTime = formatTimestamp(segment.start, 'vtt');
        const endTime = formatTimestamp(segment.end, 'vtt');
        const text = segment.text.trim();
        
        vtt += `${startTime} --> ${endTime}\n${text}\n\n`;
        
        srt += `${index + 1}\n`;
        srt += `${formatTimestamp(segment.start, 'srt')} --> ${formatTimestamp(segment.end, 'srt')}\n`;
        srt += `${text}\n\n`;
      }
    });
  } else {
    // Fallback if no segments available
    vtt += `00:00:00.000 --> 99:59:59.999\n${txt}\n\n`;
    srt += `1\n00:00:00,000 --> 99:59:59,999\n${txt}\n\n`;
  }
  
  return { txt, vtt, srt };
}