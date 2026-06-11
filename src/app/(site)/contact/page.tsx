import type { Metadata } from "next";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import { MdAlternateEmail } from "react-icons/md";

import { JsonLdScript } from "@/components/JsonLdScript";
import { NavigationBar } from "@/components/Navigation";
import { toNextMetadata } from "@/lib/page-seo";
import { buildMapEmbedUrl, getContactPageContent } from "@/lib/site-content";

import { ContactForm } from "./ContactForm";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContactPageContent();
  return toNextMetadata(content.meta);
}

const iconBox = "h-5 w-5 shrink-0 text-primary";

export default async function ContactPage() {
  const content = await getContactPageContent();
  const mapEmbedUrl = buildMapEmbedUrl(content.mapAddress);

  return (
    <>
      <JsonLdScript schemaJson={content.meta.schemaJson} />
      <main>
        <NavigationBar />

        <section className="relative  overflow-hidden md:min-h-[320px] lg:min-h-[360px]">
          <Image
            src={content.hero.imageUrl}
            alt={content.hero.title}
            fill
            priority
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black to-transparent"
            aria-hidden
          />
          <div className="relative mx-auto flex h-full min-h-[280px] container items-center px-6 py-12 md:min-h-[320px] lg:min-h-[360px] lg:px-10 lg:py-16">
            <div className="max-w-xl">
              {content.hero.eyebrow ? (
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                  {content.hero.eyebrow}
                </p>
              ) : null}
              <h1 className="mt-3 text-[2rem] font-normal leading-[1.15] tracking-[-0.02em] text-white md:text-[2.5rem] lg:text-[2.75rem]">
                {content.hero.title}
              </h1>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl py-10 sm:px-4 sm:py-14 md:py-16">
          <div className="mx-auto w-full max-w-5xl overflow-hidden border-y border-neutral-200/90 bg-white/90 backdrop-blur-sm dark:border-white/8    sm:border ">
            <div className="grid lg:grid-cols-[1fr_0.85fr]">
              <div className="border-b border-neutral-200 bg-secondary/50 dark:bg-secondary/10 p-5 sm:p-7 md:p-8 lg:border-b-0 lg:border-r lg:border-neutral-200  dark:border-white/8 dark:lg:border-white/8">
                <ContactForm
                  submitLabel={content.formSubmitLabel}
                  successMessage={content.formSuccessMessage}
                />
              </div>

              <div className="bg-secondary dark:bg-secondary/40 p-5 sm:p-7 md:p-8">
                <ul className="mt-8 space-y-6">
                  <li className="flex gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-neutral-200 bg-white dark:border-white/10 dark:bg-[#111]">
                      <CiLocationOn className={iconBox} aria-hidden />
                    </div>
                    <div>
                      <p className="!text-sm !font-semibold !leading-snug !text-neutral-900 dark:!text-white">
                        Address
                      </p>
                      <p className="!mt-1 !text-xs !leading-relaxed !text-neutral-600 dark:!text-[#94A3B8]">
                        {content.address}
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-neutral-200 bg-white dark:border-white/10 dark:bg-[#111]">
                      <MdAlternateEmail className={iconBox} aria-hidden />
                    </div>
                    <div>
                      <p className="!text-sm !font-semibold !leading-snug !text-neutral-900 dark:!text-white">
                        Email
                      </p>
                      <a
                        href={`mailto:${content.email}`}
                        className="!mt-1 !block !text-xs !font-medium !text-neutral-700 hover:!text-primary dark:!text-[#94A3B8] dark:hover:!text-primary"
                      >
                        {content.email}
                      </a>
                    </div>
                  </li>
                </ul>

                <hr className="my-8 border-neutral-200 dark:border-white/10" />

                <div className="mt-8 overflow-hidden rounded-xl border border-neutral-200 dark:border-white/10">
                  <iframe
                    title="ZeroFAI office location"
                    src={mapEmbedUrl}
                    className="h-52 w-full sm:h-56"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
