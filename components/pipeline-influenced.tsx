import { competitorName, routingLog } from "@/lib/data";

const money = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` : `$${Math.round(n / 1000).toLocaleString("en-US")}K`;

// How I'd report contribution to pipeline: deals where reps used Candado content, by competitor.
export function PipelineInfluenced() {
  const { quarter, note, rows } = routingLog.pipeline;
  const total = rows.reduce((n, r) => n + r.pipeline, 0);
  const opps = rows.reduce((n, r) => n + r.opps, 0);

  return (
    <section className="rounded-xl border border-line bg-surface p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-semibold">Pipeline influenced</h2>
        <span className="rounded-md bg-warn-soft px-1.5 py-0.5 text-xs font-medium text-warn">Sample data</span>
      </div>
      <p className="mt-1 text-sm text-pretty text-muted">
        {quarter}. Open and closed deals with a competitor tagged in the CRM where a rep used a battlecard, the deal
        assistant, or the trust pack. Win rate compares deals that used Candado content with those that didn&apos;t.
      </p>

      <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line">
        <div className="bg-surface-2 px-4 py-3">
          <dt className="text-xs text-muted">Pipeline influenced</dt>
          <dd className="mt-0.5 text-2xl font-semibold tabular-nums">{money(total)}</dd>
        </div>
        <div className="bg-surface-2 px-4 py-3">
          <dt className="text-xs text-muted">Opportunities</dt>
          <dd className="mt-0.5 text-2xl font-semibold tabular-nums">{opps}</dd>
        </div>
      </dl>

      <ul className="mt-4 space-y-3">
        {rows.map((r) => {
          const lift = r.winRateAfter - r.winRateBefore;
          return (
            <li key={r.competitorId} className="rounded-lg border border-line p-3 text-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-medium">vs. {competitorName(r.competitorId)}</span>
                <span className="tabular-nums text-muted">
                  {money(r.pipeline)} · {r.opps} opps · {r.won} won, {r.lost} lost
                </span>
              </div>
              {/* Win rate without and with Candado content, on one 0 to 100% track. */}
              <div className="mt-2 space-y-1.5" aria-label={`Win rate ${r.winRateBefore}% without, ${r.winRateAfter}% with`}>
                {[
                  { label: "Without", value: r.winRateBefore, tone: "bg-muted/40" },
                  { label: "With Candado", value: r.winRateAfter, tone: "bg-accent" },
                ].map((bar) => (
                  <div key={bar.label} className="grid grid-cols-[6.5rem_1fr_2.5rem] items-center gap-2 text-xs">
                    <span className="text-muted">{bar.label}</span>
                    <span className="h-2 rounded-full bg-surface-2">
                      <span className={`animate-grow-x block h-2 rounded-full ${bar.tone}`} style={{ width: `${bar.value}%` }} />
                    </span>
                    <span className="text-right tabular-nums">{bar.value}%</span>
                  </div>
                ))}
              </div>
              <p className="mt-1.5 text-xs text-muted">
                {lift >= 0 ? "+" : ""}
                {lift} points
                {r.won + r.lost < 10 ? ". Too few closed deals to read anything into yet." : ""}
              </p>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-xs text-pretty text-muted">{note}</p>
    </section>
  );
}
