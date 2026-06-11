"use client"
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useSiteContent } from "@/components/SiteContentProvider";

const nav = [
  { label: "Services", hasMenu: true },
  { label: "Consulting", hasMenu: false },
  { label: "Industries", hasMenu: true },
  { label: "Insights", hasMenu: true },
  { label: "About us", hasMenu: true },
  { label: "News", hasMenu: false },
];

export function Header() {
  const { navigation } = useSiteContent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <header className={`fixed top-0 z-50 w-full bg-background transition-shadow duration-300 ${scrolled ? "shadow-[0_1px_0_rgba(0,0,0,0.08)]" : ""}`}>
      
      {/* Top utility bar — squeezes away on scroll */}
      {/* <div
        className="overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(.2,.7,.2,1)]"
        style={{ maxHeight: scrolled ? 0 : 44, opacity: scrolled ? 0 : 1 }}
      >
        <div className="flex items-center justify-end gap-8 px-6 py-2.5 text-[13px] text-foreground/80 lg:px-12">
          <a href="#" className="hover:text-coral">Careers</a>
          <a href="#" className="inline-flex items-center gap-1 hover:text-coral">Investors <span aria-hidden>↗</span></a>
          <button className="inline-flex items-center gap-1 hover:text-coral">India - English <ChevronDown className="h-3.5 w-3.5" /></button>
        </div>
      </div> */}
      {/* Main nav — squeezes vertical padding on scroll */}
      <div
        className={`flex items-center justify-between gap-6 border-t border-border/60 px-6 transition-all duration-500 ease-[cubic-bezier(.2,.7,.2,1)] lg:px-12 ${scrolled ? "py-3" : "py-4"}`}
      >
        <Link href="/" className="flex items-baseline gap-0.5">
          <img width="300" height="100" src={navigation.logoUrl} alt="ZerofAI" className="w-32" />
        </Link>
        {/* <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <button key={n.label} className={`group inline-flex items-center gap-1 font-thin text-foreground transition-all duration-500 hover:text-coral ${scrolled ? "text-[14px]" : "text-[15px]"}`}>
              {n.label}
              {n.hasMenu && <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />}
            </button>
          ))}
        </nav> */}
        <div className="flex items-center gap-4">
          {/* <button aria-label="Search" className="hidden text-foreground hover:text-coral lg:block"><Search className="h-5 w-5" /></button> */}
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="lg:hidden">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-background px-6 py-4 lg:hidden">
          {nav.map((n) => (
            <div key={n.label} className="border-b border-border py-3 text-[15px] font-medium">{n.label}</div>
          ))}
        </div>
      )}
    </header>
  );
}
