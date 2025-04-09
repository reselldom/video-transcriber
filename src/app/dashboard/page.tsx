import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { userId } = auth();
  
  if (!userId) {
    redirect('/');
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your transcription dashboard</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Total Transcriptions</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Processing</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Completed</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">0</p>
        </div>
      </div>

      {/* Recent Transcriptions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Transcriptions</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            {/* Example recent transcription items */}
            <div className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">video_presentation.mp4</h3>
                  <p className="text-sm text-gray-500">Processed 2 hours ago</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 