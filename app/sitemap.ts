import type { MetadataRoute } from "next";
import { legal, nav, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [...nav, ...legal].map(({ href }) => ({
    url: new URL(href, site.url).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority: href === "/" ? 1 : legal.some((l) => l.href === href) ? 0.3 : 0.8,
  }));
}
