import { FooterDemoForm } from "@/components/FooterDemoForm";

const cols = [
  { title: "Company", items: ["Our Team", "Blogs", "Knowledge Center", "Customer Stories"] },
  { title: "Quicklinks", items: ["Contact", "Privacy Policy", "Terms of Service"] }
];

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white z-10">
      <div className="mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 py-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <img width="300" height="100" src="/assets/logo.png" className="w-32" alt="ZerofAI" />
            <p className="mt-4 max-w-xs text-sm text-white/60">
              Engineering the next generation of neural architectures. We bridge the gap between
              human intuition and machine precision to build an autonomous future.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-4">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="mb-4 text-sm font-semibold tracking-wide text-white">{c.title}</div>
                <ul className="space-y-2.5 text-sm text-white/60">
                  {c.items.map((i) => (
                    <li key={i}>
                      <a className="hover:text-coral" href="#">
                        {i}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
          <div className="mb-4 text-sm font-semibold tracking-wide text-white">Book a demo</div>
            <FooterDemoForm />
          </div>
        </div>
        <div className="flex text-center justify-center items-center border-t border-white/10 py-5 text-xs text-white/50">
          <div>© {new Date().getFullYear()} ZerofAI All rights reserved.</div>
         
        </div>
      </div>
    </footer>
  );
}
