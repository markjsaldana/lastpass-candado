import { contact, personName } from "@/lib/site";

// The closing note. Callout boxes elsewhere use the same centered width (max-w-3xl).
export function WhyIMadeThis() {
  return (
    <section className="mx-auto mt-14 max-w-3xl rounded-xl bg-fg p-8 text-center text-bg">
      <p className="font-mono text-xs tracking-wide uppercase opacity-70">Why I made this</p>
      <p className="mt-3 text-lg leading-relaxed text-pretty">
        At Gymdesk I built the competitive intelligence program as the only product marketer. I tracked more than a
        dozen competitors, ran win-loss interviews, and launched an AI sales tool reps used on over 90% of calls; it
        helped close more than 300 deals in its first 90 days. At Vertafore, my battlecards cut the average sales cycle
        by 15%. I want to bring that to security, and I built this to show how I&apos;d start.
      </p>
      <p className="mt-5 text-sm opacity-80">
        {personName} ·{" "}
        <a href={`mailto:${contact.email}`} className="underline underline-offset-2">
          {contact.email}
        </a>{" "}
        ·{" "}
        <a href={contact.phoneHref} className="whitespace-nowrap underline underline-offset-2">
          {contact.phone}
        </a>{" "}
        ·{" "}
        <a href={contact.linkedinHref} className="underline underline-offset-2">
          {contact.linkedin}
        </a>
      </p>
    </section>
  );
}
