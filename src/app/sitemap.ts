import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { themes } from "@/lib/themes";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.domain}`;
  const pages = ["", "/events", "/experiences", "/membership", "/private", "/boutique", "/the-house", "/faq", "/terms", "/privacy"];
  return [...pages.map((p) => ({ url: `${base}${p}` })), ...themes.map((t) => ({ url: `${base}/events/${t.slug}` }))];
}
