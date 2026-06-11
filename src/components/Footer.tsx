import { FooterDemoForm } from "@/components/FooterDemoForm";
import type { FooterContent } from "@/types/site-content";

type FooterProps = {
  content: FooterContent;
};

export function Footer({ content }: FooterProps) {
  return (
    <footer className="bg-navy-deep text-white z-10">
      <div className="mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 py-12 lg:grid-cols-12 lg:gap-10">
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
        <div className="flex text-center justify-center items-center border-t border-white/10 py-5 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} {content.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}
