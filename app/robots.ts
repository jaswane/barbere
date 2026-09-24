import type { MetadataRoute } from "next";

/**
 * Open Icecat Fair Use Policy (02.05.2026) ber brukere om å utestenge crawlere som samler
 * innhold til blant annet AI-trening. Listen under er bare de tokenene operatørene selv
 * dokumenterer som styring av treningsbruk, og som ikke påvirker vanlig søk:
 * GPTBot (OpenAI), ClaudeBot (Anthropic), Google-Extended (Gemini-trening, ikke Google Søk),
 * Applebot-Extended (Apples modeller, ikke Siri/Spotlight), CCBot (Common Crawl) og
 * meta-externalagent (Meta). Se docs/PRD.md, punkt 6 og 7.
 */
const aiTrainingCrawlers = ["GPTBot", "ClaudeBot", "Google-Extended", "Applebot-Extended", "CCBot", "meta-externalagent"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiTrainingCrawlers, disallow: "/" },
    ],
    sitemap: "https://barbere.no/sitemap.xml",
  };
}
