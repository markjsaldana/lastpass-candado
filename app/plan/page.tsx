import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { More } from "@/components/more";
import { PageHeader } from "@/components/page-header";
import { personName } from "@/lib/site";
import { eyebrowFor } from "@/lib/nav";

export const metadata: Metadata = { title: "90-day plan" };

// Dated milestones for the timeline strip. `day` places each marker.
const milestones = [
  { day: 10, label: "Sat in on 20 sales calls" },
  { day: 30, label: "1Password and Bitwarden battlecards live" },
  { day: 35, label: "First Monday Candado" },
  { day: 45, label: "Win-loss interviews start" },
  { day: 60, label: "Comparison pages updated" },
  { day: 75, label: "Deal assistant pilot starts" },
  { day: 90, label: "Win rate and pipeline to leadership" },
];

const phases = [
  {
    days: "Days 1–30",
    name: "Listen and ship the first cards",
    items: [
      "Sit in on 20 SDR, AE, and SE calls, including at least five security reviews, and join a few CS renewal and MSP partner calls.",
      "Learn the product the way each buyer does: run a rollout on a test company with Entra ID sync, read the security pages a security lead reads, and sit in on onboarding.",
      "Talk to customers in our core segment, 50 to 500 person companies: current customers, churned customers, and trials that didn't convert. Split by who decided: IT, security, or the business buyer.",
      "Interview sales leaders, AEs, SEs, CS, partner managers, and Product about where 1Password and Bitwarden show up and what reps need in the moment.",
      "Collect every published LastPass statement on security and incidents into one approved library with Legal and Security, so reps have one sourced answer.",
      "Pull CRM data to see where we lose to each competitor, by segment and by which buyer decided.",
    ],
    ships: "v1 battlecards for 1Password and Bitwarden with the approved incident answer, a write-up of what customers told me, and the source list Candado will track.",
    done: "Reps are using both battlecards on live calls, and nobody improvises the incident answer.",
  },
  {
    days: "Days 31–60",
    name: "Make it weekly and start win-loss",
    items: [
      "Turn on the Monday run with RevOps and a few days of an engineer's time.",
      "Send the first weekly digest and the first So what for leadership, SDRs, and the team.",
      "Open a sales alert channel for same-day changes.",
      "Start the win-loss program by day 45: interviews within 14 days of each decision, coded against a fixed list of reasons.",
      "Refresh our 1Password and Bitwarden comparison pages with the web team and Legal by day 60.",
      "Build a lighter Keeper card, and start logging Dashlane and NordPass mentions.",
    ],
    ships: "Candado every Monday, the So what, the alert channel, the first coded win-loss findings, and updated comparison pages.",
    done: "Candado goes out every Monday without me chasing anyone for it.",
  },
  {
    days: "Days 61–90",
    name: "Prove it and start the assistant",
    items: [
      "Set the baseline: win rate by competitor and pipeline influenced, from CRM competitor tags and content usage.",
      "Pilot the deal assistant with 5 AEs, 2 SEs, and 3 SDRs on live deals by day 75.",
      "Run a field enablement session on the security review, with role-play of the incident question.",
      "Bring the first quarterly competitive review, with win-loss themes, into roadmap planning with Product.",
    ],
    ships: "Win rate by competitor and pipeline influenced, reported to leadership, plus the first quarterly competitive review and the assistant pilot.",
    done: "Leadership sees win rate by competitor and pipeline influenced, and pilot reps use the assistant in live deals.",
  },
];

