import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, FileAudio, Hash, Lock, Mail, Sunrise, Users } from "lucide-react";
import { DealAssistant } from "@/components/deal-assistant";
import { More } from "@/components/more";
import { PageHeader } from "@/components/page-header";
import { transcriptDemo } from "@/lib/data";
import { eyebrowFor } from "@/lib/nav";

export const metadata: Metadata = { title: "Deal assistant" };

// One rep's day. The assistant shows up in every block of it.
const day = [
  {
    icon: Sunrise,
    time: "8:30",
    title: "Start of day",
    body: "What changed in my accounts: competitor alerts, price checks, and who to reach out to.",
  },
  {
    icon: CalendarClock,
    time: "10:45",
    title: "Before a call",
    body: "Landmine questions for the competitor in the deal, and the approved incident answer if the security lead asks.",
  },
  {
    icon: FileAudio,
    time: "11:40",
    title: "After the call",
    body: "Upload the transcript. Get each buyer's concerns in their words and the proof that answers each one.",
  },
  {
    icon: Mail,
    time: "11:45",
    title: "Follow-up",
    body: "A follow-up email that links only public case studies, ready to edit and send.",
  },
  {
    icon: Users,
    time: "3:15",
    title: "Security review",
    body: "A technical question answered twice: plain words for the CFO, exact terms for the security lead.",
  },
];

const stages = [
  { name: "Prospecting", gives: "This week's outreach angle from the So what, with an opener for the segment." },
  { name: "Discovery", gives: "Landmine questions to plant before the evaluation starts." },
  { name: "Evaluation & demo", gives: "The demo moments and proof points that land with each buyer in the room." },
  { name: "Security review", gives: "Approved answers from LastPass's published security pages and incident posts, with links. Anything else goes to an SE." },
  { name: "Proposal", gives: "Plan-for-plan price math at the buyer's seat count, and a reference customer to match." },
  { name: "Renewal", gives: "Proof of value to date and what to say if a competitor shows up at renewal." },
];

const buildSteps = [
  {
    title: "Start from the call",
    body: "The rep uploads the call transcript, or fills in a six-field form when there's no recording. The transcript is the recommended path: concerns come ranked by what the buyer said, with the quotes to prove it.",
  },
  {
    title: "Ground it in Candado",
    body: "It answers only from the battlecards, signals, matrix, win-loss notes, LastPass's published security pages, and the reference library, and every line cites where it came from. When the library has no answer, it says so and routes the question.",
  },
  {
    title: "Match proof to the deal",
    body: "Resources are ranked by how many of the buyers' concerns they answer and how closely the customer matches on industry, size, competitor, and use case.",
  },
  {
    title: "Put it where reps work",
    body: "Team chat and the CRM opportunity page, with call recordings pulled in automatically. Read-only access, scoped to what it needs.",
  },
  {
    title: "Turn gaps into intel requests",
    body: "Concerns it can't answer come to me, and missing reference matches go to CS. They become new sources to track, new win-loss questions, or reference recruiting.",
  },
];

// Read at build time so the demo can scroll the real sample transcript.
// A fixed directory keeps the build from tracing the whole project; the file name comes from the demo data.
const transcript = readFileSync(
  path.join(process.cwd(), "samples", "transcripts", path.basename(transcriptDemo.file.path)),
  "utf8",
).split("\n");

