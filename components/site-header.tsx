import Link from "next/link";
import { siteName, siteTagline } from "@/lib/site";
import { ContactButton } from "@/components/contact-button";
import { MobileNav } from "@/components/mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-baseline gap-2.5">
          {/* Text wordmark only: no LastPass logo or marks. */}
          <span className="truncate text-xl font-bold tracking-tight">
            {siteName}
            <span className="text-accent" aria-hidden>
              .
            </span>
          </span>
          <span className="hidden truncate text-sm text-muted sm:inline">{siteTagline}</span>
        </Link>
        <ContactButton />
      </div>
      <MobileNav />
    </header>
  );
}
