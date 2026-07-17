const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const siteUrl = "https://www.jsgpump.com";

const nav = [
  ["Products", "/products/"],
  ["Solutions", "/applications/"],
  ["Engineering", "/blog/"],
  ["Case Studies", "/case-studies/"],
  ["Resources", "/download/"],
  ["About", "/about/"],
  ["Contact", "/contact/"]
];

const rfqPath = "/#rfq";
const supportedLocales = ["en", "zh"];

const localizedSlug = (slug, locale = "en") => {
  if (!slug) return locale === "zh" ? "zh" : "";
  return locale === "zh" ? `zh/${slug}` : slug;
};

const localizedUrl = (slug, locale = "en") => {
  if (!slug) return locale === "zh" ? `${siteUrl}/zh/` : `${siteUrl}/`;
  return `${siteUrl}/${localizedSlug(slug, locale)}/`;
};

const localizedHref = (href, locale = "en") => {
  if (locale !== "zh") return href;
  if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) return href;
  if (href.startsWith("/assets/") || href.startsWith("/api/")) return href;
  if (href === "/") return "/zh/";
  if (href.startsWith("/#")) return `/zh/${href.slice(1)}`;
  if (href.startsWith("/zh/")) return href;
  if (href.startsWith("/")) return `/zh${href}`;
  return href;
};

const alternateLinks = (slug, canonical, locale = "en") => `
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="en" href="${localizedUrl(slug, "en")}">
  <link rel="alternate" hreflang="zh-Hans" href="${localizedUrl(slug, "zh")}">
  <link rel="alternate" hreflang="x-default" href="${localizedUrl(slug, "en")}">`;

const languageSelectHtml = (locale = "en") => `
        <label class="language-select">
          <span>${locale === "zh" ? "语言" : "Language"}</span>
          <select data-language-select aria-label="${locale === "zh" ? "选择语言" : "Select language"}">
            ${locale === "zh" ? '<option value="zh">CN 简体中文</option><option value="en">EN English</option>' : '<option value="en">EN English</option><option value="zh">CN 简体中文</option>'}
          </select>
        </label>`;

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

