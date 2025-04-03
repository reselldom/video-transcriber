'use server'

export async function transcribe(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    const model = formData.get('model') as string;
    
    if (!file) {
      throw new Error('No file provided');
    }

    // Log start of transcription process 
    console.log(`Starting transcription for file of type: ${file.type}`);
    
    // Prepare the API request
    const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: formData,
    });
    
    // Handle non-successful responses
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Transcription API error (${response.status}): ${errorText}`);
      throw new Error(`Transcription request failed: ${response.statusText}`);
    }
    
    // Parse and validate the response
    const result = await response.json();
    
    // Log success and check for expected structure
    console.log('Transcription completed successfully');
    
    if (!result.text) {
      console.error('Unexpected API response format:', JSON.stringify(result));
      throw new Error('Invalid response format from transcription API');
    }
    
    return result;
  } catch (error) {
    console.error('Error in transcribe action:', error);
    
    // Return a structured error response to the client
    if (error instanceof Error) {
      throw new Error(`Transcription failed: ${error.message}`);
    } else {
      throw new Error('Unknown error during transcription');
    }
  }
}