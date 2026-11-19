"use client";

import { Fragment, useState } from "react";
import { Check, CircleHelp, Minus, X } from "lucide-react";
import { matrix } from "@/lib/data";
import type { MatrixMark, Persona } from "@/lib/types";
import { companyId, personaLabel } from "@/lib/site";

const markStyle: Record<MatrixMark, { icon: typeof Check; label: string; tone: string }> = {
  yes: { icon: Check, label: "Yes", tone: "bg-good-soft text-good" },
  partial: { icon: Minus, label: "Partial", tone: "bg-warn-soft text-warn" },
  no: { icon: X, label: "No", tone: "bg-surface-2 text-muted" },
  unchecked: { icon: CircleHelp, label: "Not checked", tone: "border border-dashed border-line text-muted" },
};

function Mark({ mark }: { mark: MatrixMark }) {
  const { icon: Icon, label, tone } = markStyle[mark];
  return (
    <span className={`inline-grid size-6 place-items-center rounded-md ${tone}`} title={label}>
      <Icon className="size-3.5" strokeWidth={2.5} aria-hidden />
      <span className="sr-only">{label}</span>
    </span>
  );
}

// The note, linked to the page it came from when there is one.
function CellNote({ note, url }: { note: string; url?: string }) {
  if (!url) return <>{note}</>;
  return (
    <a href={url} target="_blank" rel="noreferrer" className="underline decoration-line underline-offset-2 hover:text-accent">
      {note}
    </a>
  );
}

export function MatrixTable() {
  const [persona, setPersona] = useState<Persona | "all">("all");
  const [showNotes, setShowNotes] = useState(true);
  const groups = matrix.groups.filter((g) => persona === "all" || g.persona === persona);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label="Filter by buyer" className="flex flex-wrap gap-1.5">
          {(["all", ...matrix.groups.map((g) => g.persona)] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPersona(p)}
              aria-pressed={persona === p}
              className={`rounded-md px-2.5 py-1 text-sm transition-colors ${
                persona === p ? "bg-fg text-bg" : "bg-surface-2 text-muted hover:text-fg"
              }`}
            >
              {p === "all" ? "All buyers" : p}
            </button>
          ))}
        </div>
        <label className="hidden items-center gap-2 text-sm md:flex">
          <input
            type="checkbox"
            checked={showNotes}
            onChange={(e) => setShowNotes(e.target.checked)}
            className="size-4 accent-[var(--accent)]"
          />
          Show source notes
        </label>
      </div>

      <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted">
        {(Object.keys(markStyle) as MatrixMark[]).map((m) => (
          <span key={m} className="flex items-center gap-1.5">
            <Mark mark={m} /> {markStyle[m].label}
          </span>
        ))}
      </div>

      {/* Phones: one card per capability, every company listed down the card. No sideways scrolling. */}
      <div className="mt-4 space-y-5 md:hidden">
        {groups.map((g) => (
          <section key={g.persona}>
            <h3 className="text-xs font-semibold tracking-wide text-muted uppercase">
              What {personaLabel[g.persona] ?? g.persona} cares about
            </h3>
            <ul className="mt-2 space-y-3">
              {g.capabilities.map((c) => (
                <li key={c.name} className="rounded-xl border border-line bg-surface p-4">
                  <p className="font-medium text-pretty">{c.name}</p>
                  <dl className="mt-3 space-y-2.5">
                    {matrix.players.map((p) => {
                      const cell = c.cells[p.id];
                      return (
                        <div key={p.id} className="grid grid-cols-[6.5rem_auto_1fr] items-start gap-2 text-sm">
                          <dt className={`font-medium ${p.id === companyId ? "text-accent" : ""}`}>{p.name}</dt>
                          <dd>
                            <Mark mark={cell.mark} />
                          </dd>
                          <dd className="text-xs text-pretty text-muted">
                            <CellNote note={cell.note} url={cell.url} />
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-4 hidden rounded-xl border border-line bg-surface md:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs">
              <th scope="col" className="px-4 py-3 font-medium text-muted">
                Capability
              </th>
              {matrix.players.map((p) => (
                <th
                  key={p.id}
                  scope="col"
                  className={`px-3 py-3 text-center font-semibold ${p.id === companyId ? "bg-accent-soft text-accent" : ""}`}
                >
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map((g) => (
              <Fragment key={g.persona}>
                <tr className="border-b border-line bg-surface-2">
                  <th
                    scope="colgroup"
                    colSpan={matrix.players.length + 1}
                    className="px-4 py-2 text-xs font-semibold tracking-wide text-muted uppercase"
                  >
                    What {personaLabel[g.persona] ?? g.persona} cares about
                  </th>
                </tr>
                {g.capabilities.map((c) => (
                  <tr key={c.name} className="border-b border-line last:border-0">
                    <th scope="row" className="px-4 py-3 font-medium text-pretty">
                      {c.name}
                    </th>
                    {matrix.players.map((p) => {
                      const cell = c.cells[p.id];
                      return (
                        <td
                          key={p.id}
                          title={cell.note}
                          className={`px-3 py-3 text-center align-top ${p.id === companyId ? "bg-accent-soft/50" : ""}`}
                        >
                          <Mark mark={cell.mark} />
                          {showNotes ? (
                            <span className="mt-1 block text-[11px] leading-snug text-muted">
                              <CellNote note={cell.note} url={cell.url} />
                            </span>
                          ) : null}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
