"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const Marquee = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    reverse?: boolean;
    pauseOnHover?: boolean;
    vertical?: boolean;
  }
>(({ children, reverse, pauseOnHover, vertical, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "group flex overflow-hidden [--gap:1rem] relative",
        vertical && "flex-col",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-[--gap] animate-marquee",
          vertical && "flex-col min-h-full",
          reverse && "animate-marquee-reverse",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-[--gap] animate-marquee",
          vertical && "flex-col min-h-full",
          reverse && "animate-marquee-reverse",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
    </div>
  );
});
Marquee.displayName = "Marquee"; 