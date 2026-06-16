import type { Metadata } from "next";
import Image from "next/image";

import { JsonLdScript } from "@/components/JsonLdScript";
import { NavigationBar } from "@/components/Navigation";
import { toNextMetadata } from "@/lib/page-seo";
import { getLeadershipPageContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLeadershipPageContent();
  return toNextMetadata(content.meta);
}

export default async function LeadershipPage() {
  const content = await getLeadershipPageContent();

  return (
    <>
      <JsonLdScript schemaJson={content.meta.schemaJson} />
      <main>
        <NavigationBar />

        <section className="relative overflow-hidden">
          <Image
            src={content.hero.imageUrl}
            alt={content.hero.title}
            fill
            className=""
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
            aria-hidden
          />
          <div className="relative mx-auto flex h-full container items-center px-6 py-12 lg:py-20">
            <div className="max-w-xl">
              <h1 className="mt-3 text-[2rem] font-normal leading-[1.15] tracking-[-0.02em] text-white md:text-[2.5rem] lg:text-[2.75rem]">
                {content.hero.title}
              </h1>
              {content.hero.subtitle ? (
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white md:text-base">
                  {content.hero.subtitle}
                </p>
              ) : null}
            </div>
          </div>
        </section>

        <section id="connect" className="border-t border-[#e8e8e8] bg-white py-16 lg:py-24 relative">
          <div className="mx-auto container relative z-10 w-full px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10">
            <div className="flex flex-col gap-10 w-full">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
                {content.members.map((member) => (
                  <div key={member.name} className="flex flex-col gap-4">
                    <div className="aspect-[3/4] w-full overflow-hidden bg-white">
                      <Image
                        src={member.imageUrl}
                        width={400}
                        height={600}
                        alt={member.name}
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3>{member.name}</h3>
                      <p className="text-xs">{member.designation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
