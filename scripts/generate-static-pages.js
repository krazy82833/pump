const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const siteUrl = "https://www.jsgpump.com";

const nav = [
  ["Home", "/"],
  ["Products", "/products/"],
  ["Applications", "/applications/"],
  ["Blog", "/blog/"],
  ["Download", "/download/"],
  ["FAQ", "/faq/"],
  ["About", "/about/"],
  ["Contact", "/contact/"]
];

const rfqPath = "/#rfq";

const productPages = [
  {
    slug: "micro-diaphragm-air-pump",
    title: "Micro Diaphragm Air Pump Manufacturer",
    description: "JSG DC Pump manufactures micro diaphragm air pumps for compact OEM air pressure, vacuum suction, medical, analytical, beauty, appliance, and automation equipment.",
    h1: "Micro Diaphragm Air Pumps",
    intro: "Compact diaphragm air pumps for clean oil-free airflow, pressure, and vacuum in OEM devices. Use this page for early screening before sending an engineering RFQ.",
    range: [
      ["Typical series", "BD-01, BD-02, BD-03, BD-04"],
      ["Flow range", "0.3-22 L/min"],
      ["Pressure range", "0.5-3.5 bar"],
      ["Vacuum range", "-30 to -85 kPa"],
      ["Voltage", "3V, 6V, 12V, 24V options"],
      ["Motor options", "Brush, brushless, coreless options"]
    ],
    applications: ["Medical suction modules", "Gas sampling", "Analytical instruments", "Beauty equipment", "Household appliances", "Compact pneumatic systems"],
    selection: ["Confirm useful flow after tubing, filter, and valve losses.", "Test noise in the final enclosure, not only on an open bench.", "Match motor type to duty cycle, life target, and control method."]
  },
  {
    slug: "miniature-vacuum-pump",
    title: "Miniature Vacuum Pump for OEM Suction and Sampling",
    description: "Miniature vacuum pumps for suction, gas sampling, vacuum lifters, medical instruments, aesthetic devices, and compact OEM equipment.",
    h1: "Miniature Vacuum Pumps",
    intro: "Miniature vacuum pumps provide stable negative pressure for devices where suction response, noise, lifetime, and compact installation are critical.",
    range: [
      ["Pump types", "Diaphragm, piston, selected compact vacuum platforms"],
      ["Vacuum range", "-30 to -85 kPa"],
      ["Flow range", "0.3-45 L/min depending on platform"],
      ["Voltage", "3V to 24V common options"],
      ["Media", "Clean air and gas paths"],
      ["Integration", "Pump-only or pump plus tubing, silencer, and filter module"]
    ],
    applications: ["Vacuum sampling", "IVD and diagnostics", "Dental suction", "Vacuum lifters", "Aesthetic suction", "Environmental monitoring"],
    selection: ["Define target vacuum at the device inlet, not only at the pump port.", "Check startup under real load and filter resistance.", "Use shock absorption and silencers when the final device is noise sensitive."]
  },
  {
    slug: "diaphragm-liquid-pump",
    title: "Diaphragm Liquid Pump for Dispensing, Ink, and Water Transfer",
    description: "Self-priming diaphragm liquid pumps for dispensing, ink delivery, water purifier modules, transfer, filling, cleaning, and laboratory systems.",
    h1: "Diaphragm Liquid Pumps",
    intro: "JSG diaphragm liquid pumps are used where small equipment needs clean transfer, self-priming ability, controlled flow, and material compatibility.",
    range: [
      ["Typical series", "BD-01W, BD-02W, BD-03W, BD-04W, BD-07W"],
      ["Water flow", "100 mL/min-1.5 L/min"],
      ["Pressure", "Selected high-pressure liquid platforms up to 10 bar"],
      ["Diaphragm", "EPDM / FKM options"],
      ["Voltage", "3V, 6V, 12V, 24V options"],
      ["Function", "Self-priming transfer and compact dispensing"]
    ],
    applications: ["Inkjet printers", "Water purifiers", "Beverage dispensing", "Laboratory dosing", "Cleaning systems", "Beauty devices"],
    selection: ["Confirm liquid chemistry, viscosity, and temperature before material selection.", "Measure flow after inlet height, tubing, and filter losses.", "Validate leakage, dry-start behavior, and valve reliability before production."]
  },
  {
    slug: "micro-piston-pump",
    title: "Micro Piston Pump for High Pressure Air and Vacuum",
    description: "Micro piston pumps for high pressure air, strong vacuum, medical, cosmetic, automation, power tool, and compact compressor modules.",
    h1: "Micro Piston Pumps",
    intro: "Piston pump platforms are selected when an OEM design needs higher pressure, stronger vacuum, and robust mechanical output than a small diaphragm pump can provide.",
    range: [
      ["Typical series", "BD-07, BD-79"],
      ["Flow range", "15-45 L/min"],
      ["Pressure range", "4.5-7 bar"],
      ["Vacuum range", "-80 to -85 kPa"],
      ["Power", "24-70W depending on model"],
      ["Voltage", "12V and 24V common options"]
    ],
    applications: ["Medical rehabilitation", "Cosmetic instruments", "Portable power tools", "Robotics", "Automation", "Pressure and suction systems"],
    selection: ["Check heat rise under the actual duty cycle.", "Plan vibration isolation and acoustic treatment early.", "Define continuous pressure separately from peak pressure."]
  },
  {
    slug: "mini-compressor",
    title: "Mini Compressor for Compact OEM Pressure Systems",
    description: "Oil-free mini compressor platforms for rehabilitation equipment, 3D printing, foam cleaning, portable tools, and environmental monitoring.",
    h1: "Mini Compressors",
    intro: "Mini compressor platforms support compact systems that require higher airflow and pressure in a small DC-powered module.",
    range: [
      ["Typical series", "BD-08"],
      ["Flow range", "40-80 L/min"],
      ["Pressure range", "2-7 bar"],
      ["Vacuum", "Selected configurations to -85 kPa"],
      ["Power", "60-150W"],
      ["Voltage", "12V and 24V options"]
    ],
    applications: ["Rehabilitation equipment", "Foam cleaning", "3D printing accessories", "Portable tools", "Environmental instruments", "Compact pressure modules"],
    selection: ["Confirm power supply margin for startup and peak load.", "Test thermal behavior inside the real device enclosure.", "Add relief, filtration, and noise control parts where needed."]
  },
  {
    slug: "gas-sampling-pump",
    title: "Gas Sampling Pump for Analytical and Monitoring Instruments",
    description: "Gas sampling pumps for portable analyzers, environmental monitoring, particle counters, laboratory equipment, and clean gas path systems.",
    h1: "Gas Sampling Pumps",
    intro: "Gas sampling applications need stable flow, clean paths, compact size, and dependable vacuum against filters, sensors, and tubing resistance.",
    range: [
      ["Pump type", "Micro diaphragm and selected vacuum platforms"],
      ["Medium", "Air and gas"],
      ["Vacuum", "-30 to -85 kPa depending on platform"],
      ["Flow", "Low-flow sampling to higher-flow monitoring options"],
      ["Control", "Voltage and PWM options on selected models"],
      ["Accessories", "Filters, tubing, valves, silencers"]
    ],
    applications: ["Gas analyzers", "Particle counters", "Environmental monitoring", "Laboratory sampling", "Portable detectors", "Medical analysis"],
    selection: ["Estimate filter loading over time, not only clean-filter pressure loss.", "Define flow stability requirements at the sensor path.", "Choose materials compatible with the sampled gas and environment."]
  },
  {
    slug: "ink-pump",
    title: "Ink Pump for Printers and Fluid Circulation Systems",
    description: "Compact ink pumps and diaphragm liquid pumps for inkjet printers, coding systems, UV ink, waste ink, and precision fluid circulation.",
    h1: "Ink Pumps",
    intro: "Ink and printing systems need small liquid pumps with stable flow, chemical compatibility, leakage control, and reliable startup after idle periods.",
    range: [
      ["Pump type", "Diaphragm liquid pump"],
      ["Flow", "Low-flow precision transfer to 1.5 L/min class options"],
      ["Materials", "EPDM / FKM options depending on ink"],
      ["Voltage", "6V, 12V, 24V common options"],
      ["Function", "Transfer, circulation, waste ink, and dispensing"],
      ["Integration", "Pump, tube, connector, and valve module options"]
    ],
    applications: ["Inkjet printers", "Coding systems", "UV ink circulation", "Waste ink transfer", "Small filling systems", "OEM fluid modules"],
    selection: ["Confirm ink chemistry before diaphragm and valve selection.", "Test bubbles, dry-start behavior, and long idle recovery.", "Validate tubing size and connector sealing in the real layout."]
  },
  {
    slug: "medical-diaphragm-pump",
    title: "Medical Diaphragm Pump for Diagnostic and Therapy Equipment",
    description: "Medical diaphragm pump options for diagnostic instruments, therapy equipment, suction modules, gas handling, and compact OEM medical devices.",
    h1: "Medical Diaphragm Pumps",
    intro: "Medical and diagnostic equipment typically requires stable output, clean oil-free operation, low noise, reliable lifetime, and repeatable OEM supply.",
    range: [
      ["Pump type", "Diaphragm air, vacuum, and selected liquid platforms"],
      ["Media", "Air, gas, vacuum, and selected liquids"],
      ["Voltage", "3V to 24V common options"],
      ["Control", "Brushless and PWM options on selected platforms"],
      ["Noise", "Low-noise design depends on full module integration"],
      ["Support", "Model matching, samples, and OEM configuration"]
    ],
    applications: ["IVD instruments", "Therapy devices", "Dental suction", "Breast pump modules", "Oxygen-related equipment", "Sample handling"],
    selection: ["Validate against device-level requirements and regulatory plan.", "Confirm material compatibility and contamination controls.", "Run lifetime and noise tests in the final product structure."]
  },
  {
    slug: "pump-accessories",
    title: "Pump Accessories, Tubing, Valves, Filters, and Silencers",
    description: "Pump accessories for OEM fluid control modules, including tubing, check valves, filters, silencers, shock absorbers, PWM controllers, and flow meters.",
    h1: "Pump Accessories and Controls",
    intro: "Accessories often decide whether a pump module is quiet, stable, clean, and production-ready. JSG can match pumps with air, vacuum, and liquid path parts.",
    range: [
      ["Tubing", "PU and silicone tubing options"],
      ["Valves", "Check valves and solenoid valves"],
      ["Noise control", "Silencers, mufflers, absorbing cotton"],
      ["Protection", "Filters and shock absorbers"],
      ["Control", "PWM controllers and selected flow feedback options"],
      ["Assembly", "Pump plus accessory module support"]
    ],
    applications: ["Noise reduction", "Flow stabilization", "Filtration", "Fluid routing", "OEM module assembly", "Maintenance and service parts"],
    selection: ["Size tubing and fittings to reduce unnecessary pressure loss.", "Select filters according to contamination risk and service interval.", "Validate accessories together with the pump under production conditions."]
  }
];

