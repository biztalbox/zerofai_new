const cols = [
  { title: "Services", items: ["Cloud", "Cybersecurity", "Data & AI", "Applications", "Network", "Mainframe"] },
  { title: "Industries", items: ["Banking", "Insurance", "Healthcare", "Retail", "Manufacturing", "Public sector"] },
  { title: "About", items: ["Our story", "Leadership", "Newsroom", "Careers", "Investors", "Contact"] },
  { title: "Insights", items: ["Reports", "Case studies", "Events", "Blog", "Webinars", "Resources"] },
];

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_3fr]">
          <div>
          <img width="300" height="100" src="/assets/logo.png" className="w-32" />
            <p className="mt-4 max-w-xs text-sm text-white/60">The heart of progress. Designing, building and managing modern systems that move the world's most vital businesses forward.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="mb-4 text-sm font-semibold tracking-wide text-white">{c.title}</div>
                <ul className="space-y-2.5 text-sm text-white/60">
                  {c.items.map((i) => <li key={i}><a className="hover:text-coral" href="#">{i}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Zerofai, Inc. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-coral">Privacy</a>
            <a href="#" className="hover:text-coral">Terms</a>
            <a href="#" className="hover:text-coral">Cookie settings</a>
            <a href="#" className="hover:text-coral">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
