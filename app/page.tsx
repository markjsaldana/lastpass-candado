import Link from "next/link";
import { ArrowRight, Binoculars, Gauge, MessageSquareText } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SalesCycleTrack, type Stage } from "@/components/sales-cycle-track";
import { competitors, digest, signals, sources } from "@/lib/data";
import { formatShortDate } from "@/lib/format";
import { lastRun } from "@/lib/site";
import { eyebrowFor } from "@/lib/nav";
import { WhyIMadeThis } from "@/components/why-i-made-this";

const pillars = [
  {
    icon: Binoculars,
    title: "Watch",
    body: "Every Monday it checks 1Password, Bitwarden, and Keeper pricing pages, release notes, comparison pages, and blogs. Win-loss interviews, call mentions, and customer references sit alongside.",
  },
  {
    icon: Gauge,
    title: "Check",
    body: "Each change is scored for deal impact and reviewed by a person before a rep sees it. Anything about encryption, compliance, or incidents gets a second check against LastPass's published documentation.",
  },
  {
    icon: MessageSquareText,
    title: "Answer",
    body: "Reps ask in Slack or the CRM and get what to say next, with a link to the source for every line.",
  },
];

// What a rep gets from the assistant at each stage, and where it comes from.
const stages: Stage[] = [
  {
    name: "Prospecting",
    who: "SDR",
    asks: "Which of my accounts should hear from me this week?",
    gets: "A reason to reach out, like 1Password's Teams plan topping out at 20 users, with a two-line opener ready to send.",
    href: "/so-what#sdrs",
    source: "So what for SDRs",
  },
  {
    name: "Discovery",
    who: "SDR → AE",
    asks: "Their IT admin mentioned Bitwarden. What should I ask?",
    gets: "Landmine questions to plant early, like which Bitwarden plan their quote is on and whether it includes SSO.",
    href: "/battlecard#bitwarden",
    source: "Bitwarden battlecard",
  },
  {
    name: "Demo & evaluation",
    who: "AE + SE",
    asks: "Here's the call transcript. What do they care about?",
    gets: "Each buyer's concerns in their own words, the proof that answers them, and a follow-up email.",
    href: "/assistant",
    source: "Deal assistant",
  },
  {
    name: "Proving it",
    who: "SE",
    asks: "Can we show directory sync with Entra ID beats what 1Password offers?",
    gets: "A capability-by-capability answer by buyer, with a source on every cell and \"not checked\" where we don't know.",
    href: "/matrix",
    source: "Matrix",
  },
  {
    name: "Security review",
    who: "SE + AE",
    asks: "Their security lead sent a questionnaire and asked about 2022.",
    gets: "Approved answers only: the incident posts, certifications, and security pages LastPass has published, with links. If there's no approved answer, it says so and routes the question to an SE. It never improvises.",
    href: "/battlecard#1password-objection-0",
    source: "Incident answer",
  },
  {
    name: "Proposal",
    who: "AE",
    asks: "The CFO wants to talk to a company like theirs.",
    gets: "Reference customers matched on industry, size, competitor replaced, and use case, with who to ask and when they were last used.",
    href: "/references",
    source: "References",
  },
  {
    name: "Renewal",
    who: "AE + CS",
    asks: "A customer says they're looking at Bitwarden.",
    gets: "A same-day alert when a competitor shows up, plus adoption and usage numbers for the renewal call.",
    href: "/routing",
    source: "Routing log",
  },
];

const whyItMatters = [
  {
    title: "1Password and Bitwarden show up in most competitive deals, from opposite sides.",
    body: "1Password sells polish and brand to the security lead. Bitwarden sells price and open source to IT and the CFO. One answer can't cover both.",
  },
  {
    title: "Every deal has a technical buyer and a business buyer, and they need different proof.",
    body: "The security lead wants the encryption model, certifications, and a straight answer on incident history. The business buyer wants price per user and staff who use the tool. The IT admin running the rollout wants SSO and directory sync that work on day one.",
  },
  {
    title: "Reps only use what they trust.",
    body: "Every answer cites the signal, battlecard section, published page, or customer story it came from. When the assistant doesn't know, it says so, and the question comes to me.",
  },
];

export default function Page() {
  const thisWeek = signals.filter((s) => s.weekOf === digest.weekOf);
  const stats = [
    { label: "Competitors tracked", value: competitors.filter((c) => c.tier !== "Watch").length },
    { label: "Sources monitored", value: sources.length },
    { label: "Signals this week", value: thisWeek.length },
    { label: "Sales alerts this week", value: thisWeek.filter((s) => s.urgency === "Alert now").length },
  ];

  return (
    <>
      <PageHeader
        eyebrow={eyebrowFor("/")}
        title="A sales assistant for every stage of the deal"
        lede="LastPass SDRs, AEs, and SEs ask it what to say next, from the first cold email to the security review to the renewal call. It answers from this week's intel on 1Password, Bitwarden, and Keeper and from customer proof, and it cites the source for every line."
      />

      <section aria-label="How the assistant works" className="grid gap-4 sm:grid-cols-3">
        {pillars.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-xl border border-line bg-surface p-5">
            <span className="grid size-9 place-items-center rounded-lg bg-accent-soft text-accent">
              <Icon className="size-4.5" aria-hidden />
            </span>
            <h2 className="mt-4 font-semibold">{title}</h2>
            <p className="mt-1.5 text-sm text-muted">{body}</p>
          </div>
        ))}
      </section>

      <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface px-5 py-4">
            <dt className="text-xs text-muted">{s.label}</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{s.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-2 text-xs text-pretty text-muted">
        Counts come from the sample {formatShortDate(lastRun)} run.{" "}
        <Link href="/how-it-works#weekly-run" className="font-medium text-accent hover:underline">
          How the weekly run works
        </Link>
      </p>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">Through the whole sales cycle</h2>
        <p className="mt-1 max-w-2xl text-sm text-pretty text-muted">
          What a rep asks at each stage, and what comes back.
        </p>
        <div className="mt-5">
          <SalesCycleTrack stages={stages} />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">Why this matters for LastPass</h2>
        <ul className="mt-5 space-y-4">
          {whyItMatters.map((item, i) => (
            <li key={item.title} className="flex gap-4">
              <span className="mt-0.5 font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              <p className="max-w-2xl text-pretty">
                <strong className="font-semibold">{item.title}</strong>{" "}
                <span className="text-muted">{item.body}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-12 max-w-3xl rounded-xl border border-line bg-surface-2 p-6 text-center">
        <p className="font-mono text-xs tracking-wide text-muted uppercase">How I&apos;ll roll it out</p>
        <p className="mt-3 text-pretty">
          In my first 90 days: battlecards for 1Password and Bitwarden by day 30, Candado every Monday by day 35, a
          win-loss interview program by day 45, and a deal assistant pilot by day 75.{" "}
          <Link href="/plan" className="font-medium text-accent hover:underline">
            See the 90-day plan
          </Link>
          .
        </p>
      </section>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/assistant"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
        >
          Try the deal assistant <ArrowRight className="size-4" aria-hidden />
        </Link>
        <Link
          href="/how-it-works"
          className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface-2"
        >
          See how it works
        </Link>
        <Link
          href="/so-what"
          className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface-2"
        >
          Read this week&apos;s So what
        </Link>
      </div>
      <WhyIMadeThis />
    </>
  );
}