const infoPages = [
  {
    slug: "contact",
    title: "Contact JSG DC Pump",
    description: "Contact JSG DC Pump for micro air pumps, vacuum pumps, diaphragm liquid pumps, piston pumps, mini compressors, accessories, and OEM fluid control projects.",
    h1: "Contact JSG DC Pump",
    intro: "Send your pump requirements and application details. The engineering team can recommend a suitable series, material option, motor type, and accessory module.",
    sections: [
      ["RFQ details to include", ["Medium: air, gas, vacuum, liquid, ink, or other fluid.", "Flow, pressure, vacuum, voltage, duty cycle, noise target, and space limit.", "Application, annual quantity, sample needs, and certification requirements."]],
      ["Direct contact", ["Email: info@jsgpump.com", "Company: Shenzhen Jingsuguang Technology Co., Ltd.", "Products: micro pumps, mini compressors, accessories, and OEM fluid control modules."]]
    ]
  },
  {
    slug: "about",
    title: "About JSG DC Pump",
    description: "JSG DC Pump is a micro pump supplier integrating R&D, production, sales, and service for BD-series air, liquid, piston, compressor, and OEM modules.",
    h1: "About JSG DC Pump",
    intro: "JSG DC Pump focuses on micro pump fluid products and solutions for global equipment manufacturers that need compact, reliable, and customizable pump systems.",
    sections: [
      ["Capability", ["R&D, production, sales, and service in one supplier.", "BD-series diaphragm air pumps, liquid pumps, piston pumps, compressors, and accessories.", "Model matching, sample support, OEM/ODM configuration, and module development."]],
      ["Quality focus", ["ISO 9001:2015 quality management foundation.", "CE / RoHS compliance support for selected projects.", "Engineering review for voltage, motor, diaphragm, tubing, valve, and control choices."]]
    ]
  },
  {
    slug: "download",
    title: "Micro Pump Catalog and Selection Downloads",
    description: "Download and request JSG DC Pump catalogs, product selection tables, parameter ranges, and engineering RFQ support for micro pump projects.",
    h1: "Catalog and Selection Downloads",
    intro: "Use this page to request product catalogs, parameter tables, and model-selection support for air, vacuum, liquid, piston, compressor, and accessory products.",
    sections: [
      ["Available catalog topics", ["BD-01 to BD-04 diaphragm air and vacuum pump ranges.", "BD liquid pump and BD-07W high-pressure liquid pump ranges.", "BD-07 / BD-79 piston air pump and BD-08 mini compressor ranges.", "Pump accessories: tubing, valves, filters, silencers, shock absorbers, controllers, and flow parts."]],
      ["How to request files", ["Tell us the pump type and application.", "Include voltage, flow, pressure, vacuum, medium, and annual quantity.", "Ask for drawings, performance curves, or matching model suggestions when needed."]]
    ]
  },
  {
    slug: "faq",
    title: "Micro Pump FAQ for OEM Buyers",
    description: "Frequently asked questions about JSG micro pump voltage, flow, pressure, vacuum, MOQ, customization, samples, certifications, and RFQ details.",
    h1: "Micro Pump FAQ",
    intro: "Common questions from OEM buyers selecting micro air pumps, vacuum pumps, liquid pumps, piston pumps, compressors, and fluid control modules.",
    sections: [
      ["What voltage options are available?", ["Common DC options include 3V, 6V, 12V, and 24V depending on model. Some selected products support other voltage configurations."]],
      ["What information is needed for a recommendation?", ["Please provide medium, flow, pressure or vacuum, voltage, duty cycle, noise target, space limit, environment, and annual quantity."]],
      ["Can JSG customize pumps?", ["Yes. Options can include voltage, motor type, diaphragm material, fittings, tubing, control accessories, and pump plus accessory modules."]],
      ["Can I request samples?", ["Sample support depends on model availability and project requirements. Send the application and target parameters for matching."]],
      ["Which certifications are supported?", ["JSG works from an ISO 9001:2015 quality foundation and can support CE / RoHS documentation for selected projects."]]
    ]
  },
  {
    slug: "applications",
    title: "Micro Pump Applications by Industry",
    description: "Micro pump applications for medical equipment, gas sampling, beauty instruments, water purifiers, food and beverage, automation, robotics, and environmental monitoring.",
    h1: "Micro Pump Applications",
    intro: "JSG DC Pump products support device categories where compact size, stable output, low noise, and material compatibility matter.",
    sections: [
      ["Medical and diagnostics", ["IVD instruments, therapy equipment, dental suction, gas handling, sample movement, and compact pump modules."]],
      ["Industrial and analytical", ["Gas sampling, particle counters, environmental monitoring, laboratory systems, automation, and robotics."]],
      ["Consumer and appliance", ["Water purifiers, beverage dispensing, cleaning systems, beauty instruments, power tools, and compact pressure systems."]],
      ["Printing and fluid handling", ["Ink circulation, waste ink transfer, liquid dosing, small filling systems, and OEM fluid control assemblies."]]
    ]
  },
  {
    slug: "thank-you",
    title: "Thank You for Your RFQ",
    description: "Thank you for contacting JSG DC Pump. Your RFQ has been received or can be sent directly to info@jsgpump.com.",
    h1: "Thank You",
    noindex: true,
    intro: "Your RFQ information has been submitted. If the form was interrupted, please email info@jsgpump.com directly with your pump requirements.",
    sections: [
      ["Next step", ["The engineering team will review your medium, flow, pressure, vacuum, voltage, duty cycle, and application details.", "For faster matching, include drawings, photos, current pump model, or target performance curves if available."]]
    ]
  }
];

