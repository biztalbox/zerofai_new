const cols = [
  { title: "Company", items: ["Leadership", "Blogs", "Knowledge Center", "Customer Stories"] },
  { title: "Quicklinks", items: ["Contact", "Privacy Policy", "Terms of Service"] }
];

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white z-10">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-12 grid-cols-1 md:grid-cols-3 py-12">
          <div>
          <img width="300" height="100" src="/assets/logo.png" className="w-32" />
            <p className="mt-4 max-w-xs text-sm text-white/60">Engineering the next generation of neural architectures. We bridge the gap between human intuition and machine precision to build an autonomous future.</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
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
        <div className="flex text-center justify-center items-center border-t border-white/10 py-5 text-xs text-white/50">
          <div>© {new Date().getFullYear()} ZerofAI All rights reserved.</div>
         
        </div>
      </div>
    </footer>
  );
}
