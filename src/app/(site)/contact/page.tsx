import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
import { MdAlternateEmail } from "react-icons/md";
import { IoShieldCheckmark, IoFlash } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";
import { TbShare3 } from "react-icons/tb";
import { NavigationBar } from "@/components/Navigation";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact   Request Demo | ZeroFAI",
  description:
    "Connect with ZeroFAI to automate compliance, monitor endpoints, and strengthen enterprise security operations in real time.",
};

const iconBox = "h-5 w-5 shrink-0 text-primary";
const cardIcon = "h-7 w-7 shrink-0 text-primary";

export default function ContactPage() {
  return (
    <main>
      <NavigationBar />

     

      <section className="relative  overflow-hidden md:min-h-[320px] lg:min-h-[360px]">
        <Image
          src="https://plus.unsplash.com/premium_photo-1664474834472-6c7d1e3198e2?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29ya2luZyUyMGVtcGxveWVlc3xlbnwwfHwwfHx8MA%3D%3D"
          alt="Team collaborating in a modern office"
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
              Get in Touch
            </p>
            <h1 className="mt-3 text-[2rem] font-normal leading-[1.15] tracking-[-0.02em] text-white md:text-[2.5rem] lg:text-[2.75rem]">
              Contact US
            </h1>
          </div>
        </div>
      </section>

      {/* Main card */}
      <section className="mx-auto w-full max-w-7xl py-10 sm:px-4 sm:py-14 md:py-16">
        <div className="mx-auto w-full max-w-5xl overflow-hidden border-y border-neutral-200/90 bg-white/90 backdrop-blur-sm dark:border-white/8    sm:border ">
          <div className="grid lg:grid-cols-[1fr_0.85fr]">
            {/* Form column */}
            <div className="border-b border-neutral-200 bg-secondary/50 dark:bg-secondary/10 p-5 sm:p-7 md:p-8 lg:border-b-0 lg:border-r lg:border-neutral-200  dark:border-white/8 dark:lg:border-white/8">
              <ContactForm />
            </div>

            {/* Contact column */}
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
                      B, 15, Block B, Noida Sector 3, Noida, Uttar Pradesh 201301
                     
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-neutral-200 bg-white dark:border-white/10 dark:bg-[#111]">
                    <MdAlternateEmail className={iconBox} aria-hidden />
                  </div>
                  <div>
                    <p className="!text-sm !font-semibold !leading-snug !text-neutral-900 dark:!text-white">Email</p>
                    <a
                      href="mailto:security@zerofai.tech"
                      className="!mt-1 !block !text-xs !font-medium !text-neutral-700 hover:!text-primary dark:!text-[#94A3B8] dark:hover:!text-primary"
                    >
                      cs@zerofai.ai
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  
                  
                </li>
              </ul>

              <hr className="my-8 border-neutral-200 dark:border-white/10" />

              <div>
                <p className="!mb-3 !text-[11px] !font-semibold !uppercase !tracking-wider !text-neutral-500 dark:!text-white">
                  Business hours
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="font-medium text-sm! text-neutral-700! dark:text-white/40!">Mon - Fri</span>
                    <span className="text-neutral-600 text-sm! dark:text-white/40!">09:00 - 18:00 PST</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="font-medium text-sm! text-neutral-700! dark:text-white/40!">Sat - Sun</span>
                    <span className="text-neutral-600 text-sm! dark:text-white/40!">Critical Support Only</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="container mx-auto max-w-5xl pb-10 sm:pb-14 md:pb-20">
        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 md:grid-cols-3">
          <article className=" border border-neutral-200/90 bg-white/90 p-5 text-center shadow-sm dark:border-white/8 dark:bg-[#111111]/90 dark:shadow-none sm:p-6 md:p-8">
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center">
              <IoShieldCheckmark className={cardIcon} aria-hidden />
            </div>
            <h2 className="!text-base !font-bold  !text-neutral-950 md:!text-lg dark:!text-white">ISO 27001 Ready</h2>
            <p className="text-sm! leading-5!">
              Built for enterprise compliance standards from the ground up.
            </p>
          </article>
          <article className=" border border-neutral-200/90 bg-white/90 p-5 text-center shadow-sm dark:border-white/8 dark:bg-[#111111]/90 dark:shadow-none sm:p-6 md:p-8">
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center">
              <TbShare3 className={cardIcon} aria-hidden />
            </div>
            <h2 className="!text-base !font-bold !text-neutral-950 md:!text-lg dark:!text-white">Native Integrations</h2>
            <p className="text-sm! leading-5!">
              Seamlessly connects with AWS, GCP, Azure, and Kubernetes.
            </p>
          </article>
          <article className="border border-neutral-200/90 bg-white/90 p-5 text-center shadow-sm dark:border-white/8 dark:bg-[#111111]/90 dark:shadow-none sm:p-6 md:p-8 sm:col-span-2 md:col-span-1">
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center">
              <BsGraphUpArrow className={cardIcon} aria-hidden />
            </div>
            <h2 className="!text-base !font-bold !text-neutral-950 md:!text-lg dark:!text-white">Real-Time DRI</h2>
            <p className="text-sm! leading-5!">
              Immediate detection and remediation of compliance drift. 
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
