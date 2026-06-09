import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main>
      {/* Hero (match screenshot) */}
      <section className="relative overflow-hidden bg-white p-20 dark:bg-black">
        {/* ZeroFAI ambient glow inspired by the reference hero */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,211,255,0.2)_0%,rgba(0,164,190,0.12)_48%,rgba(245,250,252,0.96)_90%)] dark:bg-[radial-gradient(circle_at_center,rgba(0,211,255,0.46)_0%,rgba(0,164,190,0.28)_46%,rgba(0,0,0,0.88)_88%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.38)_0%,rgba(255,255,255,0)_38%,rgba(255,255,255,0.42)_100%)] dark:bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0)_38%,rgba(0,0,0,0.72)_100%)]" />
        
        <div className="container relative flex flex-col items-center justify-center text-center py-30">
          <h1 className="text-primary!">
            Privacy Policy.
            <br />
           
          </h1>

          <p className="mt-7 max-w-[760px] text-xs leading-6 text-foreground/65 dark:text-white/65 sm:mt-8 sm:text-sm sm:leading-7">
          Learn how we collect, use, and protect your personal information.
          </p>

          
        </div>
      </section>

      {/* Content */}
      <section id="privacy-policy" className=" dark:bg-black container p-20">
        <div className="p-5 dark:bg-black">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">
            Privacy Policy
          </p>
          <h2 className="mt-3 text-foreground">Team Computers Private Limited</h2>

          <div className="mt-8 space-y-6">
            <p className="text-foreground/75 dark:text-white/70">
              Team Computers Private Limited (TCPL) is sensitive to privacy
              issues on the Internet. We believe it is important you know how we
              treat the information we receive from you, on the Internet.
            </p>

            <p className="text-foreground/75 dark:text-white/70">
              In general, you can visit TCPL on the World Wide Web without
              telling us who you are or revealing any information about
              yourself. Our Web servers collect the domain names, not the
              e-mail addresses, of visitors. This information is aggregated to
              measure the number of visits, average time spent on the site,
              pages viewed, etc. TCPL uses this information to measure the use
              of our site and to improve the content of its site. Your accessing
              our site signifies your unconditional consent to allow the
              collection of your domain names.
            </p>

            <p className="text-foreground/75 dark:text-white/70">
              There are times, however, when we may need information from you,
              such as your name and address. When information is needed, we will
              try (but are not obligated) to let you know at the time of
              collection, how we will use the personal information. Usually,
              the personal information we collect is used only by us to respond
              to your inquiry, process an order or allow you to access specific
              account information. Occasionally, we may make the e-mail
              addresses, of those who provide information, available to other
              reputable organizations whose products or services we think you
              may find interesting. In these cases, you will be offered an
              opportunity to limit the access of your information. In case we
              do not receive any response from you to limit the access of your
              information, it shall be deemed that you consent to such
              distribution of your information as mentioned above.
            </p>

            <p className="text-foreground/75 dark:text-white/70">
              If you register with one of TCPL business units online, they may
              use this information to provide you with custom information about
              TCPL offering in support of your business needs. A technology
              called cookies may be used to provide you with tailored
              information. A cookie is a tiny element of data that a web site
              can send to your browser, which may then be stored on your hard
              drive so we can recognize you when you return. You may set your
              browser to notify you when you receive a cookie. Registering with
              any TCPL business unit online signifies your unconditional consent
              to receive such cookies.
            </p>

            <p className="text-foreground/75 dark:text-white/70">
              At times we conduct online surveys to better understand the needs
              and profiles of our visitors. When we conduct a survey, we will
              try (but are not obligated) to let you know how we will use the
              information at the time we collect information from you on the
              Internet.
            </p>

            <p className="text-foreground/75 dark:text-white/70">
              You recognize and understand that there is no compulsion on you
              to provide us with your personal information and any and all
              personal information provided by you to us is with your full
              consent, own decision and desire to provide such personal
              information. You also understand that we are under no obligation
              to verify the source from which the personal information about
              you is provided to us, and they are deemed to be provided by you,
              unless you demonstrate to us within a period of fifteen days from
              the date of providing of such information to us, to our
              satisfaction, that the information was provided to us without
              your free consent.
            </p>

            <p className="text-foreground/75 dark:text-white/70">
              TCPL Web site may contain links to other sites such as TCPL
              partners and affiliates. While we try to link only to sites that
              share our high standards and respect for privacy, we are not
              responsible for the content or the privacy practices employed by
              other sites.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
