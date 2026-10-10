import type { MetadataRoute } from "next";
import { NOINDEX_PATHS } from "@/lib/seo";
import { legal, nav, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Ohne lastModified: ein bei jedem Build neues Datum wäre falsch, und
  // Google ignoriert die Angabe dann für die ganze Sitemap
  return [...nav, ...legal]
    .filter(({ href }) => !NOINDEX_PATHS.has(href))
    .map(({ href }) => ({
      url: new URL(href, site.url).toString(),
      changeFrequency: "monthly",
      priority:
        href === "/" ? 1 : legal.some((l) => l.href === href) ? 0.3 : 0.8,
    }));
}
