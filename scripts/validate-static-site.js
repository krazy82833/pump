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
const htmlFiles = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
  const url = new URL(match[1]);
  if (url.origin !== siteUrl) throw new Error(`Unexpected sitemap origin: ${url.origin}`);
  const pathname = url.pathname === "/" ? "index.html" : path.join(url.pathname.replace(/^\/|\/$/g, ""), "index.html");
  return path.join(root, pathname);
});

const errors = [];

for (const file of htmlFiles) {
  const rel = path.relative(root, file);
  const html = fs.readFileSync(file, "utf8");

  if (!/<title>[^<]{12,}<\/title>/i.test(html)) errors.push(`${rel}: missing or weak title`);
  if (!/<meta\s+name="description"\s+content="[^"]{50,}"/i.test(html)) errors.push(`${rel}: missing or weak meta description`);
  if (!/<h1\b[^>]*>[\s\S]*?<\/h1>/i.test(html)) errors.push(`${rel}: missing h1`);

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