const blogPages = [
  ["how-to-choose-micro-diaphragm-air-pump", "How to Choose a Micro Diaphragm Air Pump", "Select a micro diaphragm air pump by useful flow, pressure, vacuum, voltage, noise, duty cycle, lifetime, and installation space."],
  ["12v-vs-24v-dc-pump", "12V vs 24V DC Pump: Which Is Better?", "Compare 12V and 24V DC pump choices for OEM devices by power supply, current, heat, startup load, wiring, and control margin."],
  ["brush-vs-brushless-micro-pump", "Brush vs Brushless Micro Pump", "Understand when to choose brushed or brushless micro pumps based on lifetime, noise, cost, duty cycle, speed control, and production goals."],
  ["reduce-micro-pump-noise", "How to Reduce Micro Pump Noise and Vibration", "Pump noise depends on the complete system: mounting, tubing, filters, valves, voltage, enclosure resonance, and accessories."],
  ["vacuum-pump-for-gas-sampling", "Vacuum Pump Selection for Gas Sampling", "Gas sampling pump selection requires stable flow, clean gas paths, vacuum margin, filter resistance planning, and material compatibility."],
  ["liquid-pump-for-inkjet-printer", "Liquid Pump Selection for Inkjet Printer Systems", "Inkjet printer liquid pumps need chemical compatibility, leakage control, dry-start reliability, stable flow, and small installation size."],
  ["pump-selection-for-medical-device", "Micro Pump Selection for Medical Devices", "Medical device pump selection should account for oil-free operation, cleanliness, acoustic behavior, lifetime, voltage, and device-level validation."],
  ["mini-compressor-vs-piston-pump", "Mini Compressor vs Piston Pump", "Mini compressors and piston pumps overlap in pressure systems, but the best choice depends on airflow, pressure, duty cycle, heat, and noise."],
  ["epdm-vs-fkm-diaphragm", "EPDM vs FKM Diaphragm Material", "Choose diaphragm and valve materials by liquid or gas chemistry, temperature, lifetime, sealing behavior, and compliance needs."],
  ["how-to-write-oem-pump-rfq", "How to Write an OEM Pump RFQ", "A useful pump RFQ should include medium, flow, pressure, vacuum, voltage, duty cycle, noise target, size limit, quantity, and application details."]
].map(([slug, title, intro]) => ({
  slug: `blog/${slug}`,
  title,
  description: intro,
  h1: title,
  intro,
  sections: [
    ["Key points", ["Define the real operating condition, not only the ideal pump rating.", "Test the pump with tubing, fittings, filters, valves, power supply, and enclosure.", "Validate startup load, heat rise, noise, useful flow, material compatibility, and expected lifetime before production."]],
    ["RFQ checklist", ["Medium and chemistry.", "Required flow, pressure, or vacuum at the working point.", "Voltage, duty cycle, space limit, noise target, and annual quantity.", "Pump-only or pump plus accessory module requirement."]]
  ]
}));

