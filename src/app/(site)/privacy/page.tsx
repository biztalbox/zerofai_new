import type { Metadata } from "next";
import { NavigationBar } from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Privacy Policy | ZeroFAI",
  description:
    "Learn how ZeroFAI collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="bridge-page min-h-screen bg-white text-[#3d3d3d]">
      <NavigationBar />

      <section className="bg-[#1a2e24] px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto container">
          <h1 className="text-[2rem] font-normal leading-[1.15] tracking-[-0.02em] text-white md:text-[2.5rem] lg:text-[2.75rem]">
            Privacy Statement
          </h1>
          
        </div>
      </section>

      <section id="privacy-policy" className="container px-6 py-16 lg:px-10 lg:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#767676]">
          Privacy Policy
        </p>
        <h2 className="mt-3 text-[1.75rem] font-normal tracking-[-0.02em] text-[#3d3d3d] lg:text-[2rem]">
          Team Computers Private Limited
        </h2>

        <div className="mt-8  space-y-6">
          <p className="text-[15px] leading-[1.65] text-[#3d3d3d]">
            Team Computers Private Limited (TCPL) is sensitive to privacy issues
            on the Internet. We believe it is important you know how we treat the
            information we receive from you, on the Internet.
          </p>

          <p className="text-[15px] leading-[1.65] text-[#3d3d3d]">
            In general, you can visit TCPL on the World Wide Web without telling
            us who you are or revealing any information about yourself. Our Web
            servers collect the domain names, not the e-mail addresses, of
            visitors. This information is aggregated to measure the number of
            visits, average time spent on the site, pages viewed, etc. TCPL uses
            this information to measure the use of our site and to improve the
            content of its site. Your accessing our site signifies your
            unconditional consent to allow the collection of your domain names.
          </p>

          <p className="text-[15px] leading-[1.65] text-[#3d3d3d]">
            There are times, however, when we may need information from you,
            such as your name and address. When information is needed, we will
            try (but are not obligated) to let you know at the time of
            collection, how we will use the personal information. Usually, the
            personal information we collect is used only by us to respond to your
            inquiry, process an order or allow you to access specific account
            information. Occasionally, we may make the e-mail addresses, of
            those who provide information, available to other reputable
            organizations whose products or services we think you may find
            interesting. In these cases, you will be offered an opportunity to
            limit the access of your information. In case we do not receive any
            response from you to limit the access of your information, it shall
            be deemed that you consent to such distribution of your information
            as mentioned above.
          </p>

          <p className="text-[15px] leading-[1.65] text-[#3d3d3d]">
            If you register with one of TCPL business units online, they may use
            this information to provide you with custom information about TCPL
            offering in support of your business needs. A technology called
            cookies may be used to provide you with tailored information. A
            cookie is a tiny element of data that a web site can send to your
            browser, which may then be stored on your hard drive so we can
            recognize you when you return. You may set your browser to notify you
            when you receive a cookie. Registering with any TCPL business unit
            online signifies your unconditional consent to receive such cookies.
          </p>

          <p className="text-[15px] leading-[1.65] text-[#3d3d3d]">
            At times we conduct online surveys to better understand the needs
            and profiles of our visitors. When we conduct a survey, we will try
            (but are not obligated) to let you know how we will use the
            information at the time we collect information from you on the
            Internet.
          </p>

          <p className="text-[15px] leading-[1.65] text-[#3d3d3d]">
            You recognize and understand that there is no compulsion on you to
            provide us with your personal information and any and all personal
            information provided by you to us is with your full consent, own
            decision and desire to provide such personal information. You also
            understand that we are under no obligation to verify the source from
            which the personal information about you is provided to us, and they
            are deemed to be provided by you, unless you demonstrate to us within
            a period of fifteen days from the date of providing of such
            information to us, to our satisfaction, that the information was
            provided to us without your free consent.
          </p>

          <p className="text-[15px] leading-[1.65] text-[#3d3d3d]">
            TCPL Web site may contain links to other sites such as TCPL partners
            and affiliates. While we try to link only to sites that share our
            high standards and respect for privacy, we are not responsible for
            the content or the privacy practices employed by other sites.
          </p>
        </div>
      </section>
    </main>
  );
}