const modelPages = [
  {
    slug: "product/bd-01-micro-diaphragm-air-pump",
    category: "micro-diaphragm-air-pump",
    model: "BD-01",
    title: "BD-01 Micro Diaphragm Air Pump",
    description: "BD-01 micro diaphragm air pump for compact OEM devices requiring low-flow clean air, pressure, vacuum, and small installation size.",
    h1: "BD-01 Micro Diaphragm Air Pump",
    intro: "BD-01 is a compact diaphragm air pump platform for low-flow air and vacuum tasks in portable devices, medical modules, sampling paths, and small pneumatic assemblies.",
    range: [["Type", "Micro diaphragm air / vacuum pump"], ["Flow", "0.3-1 L/min"], ["Pressure", "0.5-1 bar"], ["Vacuum", "-30 to -60 kPa"], ["Voltage", "3V, 6V, 12V options"], ["Weight class", "18-24g compact platform"]],
    applications: ["Portable medical devices", "Low-flow gas sampling", "Small suction modules", "Compact pneumatic systems"],
    selection: ["Use BD-01 when installation space is tight and required flow is modest.", "Confirm useful flow after tubing, filters, and valves.", "Ask for motor and voltage matching before sample confirmation."]
  },
  {
    slug: "product/bd-02-micro-air-vacuum-pump",
    category: "micro-diaphragm-air-pump",
    model: "BD-02",
    title: "BD-02 Micro Air and Vacuum Pump",
    description: "BD-02 micro air and vacuum pump for compact OEM pressure and suction systems with 6V, 12V, and 24V options.",
    h1: "BD-02 Micro Air and Vacuum Pump",
    intro: "BD-02 is a mid-compact diaphragm platform for equipment that needs more airflow than tiny low-flow pumps while keeping package size and noise under control.",
    range: [["Type", "Diaphragm air / vacuum pump"], ["Flow", "1-4 L/min"], ["Pressure", "0.5-1.5 bar"], ["Vacuum", "-30 to -65 kPa"], ["Voltage", "6V, 12V, 24V options"], ["Motor", "Brush and brushless options on selected configurations"]],
    applications: ["Medical suction modules", "Air sampling", "Beauty devices", "Small appliance air paths"],
    selection: ["Use BD-02 for compact devices that need balanced airflow and size.", "Evaluate brushless options when lifetime or duty cycle matters.", "Test noise inside the final enclosure."]
  },
  {
    slug: "product/bd-03-diaphragm-air-pump",
    category: "micro-diaphragm-air-pump",
    model: "BD-03",
    title: "BD-03 Diaphragm Air Pump",
    description: "BD-03 diaphragm air pump for OEM airflow, vacuum, and compact pneumatic modules requiring 3-7 L/min class flow.",
    h1: "BD-03 Diaphragm Air Pump",
    intro: "BD-03 supports medium-flow air and vacuum applications where compact size, controllable noise, and stable output are needed.",
    range: [["Type", "Diaphragm air / vacuum pump"], ["Flow", "3-7 L/min"], ["Pressure", "2-3 bar"], ["Vacuum", "-45 to -70 kPa"], ["Voltage", "6V, 12V, 24V options"], ["Power", "7-12W class"]],
    applications: ["Gas sampling", "Analytical instruments", "Beauty equipment", "Compact pneumatic modules"],
    selection: ["Use BD-03 when the system needs stronger output than BD-01/BD-02.", "Validate heat rise and noise under real duty cycle.", "Confirm tubing diameter to prevent avoidable pressure loss."]
  },
  {
    slug: "product/bd-04-high-flow-diaphragm-pump",
    category: "micro-diaphragm-air-pump",
    model: "BD-04",
    title: "BD-04 High Flow Diaphragm Air Pump",
    description: "BD-04 high flow diaphragm air pump for stronger vacuum, pressure, and 7-22 L/min class OEM airflow systems.",
    h1: "BD-04 High Flow Diaphragm Air Pump",
    intro: "BD-04 is selected for higher-flow diaphragm air and vacuum systems requiring stronger suction, pressure, and OEM-ready integration.",
    range: [["Type", "High-flow diaphragm air / vacuum pump"], ["Flow", "7-22 L/min"], ["Pressure", "2.5-3.5 bar"], ["Vacuum", "-75 to -85 kPa"], ["Voltage", "6V, 9V, 12V, 24V options"], ["Material options", "EPDM / FKM diaphragm options on selected versions"]],
    applications: ["Vacuum sampling", "Medical and beauty equipment", "Industrial suction", "Appliance air modules"],
    selection: ["Use BD-04 when airflow and vacuum reserve are more important than minimum size.", "Plan shock absorption and acoustic treatment.", "Confirm startup current and power supply margin."]
  },
  {
    slug: "product/bd-01w-micro-liquid-pump",
    category: "diaphragm-liquid-pump",
    model: "BD-01W",
    title: "BD-01W Micro Diaphragm Liquid Pump",
    description: "BD-01W micro diaphragm liquid pump for compact dispensing, small transfer, and low-flow OEM liquid paths.",
    h1: "BD-01W Micro Diaphragm Liquid Pump",
    intro: "BD-01W is a compact self-priming liquid pump platform for small-volume transfer and dispensing where installation space is limited.",
    range: [["Type", "Micro diaphragm liquid pump"], ["Water flow", "100-200 mL/min"], ["Vacuum", "Approx. -30 kPa class"], ["Voltage", "3V, 6V, 12V options"], ["Function", "Self-priming compact liquid transfer"], ["Material", "Confirm diaphragm and valve material by liquid chemistry"]],
    applications: ["Small dispensing systems", "Portable liquid devices", "Laboratory dosing", "Beauty instruments"],
    selection: ["Use BD-01W for low-flow transfer and compact dosing.", "Confirm liquid chemistry before material selection.", "Test dry-start and bubble behavior in the final system."]
  },
  {
    slug: "product/bd-02w-mini-liquid-pump",
    category: "diaphragm-liquid-pump",
    model: "BD-02W",
    title: "BD-02W Mini Diaphragm Liquid Pump",
    description: "BD-02W mini diaphragm liquid pump for 200-500 mL/min class transfer, dispensing, and OEM fluid-control modules.",
    h1: "BD-02W Mini Diaphragm Liquid Pump",
    intro: "BD-02W fits compact liquid systems that need moderate flow with self-priming capability and configurable voltage options.",
    range: [["Type", "Diaphragm liquid pump"], ["Water flow", "200-500 mL/min"], ["Vacuum", "Approx. -30 kPa class"], ["Voltage", "6V, 12V, 24V options"], ["Motor", "Brush and brushless options on selected models"], ["Use", "Dispensing, transfer, small fluid modules"]],
    applications: ["Water purifier modules", "Ink and fluid transfer", "Cleaning systems", "Small filling equipment"],
    selection: ["Check inlet height and outlet restriction under real tubing layout.", "Match diaphragm material to the liquid.", "Validate leakage and valve behavior before production."]
  },
  {
    slug: "product/bd-04w-diaphragm-liquid-pump",
    category: "diaphragm-liquid-pump",
    model: "BD-04W",
    title: "BD-04W Diaphragm Liquid Pump",
    description: "BD-04W diaphragm liquid pump for higher-flow OEM liquid transfer, dispensing, cleaning, and fluid-control systems.",
    h1: "BD-04W Diaphragm Liquid Pump",
    intro: "BD-04W supports higher-flow liquid paths where equipment needs compact self-priming transfer and stable output.",
    range: [["Type", "Diaphragm liquid pump"], ["Water flow", "Up to 1-1.5 L/min class"], ["Vacuum", "Approx. -30 kPa class"], ["Voltage", "6V, 9V, 12V, 24V options"], ["Diaphragm", "EPDM / FKM options on selected configurations"], ["Function", "Transfer, cleaning, dispensing"]],
    applications: ["Cleaning systems", "Beverage modules", "Water transfer", "OEM liquid assemblies"],
    selection: ["Use BD-04W when the device needs higher liquid flow.", "Measure useful flow after tubing and filters.", "Confirm pressure, leakage, and material compatibility together."]
  },
  {
    slug: "product/bd-07w-high-pressure-liquid-pump",
    category: "diaphragm-liquid-pump",
    model: "BD-07W",
    title: "BD-07W High Pressure Liquid Pump",
    description: "BD-07W high pressure diaphragm liquid pump for water purifier, compact pressure transfer, and 10 bar class OEM liquid systems.",
    h1: "BD-07W High Pressure Liquid Pump",
    intro: "BD-07W is a higher-pressure diaphragm liquid pump option for compact systems that need stronger outlet pressure than standard miniature liquid pumps.",
    range: [["Type", "High-pressure diaphragm liquid pump"], ["Water flow", "Approx. 1 L/min class"], ["Pressure", "Up to 10 bar class"], ["Vacuum", "Approx. -30 kPa class"], ["Voltage", "12V, 24V options"], ["Use", "High-pressure compact liquid modules"]],
    applications: ["Water purifier systems", "Beverage equipment", "Pressure cleaning", "Compact liquid pressure modules"],
    selection: ["Use BD-07W when outlet pressure is the primary requirement.", "Confirm tubing, fittings, and seals are pressure-rated.", "Validate heat, current, and duty cycle at target pressure."]
  },
  {
    slug: "product/bd-07-micro-piston-pump",
    category: "micro-piston-pump",
    model: "BD-07",
    title: "BD-07 Micro Piston Pump",
    description: "BD-07 micro piston pump for high-pressure air, strong vacuum, medical, cosmetic, power tool, and automation equipment.",
    h1: "BD-07 Micro Piston Pump",
    intro: "BD-07 is an oil-free piston pump platform for compact devices requiring higher pressure and stronger suction than diaphragm pump platforms.",
    range: [["Type", "Micro piston air / vacuum pump"], ["Flow", "15-40 L/min"], ["Pressure", "4.5-6.5 bar"], ["Vacuum", "-80 to -85 kPa"], ["Voltage", "12V, 24V options"], ["Power", "24-70W class depending on configuration"]],
    applications: ["Medical rehabilitation", "Cosmetic equipment", "Power tools", "Automation and robotics"],
    selection: ["Use BD-07 for compact high-pressure or high-vacuum air systems.", "Plan thermal and vibration control early.", "Confirm continuous and peak pressure separately."]
  },
  {
    slug: "product/bd-79-high-pressure-piston-pump",
    category: "micro-piston-pump",
    model: "BD-79",
    title: "BD-79 High Pressure Piston Pump",
    description: "BD-79 high pressure piston pump for stronger OEM air pressure, vacuum, and compact compressor-like systems.",
    h1: "BD-79 High Pressure Piston Pump",
    intro: "BD-79 extends the piston platform for stronger output requirements where airflow, pressure, and vacuum reserve are central to the device design.",
    range: [["Type", "High-pressure piston air / vacuum pump"], ["Flow", "30-45 L/min class"], ["Pressure", "Up to 7 bar class"], ["Vacuum", "-80 to -85 kPa"], ["Voltage", "12V, 24V options"], ["Use", "High-output pressure and suction systems"]],
    applications: ["Compact pressure systems", "Industrial modules", "Robotics", "Specialized medical and beauty devices"],
    selection: ["Use BD-79 for stronger pressure reserve than BD-07 class platforms.", "Validate power supply margin and heat rise.", "Include relief, damping, and noise control in the module."]
  },
  {
    slug: "product/bd-08-mini-compressor",
    category: "mini-compressor",
    model: "BD-08",
    title: "BD-08 Mini Compressor",
    description: "BD-08 mini compressor for compact high-flow pressure systems, rehabilitation equipment, foam cleaning, 3D printing, and portable tools.",
    h1: "BD-08 Mini Compressor",
    intro: "BD-08 is a compact oil-free mini compressor platform for systems needing higher airflow and pressure from a DC-powered module.",
    range: [["Type", "Mini compressor"], ["Flow", "40-80 L/min"], ["Pressure", "2-7 bar"], ["Vacuum", "Selected configurations to -85 kPa"], ["Voltage", "12V, 24V options"], ["Power", "60-150W class"]],
    applications: ["Rehabilitation equipment", "Foam cleaning", "3D printing accessories", "Portable tools", "Environmental monitoring"],
    selection: ["Use BD-08 when high airflow matters as much as pressure.", "Test thermal behavior inside the final enclosure.", "Add pressure relief and acoustic treatment where needed."]
  },
  {
    slug: "product/pump-accessory-control-module",
    category: "pump-accessories",
    model: "Accessory Module",
    title: "Pump Accessory and Control Module",
    description: "Pump accessory and control module options including tubing, filters, check valves, silencers, shock absorbers, PWM controllers, and flow meters.",
    h1: "Pump Accessory and Control Module",
    intro: "Accessory modules help OEM teams reduce noise, control pressure loss, protect the pump path, stabilize flow, and simplify installation.",
    range: [["Tubing", "PU / silicone options"], ["Valves", "Check valves and solenoid valves"], ["Noise", "Silencers, mufflers, absorbing cotton"], ["Protection", "Filters and shock absorbers"], ["Control", "PWM controller and selected flow feedback options"], ["Assembly", "Pump plus accessory module support"]],
    applications: ["Noise reduction", "Filtration", "Flow routing", "OEM fluid-control assemblies"],
    selection: ["Select tubing and fittings by pressure loss and sealing needs.", "Match filter size to contamination risk and maintenance interval.", "Validate the full module rather than pump-only data."]
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
    media: [
      ["/assets/img/catalog-diaphragm-air.jpg", "BD diaphragm air pump catalog page"],
      ["/assets/img/catalog-liquid-pump.jpg", "BD diaphragm liquid pump catalog page"],
      ["/assets/img/catalog-piston-air.jpg", "BD piston air pump catalog page"],
      ["/assets/img/catalog-compressor-accessories.jpg", "BD mini compressor and pump accessories catalog page"]
    ],
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
    faq: true,
    intro: "Common questions from OEM buyers selecting micro air pumps, vacuum pumps, liquid pumps, piston pumps, compressors, and fluid control modules.",
    sections: [
      ["What voltage options are available?", ["Common DC options include 3V, 6V, 12V, and 24V depending on model. Some selected products support other voltage configurations."]],
      ["What information is needed for a recommendation?", ["Please provide medium, flow, pressure or vacuum, voltage, duty cycle, noise target, space limit, environment, and annual quantity."]],
      ["Can JSG customize pumps?", ["Yes. Options can include voltage, motor type, diaphragm material, fittings, tubing, control accessories, and pump plus accessory modules."]],
      ["Can I request samples?", ["Sample support depends on model availability and project requirements. Send the application and target parameters for matching."]],
      ["Which certifications are supported?", ["JSG works from an ISO 9001:2015 quality foundation and can support CE / RoHS documentation for selected projects."]],
      ["How should I compare flow and pressure data?", ["Compare useful flow at your real working pressure or vacuum, not only free-flow data. Tubing, filters, valves, fittings, altitude, and enclosure layout can change final performance."]],
      ["Do you provide pump plus accessory modules?", ["Yes. For OEM projects, JSG can match pumps with tubing, filters, check valves, silencers, shock absorbers, PWM controllers, flow meters, and other fluid-control parts."]],
      ["How do I choose between diaphragm and piston pumps?", ["Use diaphragm pumps for compact air, vacuum, gas, and liquid paths where size and clean operation matter. Use piston pumps when the design needs stronger pressure, stronger vacuum, or higher mechanical output."]],
      ["How do I reduce micro pump noise?", ["Noise depends on the complete system. Use suitable motor speed, soft mounting, shock absorption, silencers, stable voltage, correct tubing size, and final-enclosure testing."]],
      ["Can the same pump handle air and liquid?", ["Some diaphragm platforms have air and liquid variants, but materials, valves, sealing, flow, and test standards are different. Confirm the medium before selecting a model."]],
      ["What affects pump lifetime?", ["Lifetime depends on motor type, load, duty cycle, temperature, medium, pressure or vacuum level, vibration, voltage stability, and whether the pump runs dry or against blocked flow."]],
      ["What should be tested before mass production?", ["Validate startup current, useful flow, pressure or vacuum, heat rise, noise, vibration, leakage, material compatibility, duty cycle, and lifetime in the final product structure."]]
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
    slug: "case-studies",
    title: "Application Case Studies for Micro Pump Integration",
    description: "Anonymous application case studies for JSG DC Pump micro air pumps, vacuum pumps, liquid pumps, piston pumps, mini compressors, and OEM fluid control modules.",
    h1: "Application Case Studies",
    intro: "Review representative integration patterns for medical, gas sampling, water treatment, ink delivery, automation, and compact pressure systems. These examples focus on engineering requirements instead of customer names.",
    cards: [
      {
        title: "Medical diagnostic air path",
        body: "Compact diaphragm air and vacuum pump selection for stable sampling flow, low noise, clean air path, and repeated startup validation.",
        href: "/applications/medical-equipment/"
      },
      {
        title: "Gas sampling module",
        body: "Vacuum pump and filter-path review for useful flow after tubing, sensors, filters, altitude, and enclosure resistance.",
        href: "/applications/gas-sampling/"
      },
      {
        title: "Water purifier dispensing path",
        body: "Self-priming diaphragm liquid pump selection for inlet height, valve loss, wetted materials, leakage control, and cleaning cycles.",
        href: "/applications/water-purifier/"
      },
      {
        title: "Inkjet fluid handling",
        body: "Small liquid and ink pump integration for flow stability, material compatibility, bubble handling, and compact installation space.",
        href: "/applications/inkjet-printing/"
      },
      {
        title: "Automation vacuum and pressure module",
        body: "Pump plus accessory modules for vacuum suction, pneumatic switching, filters, silencers, PWM control, and stable production assembly.",
        href: "/applications/automation-robotics/"
      },
      {
        title: "Environmental monitoring sample path",
        body: "Long-life gas movement review for sampling duty cycle, clean path design, vibration control, and field maintenance constraints.",
        href: "/applications/environmental-monitoring/"
      }
    ],
    sections: [
      ["How to read these cases", ["Each case is organized by medium, working function, useful flow, pressure or vacuum, duty cycle, noise target, installation space, and accessory requirements.", "Use the linked application pages to compare pump families and prepare RFQ details for sample matching.", "Final selection should be validated in the real product enclosure with tubing, filters, valves, power supply, and startup load included."]]
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

const applicationPages = [
  {
    slug: "applications/medical-equipment",
    title: "Micro Pumps for Medical Equipment",
    description: "Micro air pumps, vacuum pumps, liquid pumps, and piston pumps for medical equipment, diagnostics, suction modules, therapy devices, and compact OEM medical systems.",
    h1: "Micro Pumps for Medical Equipment",
    intro: "Medical and diagnostic devices need compact pumps with stable output, oil-free operation, low noise, material compatibility, and repeatable OEM supply.",
    cards: [
      { title: "Medical Diaphragm Pumps", body: "Air, vacuum, and selected liquid pump platforms for medical and diagnostic equipment.", href: "/medical-diaphragm-pump/" },
      { title: "BD-01 Micro Diaphragm Air Pump", body: "Low-flow compact pump option for small medical modules and portable devices.", href: "/product/bd-01-micro-diaphragm-air-pump/" },
      { title: "BD-02 Micro Air and Vacuum Pump", body: "Balanced airflow and size for suction and compact pneumatic paths.", href: "/product/bd-02-micro-air-vacuum-pump/" },
      { title: "BD-07 Micro Piston Pump", body: "Higher pressure and vacuum reserve for therapy and rehabilitation systems.", href: "/product/bd-07-micro-piston-pump/" }
    ],
    sections: [
      ["Common equipment", ["IVD instruments, therapy devices, dental suction, breast pump modules, gas handling, and compact sample movement systems."]],
      ["Selection focus", ["Oil-free flow path, acoustic behavior, useful vacuum or pressure, voltage, duty cycle, material compatibility, lifetime target, and final enclosure validation."]],
      ["RFQ details", ["Provide device type, medium, target flow, pressure or vacuum, duty cycle, noise target, voltage, size limit, and expected annual quantity."]]
    ]
  },
  {
    slug: "applications/gas-sampling",
    title: "Gas Sampling Pump Applications",
    description: "Micro vacuum and gas sampling pump solutions for analyzers, environmental monitoring, particle counters, portable detectors, and laboratory sampling systems.",
    h1: "Gas Sampling Pump Applications",
    intro: "Gas sampling systems require stable useful flow against filters, tubing, sensors, and changing pressure loss over the life of the device.",
    cards: [
      { title: "Gas Sampling Pumps", body: "Pump category page for monitoring and analytical sampling paths.", href: "/gas-sampling-pump/" },
      { title: "Miniature Vacuum Pumps", body: "Compact vacuum platforms for suction and sampling.", href: "/miniature-vacuum-pump/" },
      { title: "BD-03 Diaphragm Air Pump", body: "Medium-flow diaphragm platform for stable sampling paths.", href: "/product/bd-03-diaphragm-air-pump/" },
      { title: "BD-04 High Flow Diaphragm Air Pump", body: "Higher-flow option when filters and tubing add resistance.", href: "/product/bd-04-high-flow-diaphragm-pump/" }
    ],
    sections: [
      ["Common equipment", ["Gas analyzers, environmental monitors, particle counters, portable detectors, laboratory sampling modules, and medical analysis devices."]],
      ["Selection focus", ["Useful flow at the sensor path, vacuum margin, filter loading over time, gas compatibility, tubing pressure loss, noise, and lifetime."]],
      ["RFQ details", ["Provide gas type, flow at working point, vacuum target, filter resistance, tubing length, voltage, duty cycle, and operating environment."]]
    ]
  },
  {
    slug: "applications/inkjet-printing",
    title: "Ink Pump Applications for Printing Systems",
    description: "Compact diaphragm liquid pumps for inkjet printers, coding systems, UV ink circulation, waste ink transfer, and precision fluid-control modules.",
    h1: "Ink Pump Applications for Printing Systems",
    intro: "Printing and coding systems need liquid pumps that handle ink chemistry, small flow paths, bubbles, long idle periods, and leak-sensitive layouts.",
    cards: [
      { title: "Ink Pumps", body: "Category page for ink transfer and circulation pump selection.", href: "/ink-pump/" },
      { title: "BD-01W Micro Diaphragm Liquid Pump", body: "Low-flow compact transfer and dosing option.", href: "/product/bd-01w-micro-liquid-pump/" },
      { title: "BD-02W Mini Diaphragm Liquid Pump", body: "Moderate-flow pump for compact ink and fluid modules.", href: "/product/bd-02w-mini-liquid-pump/" },
      { title: "Diaphragm Liquid Pumps", body: "Broader liquid pump category for self-priming transfer and dispensing.", href: "/diaphragm-liquid-pump/" }
    ],
    sections: [
      ["Common equipment", ["Inkjet printers, coding systems, UV ink circulation, waste ink transfer, small filling, and OEM fluid supply modules."]],
      ["Selection focus", ["Ink chemistry, diaphragm and valve material, dry-start behavior, bubble handling, leakage control, tubing diameter, and idle recovery."]],
      ["RFQ details", ["Provide ink type, viscosity, target flow, inlet height, outlet restriction, voltage, duty cycle, and connector requirements."]]
    ]
  },
  {
    slug: "applications/water-purifier",
    title: "Pump Applications for Water Purifier and Beverage Modules",
    description: "Diaphragm liquid pumps and high pressure liquid pump options for water purifiers, beverage dispensing, compact transfer, and pressure liquid modules.",
    h1: "Water Purifier and Beverage Pump Applications",
    intro: "Water and beverage modules often need self-priming liquid transfer, clean routing, stable pressure, compact size, and reliable sealing.",
    cards: [
      { title: "Diaphragm Liquid Pumps", body: "Liquid pump category for water transfer, dispensing, and compact modules.", href: "/diaphragm-liquid-pump/" },
      { title: "BD-04W Diaphragm Liquid Pump", body: "Higher-flow compact liquid transfer platform.", href: "/product/bd-04w-diaphragm-liquid-pump/" },
      { title: "BD-07W High Pressure Liquid Pump", body: "High-pressure option for water purifier and pressure modules.", href: "/product/bd-07w-high-pressure-liquid-pump/" },
      { title: "Pump Accessories and Controls", body: "Tubing, valves, filters, silencers, and module parts.", href: "/pump-accessories/" }
    ],
    sections: [
      ["Common equipment", ["Water purifiers, beverage dispensing systems, cleaning devices, compact water transfer modules, and small filling systems."]],
      ["Selection focus", ["Required pressure, useful flow, self-priming height, seal reliability, food-contact planning, tubing loss, and service interval."]],
      ["RFQ details", ["Provide liquid type, flow, pressure, inlet height, tubing layout, voltage, duty cycle, and expected annual quantity."]]
    ]
  },
  {
    slug: "applications/beauty-aesthetic-equipment",
    title: "Micro Pumps for Beauty and Aesthetic Equipment",
    description: "Micro vacuum pumps, air pumps, liquid pumps, and piston pumps for beauty equipment, aesthetic devices, suction modules, pressure systems, and liquid handling.",
    h1: "Micro Pumps for Beauty and Aesthetic Equipment",
    intro: "Beauty devices often combine compact suction, controlled pressure, liquid handling, low noise, and pleasant device-level acoustic behavior.",
    cards: [
      { title: "Miniature Vacuum Pumps", body: "Compact vacuum options for suction and aesthetic treatment devices.", href: "/miniature-vacuum-pump/" },
      { title: "Micro Diaphragm Air Pumps", body: "Clean airflow and vacuum platforms for compact modules.", href: "/micro-diaphragm-air-pump/" },
      { title: "BD-04 High Flow Diaphragm Air Pump", body: "Stronger vacuum and airflow option for suction devices.", href: "/product/bd-04-high-flow-diaphragm-pump/" },
      { title: "BD-07 Micro Piston Pump", body: "High pressure and strong suction platform for demanding devices.", href: "/product/bd-07-micro-piston-pump/" }
    ],
    sections: [
      ["Common equipment", ["Vacuum suction instruments, skin care devices, pressure massage systems, liquid delivery modules, and compact aesthetic treatment equipment."]],
      ["Selection focus", ["Noise, vibration, suction feel, pressure stability, duty cycle, device enclosure resonance, tubing layout, and accessory matching."]],
      ["RFQ details", ["Provide suction or pressure target, flow, voltage, noise requirement, treatment mode, duty cycle, and installation space."]]
    ]
  },
  {
    slug: "applications/automation-robotics",
    title: "Micro Pump Applications for Automation and Robotics",
    description: "Micro air pumps, vacuum pumps, piston pumps, compressors, and accessory modules for automation, robotics, vacuum handling, compact pneumatic systems, and tools.",
    h1: "Micro Pump Applications for Automation and Robotics",
    intro: "Automation and robotics systems need compact pumps that fit limited space while providing reliable pressure, vacuum, response, and controllable operation.",
    cards: [
      { title: "Micro Piston Pumps", body: "High-pressure and strong vacuum options for compact automation.", href: "/micro-piston-pump/" },
      { title: "Mini Compressors", body: "Higher airflow and pressure modules for compact systems.", href: "/mini-compressor/" },
      { title: "BD-79 High Pressure Piston Pump", body: "Strong output piston platform for pressure and suction systems.", href: "/product/bd-79-high-pressure-piston-pump/" },
      { title: "BD-08 Mini Compressor", body: "High-flow compressor option for compact pressure modules.", href: "/product/bd-08-mini-compressor/" }
    ],
    sections: [
      ["Common equipment", ["Vacuum handling, compact pneumatic grippers, robotics modules, portable tools, automation fixtures, and pressure or suction subsystems."]],
      ["Selection focus", ["Response time, useful vacuum or pressure, duty cycle, heat rise, vibration, mounting, power supply margin, and control method."]],
      ["RFQ details", ["Provide operating cycle, target pressure or vacuum, flow, voltage, load startup condition, enclosure size, and control requirement."]]
    ]
  },
  {
    slug: "applications/environmental-monitoring",
    title: "Micro Pumps for Environmental Monitoring",
    description: "Gas sampling pumps, vacuum pumps, diaphragm air pumps, and compact modules for environmental monitoring, analyzers, portable detectors, and sampling devices.",
    h1: "Micro Pumps for Environmental Monitoring",
    intro: "Environmental monitoring equipment needs stable sampling flow, reliable vacuum, long-life operation, and resistance planning for filters and tubing.",
    cards: [
      { title: "Gas Sampling Pumps", body: "Pump category for analyzers and monitoring systems.", href: "/gas-sampling-pump/" },
      { title: "Miniature Vacuum Pumps", body: "Compact suction platforms for portable monitoring devices.", href: "/miniature-vacuum-pump/" },
      { title: "BD-03 Diaphragm Air Pump", body: "Medium-flow sampling and airflow platform.", href: "/product/bd-03-diaphragm-air-pump/" },
      { title: "BD-04 High Flow Diaphragm Air Pump", body: "Higher-flow reserve for stronger sampling paths.", href: "/product/bd-04-high-flow-diaphragm-pump/" }
    ],
    sections: [
      ["Common equipment", ["Air quality monitors, gas detectors, particle counters, portable analyzers, environmental sampling devices, and laboratory monitoring systems."]],
      ["Selection focus", ["Useful flow under filter resistance, gas compatibility, vacuum reserve, battery or DC power limits, duty cycle, noise, and life test conditions."]],
      ["RFQ details", ["Provide gas path layout, filter resistance, flow target, vacuum target, voltage, duty cycle, ambient environment, and quantity."]]
    ]
  },
  {
    slug: "applications/laboratory-analytical-instruments",
    title: "Micro Pumps for Laboratory and Analytical Instruments",
    description: "Micro air, vacuum, gas sampling, and liquid pump options for laboratory instruments, analytical devices, dosing, sample movement, and compact fluid control.",
    h1: "Micro Pumps for Laboratory and Analytical Instruments",
    intro: "Laboratory and analytical instruments need controlled flow paths, clean movement of gas or liquid, compact integration, and repeatable output.",
    cards: [
      { title: "Gas Sampling Pumps", body: "Stable gas movement for analytical and sampling instruments.", href: "/gas-sampling-pump/" },
      { title: "Diaphragm Liquid Pumps", body: "Self-priming liquid transfer and dosing options.", href: "/diaphragm-liquid-pump/" },
      { title: "BD-01W Micro Diaphragm Liquid Pump", body: "Compact low-flow liquid transfer and dosing platform.", href: "/product/bd-01w-micro-liquid-pump/" },
      { title: "BD-02 Micro Air and Vacuum Pump", body: "Compact air and vacuum platform for instrument modules.", href: "/product/bd-02-micro-air-vacuum-pump/" }
    ],
    sections: [
      ["Common equipment", ["Analytical instruments, laboratory dosing, sample movement, compact gas paths, low-flow liquid handling, and small automation modules."]],
      ["Selection focus", ["Flow stability, material compatibility, contamination control, pulse behavior, tubing loss, acoustic behavior, and service life."]],
      ["RFQ details", ["Provide medium, chemical properties, target flow, pressure or vacuum, acceptable pulsation, voltage, duty cycle, and space limit."]]
    ]
  }
];

const localImage = (file) => `/assets/img/boden/${file}`;

const findPage = (collection, slug) => collection.find((page) => page.slug === slug);

const appendUnique = (target, items) => {
  items.forEach((item) => {
    if (!target.includes(item)) target.push(item);
  });
};

const addSection = (page, heading, items) => {
  page.sections = page.sections || [];
  page.sections.push([heading, items]);
};

const addMedia = (page, items) => {
  page.media = [...(page.media || []), ...items];
};

const addCards = (page, cards) => {
  page.cards = [...(page.cards || []), ...cards];
};

const addEnhancedModelPages = () => {
  modelPages.push(
    {
      slug: "product/bd-02ab-brushless-air-vacuum-pump",
      category: "micro-diaphragm-air-pump",
      model: "BD-02AB / BD-02VB",
      title: "BD-02AB Brushless Air and Vacuum Pump",
      description: "BD-02AB / BD-02VB brushless micro diaphragm pump for compact gas sampling, suction, massage, and precision air paths.",
      h1: "BD-02AB / BD-02VB Brushless Air and Vacuum Pump",
      intro: "BD-02AB and BD-02VB extend the compact BD-02 platform with brushless motor options for projects that need longer life and stable output in a small envelope.",
      range: [["Type", "Brushless diaphragm air / vacuum pump"], ["Flow", "1-3 L/min"], ["Pressure", "0.5-1.5 bar"], ["Vacuum", "-30 to -65 kPa"], ["Dimensions", "Approx. 53 x 24 x 40 mm"], ["Use", "Compact gas, air, and suction paths"]],
      applications: ["Precision dosing air paths", "Massage devices", "Portable gas sampling", "Medical monitoring modules"],
      selection: ["Choose the brushless variant when duty cycle or lifetime is more important than lowest cost.", "Check useful flow after sensor, tubing, and filter losses.", "Confirm the required outlet direction and mounting position before tooling."],
      media: [[localImage("diaphragm-bd02.jpg"), "BD-02 compact brushless diaphragm pump reference"]]
    },
    {
      slug: "product/bd-03ab-brushless-diaphragm-pump",
      category: "micro-diaphragm-air-pump",
      model: "BD-03AB / BD-03VB",
      title: "BD-03AB Brushless Diaphragm Pump",
      description: "BD-03AB / BD-03VB brushless diaphragm pump for 3-6 L/min air and vacuum paths in analytical, industrial, and environmental equipment.",
      h1: "BD-03AB / BD-03VB Brushless Diaphragm Pump",
      intro: "BD-03AB and BD-03VB provide a brushless 3-6 L/min class platform for OEM devices needing better lifetime, medium airflow, and compact installation.",
      range: [["Type", "Brushless diaphragm air / vacuum pump"], ["Flow", "3-6 L/min"], ["Pressure", "2-3 bar"], ["Vacuum", "-45 to -65 kPa"], ["Dimensions", "Approx. 64 x 30 x 49 mm"], ["Use", "Medium-flow gas sampling and vacuum modules"]],
      applications: ["Environmental monitoring", "Laboratory equipment", "Industrial gas paths", "Portable analytical instruments"],
      selection: ["Use this platform when BD-02 output is not enough but BD-04 is physically too large.", "Validate heat rise at the real duty cycle.", "Check vibration and enclosure resonance during prototype testing."],
      media: [[localImage("diaphragm-bd03.jpg"), "BD-03 medium-flow diaphragm pump reference"]]
    },
    {
      slug: "product/bd-04ab-high-flow-brushless-diaphragm-pump",
      category: "micro-diaphragm-air-pump",
      model: "BD-04AB / BD-04VB",
      title: "BD-04AB High Flow Brushless Diaphragm Pump",
      description: "BD-04AB / BD-04VB brushless diaphragm pump for high-flow air and vacuum paths with 7-20 L/min class output.",
      h1: "BD-04AB / BD-04VB High Flow Brushless Diaphragm Pump",
      intro: "BD-04AB and BD-04VB are high-flow brushless diaphragm pump options for OEM devices that require stronger vacuum or airflow with longer motor life.",
      range: [["Type", "High-flow brushless diaphragm air / vacuum pump"], ["Flow", "7-20 L/min"], ["Pressure", "2-3.5 bar"], ["Vacuum", "-70 to -82 kPa"], ["Dimensions", "Approx. 92 x 40 x 72 mm"], ["Use", "High-flow gas sampling, medical, and industrial modules"]],
      applications: ["Gas analysis and monitoring", "Medical monitoring", "Industrial suction", "Laboratory vacuum paths"],
      selection: ["Use brushless BD-04 variants for higher duty cycle projects.", "Plan soft mounting and silencers early.", "Confirm startup current and power supply margin in the final product."],
      media: [[localImage("diaphragm-bd04.jpg"), "BD-04 high-flow diaphragm pump reference"]]
    },
    {
      slug: "product/bd-05t0151500b-brushless-mini-diaphragm-pump",
      category: "gas-sampling-pump",
      model: "BD-05T01.51500B",
      title: "BD-05T01.51500B Brushless Mini Diaphragm Pump",
      description: "BD-05T01.51500B brushless mini diaphragm pump for stable low-flow gas sampling, vacuum, and portable analytical devices.",
      h1: "BD-05T01.51500B Brushless Mini Diaphragm Pump",
      intro: "BD-05T01.51500B is a compact brushless gas-path pump for low-flow sampling applications where stable operation and service life matter.",
      range: [["Type", "Brushless mini diaphragm gas pump"], ["Flow", "Approx. 1.5 L/min class"], ["Function", "Air transfer or vacuum sampling"], ["Voltage", "Low-voltage DC options by project"], ["Medium", "Clean air and gas"], ["Use", "Portable sampling and analytical devices"]],
      applications: ["Gas sampling", "Portable detectors", "PID modules", "Low-flow analytical instruments"],
      selection: ["Use this class when the sampling path needs stable low flow rather than maximum airflow.", "Define useful flow at the sensor, not free flow at the pump.", "Confirm filter resistance, tubing length, and target response time."]
    },
    {
      slug: "product/bd-05t067l-small-brushless-diaphragm-pump",
      category: "gas-sampling-pump",
      model: "BD-05T06.7L",
      title: "BD-05T06.7L Small Brushless Diaphragm Pump",
      description: "BD-05T06.7L small brushless diaphragm pump for 7 L/min class gas sampling and vacuum applications.",
      h1: "BD-05T06.7L Small Brushless Diaphragm Pump",
      intro: "BD-05T06.7L is a compact brushless diaphragm platform for projects needing stronger sampling flow while retaining long-life DC operation.",
      range: [["Type", "Brushless diaphragm gas pump"], ["Flow", "7 L/min class"], ["Vacuum", "Up to -85 kPa class"], ["Pressure", "Up to 2.5 bar class"], ["Voltage", "12V / 24V options"], ["Use", "Gas sampling, medical, and laboratory paths"]],
      applications: ["CEMS sample paths", "Laboratory gas movement", "Medical suction modules", "Environmental monitoring"],
      selection: ["Use this class when filter and tubing losses require more vacuum margin.", "Check flow stability over filter loading.", "Validate heat rise in the intended duty cycle."]
    },
    {
      slug: "product/bd-05tvb-dual-head-brushless-vacuum-pump",
      category: "gas-sampling-pump",
      model: "BD-05TVB",
      title: "BD-05TVB Dual Head Brushless Vacuum Pump",
      description: "BD-05TVB dual head brushless diaphragm vacuum pump for strong compact vacuum and stable flow in medical, gas sampling, and laboratory devices.",
      h1: "BD-05TVB Dual Head Brushless Vacuum Pump",
      intro: "BD-05TVB uses a dual-head brushless diaphragm structure for stronger compact vacuum and stable flow where single-head platforms are not enough.",
      range: [["Type", "Dual-head brushless diaphragm vacuum pump"], ["Flow", "7.2 L/min class"], ["Vacuum", "Up to -90 kPa class"], ["Motor", "Brushless DC"], ["Medium", "Clean air and gas"], ["Use", "Strong compact vacuum modules"]],
      applications: ["Medical suction modules", "Gas sampling", "Laboratory vacuum", "Compact analytical instruments"],
      selection: ["Use dual-head construction when vacuum response and flow stability both matter.", "Compare series/parallel plumbing needs before module design.", "Include shock absorption and silencers for noise-sensitive devices."]
    },
    {
      slug: "product/bd-05t0512l-dual-head-gas-diaphragm-pump",
      category: "gas-sampling-pump",
      model: "BD-05T0512L",
      title: "BD-05T0512L Dual Head Gas Diaphragm Pump",
      description: "BD-05T0512L dual-head gas diaphragm pump for 12 L/min class sample movement in CEMS, lab, medical, and monitoring systems.",
      h1: "BD-05T0512L Dual Head Gas Diaphragm Pump",
      intro: "BD-05T0512L is a higher-flow dual-head gas diaphragm pump for systems that need stable sample movement through practical tubing and filter resistance.",
      range: [["Type", "Dual-head diaphragm gas pump"], ["Flow", "12 L/min class"], ["Vacuum", "-72 kPa class"], ["Pressure", "1.5 bar class"], ["Motor", "Brushless DC"], ["Use", "Monitoring and laboratory sample paths"]],
      applications: ["CEMS", "Laboratory instruments", "Medical devices", "Environmental monitoring"],
      selection: ["Use this class when the system needs more flow than compact single-head pumps.", "Calculate useful flow with filter, tubing, and valve losses included.", "Validate response time and noise in the finished enclosure."]
    },
    {
      slug: "product/bd-05tf110w-micro-liquid-pump",
      category: "diaphragm-liquid-pump",
      model: "BD-05TF110W",
      title: "BD-05TF110W Micro Liquid Diaphragm Pump",
      description: "BD-05TF110W micro liquid diaphragm pump for 110 mL/min class self-priming transfer, dispensing, and compact fluid systems.",
      h1: "BD-05TF110W Micro Liquid Diaphragm Pump",
      intro: "BD-05TF110W is a compact liquid diaphragm pump for low-flow transfer and dispensing where self-priming, small size, and stable output matter.",
      range: [["Type", "Micro liquid diaphragm pump"], ["Water flow", "110 mL/min class"], ["Pressure", "Up to 2.5 bar class"], ["Suction head", "Up to 7 m class"], ["Dimensions", "Approx. 82.6 x 31.1 x 57.9 mm"], ["Weight", "Approx. 200 g"]],
      applications: ["Liquid analysis", "Liquid circulation", "Inkjet systems", "Liquid dispensing", "IVD instruments"],
      selection: ["Use this model class for compact low-flow dispensing.", "Confirm wetted material compatibility with the liquid.", "Test bubble behavior and dry-start recovery in the final device."],
      media: [[localImage("liquid-bd05tf110w.jpg"), "BD-05TF110W micro liquid diaphragm pump reference"]]
    },
    {
      slug: "product/bd-05tf600wb-ink-liquid-pump",
      category: "diaphragm-liquid-pump",
      model: "BD-05TF600WB",
      title: "BD-05TF600WB Ink Liquid Pump",
      description: "BD-05TF600WB ink liquid diaphragm pump for 600 mL/min class transfer, ink circulation, and compact fluid-control paths.",
      h1: "BD-05TF600WB Ink Liquid Pump",
      intro: "BD-05TF600WB is a 600 mL/min class liquid diaphragm pump suitable for ink transfer, compact circulation, and OEM fluid-control modules.",
      range: [["Type", "Diaphragm liquid / ink pump"], ["Water flow", "600 mL/min class"], ["Pressure", "Up to 2.5 bar class"], ["Suction head", "Up to 7 m class"], ["Voltage", "6V / 12V / 24V options"], ["Dimensions", "Approx. 94 x 31.1 x 58.1 mm"]],
      applications: ["Inkjet printing", "Waste ink transfer", "Liquid circulation", "Small filling systems"],
      selection: ["Use this class when an ink path needs more transfer flow than low-flow dosing pumps.", "Confirm diaphragm, valve, and connector compatibility with the ink.", "Validate leak control and long-idle restart behavior."],
      media: [[localImage("liquid-bd05tf600wb.jpg"), "BD-05TF600WB ink liquid pump reference"]]
    },
    {
      slug: "product/bd-08ab-d-high-flow-mini-compressor",
      category: "mini-compressor",
      model: "BD-08AB-D",
      title: "BD-08AB-D High Flow Mini Compressor",
      description: "BD-08AB-D high-flow mini compressor for 80 L/min class pressure systems, oxygen equipment, leak detection, spray boosters, and industrial air modules.",
      h1: "BD-08AB-D High Flow Mini Compressor",
      intro: "BD-08AB-D is a dual-head high-flow compressor option for compact systems that need strong airflow and pressure in a DC-powered package.",
      range: [["Type", "High-flow mini compressor"], ["Flow", "80 L/min class"], ["Pressure", "Up to 7 bar class"], ["Voltage", "24V DC"], ["Motor", "Brushless version available"], ["Use", "High-flow pressure and vacuum generation"]],
      applications: ["Portable oxygen concentrators", "Car brake boosters", "Spray boosters", "Leak detectors", "Environmental monitoring", "Industrial air compression"],
      selection: ["Use this class when airflow demand is the primary driver.", "Confirm startup current, heat rise, and pressure relief in the final system.", "Plan acoustic and vibration treatment early in the enclosure design."],
      media: [[localImage("compressor-80l.jpg"), "BD-08 high-flow mini compressor reference"]]
    }
  );
};

const enrichProductContent = () => {
  const air = findPage(productPages, "micro-diaphragm-air-pump");
  if (air) {
    air.range = [
      ["Model families", "BD-01, BD-02, BD-03, BD-04, BD-05T precision gas pump variants"],
      ["Flow range", "0.5-22 L/min across compact to high-flow diaphragm platforms"],
      ["Pressure range", "0.5-3.5 bar depending on head, motor, and seal configuration"],
      ["Vacuum range", "-30 to -85 kPa for common single-head platforms; selected dual-head variants can reach higher vacuum"],
      ["Voltage", "3V, 5V, 6V, 9V, 12V, 24V options by model"],
      ["Motor options", "Brush, brushless DC, and selected long-life gas sampling variants"]
    ];
    addMedia(air, [
      [localImage("diaphragm-bd01.jpg"), "BD-01 compact diaphragm pump"],
      [localImage("diaphragm-bd02.jpg"), "BD-02 compact diaphragm pump"],
      [localImage("diaphragm-bd03.jpg"), "BD-03 medium-flow diaphragm pump"],
      [localImage("diaphragm-bd04.jpg"), "BD-04 high-flow diaphragm pump"]
    ]);
    addSection(air, "Detailed model matrix", [
      "BD-01A / BD-01V: 0.5-1 L/min, 0.5-1 bar, -30 to -60 kPa, approx. 45 x 15.5 x 25.5 mm.",
      "BD-02A / BD-02V: 1-3.5 L/min, 0.5-1.5 bar, -30 to -65 kPa, approx. 55 x 24 x 40 mm.",
      "BD-03A / BD-03V: 3-7 L/min, 2-3 bar, -45 to -70 kPa, approx. 76 x 30 x 49 mm.",
      "BD-04A / BD-04V: 7-22 L/min, 2.5-3.5 bar, -75 to -82 kPa, approx. 101 x 40 x 72 mm.",
      "BD-05T precision gas variants: low-flow to dual-head brushless options for gas sampling, PID, laboratory, and environmental monitoring systems."
    ]);
  }

  const vacuum = findPage(productPages, "miniature-vacuum-pump");
  if (vacuum) {
    vacuum.range = [
      ["Pump families", "BD-01V, BD-02V, BD-03V, BD-04V, BD-05TVB, BD-07V piston platforms"],
      ["Vacuum range", "-30 to -90 kPa depending on pump principle and head structure"],
      ["Flow range", "0.5-45 L/min for compact sampling to high-output suction modules"],
      ["Motor choices", "Brush and brushless options"],
      ["Response factors", "Tubing volume, leak rate, filter resistance, target vacuum, and control algorithm"],
      ["Integration", "Pump plus filter, tubing, silencer, shock absorber, and valve module support"]
    ];
    addSection(vacuum, "Vacuum response considerations", [
      "A high free-flow rating does not guarantee fast vacuum response if the system has large dead volume or leaks.",
      "For vacuum grippers, measure time to target vacuum at the cup or work point, not only at the pump port.",
      "For gas detectors and PID instruments, filter loading and tubing length can reduce useful flow and delay response."
    ]);
  }

  const liquid = findPage(productPages, "diaphragm-liquid-pump");
  if (liquid) {
    liquid.range = [
      ["Model families", "BD-01W, BD-02W, BD-04W, BD-05TF, BD-07W high-pressure liquid platforms"],
      ["Water flow", "110-1500 mL/min for compact liquid transfer; selected high-flow options by project"],
      ["Pressure", "2.5-10 bar depending on pump head and model class"],
      ["Suction head", "Typical 4-7 m class depending on liquid path and model"],
      ["Voltage", "6V, 12V, 24V common options"],
      ["Wetted materials", "EPDM, PTFE, FKM, FFKM options by liquid chemistry and project"]
    ];
    addMedia(liquid, [
      [localImage("liquid-bd05tf110w.jpg"), "BD-05TF110W compact liquid pump"],
      [localImage("liquid-bd05tf600wb.jpg"), "BD-05TF600WB ink liquid pump"],
      [localImage("liquid-bd07w.jpg"), "BD-07W high-pressure liquid pump"]
    ]);
    addSection(liquid, "Expanded liquid pump matrix", [
      "BD-05TF110W: 110 mL/min class, 2.5 bar class, compact low-flow dispensing and transfer.",
      "BD-05TF300WB / 450WB / 600WB: medium-flow self-priming liquid paths for ink, dispensing, and circulation.",
      "BD-05TF400WB: compact 400 mL/min class layout with higher pressure reserve for limited installation space.",
      "BD-07W / BD-07WB: 10 bar class high-pressure liquid pump options for water purifier, beverage, atomizer, and pressure modules."
    ]);
  }

  const piston = findPage(productPages, "micro-piston-pump");
  if (piston) {
    piston.range = [
      ["Model families", "BD-07A/V, BD-07AB/VB, BD-07A-M/V-M, BD-079A-M/V-M"],
      ["Flow range", "15-50 L/min depending on piston size and motor configuration"],
      ["Pressure range", "4.5-7 bar typical high-pressure piston platforms"],
      ["Vacuum range", "-80 to -86 kPa"],
      ["Voltage", "12V and 24V common options"],
      ["Use cases", "Vacuum packaging, tire pump, sprayer, oxygen concentrator, therapy and aesthetic equipment"]
    ];
    addMedia(piston, [
      [localImage("piston-bd07.jpg"), "BD-07 piston gas pump"],
      [localImage("piston-bd079.jpg"), "BD-079 high-output piston pump"]
    ]);
    addSection(piston, "Piston model matrix", [
      "BD-07A / BD-07V: 15-40 L/min, 4.5-6.5 bar, -80 to -85 kPa.",
      "BD-07AB / BD-07VB: brushless option, 15-35 L/min, 4.5-6 bar, -80 to -86 kPa.",
      "BD-07A-M / BD-07V-M: high-temperature-resistant platform for demanding compact systems.",
      "BD-079A-M / BD-079V-M: 30-50 L/min, 7 bar class, high-flow pressure/vacuum reserve."
    ]);
  }

  const compressor = findPage(productPages, "mini-compressor");
  if (compressor) {
    compressor.range = [
      ["Model families", "BD-08A/V, BD-08AB/VB, BD-08A-D/V-D, BD-089AB/VB"],
      ["Flow range", "35-80 L/min depending on single-head or dual-head structure"],
      ["Pressure range", "2-8 bar class"],
      ["Vacuum", "-80 to -95 kPa on selected vacuum configurations"],
      ["Materials", "Aluminum alloy or stainless steel body options by project"],
      ["Motors", "Brush and brushless DC options; brushless platforms target longer lifetime"]
    ];
    addMedia(compressor, [
      [localImage("compressor-bd08.jpg"), "BD-08 mini compressor family"],
      [localImage("compressor-80l.jpg"), "80 L/min class mini compressor reference"]
    ]);
    addSection(compressor, "Compressor model matrix", [
      "BD-08AB-S / BD-08VB-S: 40-45 L/min class brushless pressure or vacuum variants.",
      "BD-08AB-D / BD-08VB-D: dual-head brushless options up to 70-80 L/min class output.",
      "BD-08A-S / BD-08V-S: brush motor pressure or vacuum options for cost-sensitive designs.",
      "BD-089AB-D / BD-089VB-D: higher-pressure brushless platform for compact high-output systems."
    ]);
  }

  const sampling = findPage(productPages, "gas-sampling-pump");
  if (sampling) {
    sampling.range = [
      ["Model families", "BD-01/02/03/04 gas paths, BD-05T precision gas sampling, BD-05TVB dual-head vacuum"],
      ["Flow range", "Low-flow PID sampling to 12 L/min class dual-head sample movement"],
      ["Vacuum", "-30 to -90 kPa depending on model and head structure"],
      ["Pressure", "Selected platforms to 1.5-3.5 bar"],
      ["Motor", "Brushless options for long-life analytical and monitoring equipment"],
      ["Path design", "Filters, tubing, sensor path, and valve losses must be included in selection"]
    ];
    addSection(sampling, "Gas sampling model notes", [
      "BD-05T01.51500B: low-flow brushless sampling for portable detectors and analytical paths.",
      "BD-05T06.7L: 7 L/min class brushless sampling where filter resistance requires more margin.",
      "BD-05TVB: dual-head compact vacuum platform for stronger suction and stable response.",
      "BD-05T0512L: 12 L/min class dual-head sample pump for CEMS, lab, medical, and monitoring systems."
    ]);
  }
};

const addEngineeringBlogPages = () => {
  blogPages.push(
    {
      slug: "blog/mini-air-compressor-design-trade-offs",
      title: "Mini Air Compressor Design Trade-Offs: Pressure, Noise, Weight, and Heat",
      description: "Understand why compact compressors cannot maximize pressure, low noise, light weight, airflow, and lifetime at the same time.",
      h1: "Mini Air Compressor Design Trade-Offs",
      intro: "OEM teams often ask for a compressor that is very small, quiet, lightweight, high-pressure, and high-flow. In practice, every requirement changes motor size, head structure, heat, vibration, and service life.",
      media: [[localImage("compressor-bd08.jpg"), "Mini compressor product family reference"]],
      sections: [
        ["Core trade-offs", ["Higher pressure usually requires stronger motor torque, tighter sealing, and more heat management.", "Higher flow often requires larger heads or dual-head structure, which increases size, current, vibration, and acoustic output.", "Lower noise depends on motor speed, mounting, enclosure resonance, tubing, silencers, and load condition."]],
        ["Selection guidance", ["Define the real working pressure and useful flow before comparing free-flow data.", "Decide whether peak pressure, continuous duty, response time, or acoustic behavior is the primary requirement.", "Test the compressor in the finished enclosure because bench noise and device noise can be very different."]],
        ["RFQ checklist", ["Target pressure or vacuum, required flow at working load, voltage, duty cycle, operating temperature, enclosure size, acceptable noise, and expected lifetime."]]
      ]
    },
    {
      slug: "blog/micro-vacuum-pump-photoionization-detectors",
      title: "How to Choose a Micro Vacuum Pump for PID Gas Detectors",
      description: "Pump selection notes for photoionization detector sampling accuracy, response time, filter resistance, and stable useful flow.",
      h1: "How to Choose a Micro Vacuum Pump for PID Gas Detectors",
      intro: "A PID sensor can be accurate while the instrument still reads poorly if the sampling pump cannot provide stable flow through tubing, filters, and the sensor path.",
      sections: [
        ["Key selection factors", ["Useful flow at the sensor matters more than free-flow pump data.", "Vacuum margin must cover clean filters, loaded filters, tubing bends, valves, and inlet restrictions.", "Low pulsation and stable speed help improve repeatability in portable gas detection instruments."]],
        ["Recommended pump classes", ["Low-flow BD-05T brushless variants for compact PID and VOC detectors.", "BD-03 or BD-04 diaphragm platforms when the path requires more flow reserve.", "Dual-head vacuum options when response time or filter loading is a primary issue."]],
        ["Prototype tests", ["Measure response time to target concentration, flow stability across filter loading, startup under low battery, and noise in the final enclosure."]]
      ]
    },
    {
      slug: "blog/miniature-air-pump-engineers-requirements",
      title: "10 Miniature Air Pump Requirements OEM Engineers Often Overlook",
      description: "A practical checklist for OEM miniature air pump requirements beyond flow and pressure ratings.",
      h1: "10 Miniature Air Pump Requirements OEM Engineers Often Overlook",
      intro: "Flow and pressure are only the starting point. Real device success depends on duty cycle, noise, heat, startup load, motor life, tubing loss, and final product validation.",
      media: [[localImage("diaphragm-bd03.jpg"), "Medium-flow diaphragm air pump reference"]],
      sections: [
        ["Often missed requirements", ["Useful flow at working pressure or vacuum.", "Startup current and startup under load.", "Noise after mounting inside the enclosure.", "Heat rise across the intended duty cycle.", "Vibration transfer through screws, brackets, and tubing.", "Motor lifetime and brush or brushless selection.", "Material compatibility with gas, humidity, and cleaning conditions.", "Filter loading and pressure loss over time.", "PWM or voltage speed-control requirements.", "Production consistency and sample-to-batch correlation."]],
        ["How to specify better", ["Send a working-point requirement instead of only a free-flow target.", "Include tubing length, filter type, valve count, enclosure size, and duty cycle.", "Ask for recommended accessories when noise, contamination, or stable flow is important."]]
      ]
    },
    {
      slug: "blog/miniature-dual-head-diaphragm-air-pumps-guide",
      title: "Miniature Dual-Head Diaphragm Pump Guide: Flow, Vacuum, and Integration",
      description: "How to evaluate dual-head diaphragm pumps for stronger flow, vacuum response, and compact OEM gas paths.",
      h1: "Miniature Dual-Head Diaphragm Pump Guide",
      intro: "Dual-head diaphragm pumps can improve flow, vacuum response, and stability, but the right configuration depends on whether the heads are used for parallel flow, stronger vacuum, or a specific pneumatic layout.",
      sections: [
        ["When dual-head helps", ["The system needs faster vacuum response than a compact single-head pump can provide.", "Filter and tubing resistance reduce the useful flow too much.", "The module needs more stable sample movement or pressure reserve in a limited space."]],
        ["Integration choices", ["Parallel head routing usually supports higher flow.", "Series or vacuum-oriented routing can improve vacuum behavior depending on design.", "Noise, vibration, and heat must be tested because dual-head output can increase mechanical energy in the enclosure."]],
        ["RFQ checklist", ["Target flow, target vacuum or pressure, response-time requirement, head routing preference, voltage, duty cycle, and acoustic limit."]]
      ]
    },
    {
      slug: "blog/micro-pump-laboratory-analytical-instruments",
      title: "How to Choose a Micro Pump for Laboratory Analytical Instruments",
      description: "Micro pump selection for lab instruments, dosing, gas sampling, liquid transfer, and compact analytical modules.",
      h1: "How to Choose a Micro Pump for Laboratory Analytical Instruments",
      intro: "Laboratory instruments need controlled movement of air, gas, vacuum, or liquid. Pump choice affects sample timing, repeatability, contamination risk, noise, and maintenance.",
      sections: [
        ["Selection priorities", ["Stable useful flow at the working point.", "Material compatibility for gas, liquid, cleaning fluid, or reagent exposure.", "Low contamination and oil-free operation for analytical paths.", "Acceptable pulsation, vibration, and acoustic behavior."]],
        ["Pump family mapping", ["Micro diaphragm air pumps for gas movement and compact pressure/vacuum paths.", "BD-05T precision gas pumps for low-flow sampling and portable analysis.", "Diaphragm liquid pumps for reagent transfer, waste liquid, ink, or water-based paths.", "Piston or compressor platforms when pressure reserve is more important than minimum size."]],
        ["Validation plan", ["Test flow stability, sample timing, pressure loss, chemical compatibility, leakage, duty cycle, and service access inside the actual instrument layout."]]
      ]
    },
    {
      slug: "blog/micro-pumps-robotics-automation",
      title: "How Micro Pumps Are Used in Robotics and Automation",
      description: "Micro pump use cases in vacuum gripping, soft actuation, portable tools, inspection robots, and compact pneumatic automation.",
      h1: "How Micro Pumps Are Used in Robotics and Automation",
      intro: "Robotics and automation systems use micro pumps for vacuum gripping, pneumatic actuation, compact pressure modules, sample collection, and portable tool functions.",
      sections: [
        ["Common use cases", ["Vacuum gripping for lightweight pick-and-place tasks.", "Soft robotic actuation and pressure modulation.", "Portable pneumatic tools and compact pressure modules.", "Inspection robots that need gas sampling or suction near the work point."]],
        ["Selection priorities", ["Response time to target vacuum or pressure.", "Useful flow after tubing and cup leakage.", "Duty cycle, heat rise, and power budget.", "Noise, vibration, and mounting inside a small robot body."]],
        ["Recommended pump classes", ["Diaphragm vacuum pumps for compact suction.", "Piston pumps for stronger pressure or vacuum reserve.", "Mini compressors when the system needs higher airflow or pressure."]]
      ]
    }
  );
};

addEnhancedModelPages();
enrichProductContent();
addEngineeringBlogPages();

const applicationsIndex = infoPages.find((page) => page.slug === "applications");
if (applicationsIndex) {
  applicationsIndex.cards = applicationPages.map((page) => ({
    title: page.h1,
    body: page.description,
    href: `/${page.slug}/`
  }));
}

productPages.forEach((page) => {
  const matches = modelPages.filter((model) => model.category === page.slug);
  if (!matches.length) return;
  page.cards = matches.map((model) => ({
    title: model.h1,
    body: model.description,
    href: `/${model.slug}/`
  }));
});

modelPages.forEach((page) => {
  const category = productPages.find((item) => item.slug === page.category);
  const relatedBlog = page.category === "diaphragm-liquid-pump"
    ? "blog/micro-pump-laboratory-analytical-instruments"
    : page.category === "mini-compressor"
      ? "blog/mini-air-compressor-design-trade-offs"
      : page.category === "gas-sampling-pump"
        ? "blog/micro-vacuum-pump-photoionization-detectors"
        : "blog/miniature-air-pump-engineers-requirements";
  const blog = findPage(blogPages, relatedBlog);
  page.cards = [
    ...(page.cards || []),
    ...(category
      ? [{
          title: `${category.h1} Category`,
          body: `Compare ${page.model || page.h1} with adjacent models, ranges, and application notes.`,
          href: `/${category.slug}/`
        }]
      : []),
    ...(blog
      ? [{
          title: blog.h1,
          body: blog.description,
          href: `/${blog.slug}/`
        }]
      : []),
    {
      title: "Send Pump RFQ",
      body: "Share flow, pressure, vacuum, voltage, duty cycle, noise target, and annual quantity for model matching.",
      href: rfqPath
    }
  ];
});

blogPages.forEach((page) => {
  const lower = `${page.h1} ${page.description} ${page.intro}`.toLowerCase();
  const relatedProducts = productPages
    .filter((product) => {
      const productText = `${product.h1} ${product.description}`.toLowerCase();
      return (
        (lower.includes("compressor") && product.slug === "mini-compressor") ||
        (lower.includes("vacuum") && product.slug === "miniature-vacuum-pump") ||
        (lower.includes("gas") && product.slug === "gas-sampling-pump") ||
        (lower.includes("liquid") && product.slug === "diaphragm-liquid-pump") ||
        (lower.includes("robot") && product.slug === "micro-piston-pump") ||
        (lower.includes("air pump") && product.slug === "micro-diaphragm-air-pump") ||
        lower.includes(productText.split(" ")[0])
      );
    })
    .slice(0, 3);
  page.cards = [
    ...(page.cards || []),
    ...relatedProducts.map((product) => ({
      title: product.h1,
      body: product.description,
      href: `/${product.slug}/`
    })),
    {
      title: "Product Category Matrix",
      body: "Browse model families before choosing an engineering article or RFQ path.",
      href: "/products/"
    }
  ];
});

const overviewPages = [
  {
    slug: "products",
    title: "Micro Pump Product Categories",
    description: "Browse JSG DC Pump product categories including micro diaphragm air pumps, vacuum pumps, liquid pumps, piston pumps, mini compressors, gas sampling pumps, ink pumps, medical pumps, and accessories.",
    h1: "Micro Pump Product Categories",
    intro: "Start with the product family that matches your medium, pressure, vacuum, flow, duty cycle, and installation space. Each category page includes engineering ranges, typical applications, and RFQ selection notes.",
    cards: [
      {
        title: "Product Series & Specifications",
        body: "Compare JSG air, vacuum, liquid, piston, and compressor series by representative specifications and typical applications.",
        href: "/product-materials/"
      },
      ...productPages.map((page) => ({
        title: page.h1,
        body: page.description,
        href: `/${page.slug}/`
      }))
    ],
    sections: [
      ["Model family matrix", [
        "Micro diaphragm air / vacuum: BD-01, BD-02, BD-02AB, BD-03, BD-03AB, BD-04, BD-04AB, BD-05T precision gas variants.",
        "Gas sampling and analytical pumps: BD-05T01.51500B, BD-05T06.7L, BD-05TVB dual-head vacuum, BD-05T0512L dual-head gas pump.",
        "Diaphragm liquid / ink: BD-01W, BD-02W, BD-04W, BD-05TF110W, BD-05TF300/450/600 series, BD-07W high-pressure liquid pump.",
        "Piston air / vacuum: BD-07A/V, BD-07AB/VB, BD-07A-M/V-M, BD-079A-M/V-M high-output piston platforms.",
        "Mini compressors: BD-08A/V, BD-08AB/VB, BD-08A-D/V-D, BD-089AB/VB high-flow pressure and vacuum modules.",
        "Accessories: tubing, check valves, solenoid valves, filters, silencers, shock absorbers, PWM controllers, and flow feedback parts."
      ]],
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

const allPages = [...overviewPages, ...infoPages, ...applicationPages, ...productPages, ...modelPages, ...blogPages];

allPages.push({
  slug: "site-map",
  title: "JSG DC Pump Site Map",
  description: "Structured site map for JSG DC Pump products, model pages, applications, engineering articles, resources, company information, and contact pages.",
  h1: "JSG DC Pump Site Map",
  intro: "Use this page to browse the complete JSG DC Pump content structure by product family, model, application, engineering article, and support resource.",
  cards: [
    { title: "Product Categories", body: "Browse micro diaphragm air pumps, vacuum pumps, liquid pumps, piston pumps, compressors, and accessories.", href: "/products/" },
    { title: "Applications", body: "Find pump use cases for medical, beauty, automation, environmental, and laboratory equipment.", href: "/applications/" },
    { title: "Engineering Blog", body: "Read selection guides for OEM pump design, gas sampling, compressors, and fluid control modules.", href: "/blog/" },
    { title: "Contact JSG DC Pump", body: "Send RFQ details and request model matching support.", href: "/contact/" }
  ],
  sections: [
    ["Product category pages", productPages.map((page) => `${page.h1}: /${page.slug}/`)],
    ["Model detail pages", modelPages.map((page) => `${page.h1}: /${page.slug}/`)],
    ["Application pages", applicationPages.map((page) => `${page.h1}: /${page.slug}/`)],
    ["Engineering articles", blogPages.map((page) => `${page.h1}: /${page.slug}/`)],
    ["Company and resource pages", infoPages.map((page) => `${page.h1}: /${page.slug}/`)]
  ]
});

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const zhTitleExact = {
  "Micro Pump Product Categories": "微型泵产品分类",
  "Product Series & Specifications": "产品系列与参数",
  "Micro Pump Engineering Blog": "微型泵工程博客",
  "Micro Pump Applications": "微型泵应用",
  "Application Case Studies": "应用案例",
  "Micro Pump Catalog and Selection Downloads": "微型泵目录与选型资料",
  "Catalog and Selection Downloads": "产品目录与选型资料",
  "About JSG DC Pump": "关于 JSG DC Pump",
  "Contact JSG DC Pump": "联系 JSG DC Pump",
  "Micro Pump FAQ": "微型泵常见问题",
  "JSG DC Pump Site Map": "JSG DC Pump 网站地图",
  "Micro Diaphragm Air Pumps": "微型隔膜气泵",
  "Miniature Vacuum Pumps": "微型真空泵",
  "Diaphragm Liquid Pumps": "隔膜液泵",
  "Micro Piston Pumps": "微型活塞泵",
  "Mini Compressors": "微型压缩机",
  "Gas Sampling Pumps": "气体采样泵",
  "Ink Pumps": "墨水泵",
  "Medical Diaphragm Pumps": "医疗隔膜泵",
  "Pump Accessories and Controls": "泵配件与控制",
  "How to Choose a Micro Diaphragm Air Pump": "微型隔膜气泵选型指南",
  "12V vs 24V DC Pump: Which Is Better?": "12V 与 24V 直流泵选型对比",
  "Brush vs Brushless Micro Pump": "有刷与无刷微型泵对比",
  "How to Reduce Micro Pump Noise and Vibration": "如何降低微型泵噪音与振动",
  "Vacuum Pump Selection for Gas Sampling": "气体采样真空泵选型",
  "Liquid Pump Selection for Inkjet Printer Systems": "喷墨打印系统液泵选型",
  "Micro Pump Selection for Medical Devices": "医疗设备微型泵选型",
  "Mini Compressor vs Piston Pump": "微型压缩机与活塞泵对比",
  "EPDM vs FKM Diaphragm Material": "EPDM 与 FKM 隔膜材料对比",
  "How to Write an OEM Pump RFQ": "OEM 泵询价资料怎么写",
  "Mini Air Compressor Design Trade-Offs": "微型空气压缩机设计取舍",
  "How to Choose a Micro Vacuum Pump for PID Gas Detectors": "PID 气体检测仪微型真空泵选型",
  "10 Miniature Air Pump Requirements OEM Engineers Often Overlook": "OEM 工程师容易忽略的 10 个微型气泵要求",
  "Miniature Dual-Head Diaphragm Pump Guide": "微型双头隔膜泵选型指南",
  "How to Choose a Micro Pump for Laboratory Analytical Instruments": "实验室分析仪器微型泵选型",
  "How Micro Pumps Are Used in Robotics and Automation": "微型泵在机器人与自动化中的应用"
  ,"What voltage options are available?": "有哪些电压选项？"
  ,"What information is needed for a recommendation?": "推荐型号需要哪些信息？"
  ,"Can JSG customize pumps?": "JSG 可以定制泵吗？"
  ,"Can I request samples?": "可以申请样品吗？"
  ,"Which certifications are supported?": "支持哪些认证资料？"
  ,"How should I compare flow and pressure data?": "如何比较流量和压力数据？"
  ,"Do you provide pump plus accessory modules?": "是否提供泵加配件模块？"
  ,"How do I choose between diaphragm and piston pumps?": "隔膜泵和活塞泵如何选择？"
  ,"How do I reduce micro pump noise?": "如何降低微型泵噪音？"
  ,"Can the same pump handle air and liquid?": "同一款泵能同时用于气体和液体吗？"
  ,"What affects pump lifetime?": "哪些因素影响泵寿命？"
  ,"What should be tested before mass production?": "量产前应测试哪些项目？"
};

const zhPhrasePairs = [
  ["Compare JSG air, vacuum, liquid, piston, and compressor series by representative specifications and typical applications.", "对比 JSG 气泵、真空泵、液泵、活塞泵与压缩机系列的代表参数和典型应用。"],
  ["Micro Pump Applications for Automation and Robotics", "自动化与机器人微型泵应用"],
  ["Micro Pumps for Laboratory and Analytical Instruments", "实验室与分析仪器微型泵应用"],
  ["Micro Pumps for Environmental Monitoring", "环境监测微型泵应用"],
  ["Micro Pumps for Beauty and Aesthetic Equipment", "美容仪器微型泵应用"],
  ["Water Purifier and Beverage Pump Applications", "净水与饮料设备泵应用"],
  ["Ink Pump Applications for Printing Systems", "打印系统墨水泵应用"],
  ["Gas Sampling Pump Applications", "气体采样泵应用"],
  ["Micro Pumps for Medical Equipment", "医疗设备微型泵应用"],
  ["BD-05T01.51500B Brushless Mini Diaphragm Pump", "BD-05T01.51500B 无刷微型隔膜泵"],
  ["BD-05T06.7L Small Brushless Diaphragm Pump", "BD-05T06.7L 小型无刷隔膜泵"],
  ["BD-05TVB Dual Head Brushless Vacuum Pump", "BD-05TVB 双头无刷真空泵"],
  ["BD-05T0512L Dual Head Gas Diaphragm Pump", "BD-05T0512L 双头气体隔膜泵"],
  ["BD-05TF110W Micro Liquid Diaphragm Pump", "BD-05TF110W 微型隔膜液泵"],
  ["BD-05TF600WB Ink Liquid Pump", "BD-05TF600WB 墨水液泵"],
  ["BD-08AB-D High Flow Mini Compressor", "BD-08AB-D 大流量微型压缩机"],
  ["BD-02AB / BD-02VB Brushless Air and Vacuum Pump", "BD-02AB / BD-02VB 无刷气泵与真空泵"],
  ["BD-03AB / BD-03VB Brushless Diaphragm Pump", "BD-03AB / BD-03VB 无刷隔膜泵"],
  ["BD-04AB / BD-04VB High Flow Brushless Diaphragm Pump", "BD-04AB / BD-04VB 大流量无刷隔膜泵"],
  ["BD-01 Micro Diaphragm Air Pump", "BD-01 微型隔膜气泵"],
  ["BD-02 Micro Air and Vacuum Pump", "BD-02 微型气泵与真空泵"],
  ["BD-03 Diaphragm Air Pump", "BD-03 隔膜气泵"],
  ["BD-04 High Flow Diaphragm Air Pump", "BD-04 大流量隔膜气泵"],
  ["BD-01W Micro Diaphragm Liquid Pump", "BD-01W 微型隔膜液泵"],
  ["BD-02W Mini Diaphragm Liquid Pump", "BD-02W 小型隔膜液泵"],
  ["BD-04W Diaphragm Liquid Pump", "BD-04W 隔膜液泵"],
  ["BD-07W High Pressure Liquid Pump", "BD-07W 高压液泵"],
  ["BD-07 Micro Piston Pump", "BD-07 微型活塞泵"],
  ["BD-79 High Pressure Piston Pump", "BD-79 高压活塞泵"],
  ["BD-08 Mini Compressor", "BD-08 微型压缩机"],
  ["Pump Accessory and Control Module", "泵配件与控制模块"],
  ["Product Category Matrix", "产品分类矩阵"],
  ["Product Categories", "产品分类"],
  ["Send Pump RFQ", "发送泵选型询价"],
  ["Category", "分类"],
  ["Application", "应用"],
  ["Applications", "应用"],
  ["Engineering Blog", "工程博客"],
  ["Site Map", "网站地图"],
  ["Related Product Pages", "相关产品页面"],
  ["Product Images and Catalog Preview", "产品图片与目录预览"],
  ["Explore Pages", "浏览相关页面"],
  ["Engineering Range", "工程参数范围"],
  ["Typical Applications", "典型应用"],
  ["Selection Notes", "选型要点"],
  ["Detailed model matrix", "详细型号矩阵"],
  ["Compressor model matrix", "压缩机型号矩阵"],
  ["Gas sampling model notes", "气体采样型号说明"],
  ["Model family matrix", "型号系列矩阵"],
  ["How to choose a category", "如何选择产品分类"],
  ["Content focus", "内容重点"],
  ["Common equipment", "常见设备"],
  ["Selection focus", "选型重点"],
  ["RFQ details", "询价信息"],
  ["Core trade-offs", "核心取舍"],
  ["Selection guidance", "选型建议"],
  ["RFQ checklist", "询价清单"],
  ["Key selection factors", "关键选型因素"],
  ["Recommended pump classes", "推荐泵类型"],
  ["Prototype tests", "样机测试"],
  ["Often missed requirements", "常被忽略的要求"],
  ["How to specify better", "如何更准确地描述需求"],
  ["When dual-head helps", "双头结构适用场景"],
  ["Integration choices", "集成方式选择"],
  ["Selection priorities", "选型优先级"],
  ["Pump family mapping", "泵系列匹配"],
  ["Validation plan", "验证计划"],
  ["Common use cases", "常见用途"],
  ["Model families", "型号系列"],
  ["Pump families", "泵系列"],
  ["Typical series", "典型系列"],
  ["Flow range", "流量范围"],
  ["Pressure range", "压力范围"],
  ["Vacuum range", "真空范围"],
  ["Voltage", "电压"],
  ["Motor options", "电机选项"],
  ["Motor choices", "电机选择"],
  ["Materials", "材料"],
  ["Motors", "电机"],
  ["Type", "类型"],
  ["Flow", "流量"],
  ["Pressure", "压力"],
  ["Vacuum", "真空"],
  ["Dimensions", "尺寸"],
  ["Weight", "重量"],
  ["Use", "用途"],
  ["Motor", "电机"],
  ["Medium", "介质"],
  ["Function", "功能"],
  ["Water flow", "水流量"],
  ["Suction head", "吸程"],
  ["Power", "功率"],
  ["Tubing", "管路"],
  ["Valves", "阀"],
  ["Noise control", "噪音控制"],
  ["Protection", "保护"],
  ["Control", "控制"],
  ["Assembly", "组件"],
  ["Pump type", "泵类型"],
  ["Media", "介质"],
  ["Integration", "集成"],
  ["Response factors", "响应影响因素"],
  ["Path design", "气路设计"],
  ["Brushless", "无刷"],
  ["brushless", "无刷"],
  ["High Flow", "大流量"],
  ["high-flow", "大流量"],
  ["Dual Head", "双头"],
  ["dual-head", "双头"],
  ["Mini Compressor", "微型压缩机"],
  ["mini compressor", "微型压缩机"],
  ["Micro Diaphragm", "微型隔膜"],
  ["micro diaphragm", "微型隔膜"],
  ["Diaphragm", "隔膜"],
  ["diaphragm", "隔膜"],
  ["Vacuum Pump", "真空泵"],
  ["vacuum pump", "真空泵"],
  ["Air Pump", "气泵"],
  ["air pump", "气泵"],
  ["Liquid Pump", "液泵"],
  ["liquid pump", "液泵"],
  ["Piston Pump", "活塞泵"],
  ["piston pump", "活塞泵"],
  ["Gas Sampling", "气体采样"],
  ["gas sampling", "气体采样"],
  ["Medical", "医疗"],
  ["medical", "医疗"],
  ["Laboratory", "实验室"],
  ["laboratory", "实验室"],
  ["Analytical", "分析"],
  ["analytical", "分析"],
  ["Automation", "自动化"],
  ["automation", "自动化"],
  ["Robotics", "机器人"],
  ["robotics", "机器人"],
  ["Environmental", "环境"],
  ["environmental", "环境"],
  ["Beauty", "美容"],
  ["beauty", "美容"],
  ["Aesthetic", "美容"],
  ["aesthetic", "美容"],
  ["Ink", "墨水"],
  ["ink", "墨水"],
  ["Water", "水"],
  ["water", "水"],
  ["Accessories", "配件"],
  ["accessories", "配件"],
  ["Compact", "紧凑"],
  ["compact", "紧凑"],
  ["Pressure", "压力"],
  ["pressure", "压力"],
  ["Flow", "流量"],
  ["flow", "流量"],
  ["Noise", "噪音"],
  ["noise", "噪音"],
  ["Lifetime", "寿命"],
  ["lifetime", "寿命"],
  ["Duty cycle", "工作周期"],
  ["duty cycle", "工作周期"],
  ["Material compatibility", "材料兼容性"],
  ["material compatibility", "材料兼容性"],
  ["Stable", "稳定"],
  ["stable", "稳定"],
  ["Self-priming", "自吸"],
  ["self-priming", "自吸"],
  ["Oil-free", "无油"],
  ["oil-free", "无油"],
  ["Clean", "洁净"],
  ["clean", "洁净"],
  ["Portable", "便携"],
  ["portable", "便携"],
  ["Sampling", "采样"],
  ["sampling", "采样"],
  ["Suction", "吸附"],
  ["suction", "吸附"],
  ["Transfer", "输送"],
  ["transfer", "输送"],
  ["Dispensing", "分配"],
  ["dispensing", "分配"]
];

const zhSubjectForPage = (page) => {
  const source = `${page.slug} ${page.h1} ${page.category || ""}`.toLowerCase();
  if (source.includes("compressor")) return "微型压缩机";
  if (source.includes("liquid") || source.includes("ink") || source.includes("water")) return "隔膜液泵";
  if (source.includes("piston")) return "微型活塞泵";
  if (source.includes("vacuum")) return "微型真空泵";
  if (source.includes("gas")) return "气体采样泵";
  if (source.includes("accessor")) return "泵配件与控制模块";
  if (source.includes("blog")) return "微型泵工程文章";
  if (source.includes("application")) return "微型泵应用";
  return "微型泵";
};

const replaceZhPhrases = (value) => {
  let output = String(value || "");
  if (zhTitleExact[output]) return zhTitleExact[output];
  zhPhrasePairs.forEach(([from, to]) => {
    output = output.replaceAll(from, to);
  });
  [
    ["micro", "微型"],
    ["air", "气体"],
    ["vacuum", "真空"],
    ["gas", "气体"],
    ["liquid", "液体"],
    ["piston", "活塞"],
    ["compressor", "压缩机"],
    ["compressors", "压缩机"],
    ["pump", "泵"],
    ["pumps", "泵"],
    ["system", "系统"],
    ["systems", "系统"],
    ["module", "模块"],
    ["modules", "模块"],
    ["device", "设备"],
    ["devices", "设备"],
    ["equipment", "设备"],
    ["instrument", "仪器"],
    ["instruments", "仪器"],
    ["application", "应用"],
    ["applications", "应用"],
    ["range", "范围"],
    ["ranges", "范围"],
    ["variant", "变体"],
    ["variants", "变体"],
    ["series", "系列"],
    ["precision", "精密"],
    ["portable", "便携"],
    ["compact", "紧凑"],
    ["sampling", "采样"],
    ["monitoring", "监测"],
    ["detectors", "检测仪"],
    ["detector", "检测仪"],
    ["analyzers", "分析仪"],
    ["analyzer", "分析仪"],
    ["diagnostics", "诊断"],
    ["industrial", "工业"],
    ["consumer", "消费类"],
    ["appliance", "家电"],
    ["printing", "打印"],
    ["printer", "打印机"],
    ["purifier", "净水器"],
    ["beverage", "饮料"],
    ["path", "路径"],
    ["paths", "路径"],
    ["platform", "平台"],
    ["platforms", "平台"],
    ["option", "选项"],
    ["options", "选项"],
    ["configuration", "配置"],
    ["configurations", "配置"],
    ["version", "版本"],
    ["versions", "版本"],
    ["project", "项目"],
    ["projects", "项目"],
    ["model", "型号"],
    ["models", "型号"],
    ["motor", "电机"],
    ["motors", "电机"],
    ["head", "泵头"],
    ["seal", "密封"],
    ["sealing", "密封"],
    ["tubing", "管路"],
    ["filter", "过滤器"],
    ["filters", "过滤器"],
    ["valve", "阀"],
    ["valves", "阀"],
    ["connector", "接头"],
    ["connectors", "接头"],
    ["noise", "噪音"],
    ["vibration", "振动"],
    ["heat", "发热"],
    ["flow", "流量"],
    ["pressure", "压力"],
    ["suction", "吸附"],
    ["transfer", "输送"],
    ["dispensing", "分配"],
    ["dosing", "计量"],
    ["circulation", "循环"],
    ["waste", "废液"],
    ["inkjet", "喷墨"],
    ["foam", "泡沫"],
    ["tools", "工具"],
    ["tool", "工具"],
    ["rehabilitation", "康复"],
    ["therapy", "治疗"],
    ["dental", "牙科"],
    ["quality", "质量"],
    ["supplier", "供应商"],
    ["production", "生产"],
    ["sales", "销售"],
    ["service", "服务"],
    ["capability", "能力"],
    ["website", "网站"],
    ["browse", "浏览"],
    ["pages", "页面"],
    ["page", "页面"],
    ["special", "特殊"],
    ["access", "访问"],
    ["high", "高"],
    ["low", "低"],
    ["small", "小型"],
    ["mini", "微型"],
    ["strong", "强"],
    ["useful", "有效"],
    ["working", "工作"],
    ["operation", "运行"],
    ["selection", "选型"],
    ["materials", "材料"],
    ["material", "材料"],
    ["compatibility", "兼容性"],
    ["chemical", "化学"],
    ["humidity", "湿度"],
    ["cleaning", "清洁"],
    ["contamination", "污染"],
    ["recommended", "推荐"],
    ["reference", "参考"],
    ["catalog", "目录"],
    ["matrix", "矩阵"],
    ["guide", "指南"],
    ["key", "关键"],
    ["points", "要点"],
    ["detail", "详情"],
    ["article", "文章"],
    ["articles", "文章"],
    ["company", "公司"],
    ["resource", "资源"],
    ["resources", "资源"],
    ["thank", "感谢"],
    ["you", "您"],
    ["requirements", "要求"],
    ["details", "信息"],
    ["matching", "匹配"],
    ["technical", "技术"],
    ["engineering", "工程"]
  ].forEach(([from, to]) => {
    output = output.replace(new RegExp(`\\b${from}\\b`, "gi"), to);
  });
  [
    ["and", "和"],
    ["or", "或"],
    ["with", "带"],
    ["for", "用于"],
    ["from", "来自"],
    ["into", "进入"],
    ["inside", "内部"],
    ["at", "在"],
    ["by", "按"],
    ["on", "在"],
    ["to", "至"],
    ["of", "的"],
    ["in", "在"],
    ["as", "作为"],
    ["when", "当"],
    ["where", "当"],
    ["than", "比"],
    ["while", "同时"],
    ["before", "之前"],
    ["after", "之后"],
    ["through", "通过"]
  ].forEach(([from, to]) => {
    output = output.replace(new RegExp(`\\b${from}\\b`, "gi"), to);
  });
  output = output
    .replace(/([\u3400-\u9fff])s\b/g, "$1")
    .replace(/高-/g, "高")
    .replace(/低-/g, "低")
    .replace(/单-/g, "单")
    .replace(/双-/g, "双")
    .replace(/微型隔膜 气泵/g, "微型隔膜气泵");
  return output;
};

const hasLongEnglishText = (value) => /[A-Za-z]{4,}(?:\s+[A-Za-z]{4,}){1,}/.test(String(value || ""));

const stripAllowedLatin = (value) =>
  String(value || "")
    .replace(/\bJSG\b|\bDC\b|\bPump\b|\bOEM\b|\bODM\b|\bRFQ\b|\bISO\b|\bCE\b|\bRoHS\b|\bPWM\b|\bPID\b|\bCEMS\b|\bEPDM\b|\bFKM\b|\bPTFE\b|\bFFKM\b|\bFAQ\b|\bR&D\b/gi, "")
    .replace(/\bBD[-\dA-Z/.]*\b/gi, "")
    .replace(/\b\d+(?:\.\d+)?\s*(?:L\/min|mL\/min|bar|kPa|V|W|mm|g|m|dB)\b/gi, "")
    .replace(/\b(?:L\/min|mL\/min|bar|kPa|V|W|mm|g|m|dB)\b/gi, "")
    .replace(/\binfo\b|\bjsgpump\b|\bcom\b/gi, "");

const hasResidualEnglish = (value) => /[A-Za-z]{3,}/.test(stripAllowedLatin(value));

const zhTitle = (value, page = {}) => {
  const replaced = replaceZhPhrases(value);
  if (!hasLongEnglishText(replaced)) return replaced;
  return zhSubjectForPage(page);
};

const zhSentence = (value, page = {}) => {
  const replaced = replaceZhPhrases(value);
  const subject = zhSubjectForPage(page);
  if (!hasResidualEnglish(replaced) && replaced.length >= 50) return replaced;
  if (!hasResidualEnglish(replaced)) return `${replaced} 本页同时说明${subject}的选型参数、应用场景、集成注意事项和询价资料要求。`;
  return `本页介绍${subject}的适用场景、关键参数、型号范围、集成注意事项和询价资料要求，便于 OEM 项目快速完成选型评估。`;
};

const zhListItem = (value, page = {}) => {
  const replaced = replaceZhPhrases(value);
  if (!hasResidualEnglish(replaced)) return replaced;
  const subject = zhSubjectForPage(page);
  return `${subject}选型时请结合介质、流量、压力或真空度、电压、工作周期、噪音目标、安装空间、材料兼容性和量产一致性一起验证。`;
};

const zhTechValue = (value) => {
  let output = replaceZhPhrases(value)
    .replaceAll("depending on", "取决于")
    .replaceAll("depending", "取决于")
    .replaceAll("options by model", "按型号可选")
    .replaceAll("options by project", "按项目可选")
    .replaceAll("class", "级")
    .replaceAll("Approx.", "约")
    .replaceAll("approx.", "约")
    .replaceAll("Up to", "最高")
    .replaceAll("Selected", "部分")
    .replaceAll("selected", "部分")
    .replaceAll("common options", "常用选项")
    .replaceAll("common", "常用")
    .replace(/\band\b/g, "和")
    .replace(/\bor\b/g, "或")
    .replace(/\bto\b/g, "至")
    .replace(/\bwith\b/g, "带")
    .replace(/\bfor\b/g, "用于")
    .replace(/\bplatforms?\b/g, "平台")
    .replace(/\bmodules?\b/g, "模块")
    .replace(/\bsystems?\b/g, "系统")
    .replace(/\boptions?\b/g, "选项")
    .replace(/\bconfigurations?\b/g, "配置")
    .replace(/\bversions?\b/g, "版本")
    .replace(/\bproject\b/g, "项目")
    .replace(/\bmodel\b/g, "型号")
    .replace(/\bmodels\b/g, "型号")
    .replace(/\bBrush\b/g, "有刷")
    .replace(/\bbrush\b/g, "有刷")
    .replace(/\bsingle-head\b/g, "单头")
    .replace(/\bdual-head\b/g, "双头")
    .replace(/\bhigh-output\b/g, "高输出")
    .replace(/\blow-flow\b/g, "低流量")
    .replace(/\blong-life\b/g, "长寿命");
  if (hasResidualEnglish(output)) {
    output = output.replace(/\b(?!JSG\b|DC\b|Pump\b|OEM\b|ODM\b|RFQ\b|ISO\b|CE\b|RoHS\b|PWM\b|PID\b|CEMS\b|EPDM\b|FKM\b|PTFE\b|FFKM\b|FAQ\b|BD[-\dA-Z/.]*\b)[A-Za-z]{3,}(?:[-\s]+[A-Za-z]{2,})*/gi, "相关配置");
  }
  return output;
};

const zhMediaAlt = (value) => {
  const replaced = replaceZhPhrases(value)
    .replaceAll("reference", "参考图")
    .replaceAll("family", "系列")
    .replaceAll("catalog page", "目录页");
  return hasLongEnglishText(replaced) ? "产品参考图片" : replaced;
};

const localizePageForZh = (page) => ({
  ...page,
  title: zhTitle(page.title, page),
  h1: zhTitle(page.h1, page),
  description: zhSentence(page.description, page),
  intro: zhSentence(page.intro, page),
  range: page.range?.map(([label, value]) => [zhTitle(label, page), zhTechValue(value)]),
  applications: page.applications?.map((item) => zhListItem(item, page)),
  selection: page.selection?.map((item) => zhListItem(item, page)),
  cards: page.cards?.map((card) => ({
    ...card,
    title: zhTitle(card.title, page),
    body: zhSentence(card.body, page)
  })),
  media: page.media?.map(([src, alt]) => [src, zhMediaAlt(alt)]),
  sections: page.sections?.map(([heading, items]) => [
    zhTitle(heading, page),
    items.map((item) => (page.slug === "site-map" ? zhTitle(String(item).split(":")[0], page) : zhListItem(item, page)))
  ])
});

const navHtml = (currentSlug, locale = "en") =>
  nav
    .map(([label, href]) => {
      const isProductPage = currentSlug === "products" || productPages.some((page) => page.slug === currentSlug);
      const isBlogPage = currentSlug === "blog" || currentSlug.startsWith("blog/");
      const isApplicationPage = currentSlug === "applications" || currentSlug.startsWith("applications/");
      const isCaseStudiesPage = currentSlug === "case-studies";
      const isResourcesPage = currentSlug === "download" || currentSlug === "faq";
      const active =
        (href === "/products/" && isProductPage) ||
        (href === "/blog/" && isBlogPage) ||
        (href === "/applications/" && isApplicationPage) ||
        (href === "/case-studies/" && isCaseStudiesPage) ||
        (href === "/download/" && isResourcesPage) ||
        (currentSlug && href === `/${currentSlug}/`);
      const zhNavLabels = { "/products/": "产品", "/applications/": "应用", "/blog/": "工程文章", "/case-studies/": "案例研究", "/download/": "资料下载", "/about/": "关于我们", "/contact/": "联系我们" };
      const localizedLabel = locale === "zh" ? (zhNavLabels[href] || zhTitle(label)) : label;
      return `<a${active ? ' aria-current="page"' : ""} href="${localizedHref(href, locale)}">${localizedLabel}</a>`;
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

const renderCards = (cards, locale = "en") => `
        <section class="page-block">
          <h2>${locale === "zh" ? "浏览相关页面" : "Explore Pages"}</h2>
          <div class="page-card-grid">
            ${cards
              .map(
                (card) => `<a class="page-card-link" href="${localizedHref(card.href, locale)}">
                  <strong>${escapeHtml(card.title)}</strong>
                  <span>${escapeHtml(card.body)}</span>
                </a>`
              )
              .join("\n            ")}
          </div>
        </section>`;

const renderMedia = (items, locale = "en") => `
        <section class="page-block">
          <h2>${locale === "zh" ? "产品图片与目录预览" : "Product Images and Catalog Preview"}</h2>
          <div class="page-media-grid">
            ${items
              .map(
                ([src, alt]) => `<figure class="page-media-card">
                  <img src="${src}" alt="${escapeHtml(alt)}">
                  <figcaption>${escapeHtml(alt)}</figcaption>
                </figure>`
              )
              .join("\n            ")}
          </div>
        </section>`;

const getBreadcrumbItems = (page) => {
  const items = [{ name: "Home", href: "/" }];
  const modelPage = modelPages.includes(page);
  const productPage = productPages.includes(page);
  const blogPage = page.slug.startsWith("blog/");
  const applicationPage = page.slug.startsWith("applications/");

  if (page.slug === "products") {
    items.push({ name: "Products", href: "/products/" });
  } else if (modelPage) {
    const category = productPages.find((item) => item.slug === page.category);
    items.push({ name: "Products", href: "/products/" });
    if (category) items.push({ name: category.h1, href: `/${category.slug}/` });
    items.push({ name: page.h1, href: `/${page.slug}/` });
  } else if (productPage) {
    items.push({ name: "Products", href: "/products/" }, { name: page.h1, href: `/${page.slug}/` });
  } else if (page.slug === "blog") {
    items.push({ name: "Blog", href: "/blog/" });
  } else if (blogPage) {
    items.push({ name: "Blog", href: "/blog/" }, { name: page.h1, href: `/${page.slug}/` });
  } else if (page.slug === "applications") {
    items.push({ name: "Applications", href: "/applications/" });
  } else if (applicationPage) {
    items.push({ name: "Applications", href: "/applications/" }, { name: page.h1, href: `/${page.slug}/` });
  } else {
    items.push({ name: page.h1, href: `/${page.slug}/` });
  }
  return items;
};

const renderBreadcrumbs = (page, locale = "en") => {
  const items = getBreadcrumbItems(page);
  const zhBreadcrumbLabels = { Home: "首页", Products: "产品", Applications: "应用", Blog: "工程文章", "Case Studies": "案例研究", Download: "资料下载", About: "关于我们", Contact: "联系我们" };
  return `<nav class="breadcrumbs" aria-label="${locale === "zh" ? "面包屑导航" : "Breadcrumb"}">
        ${items
          .map((item, index) => {
            const label = escapeHtml(locale === "zh" ? (zhBreadcrumbLabels[item.name] || zhTitle(item.name)) : item.name);
            return index === items.length - 1
              ? `<span aria-current="page">${label}</span>`
              : `<a href="${localizedHref(item.href, locale)}">${label}</a><span class="crumb-separator">/</span>`;
          })
          .join("")}
      </nav>`;
};

const renderSections = (page, locale = "en") => {
  const blocks = [];
  if (page.range) {
    blocks.push(`<section class="page-block"><h2>${locale === "zh" ? "工程参数范围" : "Engineering Range"}</h2>${renderTable(page.range)}</section>`);
  }
  if (page.applications) {
    blocks.push(`<section class="page-block"><h2>${locale === "zh" ? "典型应用" : "Typical Applications"}</h2>${renderList(page.applications)}</section>`);
  }
  if (page.selection) {
    blocks.push(`<section class="page-block"><h2>${locale === "zh" ? "选型要点" : "Selection Notes"}</h2>${renderList(page.selection)}</section>`);
  }
  if (page.cards) {
    blocks.push(renderCards(page.cards, locale));
  }
  if (page.media) {
    blocks.push(renderMedia(page.media, locale));
  }
  if (page.sections) {
    page.sections.forEach(([heading, items]) => {
      blocks.push(`<section class="page-block"><h2>${escapeHtml(heading)}</h2>${renderList(items)}</section>`);
    });
  }
  return blocks.join("\n        ");
};

const renderRelatedProducts = (locale = "en") => `
        <section class="page-block page-related">
          <h2>${locale === "zh" ? "相关产品页面" : "Related Product Pages"}</h2>
          <div class="page-link-grid">
            ${productPages.map((page) => `<a href="${localizedHref(`/${page.slug}/`, locale)}">${escapeHtml(locale === "zh" ? zhTitle(page.h1, page) : page.h1)}</a>`).join("\n            ")}
          </div>
        </section>`;

const renderPage = (page, locale = "en") => {
  const isProduct = productPages.includes(page) || modelPages.includes(page);
  const isBlog = page.slug.startsWith("blog/");
  const isProductsOverview = page.slug === "products";
  const content = locale === "zh" ? localizePageForZh(page) : page;
  const canonical = localizedUrl(page.slug, locale);
  const pageUrl = canonical;
  const breadcrumbItems = getBreadcrumbItems(page);
  const image = page.media?.[0]?.[0] ? `${siteUrl}${page.media[0][0]}` : `${siteUrl}/assets/img/micro-pump-hero.png`;
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": isProduct ? "Product" : isBlog ? "Article" : "WebPage",
    name: content.h1,
    headline: isBlog ? content.h1 : undefined,
    description: content.description,
    url: pageUrl,
    inLanguage: locale === "zh" ? "zh-Hans" : "en",
    image,
    ...(isProduct
      ? {
          brand: { "@type": "Brand", name: "JSG DC Pump" },
          manufacturer: { "@type": "Organization", name: "JSG DC Pump", url: siteUrl },
          sku: page.model || page.h1,
          model: page.model || undefined,
          category: page.category || content.h1,
          additionalProperty: (content.range || []).map(([name, value]) => ({
            "@type": "PropertyValue",
            name,
            value
          }))
        }
      : {}),
    ...(isBlog
      ? {
          author: { "@type": "Organization", name: "JSG DC Pump Engineering" },
          datePublished: "2026-07-13",
          dateModified: "2026-07-13",
          mainEntityOfPage: pageUrl
        }
      : {}),
    publisher: {
      "@type": "Organization",
      name: "JSG DC Pump",
      url: siteUrl,
      email: "info@jsgpump.com"
    }
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href === "/" ? (locale === "zh" ? `${siteUrl}/zh/` : `${siteUrl}/`) : `${siteUrl}${localizedHref(item.href, locale)}`
    }))
  };
  const schemaGraph = [pageSchema, breadcrumbSchema];
  if (page.faq) {
    schemaGraph.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: (content.sections || page.sections).map(([question, answers]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answers.join(" ")
        }
      }))
    });
  }
  return `<!DOCTYPE html>
<html lang="${locale === "zh" ? "zh-CN" : "en"}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(content.title)} | JSG DC Pump</title>
  <meta name="description" content="${escapeHtml(content.description)}">
  <meta property="og:title" content="${escapeHtml(content.title)} | JSG DC Pump">
  <meta property="og:description" content="${escapeHtml(content.description)}">
  <meta property="og:type" content="${isBlog ? "article" : "website"}">
  ${page.noindex ? '<meta name="robots" content="noindex,follow">' : ""}
  ${alternateLinks(page.slug, canonical, locale)}
  <link rel="icon" href="/assets/img/micro-pump-hero.png" type="image/png">
  <link rel="stylesheet" href="/assets/css/styles.css?v=20260717-control-heights-2">
  <script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": schemaGraph })}</script>
</head>
<body>
  <a class="skip-link" href="#main">${locale === "zh" ? "跳到主要内容" : "Skip to content"}</a>
  <header class="site-header" data-header>
    <nav class="nav-shell" aria-label="${locale === "zh" ? "主导航" : "Primary navigation"}">
      <a class="brand" href="${localizedHref("/", locale)}" aria-label="${locale === "zh" ? "JSG DC Pump 首页" : "JSG DC Pump home"}">
        <span class="brand-mark">JG</span>
        <span>
          <strong>JSG DC Pump</strong>
          <small>${locale === "zh" ? "微型泵与流体控制" : "Micro Pump & Fluid Control"}</small>
        </span>
      </a>
      <button class="menu-toggle" type="button" data-menu-toggle aria-label="${locale === "zh" ? "打开导航" : "Open navigation"}" aria-expanded="false"><span></span><span></span></button>
      <div class="nav-links" data-nav-links>
          ${navHtml(page.slug, locale)}
      </div>
      <div class="nav-actions">${languageSelectHtml(locale)}<a class="btn btn-primary nav-cta" href="${localizedHref(rfqPath, locale)}">${locale === "zh" ? "提交询价" : "Request a Quote"}</a></div>
    </nav>
  </header>
  <main id="main">
    <section class="page-hero">
      <div class="page-hero-inner">
        <div class="page-hero-copy">
          <p class="eyebrow">${locale === "zh" ? (isProduct ? "产品分类" : isBlog ? "工程文章" : "JSG DC Pump") : (isProduct ? "Product category" : isBlog ? "Engineering article" : "JSG DC Pump")}</p>
          <h1>${escapeHtml(content.h1)}</h1>
          <p>${escapeHtml(content.intro)}</p>
          <div class="hero-actions">
            ${isProductsOverview
              ? `<a class="btn btn-primary" href="${localizedHref("/product-materials/", locale)}">${locale === "zh" ? "查看系列参数" : "View Series Specifications"}</a>
            <a class="btn btn-secondary" href="${localizedHref(rfqPath, locale)}">${locale === "zh" ? "提交工程询价" : "Request Engineering Quote"}</a>`
              : `<a class="btn btn-primary" href="${localizedHref(rfqPath, locale)}">${locale === "zh" ? "提交工程询价" : "Request Engineering Quote"}</a>
            <a class="btn btn-secondary" href="${localizedHref("/download/", locale)}">${locale === "zh" ? "索取产品目录" : "Request Catalog"}</a>`}
          </div>
        </div>
        <div class="page-hero-panel" aria-hidden="true">
          <span>${locale === "zh" ? "应用匹配" : "APPLICATION MATCHING"}</span>
          <span>${locale === "zh" ? "OEM 模块" : "OEM MODULES"}</span>
          <span>${locale === "zh" ? "技术询价" : "TECHNICAL RFQ"}</span>
        </div>
      </div>
    </section>
    <section class="section page-content">
      ${renderBreadcrumbs(page, locale)}
      <div class="page-layout">
        <div>
        ${renderSections(content, locale)}
        ${isProduct ? renderRelatedProducts(locale) : ""}
        </div>
        <aside class="page-aside">
          <h2>${locale === "zh" ? "发送询价参数" : "Send RFQ Details"}</h2>
          <p>${locale === "zh" ? "请提供介质、流量、压力、真空度、电压、工作周期、噪音目标、尺寸限制、应用场景和年用量。" : "Include medium, flow, pressure, vacuum, voltage, duty cycle, noise target, size limit, application, and annual quantity."}</p>
          <a class="btn btn-primary" href="${localizedHref(rfqPath, locale)}">${locale === "zh" ? "开始询价" : "Start RFQ"}</a>
          <a class="text-link" href="mailto:info@jsgpump.com">info@jsgpump.com</a>
        </aside>
      </div>
    </section>
  </main>
  <footer class="site-footer">
    <div class="footer-grid">
      <div>
        <a class="brand footer-brand" href="${localizedHref("/", locale)}">
          <span class="brand-mark">JG</span>
          <span><strong>JSG DC Pump</strong><small>${locale === "zh" ? "深圳市精塑光科技有限公司" : "Shenzhen Jingsuguang Technology Co., Ltd."}</small></span>
        </a>
        <p>${locale === "zh" ? "JSG DC Pump 是集研发、生产、销售和服务于一体的微型泵供应商，覆盖 BD 系列气泵、液泵、活塞泵、压缩机、配件和 OEM 流体控制产品。" : "A professional micro pump supplier integrating R&D, production, sales, and service for BD-series air, liquid, piston, compressor, accessory, and OEM fluid control products."}</p>
      </div>
      <div><h3>${locale === "zh" ? "产品" : "Products"}</h3><a href="${localizedHref("/products/", locale)}">${locale === "zh" ? "产品分类" : "Product categories"}</a>${productPages.slice(0, 3).map((p) => `<a href="${localizedHref(`/${p.slug}/`, locale)}">${escapeHtml(locale === "zh" ? zhTitle(p.h1, p) : p.h1)}</a>`).join("")}</div>
      <div><h3>${locale === "zh" ? "资源" : "Resources"}</h3><a href="${localizedHref("/applications/", locale)}">${locale === "zh" ? "应用" : "Applications"}</a><a href="${localizedHref("/download/", locale)}">${locale === "zh" ? "下载" : "Download"}</a><a href="${localizedHref("/faq/", locale)}">FAQ</a><a href="${localizedHref("/blog/", locale)}">${locale === "zh" ? "博客" : "Blog"}</a><a href="${localizedHref("/site-map/", locale)}">${locale === "zh" ? "网站地图" : "Site Map"}</a></div>
      <div><h3>${locale === "zh" ? "联系" : "Contact"}</h3><a href="mailto:info@jsgpump.com">info@jsgpump.com</a><a href="${localizedHref(rfqPath, locale)}">${locale === "zh" ? "提交询价" : "Submit RFQ"}</a><a href="${localizedHref("/contact/", locale)}">${locale === "zh" ? "联系页面" : "Contact page"}</a></div>
    </div>
    <div class="footer-bottom"><span>&copy; 2026 ${locale === "zh" ? "深圳市精塑光科技有限公司" : "Shenzhen Jingsuguang Technology Co., Ltd."}</span></div>
  </footer>
  <script src="/assets/js/main.js?v=20260717-bilingual-site-4"></script>
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
  writeFile(path.join(page.slug, "index.html"), renderPage(page, "en"));
  writeFile(path.join("zh", page.slug, "index.html"), renderPage(page, "zh"));
});

const homeAlternateHead = (locale = "en") => alternateLinks("", localizedUrl("", locale), locale);

const homeProductCodes = {
  en: ["BD AIR", "BD LIQUID", "PISTON", "BD-08", "SPECIAL", "ACCESS"],
  zh: ["BD 气泵", "BD 液泵", "活塞泵", "BD-08 压缩机", "专用泵", "配件"]
};

const applyHomeSeo = (html, locale = "en") => {
  let output = html
    .replace(/<html lang="[^"]*">/i, `<html lang="${locale === "zh" ? "zh-CN" : "en"}">`)
    .replace(/\s*<link rel="canonical" href="[^"]+">\s*/i, "\n")
    .replace(/\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+">\s*/gi, "\n");

  output = output.replace(/(<meta property="og:type" content="website">)/i, `$1${homeAlternateHead(locale)}`);
  if (!/<link rel="icon"/i.test(output)) {
    output = output.replace(/(<link rel="stylesheet")/i, '<link rel="icon" href="/assets/img/micro-pump-hero.png" type="image/png">\n  $1');
  }

  if (locale === "zh") {
    let productCodeIndex = 0;
    output = output
      .replace(/href="assets\//g, 'href="/assets/')
      .replace(/src="assets\//g, 'src="/assets/')
      .replace(/poster="assets\//g, 'poster="/assets/')
      .replace(/href="\/#/g, 'href="/zh/#')
      .replace(/href="\/(?!zh\/|assets\/|api\/|#)([^"#]*)"/g, 'href="/zh/$1"')
      .replace(/href="\/zh\/"/g, 'href="/zh/"')
      .replace(/href="\/zh\/#rfq"/g, 'href="/zh/#rfq"')
      .replace(/aria-label="Select language"/g, 'aria-label="选择语言"')
      .replace(/(<span class="product-code">)[^<]*(<\/span>)/g, (_, open, close) => `${open}${homeProductCodes.zh[productCodeIndex++] || "产品系列"}${close}`);
  }

  return output;
};

const homeHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
writeFile("index.html", applyHomeSeo(homeHtml, "en"));
writeFile(path.join("zh", "index.html"), applyHomeSeo(homeHtml, "zh"));

const sitemapEntries = [
  { slug: "", locale: "en", url: `${siteUrl}/` },
  { slug: "", locale: "zh", url: `${siteUrl}/zh/` },
  ...allPages
    .filter((page) => !page.noindex)
    .flatMap((page) =>
      supportedLocales.map((locale) => ({
        slug: page.slug,
        locale,
        url: localizedUrl(page.slug, locale)
      }))
    )
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries
  .map((entry) => {
    const depth = entry.slug.split("/").filter(Boolean).length + (entry.locale === "zh" ? 1 : 0);
    const priority = !entry.slug ? "1.0" : entry.slug === "products" || entry.slug === "blog" ? "0.9" : depth > 2 ? "0.6" : "0.7";
    const enHref = entry.slug ? localizedUrl(entry.slug, "en") : `${siteUrl}/`;
    const zhHref = entry.slug ? localizedUrl(entry.slug, "zh") : `${siteUrl}/zh/`;
    return `  <url>
    <loc>${entry.url}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${enHref}" />
    <xhtml:link rel="alternate" hreflang="zh-Hans" href="${zhHref}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${enHref}" />
    <lastmod>2026-07-13</lastmod>
    <changefreq>${entry.slug ? "monthly" : "weekly"}</changefreq>
    <priority>${priority}</priority>
  </url>`;
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

console.log(`Generated ${allPages.length} content pages in ${supportedLocales.length} locales plus sitemap.xml and robots.txt.`);
