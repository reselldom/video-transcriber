"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  pauseOnHover = false,
  className,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex shrink-0 gap-4 py-4",
          "animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
    </div>
  );
} 