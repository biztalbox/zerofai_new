import { FooterDemoForm } from "@/components/FooterDemoForm";
import type { FooterContent } from "@/types/site-content";
import Image from "next/image";

type FooterProps = {
  content: FooterContent;
};
// bg-[url('/assets/mobile.webp')] md:bg-[url('/assets/tab.webp')] lg:bg-[url('/assets/desktop.webp')] bg-contain bg-no-repeat bg-center
export function Footer({ content }: FooterProps) {
  return (
    <footer className="bg-[#060f1c] text-white z-10 relative flex flex-col p-5">
      <img src="/assets/text.png" alt="Footer Background" className="object-contain self-center" />

      <div className="container mx-auto -mt-5 lg:-mt-16">
        <div className="grid grid-cols-1 z-10 relative gap-12 py-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <img
              width="300"
              height="100"
              src={content.logoUrl}
              className="w-32"
              alt="ZerofAI"
            />
            <p className="mt-4 max-w-xs text-sm text-white/60">{content.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-4">
            {content.columns.map((column) => (
              <div key={column.title}>
                <div className="mb-4 text-sm font-semibold tracking-wide text-white">
                  {column.title}
                </div>
                <ul className="space-y-2.5 text-sm text-white/60">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}`}>
                      <a className="hover:text-coral" href={link.href}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="mb-4 text-sm font-semibold tracking-wide text-white">
              {content.demoTitle}
            </div>
            <FooterDemoForm />
          </div>
        </div>
        <img src="/assets/pattern.png" alt="Footer Background" className="-mt-24" />
        <div className="flex text-center justify-center items-center py-5 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} {content.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}
