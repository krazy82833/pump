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

const languageSelectHtml = `
        <label class="language-select">
          <span>Language</span>
          <select data-language-select aria-label="Select language">
            <option value="en">EN English</option>
            <option value="zh">CN 简体中文</option>
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

const allPages = [...overviewPages, ...infoPages, ...applicationPages, ...productPages, ...modelPages, ...blogPages];

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
      const isApplicationPage = currentSlug === "applications" || currentSlug.startsWith("applications/");
      const active =
        (href === "/products/" && isProductPage) ||
        (href === "/blog/" && isBlogPage) ||
        (href === "/applications/" && isApplicationPage) ||
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

const renderMedia = (items) => `
        <section class="page-block">
          <h2>Catalog Preview</h2>
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

const renderBreadcrumbs = (page) => {
  const items = getBreadcrumbItems(page);
  return `<nav class="breadcrumbs" aria-label="Breadcrumb">
        ${items
          .map((item, index) => {
            const label = escapeHtml(item.name);
            return index === items.length - 1
              ? `<span aria-current="page">${label}</span>`
              : `<a href="${item.href}">${label}</a><span class="crumb-separator">/</span>`;
          })
          .join("")}
      </nav>`;
};

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
  if (page.media) {
    blocks.push(renderMedia(page.media));
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
  const isProduct = productPages.includes(page) || modelPages.includes(page);
  const isBlog = page.slug.startsWith("blog/");
  const canonical = `${siteUrl}/${page.slug}/`;
  const breadcrumbItems = getBreadcrumbItems(page);
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": isProduct ? "Product" : isBlog ? "Article" : "WebPage",
    name: page.h1,
    description: page.description,
    url: canonical,
    ...(page.model ? { model: page.model, category: page.category } : {}),
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
      item: `${siteUrl}${item.href === "/" ? "/" : item.href}`
    }))
  };
  const schemaGraph = [pageSchema, breadcrumbSchema];
  if (page.faq) {
    schemaGraph.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.sections.map(([question, answers]) => ({
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
  <link rel="stylesheet" href="/assets/css/styles.css?v=20260705-jsg-redesign">
  <script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": schemaGraph })}</script>
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
      <div class="nav-actions">${languageSelectHtml}<a class="btn btn-primary nav-cta" href="${rfqPath}">Request a Quote</a></div>
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
      ${renderBreadcrumbs(page)}
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
    <div class="footer-bottom"><span>&copy; 2026 Shenzhen Jingsuguang Technology Co., Ltd.</span><a class="deerflow-link" href="https://deerflow.tech" target="_blank" rel="noopener">Created By Deerflow</a></div>
  </footer>
  <script src="/assets/js/main.js?v=20260705-jsg-redesign-5"></script>
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