const overviewPages = [
  {
    slug: "products",
    title: "Micro Pump Product Categories",
    description: "Browse JSG DC Pump product categories including micro diaphragm air pumps, vacuum pumps, liquid pumps, piston pumps, mini compressors, gas sampling pumps, ink pumps, medical pumps, and accessories.",
    h1: "Micro Pump Product Categories",
    intro: "Start with the product family that matches your medium, pressure, vacuum, flow, duty cycle, and installation space. Each category page includes engineering ranges, typical applications, and RFQ selection notes.",
    cards: productPages.map((page) => ({
      title: page.h1,
      body: page.description,
      href: `/${page.slug}/`
    })),
    sections: [
      ["How to choose a category", ["Use diaphragm air pumps for compact pressure, vacuum, and clean airflow.", "Use diaphragm liquid pumps for self-priming transfer, dispensing, ink, and water systems.", "Use piston pumps or mini compressors when the device needs higher pressure or stronger airflow.", "Use accessories to control noise, filtration, tubing loss, and module reliability."]]
    ]
  },
  {
    slug: "blog",
    title: "Micro Pump Engineering Blog",
    description: "Engineering articles about micro pump selection, 12V and 24V DC pumps, brushless pumps, noise control, gas sampling, ink pumps, medical devices, compressors, materials, and OEM RFQs.",
    h1: "Micro Pump Engineering Blog",
    intro: "Practical notes for OEM buyers and engineers selecting micro air pumps, vacuum pumps, liquid pumps, piston pumps, mini compressors, accessories, and complete fluid-control modules.",
    cards: blogPages.map((page) => ({
      title: page.h1,
      body: page.description,
      href: `/${page.slug}/`
    })),
    sections: [
      ["Content focus", ["Selection criteria for flow, pressure, vacuum, voltage, noise, lifetime, and installation space.", "Integration notes for tubing, filters, valves, power supply, housing, and accessory modules.", "RFQ guidance for faster model matching and sample confirmation."]]
    ]
  }
];