const channels = ["deal-maplewood", "comp-alerts", "security-reviews", "msp-partners"];

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow={eyebrowFor("/assistant")}
        title="The assistant reps use every day, on every deal"
        lede="Reps open it before and after every call. Drop in the transcript and get the buyer's concerns, the proof that answers them, and a follow-up email."
        sample
      />

      <section aria-label="A day with the assistant">
        <ol className="relative grid gap-3 sm:grid-cols-5">
          {/* Timeline rule behind the time stamps on wide screens. */}
          <span className="absolute top-[1.15rem] right-[10%] left-[10%] hidden h-0.5 bg-line sm:block" aria-hidden />
          {day.map(({ icon: Icon, time, title, body }, i) => (
            <li
              key={title}
              className="animate-rise relative flex gap-3 sm:flex-col sm:items-center sm:text-center"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <span className="relative grid size-10 shrink-0 place-items-center rounded-full border-2 border-accent bg-surface text-accent">
                <Icon className="size-4.5" aria-hidden />
              </span>
              <div>
                <p className="font-mono text-xs text-accent">{time}</p>
                <p className="font-medium">{title}</p>
                <p className="mt-1 text-sm text-pretty text-muted">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">Try it: one call, start to finish</h2>
        <p className="mt-1 max-w-2xl text-sm text-pretty text-muted">
          An AE just finished an evaluation call with Maplewood Accounting Group, a 120-person firm comparing LastPass and 1Password. The CFO, the IT admin, and the security lead were all on it.
        </p>
        <figure className="mt-4 rounded-xl border border-dashed border-line bg-surface-2 p-3 sm:p-5">
          <figcaption className="text-xs text-muted">
            Mockup of one exchange, built from a sample call transcript, the battlecard, the references library, and LastPass&apos;s published security pages.
            Not a working tool. Links open the real pages in this site.
          </figcaption>
          {/* A Slack-style window, so it reads as something reps use where they already work. */}
          <div className="mt-4 overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
            <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-2">
              <span className="flex gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-bad/60" />
                <span className="size-2.5 rounded-full bg-warn/60" />
                <span className="size-2.5 rounded-full bg-good/60" />
              </span>
              <span className="ml-2 text-xs text-muted">Team chat · LastPass sales</span>
            </div>
            <div className="grid md:grid-cols-[12rem_minmax(0,1fr)]">
              <aside className="hidden border-r border-line bg-surface-2/60 p-3 text-sm md:block" aria-hidden>
                <p className="px-2 text-xs font-medium text-muted">Channels</p>
                <ul className="mt-1 space-y-0.5">
                  {channels.map((c, i) => (
                    <li
                      key={c}
                      className={`flex items-center gap-1.5 rounded-md px-2 py-1 ${i === 0 ? "bg-accent text-accent-fg" : "text-muted"}`}
                    >
                      <Hash className="size-3.5" />
                      <span className="truncate">{c}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 px-2 text-xs font-medium text-muted">Apps</p>
                <p className="mt-1 flex items-center gap-1.5 px-2 py-1 text-muted">
                  <span className="size-2 rounded-full bg-good" />
                  Candado
                </p>
              </aside>
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-2.5">
                  <p className="flex items-center gap-1.5 text-sm font-semibold">
                    <Hash className="size-4 text-muted" aria-hidden />
                    deal-maplewood
                  </p>
                  <p className="flex items-center gap-1 text-xs text-muted">
                    <Lock className="size-3" aria-hidden />
                    Linked to CRM opportunity · {transcriptDemo.prospect.stage}
                  </p>
                </div>
                <div className="p-4">
                  <DealAssistant transcript={transcript} />
                </div>
              </div>
            </div>
          </div>
        </figure>
      </section>

      <More label="How it works, and how I'll measure it" hint="What it reads from, how it ranks proof, and when it ships">
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="font-semibold">What goes into it</h3>
            <ol className="mt-4 space-y-4 text-sm">
              {buildSteps.map((step, i) => (
                <li key={step.title} className="flex gap-3">
                  <span className="font-mono text-xs leading-5 text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="font-medium">{step.title}.</span>{" "}
                    <span className="text-pretty text-muted">{step.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="font-semibold">What changes by sales stage</h3>
            <dl className="mt-4 space-y-3 text-sm">
              {stages.map((stage) => (
                <div key={stage.name}>
                  <dt className="font-medium">{stage.name}</dt>
                  <dd className="text-pretty text-muted">{stage.gives}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <p className="mt-4 max-w-3xl text-sm text-pretty text-muted">
          <span className="font-medium text-fg">How to measure it: </span>
          reps using it each week, the share of competitive deals where it was used, win rate and pipeline in those deals
          compared with the rest, and how many questions it couldn&apos;t answer.
        </p>
        <p className="mt-4 max-w-3xl text-sm text-pretty text-muted">
          <span className="font-medium text-fg">When it ships: </span>
          a pilot with 5 AEs, 2 SEs, and 3 SDRs starts around day 75, once Candado has a couple of months of signals and
          references to answer from. Every rep gets it after day 90.{" "}
          <Link href="/plan" className="font-medium text-accent hover:underline">
            See the 90-day plan
          </Link>
        </p>
      </More>
    </>
  );
}
