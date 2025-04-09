'use client';

import { ChangeEvent, useCallback, useState } from 'react';
import { formatBytes, isValidFileType, generateUniqueFileName } from '@/lib/utils';
import { Avatar } from './Avatar';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedTypes?: string[];
  maxSizeInBytes?: number;
  showPreview?: boolean;
}

export function FileUpload({
  onFileSelect,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/gif'],
  maxSizeInBytes = 5 * 1024 * 1024, // 5MB default
  showPreview = true,
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setError(null);

      if (!file) return;

      // Validate file type
      if (!isValidFileType(file, acceptedTypes)) {
        setError('Invalid file type. Please upload an image file.');
        return;
      }

      // Validate file size
      if (file.size > maxSizeInBytes) {
        setError(`File size exceeds ${formatBytes(maxSizeInBytes)}`);
        return;
      }

      // Generate preview for images
      if (file.type.startsWith('image/') && showPreview) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }

      onFileSelect(file);
    },
    [acceptedTypes, maxSizeInBytes, onFileSelect, showPreview]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              {acceptedTypes.join(', ')} (Max: {formatBytes(maxSizeInBytes)})
            </p>
          </div>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept={acceptedTypes.join(',')}
            onChange={handleFileChange}
          />
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-600 mt-2">{error}</p>
      )}

      {showPreview && preview && (
        <div className="flex justify-center">
          <Avatar
            src={preview}
            alt="File preview"
            fallback="Preview"
          />
        </div>
      )}
    </div>
  );
} 