'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '@/lib/utils';

interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  src?: string;
  alt?: string;
  fallback?: string;
}

export function Avatar({ src, alt, fallback, className, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
        className
      )}
      {...props}
    >
      <AvatarPrimitive.Image
        src={src}
        alt={alt || 'Avatar'}
        className="h-full w-full object-cover"
      />
      <AvatarPrimitive.Fallback
        className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-600"
      >
        {fallback || alt?.charAt(0).toUpperCase() || '?'}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}

export default Avatar; 