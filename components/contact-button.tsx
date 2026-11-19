"use client";

import { useEffect, useRef, useState } from "react";
import { BriefcaseBusiness, Mail, Phone } from "lucide-react";
import { contact, personName } from "@/lib/site";

// One button in the header. Opens a small card with every way to reach me.
export function ContactButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="contact-card"
        className="rounded-lg bg-accent px-3.5 py-2 text-sm font-semibold whitespace-nowrap text-accent-fg transition-opacity hover:opacity-90"
      >
        Contact Mark
      </button>
      {open ? (
        <div
          id="contact-card"
          className="animate-rise absolute right-0 mt-2 w-72 rounded-xl border border-line bg-surface p-4 text-sm shadow-lg"
        >
          <p className="font-semibold">{personName}</p>
          <ul className="mt-3 space-y-2.5">
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-accent">
                <Mail className="size-4 shrink-0 text-muted" aria-hidden />
                {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.phoneHref} className="flex items-center gap-2 whitespace-nowrap hover:text-accent">
                <Phone className="size-4 shrink-0 text-muted" aria-hidden />
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={contact.linkedinHref} className="flex items-center gap-2 hover:text-accent">
                <BriefcaseBusiness className="size-4 shrink-0 text-muted" aria-hidden />
                {contact.linkedin}
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}
