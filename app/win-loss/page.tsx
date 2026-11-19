import type { Metadata } from "next";
import { CalendarClock, ClipboardList, Tags, Users } from "lucide-react";
import { Chip } from "@/components/badges";
import { More } from "@/components/more";
import { PageHeader } from "@/components/page-header";
import { competitorName, winLoss } from "@/lib/data";
import { eyebrowFor } from "@/lib/nav";

export const metadata: Metadata = { title: "Win-loss" };

const program = [
  {
    icon: Users,
    title: "Who gets interviewed",
    body: "Every competitive deal over 50 seats, won or lost, plus a sample of smaller ones. I talk to the person who decided and, when it was a different person, the security lead or IT admin who shaped the shortlist. MSP partners once a quarter.",
  },
  {
    icon: CalendarClock,
    title: "When",
    body: "The invite goes out within 3 business days of the decision, and the interview happens within 14 days, while the reasons are fresh. 30 minutes, with a gift card as thanks.",
  },
  {
    icon: ClipboardList,
    title: "Who asks",
    body: "I run them at first, so I hear every answer myself. Losses move to a neutral third party once volume grows, because buyers are more candid with someone who isn't from LastPass. The AE never runs their own deal's interview.",
  },
  {
    icon: Tags,
    title: "How answers are coded",
    body: "Each interview gets one primary reason and up to three supporting codes from a fixed list. Two people code the first 10 together to agree on definitions. Codes don't change mid-quarter, so trends stay comparable.",
  },
];

const guide = [
  {
    part: "The trigger",
    questions: [
      "What made you start looking for a password manager now?",
      "Who was involved, and who had the final say?",
    ],
  },
  {
    part: "The evaluation",
    questions: [
      "Which products did you look at, and how did each one get on the list?",
      "What did you see or hear that moved one product up or down?",
    ],
  },
  {
    part: "Security review",
    questions: [
      "What did your security lead need to see before saying yes?",
      "Did LastPass's incident history come up? Who raised it, and was our answer enough?",
      "When did your security lead first talk to someone from each vendor?",
    ],
  },
  {
    part: "Price and rollout",
    questions: [
      "Which plan was each quote on, and did that include SSO and admin policies?",
      "How long did you expect the rollout to take, and what worried you about it?",
    ],
  },
  {
    part: "The decision",
    questions: [
      "If you had to give one reason for your choice, what would it be?",
      "What would have changed your decision?",
    ],
  },
];

const outcomeTone = { Won: "bg-good-soft text-good", Lost: "bg-bad-soft text-bad" };

