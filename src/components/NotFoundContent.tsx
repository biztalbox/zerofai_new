import Link from "next/link";

type NotFoundContentProps = {
  hardNavigation?: boolean;
};

export function NotFoundContent({ hardNavigation = false }: NotFoundContentProps) {
  return (
    <main className="bridge-page min-h-screen bg-white text-[#3d3d3d]">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16 lg:px-10">
        <div
          className="pointer-events-none absolute inset-0 bg-[#f4f4f1]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 top-1/3 h-105 w-105 rounded-full bg-primary/8 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-24 bottom-1/4 h-80 w-[320px] rounded-full bg-[#14797a]/12 blur-3xl"
          aria-hidden
        />

        <div className="relative w-full max-w-xl text-center">
          <p
            className="bridge-watermark pointer-events-none select-none"
            aria-hidden
          >
            404
          </p>

          <div className="relative -mt-10 lg:-mt-14">
            <p className="fade-up text-xs font-semibold uppercase tracking-[0.18em] text-[#767676]">
              Page not found
            </p>

            <h1 className="fade-up-2 mt-3 text-[clamp(4.5rem,16vw,7.5rem)] font-light leading-none tracking-[-0.04em]">
              <span className="bridge-split-text">404</span>
            </h1>

            <p className="fade-up-3 mx-auto mt-6 max-w-md text-[15px] leading-[1.65] text-[#666]">
              The page you&apos;re looking for doesn&apos;t exist, may have been
              moved, or the link might be incorrect.
            </p>

            <div className="fade-up-4 mt-9">
              {hardNavigation ? (
                <a
                  href="/"
                  className="inline-flex items-center gap-1.5 rounded bg-primary px-7 py-3 text-[14px] font-medium text-white transition hover:bg-[#005a63]"
                >
                  Back to Homepage
                  <span aria-hidden>›</span>
                </a>
              ) : (
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 rounded bg-primary px-7 py-3 text-[14px] font-medium text-white transition hover:bg-[#005a63]"
                >
                  Back to Homepage
                  <span aria-hidden>›</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
