import { ExternalLink } from "lucide-react";
import type { Citation } from "@/lib/types";

// A public source behind a claim. Internal sample signals have none, and say so.
export function SourceLink({ citation, className = "" }: { citation?: Citation; className?: string }) {
  if (!citation) {
    return <span className={`text-xs text-muted ${className}`}>Internal sample data, no public source</span>;
  }
  return (
    <a
      href={citation.url}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline ${className}`}
    >
      Source: {citation.label}
      <ExternalLink className="size-3 shrink-0" aria-hidden />
    </a>
  );
}
