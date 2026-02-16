import type { ReactNode } from "react";

import { ANIMATION } from "@/shared/config/constants";

interface MarqueeProps {
  children: ReactNode;
  duration?: number;
  className?: string;
}

export function Marquee({
  children,
  duration = ANIMATION.MARQUEE_DURATION,
  className = "",
}: MarqueeProps) {
  return (
    <div
      className={`overflow-hidden whitespace-nowrap border-y border-border bg-foreground py-2.5 ${className}`}
    >
      <div
        className="marquee-track inline-flex hover:[animation-play-state:paused]"
        style={{ animationDuration: `${duration}s` }}
      >
        <span className="inline-flex shrink-0 items-center gap-8 px-4">
          {children}
        </span>
        <span
          className="inline-flex shrink-0 items-center gap-8 px-4"
          aria-hidden="true"
        >
          {children}
        </span>
      </div>
    </div>
  );
}
