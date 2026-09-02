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
      <Image
        src="/assets/text.webp"
        alt=""
        aria-hidden
        width={1830}
        height={424}
        loading="lazy"
        sizes="100vw"
        className="h-auto w-full max-w-[1830px] self-center object-contain"
      />

      <div className="container mx-auto -mt-5 lg:-mt-16">
        <div className="grid grid-cols-1 z-10 relative gap-12 py-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            {content.logoUrl ? (
              <Image
                src={content.logoUrl}
                width={300}
                height={73}
                loading="lazy"
                sizes="128px"
                className="h-auto w-32"
                alt="ZerofAI"
              />
            ) : null}
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
        <Image
          src="/assets/pattern.webp"
          alt=""
          aria-hidden
          width={1536}
          height={285}
          loading="lazy"
          sizes="100vw"
          className="-mt-24 h-auto w-full"
        />
        <div className="flex text-center justify-center items-center py-5 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} {content.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}