const partners = [
  { team: "Sales leadership", why: "What reps need, which decisions go in the leadership So what, and the win-rate report" },
  { team: "SEs and Security", why: "The approved library of security answers, and who answers what the library can't" },
  { team: "RevOps", why: "Call recordings, CRM competitor tags, and the pipeline-influenced report" },
  { team: "Product", why: "Roadmap gaps from signals and win-loss, and the quarterly competitive review" },
  { team: "CS and partner managers", why: "Switch risk at renewal, MSP feedback, and reference customers" },
  { team: "Web, Brand, and Legal", why: "Comparison pages and any claim about a competitor or about our security" },
];

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow={eyebrowFor("/plan")}
        title="How I'll build and ship Candado in my first 90 days"
        lede="Listen first, make it weekly, then prove it moves win rates and pipeline. By day 90, Candado goes out every Monday, win-loss interviews are running, and a group of reps is piloting the deal assistant."
      />

      {/* 90 days as one strip, with each milestone placed by its day. */}
      <section aria-label="Milestones" className="rounded-xl border border-line bg-surface p-5">
        <div className="relative my-2 hidden h-36 md:block">
          <div className="absolute top-12 right-0 left-0 flex h-2 gap-0.5 overflow-hidden rounded-full" aria-hidden>
            <span className="animate-grow-x flex-1 bg-seq-2" />
            <span className="animate-grow-x flex-1 bg-seq-3 [animation-delay:200ms]" />
            <span className="animate-grow-x flex-1 bg-seq-4 [animation-delay:400ms]" />
          </div>
          {milestones.map((m, i) => {
            const above = i % 2 === 0;
            const last = m.day === 90;
            return (
              <div
                key={m.day}
                className={`absolute w-32 ${last ? "-translate-x-full text-right" : "-translate-x-1/2 text-center"}`}
                style={{ left: `${(m.day / 90) * 100}%`, top: above ? 0 : "3.75rem" }}
              >
                <div className="animate-rise" style={{ animationDelay: `${300 + i * 120}ms` }}>
                  {above ? null : <span className={`mb-1 block h-3 w-px bg-line ${last ? "ml-auto" : "mx-auto"}`} aria-hidden />}
                  <p className="font-mono text-[11px] text-accent">Day {m.day}</p>
                  <p className="text-xs leading-tight text-pretty">{m.label}</p>
                  {above ? <span className={`mt-1 block h-3 w-px bg-line ${last ? "ml-auto" : "mx-auto"}`} aria-hidden /> : null}
                </div>
              </div>
            );
          })}
        </div>
        <ol className="space-y-2 md:hidden">
          {milestones.map((m) => (
            <li key={m.day} className="flex gap-3 text-sm">
              <span className="w-14 shrink-0 font-mono text-xs leading-5 text-accent">Day {m.day}</span>
              <span>{m.label}</span>
            </li>
          ))}
        </ol>
      </section>

      <ol className="mt-6 grid gap-4 lg:grid-cols-3">
        {phases.map((p, i) => (
          <li key={p.days} className="flex flex-col rounded-xl border border-line bg-surface p-5">
            <p className="font-mono text-xs text-accent">
              {String(i + 1).padStart(2, "0")} · {p.days}
            </p>
            <h2 className="mt-1 text-lg font-semibold">{p.name}</h2>
            <div className="mt-4 space-y-3 text-sm">
              <p>
                <span className="text-xs font-medium tracking-wide text-muted uppercase">What ships</span>
                <span className="mt-1 block text-pretty">{p.ships}</span>
              </p>
              <p>
                <span className="text-xs font-medium tracking-wide text-muted uppercase">Done when</span>
                <span className="mt-1 block text-pretty">{p.done}</span>
              </p>
            </div>
          </li>
        ))}
      </ol>

      <More label="What I'll do in each phase" hint="Step by step, month by month">
        <div className="grid gap-4 lg:grid-cols-3">
          {phases.map((p) => (
            <div key={p.days} className="rounded-xl border border-line bg-surface p-5">
              <p className="font-mono text-xs text-accent">{p.days}</p>
              <ul className="mt-3 space-y-2.5 text-sm">
                {p.items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </More>

      <More label="Who I'll work with" hint="Six teams, and what I need from each">
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p) => (
            <div key={p.team} className="rounded-xl border border-line bg-surface p-4">
              <dt className="font-medium">{p.team}</dt>
              <dd className="mt-1 text-sm text-pretty text-muted">{p.why}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm">
          <Link href="/routing" className="font-medium text-accent hover:underline">
            How I&apos;ll measure it
          </Link>{" "}
          <span className="text-muted">· the KPI scorecard on the Routing log page.</span>
        </p>
      </More>

      <section className="mx-auto mt-14 max-w-3xl rounded-xl border border-accent/30 bg-accent-soft p-6 text-center">
        <p className="font-mono text-xs text-accent">Next · After day 90</p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight">Roll the deal assistant out to every rep</h2>
        <p className="mt-2 text-pretty">
          The pilot shows what reps use and what they skip. After day 90 I&apos;ll open the assistant to every SDR,
          AE, and SE: upload the call transcript and get back what each buyer cares about, with proof and a follow-up email.
        </p>
        <Link
          href="/assistant"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg hover:opacity-90"
        >
          See the deal assistant <ArrowRight className="size-4" aria-hidden />
        </Link>
      </section>

      <blockquote className="mx-auto mt-12 max-w-3xl rounded-xl bg-fg p-8 text-center text-bg">
        <p className="text-xl leading-relaxed font-medium text-balance">
          Competitive intel pays off when it changes what a rep says on the next call. That&apos;s the bar I&apos;ll
          hold Candado to.
        </p>
        <footer className="mt-4 text-sm opacity-70">{personName}</footer>
      </blockquote>
    </>
  );
}
