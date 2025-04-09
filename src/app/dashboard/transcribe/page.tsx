import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import TranscriptionForm from '@/components/TranscriptionForm';

export default async function TranscribePage() {
  const { userId } = auth();
  
  if (!userId) {
    redirect('/');
  }

  return (
    <div className="bg-gray-100 min-h-screen -m-8 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Video Transcription</h1>
        <p className="text-gray-600 mt-2">Upload your video to get started with AI-powered transcription</p>
      </div>

      <TranscriptionForm />
    </div>
  );
} 