const allPages = [...overviewPages, ...infoPages, ...productPages, ...blogPages];

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const navHtml = (currentSlug) =>
  nav
    .map(([label, href]) => {
      const isProductPage = currentSlug === "products" || productPages.some((page) => page.slug === currentSlug);
      const isBlogPage = currentSlug === "blog" || currentSlug.startsWith("blog/");
      const active =
        (href === "/products/" && isProductPage) ||
        (href === "/blog/" && isBlogPage) ||
        (currentSlug && href === `/${currentSlug}/`);
      return `<a${active ? ' aria-current="page"' : ""} href="${href}">${label}</a>`;
    })
    .join("\n          ");

const renderTable = (rows) => `
        <div class="matrix-table-wrap page-table-wrap">
          <table class="matrix-table">
            <tbody>
              ${rows.map(([label, value]) => `<tr><th>${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`).join("\n              ")}
            </tbody>
          </table>
        </div>`;

const renderList = (items) => `<ul class="page-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n          ")}</ul>`;

const renderCards = (cards) => `
        <section class="page-block">
          <h2>Explore Pages</h2>
          <div class="page-card-grid">
            ${cards
              .map(
                (card) => `<a class="page-card-link" href="${card.href}">
                  <strong>${escapeHtml(card.title)}</strong>
                  <span>${escapeHtml(card.body)}</span>
                </a>`
              )
              .join("\n            ")}
          </div>
        </section>`;

const renderSections = (page) => {
  const blocks = [];
  if (page.range) {
    blocks.push(`<section class="page-block"><h2>Engineering Range</h2>${renderTable(page.range)}</section>`);
  }
  if (page.applications) {
    blocks.push(`<section class="page-block"><h2>Typical Applications</h2>${renderList(page.applications)}</section>`);
  }
  if (page.selection) {
    blocks.push(`<section class="page-block"><h2>Selection Notes</h2>${renderList(page.selection)}</section>`);
  }
  if (page.cards) {
    blocks.push(renderCards(page.cards));
  }
  if (page.sections) {
    page.sections.forEach(([heading, items]) => {
      blocks.push(`<section class="page-block"><h2>${escapeHtml(heading)}</h2>${renderList(items)}</section>`);
    });
  }
  return blocks.join("\n        ");
};

const renderRelatedProducts = () => `
        <section class="page-block page-related">
          <h2>Related Product Pages</h2>
          <div class="page-link-grid">
            ${productPages.map((page) => `<a href="/${page.slug}/">${escapeHtml(page.h1)}</a>`).join("\n            ")}
          </div>
        </section>`;

const renderPage = (page) => {
  const isProduct = productPages.includes(page);
  const isBlog = page.slug.startsWith("blog/");
  const canonical = `${siteUrl}/${page.slug}/`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": isProduct ? "Product" : isBlog ? "Article" : "WebPage",
    name: page.h1,
    description: page.description,
    url: canonical,
    publisher: {
      "@type": "Organization",
      name: "JSG DC Pump",
      url: siteUrl,
      email: "info@jsgpump.com"
    }
  };
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(page.title)} | JSG DC Pump</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta property="og:title" content="${escapeHtml(page.title)} | JSG DC Pump">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:type" content="${isBlog ? "article" : "website"}">
  ${page.noindex ? '<meta name="robots" content="noindex,follow">' : ""}
  <link rel="canonical" href="${canonical}">
  <link rel="stylesheet" href="/assets/css/styles.css?v=20260705-seo-pages">
  <script type="application/ld+json">${JSON.stringify(structuredData)}</script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" data-header>
    <nav class="nav-shell" aria-label="Primary navigation">
      <a class="brand" href="/" aria-label="JSG DC Pump home">
        <span class="brand-mark">JG</span>
        <span>
          <strong>JSG DC Pump</strong>
          <small>Micro Pump & Fluid Control</small>
        </span>
      </a>
      <button class="menu-toggle" type="button" data-menu-toggle aria-label="Open navigation" aria-expanded="false"><span></span><span></span></button>
      <div class="nav-links" data-nav-links>
          ${navHtml(page.slug)}
      </div>
      <div class="nav-actions"><a class="btn btn-primary nav-cta" href="${rfqPath}">Request a Quote</a></div>
    </nav>
  </header>
  <main id="main">
    <section class="page-hero">
      <div class="page-hero-inner">
        <p class="eyebrow">${isProduct ? "Product category" : isBlog ? "Engineering article" : "JSG DC Pump"}</p>
        <h1>${escapeHtml(page.h1)}</h1>
        <p>${escapeHtml(page.intro)}</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="${rfqPath}">Request Engineering Quote</a>
          <a class="btn btn-secondary" href="/download/">Request Catalog</a>
        </div>
      </div>
    </section>
    <section class="section page-content">
      <div class="page-layout">
        <div>
        ${renderSections(page)}
        ${isProduct ? renderRelatedProducts() : ""}
        </div>
        <aside class="page-aside">
          <h2>Send RFQ Details</h2>
          <p>Include medium, flow, pressure, vacuum, voltage, duty cycle, noise target, size limit, application, and annual quantity.</p>
          <a class="btn btn-primary" href="${rfqPath}">Start RFQ</a>
          <a class="text-link" href="mailto:info@jsgpump.com">info@jsgpump.com</a>
        </aside>
      </div>
    </section>
  </main>
  <footer class="site-footer">
    <div class="footer-grid">
      <div>
        <a class="brand footer-brand" href="/">
          <span class="brand-mark">JG</span>
          <span><strong>JSG DC Pump</strong><small>Shenzhen Jingsuguang Technology Co., Ltd.</small></span>
        </a>
        <p>A professional micro pump supplier integrating R&D, production, sales, and service for BD-series air, liquid, piston, compressor, accessory, and OEM fluid control products.</p>
      </div>
      <div><h3>Products</h3><a href="/products/">Product categories</a>${productPages.slice(0, 3).map((p) => `<a href="/${p.slug}/">${escapeHtml(p.h1)}</a>`).join("")}</div>
      <div><h3>Resources</h3><a href="/applications/">Applications</a><a href="/download/">Download</a><a href="/faq/">FAQ</a><a href="/blog/">Blog</a></div>
      <div><h3>Contact</h3><a href="mailto:info@jsgpump.com">info@jsgpump.com</a><a href="${rfqPath}">Submit RFQ</a><a href="/contact/">Contact page</a></div>
    </div>
    <div class="footer-bottom"><span>&copy; 2026 Shenzhen Jingsuguang Technology Co., Ltd.</span></div>
  </footer>
  <script src="/assets/js/main.js?v=20260705-seo-pages"></script>
</body>
</html>
`;
};

const writeFile = (relativePath, content) => {
  const target = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, "utf8");
};

allPages.forEach((page) => {
  writeFile(path.join(page.slug, "index.html"), renderPage(page));
});

const sitemapUrls = [
  "",
  ...allPages.filter((page) => !page.noindex).map((page) => `${page.slug}/`)
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map((url) => {
    const depth = url.split("/").filter(Boolean).length;
    const priority = !url ? "1.0" : url === "products/" || url === "blog/" ? "0.9" : depth > 1 ? "0.6" : "0.7";
    return `  <url><loc>${siteUrl}/${url}</loc><lastmod>2026-07-05</lastmod><changefreq>${url ? "monthly" : "weekly"}</changefreq><priority>${priority}</priority></url>`;
  })
  .join("\n")}
</urlset>
`;

writeFile("sitemap.xml", sitemap);
writeFile(
  "robots.txt",
  `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`
);

console.log(`Generated ${allPages.length} pages plus sitemap.xml and robots.txt.`);
