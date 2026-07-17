const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const siteUrl = "https://www.jsgpump.com";
const mainScriptVersion = "/assets/js/main.js?v=20260717-bilingual-site-4";
const styleVersion = "/assets/css/styles.css?v=20260717-control-heights-2";

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
const sitemapPaths = new Set(sitemapUrls.map((href) => new URL(href).pathname));

const bilingualPathsFor = (pathname) => {
  const isChinese = pathname === "/zh/" || pathname.startsWith("/zh/");
  const english = isChinese ? pathname.replace(/^\/zh(?=\/)/, "") : pathname;
  const chinese = english === "/" ? "/zh/" : `/zh${english}`;
  return { english, chinese };
};

for (const href of sitemapUrls) {
  if (seenSitemapUrls.has(href)) errors.push(`sitemap.xml: duplicate URL ${href}`);
  seenSitemapUrls.add(href);
  if (href.includes("/thank-you/")) errors.push(`sitemap.xml: thank-you page must stay noindex and out of sitemap`);
}

if (!/Sitemap:\s*https:\/\/www\.jsgpump\.com\/sitemap\.xml/i.test(fs.readFileSync(path.join(root, "robots.txt"), "utf8"))) {
  errors.push("robots.txt: missing sitemap declaration");
}

const publicHtmlFiles = [...new Set([
  ...htmlFiles,
  path.join(root, "404.html"),
  path.join(root, "zh", "404.html"),
  path.join(root, "thank-you", "index.html"),
  path.join(root, "zh", "thank-you", "index.html"),
])];

for (const file of publicHtmlFiles) {
  const rel = path.relative(root, file);
  const html = fs.readFileSync(file, "utf8");
  const isChineseFile = rel.startsWith(`zh${path.sep}`);
  const partnerRel = isChineseFile ? rel.slice(3) : path.join("zh", rel);
  const expectedLang = isChineseFile ? "zh-CN" : "en";
  const documentLang = html.match(/<html\b[^>]*\blang="([^"]+)"/i)?.[1];

  if (!fs.existsSync(path.join(root, partnerRel))) errors.push(`${rel}: missing bilingual partner ${partnerRel}`);
  if (!html.includes("data-language-select")) errors.push(`${rel}: missing language selector`);
  if (!html.includes(mainScriptVersion)) errors.push(`${rel}: missing current bilingual script ${mainScriptVersion}`);
  if (!html.includes(styleVersion)) errors.push(`${rel}: missing current shared stylesheet ${styleVersion}`);
  if (documentLang !== expectedLang) errors.push(`${rel}: html lang must be ${expectedLang}, found ${documentLang || "missing"}`);

  if (isChineseFile) {
    const forbiddenChineseShellText = [
      ">Skip to content<",
      'aria-label="Primary navigation"',
      'aria-label="Open navigation"',
      'aria-label="Select language"',
      ">Request a Quote<",
      ">BD AIR<",
      ">BD LIQUID<",
      ">PISTON<",
      ">SPECIAL<",
      ">ACCESS<",
    ];
    forbiddenChineseShellText.forEach((token) => {
      if (html.includes(token)) errors.push(`${rel}: untranslated Chinese-page shell token ${token}`);
    });
  }
}

const productOverviewCtas = [
  {
    rel: path.join("products", "index.html"),
    primary: '<a class="btn btn-primary" href="/product-materials/">View Series Specifications</a>',
    secondary: '<a class="btn btn-secondary" href="/#rfq">Request Engineering Quote</a>',
  },
  {
    rel: path.join("zh", "products", "index.html"),
    primary: '<a class="btn btn-primary" href="/zh/product-materials/">查看系列参数</a>',
    secondary: '<a class="btn btn-secondary" href="/zh/#rfq">提交工程询价</a>',
  },
];

for (const { rel, primary, secondary } of productOverviewCtas) {
  const html = fs.readFileSync(path.join(root, rel), "utf8");
  if (!html.includes(primary)) errors.push(`${rel}: product overview primary CTA must open the series specifications page`);
  if (!html.includes(secondary)) errors.push(`${rel}: product overview secondary CTA must open the matching RFQ section`);
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
  const { english: englishPath, chinese: chinesePath } = bilingualPathsFor(expectedPath);

  if (!sitemapPaths.has(englishPath)) errors.push(`${rel}: missing English sitemap partner ${englishPath}`);
  if (!sitemapPaths.has(chinesePath)) errors.push(`${rel}: missing Chinese sitemap partner ${chinesePath}`);

  const documentLang = html.match(/<html\b[^>]*\blang="([^"]+)"/i)?.[1];
  const expectedLang = expectedPath === "/zh/" || expectedPath.startsWith("/zh/") ? "zh-CN" : "en";
  if (documentLang !== expectedLang) errors.push(`${rel}: html lang must be ${expectedLang}, found ${documentLang || "missing"}`);

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

  const expectedAlternates = {
    en: englishPath,
    "zh-Hans": chinesePath,
    "x-default": englishPath,
  };
  for (const [hreflang, alternatePath] of Object.entries(expectedAlternates)) {
    const alternate = html.match(new RegExp(`<link\\s+rel="alternate"\\s+hreflang="${hreflang}"\\s+href="([^"]+)"`, "i"));
    if (!alternate) {
      errors.push(`${rel}: missing ${hreflang} alternate link`);
      continue;
    }
    const alternateUrl = new URL(alternate[1]);
    if (alternateUrl.origin !== siteUrl || alternateUrl.pathname !== alternatePath) {
      errors.push(`${rel}: ${hreflang} alternate must be ${siteUrl}${alternatePath}`);
    }
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

  const isHomePage = rel === "index.html" || rel === path.join("zh", "index.html");
  if (!isHomePage && !/<nav\s+class="breadcrumbs"\s+aria-label="[^"]+">/i.test(html)) {
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

console.log(`Validated ${htmlFiles.length} sitemap HTML files and ${publicHtmlFiles.length} bilingual public HTML files.`);
