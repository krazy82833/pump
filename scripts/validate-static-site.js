const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const siteUrl = "https://www.jsgpump.com";

const existsForPath = (href) => {
  const clean = href.split("#")[0].split("?")[0];
  if (!clean || clean === "/") return fs.existsSync(path.join(root, "index.html"));
  const normalized = clean.replace(/^\/+/, "");
  const direct = path.join(root, normalized);
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return true;
  return fs.existsSync(path.join(root, normalized, "index.html"));
};

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const htmlFiles = sitemapUrls.map((href) => {
  const url = new URL(href);
  if (url.origin !== siteUrl) throw new Error(`Unexpected sitemap origin: ${url.origin}`);
  const pathname = url.pathname === "/" ? "index.html" : path.join(url.pathname.replace(/^\/|\/$/g, ""), "index.html");
  return path.join(root, pathname);
});

const errors = [];
const seenSitemapUrls = new Set();

for (const href of sitemapUrls) {
  if (seenSitemapUrls.has(href)) errors.push(`sitemap.xml: duplicate URL ${href}`);
  seenSitemapUrls.add(href);
  if (href.includes("/thank-you/")) errors.push(`sitemap.xml: thank-you page must stay noindex and out of sitemap`);
}

if (!/Sitemap:\s*https:\/\/www\.jsgpump\.com\/sitemap\.xml/i.test(fs.readFileSync(path.join(root, "robots.txt"), "utf8"))) {
  errors.push("robots.txt: missing sitemap declaration");
}

for (const [index, file] of htmlFiles.entries()) {
  const rel = path.relative(root, file);
  const sitemapUrl = sitemapUrls[index];
  const expectedPath = new URL(sitemapUrl).pathname;

  if (!fs.existsSync(file)) {
    errors.push(`${rel}: sitemap target file does not exist`);
    continue;
  }

  const html = fs.readFileSync(file, "utf8");

  if (!/<title>[^<]{12,}<\/title>/i.test(html)) errors.push(`${rel}: missing or weak title`);
  if (!/<meta\s+name="description"\s+content="[^"]{50,}"/i.test(html)) errors.push(`${rel}: missing or weak meta description`);
  if (!/<h1\b[^>]*>[\s\S]*?<\/h1>/i.test(html)) errors.push(`${rel}: missing h1`);

  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  if (!canonical) {
    errors.push(`${rel}: missing canonical link`);
  } else {
    const canonicalUrl = new URL(canonical[1]);
    if (canonicalUrl.origin !== siteUrl) errors.push(`${rel}: canonical origin must be ${siteUrl}`);
    if (canonicalUrl.pathname !== expectedPath) errors.push(`${rel}: canonical path ${canonicalUrl.pathname} does not match sitemap ${expectedPath}`);
  }

  const jsonLdBlocks = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  if (!jsonLdBlocks.length) {
    errors.push(`${rel}: missing JSON-LD`);
  }

  for (const [, block] of jsonLdBlocks) {
    try {
      JSON.parse(block);
    } catch (error) {
      errors.push(`${rel}: invalid JSON-LD (${error.message})`);
    }
  }

  if (rel !== "index.html" && !/<nav\s+class="breadcrumbs"\s+aria-label="Breadcrumb">/i.test(html)) {
    errors.push(`${rel}: missing visible breadcrumbs`);
  }

  const links = [...html.matchAll(/\s(?:href|src)="([^"]+)"/gi)].map((match) => match[1]);
  for (const href of links) {
    if (
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("#") ||
      href.startsWith("/api/")
    ) {
      continue;
    }
    if (href.startsWith("/")) {
      if (!existsForPath(href)) errors.push(`${rel}: broken absolute link ${href}`);
      continue;
    }

    const withoutHash = href.split("#")[0].split("?")[0];
    if (!withoutHash) continue;
    const target = path.resolve(path.dirname(file), withoutHash);
    if (!fs.existsSync(target)) errors.push(`${rel}: broken relative link ${href}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML files.`);
