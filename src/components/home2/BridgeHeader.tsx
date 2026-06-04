"use client";

import Link from "next/link";
import { Search, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const nav = [
  { label: "Services", href: "#", hasMenu: true, active: true },
  { label: "Consulting", href: "#", hasMenu: false },
  { label: "Industries", href: "#", hasMenu: true },
  { label: "Insights", href: "#", hasMenu: true },
  { label: "About us", href: "#", hasMenu: true },
  { label: "News", href: "#", hasMenu: false },
];

export function BridgeHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bridge-header sticky top-0 z-50 w-full bg-white">
      <div className="hidden items-center justify-end gap-8 px-6 py-2.5 text-[13px] text-[#3d3d3d] lg:flex lg:px-10">
        <a href="#" className="transition hover:text-[#ff462d]">Careers</a>
        <a href="#" className="inline-flex items-center gap-1 transition hover:text-[#ff462d]">
          Investors <span className="text-[11px]" aria-hidden>↗</span>
        </a>
        <button type="button" className="inline-flex items-center gap-1 transition hover:text-[#ff462d]">
          India - English <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex items-center justify-between gap-6 border-t border-[#e8e8e8] px-6 py-4 lg:px-10">
        <Link href="/home2" className="text-[1.75rem] font-normal lowercase leading-none tracking-[-0.02em] text-[#ff462d]">
        <Image width="300" height="100" src="/assets/logo.png" alt="Kyndryl Bridge" className="w-32" />
        </Link>

        <nav className="hidden items-stretch gap-7 lg:flex">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`group inline-flex items-center gap-1 self-stretch text-[15px] text-[#3d3d3d] transition hover:text-[#ff462d] ${
                item.active ? "border-b-2 border-[#ff462d]" : "border-b-2 border-transparent"
              }`}
            >
              {item.label}
              {item.hasMenu && (
                <ChevronDown className="h-3.5 w-3.5 stroke-[#3d3d3d] transition group-hover:stroke-kyndryl-red" strokeWidth={1.5} />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button type="button" aria-label="Open search" className="hidden text-[#3d3d3d] transition hover:text-[#ff462d] lg:block">
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button type="button" aria-label="Menu" onClick={() => setOpen(!open)} className="text-[#3d3d3d] lg:hidden">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      
    </header>
  );
}
