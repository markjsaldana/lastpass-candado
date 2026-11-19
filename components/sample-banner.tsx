import { FlaskConical } from "lucide-react";
import { formatShortDate } from "@/lib/format";
import { lastRun, sampleDisclaimer } from "@/lib/site";

export function SampleBanner() {
  return (
    <div
      role="note"
      className="mx-auto mb-6 flex max-w-3xl items-start justify-center gap-2.5 rounded-lg border border-warn/30 bg-warn-soft px-3.5 py-2.5 text-center text-sm text-warn"
    >
      <FlaskConical className="mt-0.5 size-4 shrink-0" aria-hidden />
      <p>
        <strong className="font-semibold">{sampleDisclaimer}</strong>{" "}
        <span className="opacity-90">
          LastPass, 1Password, Bitwarden, and Keeper are real, and every fact about them links to a public source. Every
          customer, prospect, person, internal event, and customer quote is invented. This sample shows the{" "}
          {formatShortDate(lastRun)} run.
        </span>
      </p>
    </div>
  );
}
