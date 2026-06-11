import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });

const { getPayload } = await import("payload");
const config = (await import("../payload.config.ts")).default;

const payload = await getPayload({ config });

try {
  const current = await payload.findGlobal({ slug: "homepage", depth: 0 });
  console.log("Current homepage id:", current.id);

  const updated = await payload.updateGlobal({
    slug: "homepage",
    data: {
      hero: {
        title: "Test Title Update",
        ctaLabel: "Request a Demo",
        ctaLink: "/contact",
      },
      whatIs: {
        title: "What is ZerofAI?",
        paragraphs: [{ text: "Test paragraph" }],
      },
      pillars: {
        title: "Journey to Autonomous IT Operations",
        items: [],
      },
      cta: {
        title: "Spend 30 Minutes Exploring the Future of IT Operations",
      },
    },
    depth: 0,
  });

  console.log("Save OK, hero title:", updated.hero?.title);
} catch (error) {
  console.error("Save failed:");
  console.error(error);
  if (error && typeof error === "object" && "data" in error) {
    console.error("data:", error.data);
  }
} finally {
  process.exit(0);
}
