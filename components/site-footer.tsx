import { contact, independenceNote, personName, siteTagline } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-wrap items-start justify-between gap-4 px-4 py-6 text-sm text-muted sm:px-6 lg:px-8">
        <div className="space-y-1">
          <p>
            {siteTagline}, by {personName} ·{" "}
            <a href={`mailto:${contact.email}`} className="hover:text-fg">
              {contact.email}
            </a>{" "}
            ·{" "}
            <a href={contact.phoneHref} className="whitespace-nowrap hover:text-fg">
              {contact.phone}
            </a>
          </p>
          <p className="text-xs text-pretty">
            {independenceNote} Company names are used to describe public information. No logos are used.
          </p>
        </div>
        <ThemeToggle />
      </div>
    </footer>
  );
}
