import type { ReactNode } from "react";

export function RetroWindow({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`win ${className}`}>
      <div className="win-title">
        <span>{title}</span>
        <span className="flex gap-1">
          <span className="border-2 border-primary-foreground px-1 leading-none">_</span>
          <span className="border-2 border-primary-foreground px-1 leading-none">□</span>
          <span className="border-2 border-primary-foreground px-1 leading-none">x</span>
        </span>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}

export function PixelHeart({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 11 10" className={className} shapeRendering="crispEdges" aria-hidden="true">
      <path
        fill="currentColor"
        d="M1 1h3v1h3V1h3v1h1v3h-1v1h-1v1H8v1H7v1H6v1H5V9H4V8H3V7H2V6H1V5H0V2h1z"
      />
    </svg>
  );
}
