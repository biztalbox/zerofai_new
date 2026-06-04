import Link from "next/link";

const serviceLinks = [
  "Applications", "Cyber Resilience", "Networks", "Cloud", "AI and data",
  "Kyndryl Bridge", "Consulting", "Digital Workplace", "Kyndryl Vital", "Core Enterprise and zCloud",
];

const aboutLinks = [
  "Alliances", "Kinship at Kyndryl", "Careers", "Leadership", "Contact us",
  "Locations", "Corporate citizenship", "News", "Investors", "Trust",
];

const legalLinks = [
  "Privacy", "Terms", "Security", "CSR Policy", "Certifications", "Sitemap",
  "Do not sell or share my personal information",
];

export function BridgeFooter() {
  return (
    <footer className="border-t border-[#e8e8e8] bg-[#f0f0f0]">
      <div className="mx-auto container px-6 py-14 lg:px-10">
        <div className="flex items-start justify-between gap-8">
          <Link href="/home2" className="text-[1.75rem] font-normal lowercase leading-none tracking-[-0.02em] text-[#ff462d]">
            kyndryl
          </Link>
          <div className="flex gap-2">
            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center bg-[#3d3d3d] text-[11px] font-bold text-white transition hover:bg-kyndryl-red"
            >
              in
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="flex h-9 w-9 items-center justify-center bg-[#3d3d3d] text-[11px] font-bold text-white transition hover:bg-kyndryl-red"
            >
              X
            </a>
          </div>
        </div>

        <p className="mt-6 text-[13px] text-[#666]">Follow Kyndryl</p>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-[#3d3d3d]">Services</h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-[14px] text-[#666]">
              {serviceLinks.map((l) => (
                <li key={l}><a href="#" className="hover:text-kyndryl-red hover:underline">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-[#3d3d3d]">About us</h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-[14px] text-[#666]">
              {aboutLinks.map((l) => (
                <li key={l}><a href="#" className="hover:text-kyndryl-red hover:underline">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[#d8d8d8] pt-8 text-[12px] text-[#666] md:flex-row md:items-center md:justify-between">
          <p>Copyright © {new Date().getFullYear()} Kyndryl Inc. All rights reserved</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {legalLinks.map((l) => (
              <a key={l} href="#" className="hover:text-kyndryl-red hover:underline">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