export default function Page() {
  const { codes, interviews } = winLoss;
  const label = (id: string) => codes.find((c) => c.id === id)?.label ?? id;
  // How often each code shows up as the primary reason, split by outcome.
  const tally = codes
    .map((c) => ({
      ...c,
      won: interviews.filter((i) => i.outcome === "Won" && i.primaryReason === c.id).length,
      lost: interviews.filter((i) => i.outcome === "Lost" && i.primaryReason === c.id).length,
    }))
    .filter((c) => c.won + c.lost > 0)
    .sort((a, b) => b.won + b.lost - (a.won + a.lost));
  const max = Math.max(...tally.map((t) => t.won + t.lost));

  return (
    <>
      <PageHeader
        eyebrow={eyebrowFor("/win-loss")}
        title="Win-loss: testing every hypothesis on this site"
        lede="The battlecards say why we think we win and lose. Win-loss interviews check that against what buyers actually say, and the answers feed the cards, the So what, and the roadmap."
      />

      <section aria-label="How the program runs" className="grid gap-4 sm:grid-cols-2">
        {program.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-xl border border-line bg-surface p-5">
            <span className="grid size-9 place-items-center rounded-lg bg-accent-soft text-accent">
              <Icon className="size-4.5" aria-hidden />
            </span>
            <h2 className="mt-4 font-semibold">{title}</h2>
            <p className="mt-1.5 text-sm text-pretty text-muted">{body}</p>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">What the sample interviews say</h2>
        <p className="mt-1 max-w-2xl text-sm text-pretty text-muted">
          Primary reason in {interviews.length} sample interviews. Too few to call a trend; the point is the format.
        </p>
        <div className="mt-4 rounded-xl border border-line bg-surface p-5">
          <div className="flex flex-wrap gap-4 text-xs text-muted" aria-label="Legend">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-3 rounded-sm bg-good" aria-hidden /> Won
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-3 rounded-sm bg-bad" aria-hidden /> Lost
            </span>
          </div>
          <ul className="mt-4 space-y-2.5">
            {tally.map((t) => (
              <li key={t.id} className="grid grid-cols-[minmax(0,10rem)_1fr] items-center gap-3 text-sm sm:grid-cols-[14rem_1fr]">
                <span className="text-pretty">
                  {t.label} <span className="text-xs text-muted">· {t.group}</span>
                </span>
                <span className="flex h-5 gap-0.5" aria-label={`${t.won} won, ${t.lost} lost`}>
                  {t.won ? (
                    <span className="animate-grow-x rounded-sm bg-good" style={{ width: `${(t.won / max) * 100}%` }} />
                  ) : null}
                  {t.lost ? (
                    <span className="animate-grow-x rounded-sm bg-bad" style={{ width: `${(t.lost / max) * 100}%` }} />
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-line pt-3 text-sm text-pretty">
            <span className="font-medium">What I&apos;d take to leadership: </span>
            <span className="text-muted">
              both 1Password losses came down to trust, and in both the security lead was reached after the proposal.
              Fix the sales process first: reach the security lead before the proposal.
            </span>
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">Coded findings</h2>
        <p className="mt-1 max-w-2xl text-sm text-pretty text-muted">
          Invented interviews, coded the way real ones would be. Every row ends in an action someone owns.
        </p>
        <ul className="mt-4 grid gap-3 lg:grid-cols-2">
          {interviews.map((i) => (
            <li key={i.id} className="flex flex-col rounded-xl border border-line bg-surface p-4 text-sm">
              <p className="flex flex-wrap items-center gap-1.5">
                <span className={`rounded-md px-1.5 py-0.5 text-xs font-medium ${outcomeTone[i.outcome]}`}>{i.outcome}</span>
                <span className="font-medium">vs. {competitorName(i.competitorId)}</span>
                <span className="text-xs text-muted">
                  · {i.company}, {i.size} employees · {i.role} · {i.daysAfter} days after decision
                </span>
              </p>
              <p className="mt-2 text-pretty italic">“{i.quote}”</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {i.codes.map((c) => (
                  <Chip key={c}>{c === i.primaryReason ? `Primary: ${label(c)}` : label(c)}</Chip>
                ))}
              </div>
              <p className="mt-auto border-t border-line pt-2.5 text-pretty [&:not(:first-child)]:mt-3">
                <span className="text-xs font-medium tracking-wide text-muted uppercase">Action </span>
                {i.action}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <More label="The interview guide" hint="Eleven questions in five parts, about 30 minutes">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {guide.map((g) => (
            <div key={g.part} className="rounded-xl border border-line bg-surface p-5">
              <h3 className="font-semibold">{g.part}</h3>
              <ol className="mt-3 space-y-2 text-sm">
                {g.questions.map((q) => (
                  <li key={q} className="text-pretty">
                    {q}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </More>

      <More label="The code list" hint="Ten reasons in five groups. Fixed for the quarter.">
        <dl className="grid gap-2 sm:grid-cols-2">
          {codes.map((c) => (
            <div key={c.id} className="flex items-baseline justify-between gap-3 rounded-lg border border-line bg-surface px-4 py-2.5 text-sm">
              <dt className="font-medium">{c.label}</dt>
              <dd className="text-xs text-muted">{c.group}</dd>
            </div>
          ))}
        </dl>
      </More>

      <section className="mx-auto mt-12 max-w-3xl rounded-xl border border-line bg-surface-2 p-5 text-center">
        <h2 className="font-semibold">Where the answers go</h2>
        <p className="mt-1 text-sm text-pretty text-muted">
          Each month&apos;s findings update the &quot;why they win&quot; hypotheses on the Inputs page, the battlecards,
          and the win-loss questions in the weekly digest. Each quarter they go into the competitive review with
          Product. Win rate by competitor and by primary reason goes to sales leadership.
        </p>
      </section>
    </>
  );
}
