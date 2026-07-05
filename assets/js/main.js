const menuToggle = document.querySelector("[data-menu-toggle]");
const navLinks = document.querySelector("[data-nav-links]");
const languageSelect = document.querySelector("[data-language-select]");
const productSelect = document.querySelector("#productSelect");
const rfqForm = document.querySelector("#rfqForm");
const formStatus = document.querySelector("[data-form-status]");
const rfqEmail = "info@jsgpump.com";

const languages = ["en", "zh", "fr", "de", "id", "it", "ko", "es"];
const langAttrs = {
  en: "en",
  zh: "zh-CN",
  fr: "fr",
  de: "de",
  id: "id",
  it: "it",
  ko: "ko",
  es: "es"
};

const baseProducts = [
  "BD-01/02/03/04 Diaphragm Air Pumps",
  "BD-01W/02W/03W/04W/07W Diaphragm Liquid Pumps",
  "BD-07/79 Piston Air Pumps",
  "BD-08 Mini Compressors",
  "Gas Sample, Medical and Special Pumps",
  "Pump Accessories and Control Components"
];

const english = {
  metaTitle: "JSG DC Pump | Micro Air, Liquid, Piston Pump & Compressor Solutions",
  metaDescription:
    "JSG DC Pump manufactures diaphragm air pumps, vacuum pumps, diaphragm liquid pumps, piston air pumps, mini compressors, accessories, and OEM fluid control modules for global equipment manufacturers.",
  brandSmall: "Micro Pump & Fluid Control",
  nav: ["Products", "Series Matrix", "OEM/ODM", "Blog", "Industries", "About", "Contact"],
  navCta: "Request a Quote",
  heroEyebrow: "BD-series micro pump manufacturer",
  heroTitle: "Micro Pump & Fluid Control Solutions",
  heroLede:
    "JSG DC Pump develops and manufactures micro air pumps, vacuum pumps, diaphragm liquid pumps, piston pumps, mini compressors, accessories, and customized pump modules for medical, analytical, appliance, beauty, automation, and environmental equipment manufacturers.",
  heroActions: ["Find a Pump", "Request a Quote", "View Catalog Pages"],
  metrics: ["Years pump experience", "Prototype options", "Years global export"],
  trust: [
    "ISO 9001:2015 quality management",
    "CE / RoHS compliance support for selected projects",
    "OBM, ODM, and OEM service models",
    "Exported to Korea, Europe, US, Japan, SEA, Australia"
  ],
  productsHeading: {
    eyebrow: "Product families",
    title: "Choose by medium, pressure, vacuum, flow, duty cycle, and installation space.",
    body:
      "JSG product families cover air, vacuum, gas sampling, liquid transfer, ink delivery, high-pressure piston platforms, compact compressors, and accessory parts for complete OEM fluid-control assemblies."
  },
  productCards: [
    {
      title: "Micro Diaphragm Air & Vacuum Pumps",
      body:
        "BD-01, BD-02, BD-03, and BD-04 platforms for clean oil-free air pressure, vacuum suction, gas sampling, medical devices, and compact pneumatic modules.",
      specs: ["Flow: 0.3-22 L/min", "Pressure: 0.5-3.5 bar", "Vacuum: -30 to -85 kPa"]
    },
    {
      title: "Diaphragm Liquid & Ink Pumps",
      body:
        "Self-priming diaphragm liquid pumps for dispensing, ink delivery, transfer, purification, filling, cleaning, beverage, and laboratory systems.",
      specs: ["Water flow: 100 mL/min-1.5 L/min", "BD-07W pressure: up to 10 bar", "Diaphragm: EPDM / FKM"]
    },
    {
      title: "Piston Air Pumps",
      body:
        "High-pressure piston air pump platforms for medical, cosmetic, appliance, power tool, automation, and robotics systems.",
      specs: ["Flow: 15-45 L/min", "Pressure: 4.5-7 bar", "Vacuum: -80 to -85 kPa"]
    },
    {
      title: "Mini Compressors",
      body:
        "Compact oil-free compressor series for rehabilitation equipment, 3D printing, foam cleaning, portable tools, environmental monitoring, and high-flow pressure systems.",
      specs: ["Flow: 40-80 L/min", "Pressure: 2-7 bar", "Power: 60-150W"]
    },
    {
      title: "Gas Sample, Medical & Special Pumps",
      body:
        "Application-focused pump options for IVD instruments, gas sampling, breast pumps, dental suction, oxygen equipment, inkjet systems, and customized compact devices.",
      specs: ["Medium: air, gas, vacuum, liquid, ink", "Motor: brush, BLDC, coreless options", "Customized voltage, fittings, and materials"]
    },
    {
      title: "Accessories & Controls",
      body:
        "System parts for cleaner routing, lower noise, filtration, speed control, shock absorption, flow feedback, and pneumatic switching.",
      specs: ["PU / silicone tube, check valve, filters", "Silencer, shock absorber, absorbing cotton", "PWM controller, flow meter, solenoid valve"]
    }
  ],
  askSpecs: "Ask for Specs",
  matrixHeading: {
    eyebrow: "Series matrix",
    title: "Engineering ranges for faster first-round screening.",
    body:
      "Use these ranges as a first pass. Final values depend on motor type, diaphragm material, voltage, duty cycle, tubing, load startup, altitude, operating temperature, and test standard."
  },
  matrixHeaders: ["Series", "Type", "Flow", "Pressure", "Vacuum", "Power / Voltage", "Notes"],
  catalogHeading: {
    eyebrow: "Catalog overview",
    title: "Core product families for air, vacuum, liquid, pressure, and accessory systems.",
    body: "Review core product series, performance ranges, and accessory categories for early model screening before a detailed engineering RFQ."
  },
  catalogCaptions: [
    "BD-01 to BD-04 diaphragm air pump ranges",
    "BD liquid pump series and BD-07W high-pressure liquid pump",
    "BD-07 and BD-79 piston air pump ranges",
    "BD-08 mini compressor and core accessory categories"
  ],
  oem: {
    eyebrow: "OEM / ODM / equipment development",
    title: "Custom pump modules and integrated device solutions built around your equipment constraints.",
    body:
      "JSG supports model matching, product-family customization, prototype development, voltage and motor selection, diaphragm material choice, air or liquid path optimization, accessory integration, and pump-based device development from concept to production.",
    steps: [
      "Analyze application, medium, pressure, vacuum, flow, voltage, and load startup",
      "Select pump principle, motor type, wetted materials, valves, tubing, and fittings",
      "Build prototype modules with noise, vibration, airflow, liquid path, and control tuning",
      "Validate samples, finalize tooling or configuration, and prepare stable production"
    ],
    panelTop: ["DEVELOPMENT MAP", "Pump / compressor / module / device"],
    specTerms: ["Voltage", "Motors", "Diaphragm", "Control"],
    specDefs: ["3V to 24V common; selected models to 220V", "Brush, brushless, coreless, shaded pole", "EPDM / FKM options", "PWM controller, valve, flow meter, sensor options"]
  },
  blogHeading: {
    eyebrow: "Micro pump blog",
    title: "Engineering articles for pump selection, OEM integration, and fluid control design.",
    body:
      "Practical notes for choosing micro air pumps, liquid pumps, piston pumps, mini compressors, and complete fluid control modules."
  },
  blogPosts: [
    ["Selection Guide", "How to Choose a Micro Diaphragm Air Pump for Medical Devices"],
    ["Liquid Pump", "Diaphragm Liquid Pump Selection for Precision Dispensing and Water Purifiers"],
    ["Pressure Systems", "Piston Air Pump vs Mini Compressor: Pressure, Flow, and Duty Cycle"],
    ["OEM Integration", "Reducing Noise and Vibration in OEM Micro Pump Modules"],
    ["Accessories", "Pump Accessories That Improve Reliability: Valves, Tubing, Filters, and Silencers"]
  ],
  blogExcerpts: [
    "Medical equipment buyers often search for a micro diaphragm air pump that is compact, oil-free, low noise, and stable under repeated duty cycles.",
    "For liquid dispensing, water purifier modules, and small filling systems, a self-priming diaphragm liquid pump must match flow, pressure, medium, and diaphragm material.",
    "Piston air pumps and mini compressors both support high-pressure air systems, but they are not interchangeable in every OEM design.",
    "Low noise is not only a pump specification. It depends on motor type, mounting structure, tubing, housing resonance, and air path design.",
    "A good pump module is more than a pump. Accessories control flow stability, contamination risk, startup load, noise, and maintenance life."
  ],
  blogBodies: [
    ["Select by flow, vacuum, pressure, voltage, noise, lifetime, and installation space.", "BD-01 to BD-04 platforms cover compact air and vacuum needs from low-flow sampling to stronger suction.", "Test the full air path, including tubing, filters, valves, and enclosure.", "Confirm duty cycle, ambient temperature, and load startup before production."],
    ["A diaphragm liquid pump is useful when equipment needs self-priming transfer and clean isolation between motor and fluid.", "Confirm viscosity, chemical properties, inlet height, outlet restriction, and whether dry startup may occur.", "Match EPDM or FKM diaphragm options to the medium.", "Validate tubing diameter, check valves, filters, and leakage control together."],
    ["Piston air pumps and mini compressors should be selected by pressure, airflow, heat rise, noise, and power.", "BD-07, BD-79, and BD-08 platforms fit different pressure and flow bands for OEM systems.", "Include relief valves, shock absorption, and acoustic design.", "Run tests at the real duty cycle instead of relying only on rated data."],
    ["Real device noise depends on the whole system, not only the pump datasheet.", "Rigid mounting, narrow tubing, restrictive filters, unstable voltage, and enclosure resonance can all raise noise.", "Use soft mounting, silencers, stable PWM control, and proper tubing size.", "Measure the final product in its real enclosure."],
    ["Accessories can decide whether a pump module remains reliable in production.", "Check valves, filters, silencers, tubing, fittings, flow meters, and solenoid valves affect pressure loss, noise, contamination, and service life.", "Define connector size, filtration needs, and control method early.", "Validate the complete pump plus accessory module before mass production."]
  ],
  readArticle: "Read article",
  company: {
    eyebrow: "Company capability",
    title: "R&D, production, sales, and service in one micro pump supplier.",
    body:
      "Shenzhen Jingsuguang Technology focuses on micro pump fluid products and solutions. The business combines R&D, production, sales, and service, with long-term export experience and product coverage across diaphragm air pumps, liquid pumps, piston air pumps, mini compressors, accessories, and custom modules.",
    proofs: ["micro pump prototypes for selection and customization", "own-brand supply plus ODM and OEM service modes", "ISO 9001:2015 quality management foundation"]
  },
  industriesHeading: {
    eyebrow: "Application focus",
    title: "Built for device categories where pump stability and noise control matter."
  },
  industries: [
    ["Medical Equipment", "Diagnostics, therapy, sampling"],
    ["Cosmetic Instruments", "Suction, pressure, liquid handling"],
    ["Vacuum Sampling", "Monitoring and analysis systems"],
    ["Food & Beverage", "Dispensing, filling, transfer"],
    ["Household Appliances", "Air and liquid modules"],
    ["Power Tools", "Compact pressure systems"],
    ["Automation & Robotics", "Air, vacuum, and control"],
    ["Cleaning & Disinfection", "Liquid pump and compressor systems"],
    ["Water Purifier", "Self-priming liquid pump modules"],
    ["3D Printing", "Mini compressor applications"],
    ["Environmental Monitoring", "Sampling and pump life control"],
    ["Scientific Experiments", "Precision liquid and gas movement"]
  ],
  rfq: {
    eyebrow: "Engineering RFQ",
    title: "Send your pump requirements. Get a matched series recommendation.",
    body:
      "Share medium, flow, pressure, vacuum, voltage, duty cycle, noise target, size limit, startup load, environment, and whether you need pump-only or a full pump plus accessory module.",
    strip: "Engineering recommendations for OEM and ODM pump projects",
    labels: ["Name *", "Company *", "Email *", "Country / Region", "Product type", "Annual quantity", "Medium / flow / pressure / vacuum / voltage", "Application description *"],
    quantityPlaceholder: "e.g. 5,000 pcs/year",
    requirementsPlaceholder: "e.g. air, 12V, 5 L/min, -70 kPa, low noise",
    messagePlaceholder: "Tell us the equipment type, load startup, environment, size limit, and accessory needs.",
    submit: "Submit RFQ"
  },
  productOptions: baseProducts,
  catalogStrip: ["Purchasing tips", "Define needs, fluid type, startup load, environment, size fit, and measurement standard before selecting a pump.", "Request Catalog"],
  footer: {
    body:
      "A professional micro pump supplier integrating R&D, production, sales, and service for BD-series air, liquid, piston, compressor, accessory, and OEM fluid control products.",
    headings: ["Products", "Applications", "RFQ"],
    links: [
      ["Diaphragm air pumps", "Diaphragm liquid pumps", "Piston air pumps", "Mini compressors"],
      ["Medical", "Cosmetic", "Liquid dispensing", "Automation"],
      ["info@jsgpump.com", "Submit RFQ", "View catalog pages"]
    ],
    copyright: "© 2026 Shenzhen Jingsuguang Technology Co., Ltd."
  },
  status: {
    required: "Please complete all required fields before submitting.",
    email: "Please enter a valid business email address.",
    sending: "Sending your RFQ...",
    success: "Thank you. Your RFQ has been sent to info@jsgpump.com.",
    serverError: "We could not send the RFQ right now. Please email info@jsgpump.com directly.",
    commentRequired: "Please enter a name and comment.",
    commentSuccess: "Your email client should open with the message prepared.",
    application: "Application: {industry}. Please recommend a suitable micro pump solution."
  }
};

const copy = {
  en: english,
  zh: {
    ...english,
    metaTitle: "JSG DC Pump | 微型气泵、液泵、活塞泵与压缩机解决方案",
    metaDescription: "JSG DC Pump 生产微型隔膜气泵、真空泵、隔膜液泵、活塞气泵、迷你压缩机、配件和 OEM 流体控制模块。",
    brandSmall: "微型泵与流体控制",
    nav: ["产品", "系列参数", "OEM/ODM", "博客", "应用行业", "关于我们", "联系"],
    navCta: "获取报价",
    heroEyebrow: "BD 系列微型泵制造商",
    heroTitle: "微型泵与流体控制解决方案",
    heroLede: "JSG DC Pump 研发并生产微型气泵、真空泵、隔膜液泵、活塞泵、迷你压缩机、配件及定制泵模块，服务医疗、分析仪器、家电、美容、自动化和环保设备制造商。",
    heroActions: ["查找泵型", "获取报价", "查看目录页"],
    metrics: ["年泵行业经验", "种样机选型", "年全球出口"],
    productsHeading: {
      eyebrow: "产品系列",
      title: "按介质、压力、真空度、流量、工况和安装空间选型。",
      body: "JSG 产品覆盖空气、真空、气体采样、液体输送、墨水输送、高压活塞平台、紧凑压缩机和完整 OEM 流体控制组件所需配件。"
    },
    askSpecs: "索取参数",
    matrixHeading: { eyebrow: "系列参数", title: "用于快速初筛的工程参数范围。", body: "这些范围用于前期选型。最终数据取决于电机类型、膜片材料、电压、工作周期、管路、负载启动、海拔、环境温度和测试标准。" },
    matrixHeaders: ["系列", "类型", "流量", "压力", "真空", "功率 / 电压", "备注"],
    catalogHeading: { eyebrow: "目录概览", title: "空气、真空、液体、压力和配件系统的核心产品系列。", body: "在详细 RFQ 前，可先查看核心系列、性能范围和配件类别以完成初步筛选。" },
    oem: { ...english.oem, eyebrow: "OEM / ODM / 设备开发", title: "围绕设备约束定制泵模块与集成设备方案。", body: "JSG 支持型号匹配、产品系列定制、样机开发、电压和电机选择、膜片材料选择、气路或液路优化、配件集成，以及基于泵的设备从概念到量产开发。", steps: ["分析应用、介质、压力、真空、流量、电压和负载启动", "选择泵原理、电机类型、过流材料、阀门、管路和接头", "制作样机模块并调校噪音、振动、气流、液路和控制", "验证样品，确定模具或配置，并准备稳定量产"], panelTop: ["开发路径", "泵 / 压缩机 / 模块 / 设备"], specTerms: ["电压", "电机", "膜片", "控制"] },
    industriesHeading: { eyebrow: "应用行业", title: "适用于对泵稳定性和噪音控制要求高的设备类别。" },
    rfq: { ...english.rfq, eyebrow: "工程询盘", title: "提交泵需求，获取匹配系列建议。", body: "请提供介质、流量、压力、真空、电压、工作周期、噪音目标、尺寸限制、启动负载、环境，以及需要单泵还是泵加配件模块。", strip: "OEM 和 ODM 泵项目工程选型建议", labels: ["姓名 *", "公司 *", "邮箱 *", "国家 / 地区", "产品类型", "年采购量", "介质 / 流量 / 压力 / 真空 / 电压", "应用说明 *"], quantityPlaceholder: "例如 5,000 件/年", requirementsPlaceholder: "例如 空气，12V，5 L/min，-70 kPa，低噪音", messagePlaceholder: "请说明设备类型、负载启动、环境、尺寸限制和配件需求。", submit: "提交询盘" },
    footer: { ...english.footer, headings: ["产品", "应用", "询盘"], copyright: "© 2026 深圳市精塑光科技有限公司" },
    status: { ...english.status, required: "请先填写所有必填项。", email: "请输入有效的商务邮箱。", sending: "正在发送询盘...", success: "谢谢，您的询盘已发送至 info@jsgpump.com。", serverError: "暂时无法发送询盘，请直接邮件联系 info@jsgpump.com。", commentRequired: "请填写姓名和问题。", commentSuccess: "邮件客户端应已打开并生成内容。", application: "应用：{industry}。请推荐合适的微型泵方案。" }
  },
  fr: {
    ...english,
    metaTitle: "JSG DC Pump | Solutions de micro-pompes air, liquide, piston et compresseur",
    brandSmall: "Micro-pompes et contrôle des fluides",
    nav: ["Produits", "Matrice", "OEM/ODM", "Blog", "Secteurs", "À propos", "Contact"],
    navCta: "Demander un devis",
    heroEyebrow: "Fabricant de micro-pompes série BD",
    heroTitle: "Solutions de micro-pompes et de contrôle des fluides",
    heroLede: "JSG DC Pump développe et fabrique des micro-pompes à air, pompes à vide, pompes liquides à membrane, pompes à piston, mini-compresseurs, accessoires et modules personnalisés pour équipements médicaux, analytiques, ménagers, beauté, automatisation et environnement.",
    heroActions: ["Trouver une pompe", "Demander un devis", "Voir le catalogue"],
    metrics: ["ans d'expérience", "options de prototypes", "ans d'exportation"],
    productsHeading: { eyebrow: "Familles de produits", title: "Choisissez selon le fluide, la pression, le vide, le débit, le cycle et l'espace.", body: "Les gammes JSG couvrent l'air, le vide, l'échantillonnage gaz, le transfert de liquide, l'encre, les pistons haute pression, les compresseurs compacts et les accessoires OEM." },
    askSpecs: "Demander les specs",
    rfq: { ...english.rfq, eyebrow: "RFQ technique", title: "Envoyez vos exigences. Recevez une recommandation de série.", strip: "Recommandations techniques pour projets OEM et ODM", labels: ["Nom *", "Société *", "Email *", "Pays / Région", "Type de produit", "Quantité annuelle", "Fluide / débit / pression / vide / tension", "Description de l'application *"], submit: "Envoyer RFQ" },
    footer: { ...english.footer, headings: ["Produits", "Applications", "RFQ"] },
    status: { ...english.status, required: "Veuillez remplir tous les champs obligatoires.", email: "Veuillez saisir une adresse email professionnelle valide.", sending: "Envoi de votre RFQ...", success: "Merci. Votre RFQ a été envoyée à info@jsgpump.com.", serverError: "Impossible d'envoyer la RFQ maintenant. Veuillez écrire à info@jsgpump.com.", commentRequired: "Veuillez saisir un nom et une question.", commentSuccess: "Votre client email devrait s'ouvrir avec le message préparé.", application: "Application : {industry}. Veuillez recommander une micro-pompe adaptée." }
  },
  de: {
    ...english,
    metaTitle: "JSG DC Pump | Mikro-Luftpumpen, Flüssigkeitspumpen, Kolbenpumpen und Kompressoren",
    brandSmall: "Mikropumpen & Fluidsteuerung",
    nav: ["Produkte", "Serienmatrix", "OEM/ODM", "Blog", "Branchen", "Über uns", "Kontakt"],
    navCta: "Angebot anfragen",
    heroEyebrow: "Hersteller von BD-Mikropumpen",
    heroTitle: "Mikropumpen- und Fluidsteuerungslösungen",
    heroLede: "JSG DC Pump entwickelt und fertigt Mikro-Luftpumpen, Vakuumpumpen, Membran-Flüssigkeitspumpen, Kolbenpumpen, Mini-Kompressoren, Zubehör und kundenspezifische Pumpenmodule für Gerätehersteller.",
    heroActions: ["Pumpe finden", "Angebot anfragen", "Katalog ansehen"],
    metrics: ["Jahre Pumpenerfahrung", "Prototyp-Optionen", "Jahre Export"],
    productsHeading: { eyebrow: "Produktfamilien", title: "Auswahl nach Medium, Druck, Vakuum, Durchfluss, Einschaltdauer und Bauraum.", body: "JSG deckt Luft, Vakuum, Gasprobenahme, Flüssigkeitstransfer, Tintenzufuhr, Hochdruck-Kolbenplattformen, Kompaktkompressoren und OEM-Zubehör ab." },
    askSpecs: "Daten anfragen",
    rfq: { ...english.rfq, eyebrow: "Technische Anfrage", title: "Senden Sie Ihre Pumpenanforderungen. Sie erhalten eine passende Serienempfehlung.", strip: "Technische Empfehlungen für OEM- und ODM-Projekte", labels: ["Name *", "Unternehmen *", "E-Mail *", "Land / Region", "Produkttyp", "Jahresmenge", "Medium / Durchfluss / Druck / Vakuum / Spannung", "Anwendungsbeschreibung *"], submit: "RFQ senden" },
    footer: { ...english.footer, headings: ["Produkte", "Anwendungen", "RFQ"] },
    status: { ...english.status, required: "Bitte füllen Sie alle Pflichtfelder aus.", email: "Bitte geben Sie eine gültige geschäftliche E-Mail-Adresse ein.", sending: "Ihre RFQ wird gesendet...", success: "Danke. Ihre RFQ wurde an info@jsgpump.com gesendet.", serverError: "Die RFQ konnte nicht gesendet werden. Bitte schreiben Sie an info@jsgpump.com.", commentRequired: "Bitte geben Sie Namen und Frage ein.", commentSuccess: "Ihr E-Mail-Client sollte mit der vorbereiteten Nachricht geöffnet werden.", application: "Anwendung: {industry}. Bitte empfehlen Sie eine geeignete Mikropumpenlösung." }
  },
  id: {
    ...english,
    metaTitle: "JSG DC Pump | Solusi Pompa Mikro Udara, Cairan, Piston dan Kompresor",
    brandSmall: "Pompa Mikro & Kontrol Fluida",
    nav: ["Produk", "Matriks Seri", "OEM/ODM", "Blog", "Industri", "Tentang", "Kontak"],
    navCta: "Minta Penawaran",
    heroEyebrow: "Produsen pompa mikro seri BD",
    heroTitle: "Solusi Pompa Mikro & Kontrol Fluida",
    heroLede: "JSG DC Pump mengembangkan dan memproduksi pompa udara mikro, pompa vakum, pompa cairan diafragma, pompa piston, kompresor mini, aksesori, dan modul pompa khusus untuk produsen peralatan global.",
    heroActions: ["Cari Pompa", "Minta Penawaran", "Lihat Katalog"],
    metrics: ["tahun pengalaman", "opsi prototipe", "tahun ekspor"],
    productsHeading: { eyebrow: "Keluarga produk", title: "Pilih berdasarkan media, tekanan, vakum, aliran, duty cycle, dan ruang pemasangan.", body: "Keluarga produk JSG mencakup udara, vakum, sampling gas, transfer cairan, tinta, platform piston tekanan tinggi, kompresor ringkas, dan aksesori OEM." },
    askSpecs: "Minta Spesifikasi",
    rfq: { ...english.rfq, eyebrow: "RFQ Teknik", title: "Kirim kebutuhan pompa Anda. Dapatkan rekomendasi seri yang sesuai.", strip: "Rekomendasi teknik untuk proyek OEM dan ODM", labels: ["Nama *", "Perusahaan *", "Email *", "Negara / Wilayah", "Jenis produk", "Jumlah tahunan", "Media / aliran / tekanan / vakum / tegangan", "Deskripsi aplikasi *"], submit: "Kirim RFQ" },
    footer: { ...english.footer, headings: ["Produk", "Aplikasi", "RFQ"] }
  },
  it: {
    ...english,
    metaTitle: "JSG DC Pump | Soluzioni per micro pompe aria, liquido, pistone e compressori",
    brandSmall: "Micro pompe e controllo fluidi",
    nav: ["Prodotti", "Matrice serie", "OEM/ODM", "Blog", "Settori", "Chi siamo", "Contatto"],
    navCta: "Richiedi offerta",
    heroEyebrow: "Produttore di micro pompe serie BD",
    heroTitle: "Soluzioni per micro pompe e controllo dei fluidi",
    heroLede: "JSG DC Pump sviluppa e produce micro pompe aria, pompe a vuoto, pompe liquide a membrana, pompe a pistone, mini compressori, accessori e moduli pompa personalizzati per produttori di apparecchiature.",
    heroActions: ["Trova pompa", "Richiedi offerta", "Vedi catalogo"],
    metrics: ["anni di esperienza", "opzioni prototipo", "anni di export"],
    productsHeading: { eyebrow: "Famiglie prodotto", title: "Scegli per fluido, pressione, vuoto, portata, ciclo e spazio di installazione.", body: "Le gamme JSG coprono aria, vuoto, campionamento gas, liquidi, inchiostro, pistoni alta pressione, compressori compatti e accessori OEM." },
    askSpecs: "Richiedi specifiche",
    rfq: { ...english.rfq, eyebrow: "RFQ tecnico", title: "Invia i requisiti della pompa. Ricevi una raccomandazione di serie.", strip: "Raccomandazioni tecniche per progetti OEM e ODM", labels: ["Nome *", "Azienda *", "Email *", "Paese / Regione", "Tipo prodotto", "Quantità annua", "Fluido / portata / pressione / vuoto / tensione", "Descrizione applicazione *"], submit: "Invia RFQ" },
    footer: { ...english.footer, headings: ["Prodotti", "Applicazioni", "RFQ"] }
  },
  ko: {
    ...english,
    metaTitle: "JSG DC Pump | 마이크로 공기, 액체, 피스톤 펌프 및 컴프레서 솔루션",
    brandSmall: "마이크로 펌프 및 유체 제어",
    nav: ["제품", "시리즈 매트릭스", "OEM/ODM", "블로그", "산업", "회사", "문의"],
    navCta: "견적 요청",
    heroEyebrow: "BD 시리즈 마이크로 펌프 제조사",
    heroTitle: "마이크로 펌프 및 유체 제어 솔루션",
    heroLede: "JSG DC Pump는 의료, 분석, 가전, 미용, 자동화 및 환경 장비 제조사를 위한 마이크로 에어 펌프, 진공 펌프, 다이어프램 액체 펌프, 피스톤 펌프, 미니 컴프레서, 액세서리 및 맞춤 펌프 모듈을 개발·제조합니다.",
    heroActions: ["펌프 찾기", "견적 요청", "카탈로그 보기"],
    metrics: ["년 펌프 경험", "프로토타입 옵션", "년 글로벌 수출"],
    productsHeading: { eyebrow: "제품군", title: "매체, 압력, 진공, 유량, 듀티 사이클 및 설치 공간으로 선택하세요.", body: "JSG 제품군은 공기, 진공, 가스 샘플링, 액체 이송, 잉크 공급, 고압 피스톤 플랫폼, 소형 컴프레서 및 OEM 액세서리를 포함합니다." },
    askSpecs: "사양 문의",
    rfq: { ...english.rfq, eyebrow: "엔지니어링 RFQ", title: "펌프 요구사항을 보내면 적합한 시리즈를 추천합니다.", strip: "OEM 및 ODM 펌프 프로젝트를 위한 엔지니어링 추천", labels: ["이름 *", "회사 *", "이메일 *", "국가 / 지역", "제품 유형", "연간 수량", "매체 / 유량 / 압력 / 진공 / 전압", "적용 설명 *"], submit: "RFQ 제출" },
    footer: { ...english.footer, headings: ["제품", "적용 분야", "RFQ"] }
  },
  es: {
    ...english,
    metaTitle: "JSG DC Pump | Soluciones de micro bombas de aire, líquido, pistón y compresor",
    brandSmall: "Micro bombas y control de fluidos",
    nav: ["Productos", "Matriz", "OEM/ODM", "Blog", "Industrias", "Empresa", "Contacto"],
    navCta: "Solicitar cotización",
    heroEyebrow: "Fabricante de micro bombas serie BD",
    heroTitle: "Soluciones de micro bombas y control de fluidos",
    heroLede: "JSG DC Pump desarrolla y fabrica micro bombas de aire, bombas de vacío, bombas líquidas de diafragma, bombas de pistón, mini compresores, accesorios y módulos personalizados para fabricantes de equipos.",
    heroActions: ["Buscar bomba", "Solicitar cotización", "Ver catálogo"],
    metrics: ["años de experiencia", "opciones de prototipo", "años de exportación"],
    productsHeading: { eyebrow: "Familias de productos", title: "Seleccione por medio, presión, vacío, caudal, ciclo de trabajo y espacio.", body: "Las gamas JSG cubren aire, vacío, muestreo de gas, transferencia de líquido, tinta, pistón de alta presión, compresores compactos y accesorios OEM." },
    askSpecs: "Pedir especificaciones",
    rfq: { ...english.rfq, eyebrow: "RFQ técnico", title: "Envíe sus requisitos. Reciba una recomendación de serie.", strip: "Recomendaciones técnicas para proyectos OEM y ODM", labels: ["Nombre *", "Empresa *", "Email *", "País / Región", "Tipo de producto", "Cantidad anual", "Medio / caudal / presión / vacío / voltaje", "Descripción de aplicación *"], submit: "Enviar RFQ" },
    footer: { ...english.footer, headings: ["Productos", "Aplicaciones", "RFQ"] }
  }
};

const productCardsFor = (items) =>
  items.map((item, index) => ({
    title: item[0],
    body: item[1],
    specs: item[2] || english.productCards[index].specs
  }));

Object.assign(copy.zh, {
  productCards: productCardsFor([
    ["微型隔膜气泵与真空泵", "BD-01、BD-02、BD-03、BD-04 平台适用于清洁无油气压、真空吸附、气体采样、医疗设备和紧凑气动模块。", ["流量：0.3-22 L/min", "压力：0.5-3.5 bar", "真空：-30 至 -85 kPa"]],
    ["隔膜液泵与墨水泵", "自吸隔膜液泵适用于定量、墨水输送、液体转移、净化、灌装、清洗、饮料和实验室系统。", ["水流量：100 mL/min-1.5 L/min", "BD-07W 压力：最高 10 bar", "膜片：EPDM / FKM"]],
    ["活塞气泵", "高压活塞气泵平台适用于医疗、美容、家电、电动工具、自动化和机器人系统。", ["流量：15-45 L/min", "压力：4.5-7 bar", "真空：-80 至 -85 kPa"]],
    ["迷你压缩机", "紧凑无油压缩机适用于康复设备、3D 打印、泡沫清洗、便携工具、环境监测和高流量压力系统。", ["流量：40-80 L/min", "压力：2-7 bar", "功率：60-150W"]],
    ["气体采样、医疗与专用泵", "面向 IVD 仪器、气体采样、吸奶器、牙科吸引、氧气设备、喷墨系统和定制紧凑设备的专用泵方案。", ["介质：空气、气体、真空、液体、墨水", "电机：有刷、BLDC、空心杯选项", "可定制电压、接头和材料"]],
    ["配件与控制件", "用于优化管路、降噪、过滤、调速、减震、流量反馈和气动切换的系统配件。", ["PU / 硅胶管、单向阀、过滤器", "消音器、减震件、吸音棉", "PWM 控制器、流量计、电磁阀"]]
  ]),
  catalogCaptions: ["BD-01 至 BD-04 隔膜气泵范围", "BD 液泵系列与 BD-07W 高压液泵", "BD-07 与 BD-79 活塞气泵范围", "BD-08 迷你压缩机与核心配件类别"],
  blogHeading: { eyebrow: "微型泵博客", title: "泵选型、OEM 集成与流体控制设计文章。", body: "关于微型气泵、液泵、活塞泵、迷你压缩机和完整流体控制模块的实用选型说明。" },
  blogPosts: [["选型指南", "医疗设备如何选择微型隔膜气泵"], ["液泵", "精密定量与净水器用隔膜液泵选型"], ["压力系统", "活塞气泵与迷你压缩机：压力、流量和工作周期"], ["OEM 集成", "降低 OEM 微型泵模块的噪音与振动"], ["配件", "提高可靠性的泵配件：阀门、管路、过滤器和消音器"]],
  blogExcerpts: ["医疗设备通常需要紧凑、无油、低噪音，并能在重复工况下稳定工作的微型隔膜气泵。", "液体定量、净水模块和小型灌装系统需要按流量、压力、介质和膜片材料选择自吸隔膜液泵。", "活塞气泵和迷你压缩机都可用于高压空气系统，但在 OEM 设计中不能简单互换。", "低噪音不只是泵参数，还与电机、安装结构、管路、外壳共振和气路设计有关。", "可靠的泵模块不仅是泵本体，配件会影响流量稳定性、污染风险、启动负载、噪音和寿命。"],
  blogBodies: [
    ["应按流量、真空度、压力、电压、噪音、寿命和安装空间进行选择。", "BD-01 至 BD-04 平台可覆盖从低流量采样到较强吸附的空气与真空需求。", "测试完整气路，包括管路、过滤器、阀门和外壳。", "量产前确认工作周期、环境温度和负载启动。"],
    ["当设备需要自吸输送并隔离电机与液体时，隔膜液泵更适合。", "应确认粘度、化学属性、吸程、出口阻力以及是否存在干启动。", "按介质匹配 EPDM 或 FKM 膜片。", "同时验证管径、单向阀、过滤器和泄漏控制。"],
    ["活塞气泵和迷你压缩机应按压力、流量、温升、噪音和功率选择。", "BD-07、BD-79 和 BD-08 平台适配不同 OEM 压力与流量区间。", "系统中应考虑泄压、减震和声学设计。", "按真实工作周期测试，而不是只看额定数据。"],
    ["整机噪音取决于系统，而不只是泵参数。", "硬连接、窄管路、高阻过滤器、电压不稳和外壳共振都会增大噪音。", "建议使用软安装、消音器、稳定 PWM 控制和合适管径。", "应在真实外壳中测量最终产品。"],
    ["配件会影响泵模块在量产中的可靠性。", "单向阀、过滤器、消音器、管路、接头、流量计和电磁阀会影响压损、噪音、污染和寿命。", "应尽早定义接头尺寸、过滤需求和控制方式。", "量产前验证完整泵加配件模块。"]
  ],
  company: { eyebrow: "公司能力", title: "集研发、生产、销售和服务于一体的微型泵供应商。", body: "深圳市精塑光科技专注于微型泵流体产品与解决方案，业务结合研发、生产、销售和服务，拥有长期出口经验，产品覆盖隔膜气泵、液泵、活塞气泵、迷你压缩机、配件和定制模块。", proofs: ["微型泵样机用于选型与定制", "自有品牌供应及 ODM、OEM 服务模式", "ISO 9001:2015 质量管理基础"] },
  industries: [["医疗设备", "诊断、治疗、采样"], ["美容仪器", "吸附、压力、液体处理"], ["真空采样", "监测与分析系统"], ["食品饮料", "定量、灌装、转移"], ["家用电器", "气体与液体模块"], ["电动工具", "紧凑压力系统"], ["自动化与机器人", "气、真空与控制"], ["清洗消毒", "液泵与压缩机系统"], ["净水器", "自吸液泵模块"], ["3D 打印", "迷你压缩机应用"], ["环境监测", "采样与泵寿命控制"], ["科学实验", "精密液体与气体移动"]],
  productOptions: ["BD-01/02/03/04 隔膜气泵", "BD-01W/02W/03W/04W/07W 隔膜液泵", "BD-07/79 活塞气泵", "BD-08 迷你压缩机", "气体采样、医疗与专用泵", "泵配件与控制件"],
  catalogStrip: ["采购提示", "选泵前请明确需求、介质类型、启动负载、环境、尺寸适配和测试标准。", "索取目录"]
});

Object.assign(copy.fr, {
  productCards: productCardsFor([
    ["Micro-pompes à membrane air et vide", "Plateformes BD-01 à BD-04 pour air propre sans huile, aspiration, échantillonnage gaz, dispositifs médicaux et modules pneumatiques compacts."],
    ["Pompes liquides et encre à membrane", "Pompes auto-amorçantes pour dosage, encre, transfert, purification, remplissage, nettoyage, boisson et laboratoire."],
    ["Pompes à piston air", "Plateformes haute pression pour systèmes médicaux, beauté, électroménager, outils, automatisation et robotique."],
    ["Mini-compresseurs", "Compresseurs compacts sans huile pour rééducation, impression 3D, nettoyage mousse, outils portables et surveillance environnementale."],
    ["Pompes gaz, médicales et spéciales", "Options ciblées pour IVD, échantillonnage gaz, tire-lait, aspiration dentaire, oxygène, jet d'encre et appareils compacts."],
    ["Accessoires et contrôle", "Composants pour routage propre, réduction du bruit, filtration, variation de vitesse, amortissement, retour de débit et commutation pneumatique."]
  ]),
  blogPosts: [["Guide de sélection", "Choisir une micro-pompe à membrane pour dispositifs médicaux"], ["Pompe liquide", "Sélection de pompe liquide à membrane pour dosage et purificateurs"], ["Systèmes pression", "Pompe à piston ou mini-compresseur : pression, débit et cycle"], ["Intégration OEM", "Réduire bruit et vibration dans les modules de micro-pompe"], ["Accessoires", "Accessoires qui améliorent la fiabilité : valves, tubes, filtres, silencieux"]],
  blogExcerpts: ["Les dispositifs médicaux demandent souvent une pompe compacte, sans huile, silencieuse et stable.", "Les systèmes de dosage, purification et remplissage doivent aligner débit, pression, fluide et matériau de membrane.", "Les pompes à piston et mini-compresseurs servent la haute pression, mais ne sont pas toujours interchangeables.", "Le bruit dépend aussi du moteur, du montage, des tubes, de la résonance et du circuit d'air.", "Un module fiable inclut aussi valves, filtres, tubes, silencieux et contrôle."],
  blogBodies: [["Sélectionnez par débit, vide, pression, tension, bruit, durée de vie et espace.", "Testez le circuit complet avec tubes, filtres, valves et boîtier.", "Vérifiez le cycle de service.", "Confirmez la charge au démarrage."], ["Confirmez viscosité, chimie, hauteur d'aspiration et restriction de sortie.", "Choisissez EPDM ou FKM selon le fluide.", "Validez valves et tubes ensemble.", "Contrôlez les risques de fuite."], ["Comparez pression, débit, chaleur, bruit et puissance.", "Les séries BD-07, BD-79 et BD-08 couvrent des bandes différentes.", "Ajoutez soupape, amortissement et acoustique.", "Testez au cycle réel."], ["Le bruit vient du système complet.", "Montage rigide, tubes étroits et résonance augmentent le bruit.", "Utilisez supports souples, silencieux et PWM stable.", "Mesurez dans le boîtier final."], ["Les accessoires influencent la fiabilité.", "Valves, filtres, silencieux et tubes modifient pertes et bruit.", "Définissez raccords et filtration tôt.", "Validez le module complet."]],
  company: { ...english.company, eyebrow: "Capacités", title: "R&D, production, vente et service chez un fournisseur de micro-pompes.", body: "Shenzhen Jingsuguang Technology fournit des produits et solutions de micro-pompes avec expérience export, couvrant pompes à membrane air/liquide, pompes à piston, compresseurs, accessoires et modules personnalisés." },
  industries: [["Équipement médical", "Diagnostic, thérapie, échantillonnage"], ["Beauté", "Aspiration, pression, liquides"], ["Échantillonnage vide", "Analyse et monitoring"], ["Aliments & boissons", "Dosage, remplissage, transfert"], ["Électroménager", "Modules air et liquide"], ["Outils électriques", "Systèmes compacts"], ["Automatisation & robotique", "Air, vide et contrôle"], ["Nettoyage", "Pompe liquide et compresseur"], ["Purificateur d'eau", "Module auto-amorçant"], ["Impression 3D", "Mini-compresseur"], ["Environnement", "Échantillonnage"], ["Laboratoire", "Mouvement précis"]],
  productOptions: ["Pompes à membrane air BD-01/02/03/04", "Pompes liquides BD-01W/02W/03W/04W/07W", "Pompes à piston BD-07/79", "Mini-compresseurs BD-08", "Pompes gaz, médicales et spéciales", "Accessoires et contrôle"]
});

Object.assign(copy.de, {
  productCards: productCardsFor([
    ["Mikro-Membranpumpen für Luft & Vakuum", "BD-01 bis BD-04 für ölfreie Luft, Vakuum, Gasprobenahme, Medizintechnik und kompakte Pneumatikmodule."],
    ["Membran-Flüssigkeits- und Tintenpumpen", "Selbstansaugende Pumpen für Dosierung, Tinte, Transfer, Reinigung, Getränke und Labor."],
    ["Kolben-Luftpumpen", "Hochdruckplattformen für Medizin, Kosmetik, Haushaltsgeräte, Werkzeuge, Automation und Robotik."],
    ["Mini-Kompressoren", "Kompakte ölfreie Kompressoren für Reha, 3D-Druck, Schaumreinigung, tragbare Werkzeuge und Monitoring."],
    ["Gasproben-, Medizin- und Spezialpumpen", "Anwendungsbezogene Pumpen für IVD, Gasproben, Milchpumpen, Dentalabsaugung, Sauerstoff und Inkjet."],
    ["Zubehör & Steuerung", "Komponenten für saubere Leitungsführung, Geräuschminderung, Filtration, Drehzahlsteuerung, Dämpfung und Pneumatikumschaltung."]
  ]),
  blogPosts: [["Auswahlhilfe", "Mikro-Membranpumpe für Medizingeräte auswählen"], ["Flüssigkeitspumpe", "Membran-Flüssigkeitspumpen für Dosierung und Wasserreiniger"], ["Drucksysteme", "Kolbenpumpe vs. Mini-Kompressor: Druck, Durchfluss, Zyklus"], ["OEM-Integration", "Geräusch und Vibration in Mikropumpenmodulen reduzieren"], ["Zubehör", "Zuverlässigkeit mit Ventilen, Schläuchen, Filtern und Schalldämpfern verbessern"]],
  blogExcerpts: ["Medizingeräte benötigen oft kompakte, ölfreie, leise und stabile Mikropumpen.", "Dosier-, Wasser- und Füllsysteme müssen Durchfluss, Druck, Medium und Membranmaterial abstimmen.", "Kolbenpumpen und Mini-Kompressoren unterstützen Hochdruck, sind aber nicht immer austauschbar.", "Geräusch entsteht im Gesamtsystem aus Motor, Montage, Schlauch, Gehäuse und Luftweg.", "Zubehör beeinflusst Durchfluss, Verschmutzung, Startlast, Geräusch und Lebensdauer."],
  blogBodies: [["Wählen Sie nach Durchfluss, Vakuum, Druck, Spannung, Geräusch, Lebensdauer und Bauraum.", "Prüfen Sie den kompletten Luftweg mit Schläuchen, Filtern, Ventilen und Gehäuse.", "Bestätigen Sie die Einschaltdauer.", "Prüfen Sie die Startlast."], ["Klären Sie Viskosität, Chemie, Ansaughöhe und Ausgangswiderstand.", "Wählen Sie EPDM oder FKM passend zum Medium.", "Validieren Sie Schläuche und Ventile zusammen.", "Prüfen Sie Leckagerisiken."], ["Vergleichen Sie Druck, Durchfluss, Wärme, Geräusch und Leistung.", "BD-07, BD-79 und BD-08 bedienen verschiedene Bereiche.", "Planen Sie Entlastung, Dämpfung und Akustik.", "Testen Sie im realen Zyklus."], ["Geräusch entsteht im Gesamtsystem.", "Starre Montage, enge Schläuche und Resonanz erhöhen den Pegel.", "Nutzen Sie weiche Lagerung, Schalldämpfer und stabiles PWM.", "Messen Sie im finalen Gehäuse."], ["Zubehör beeinflusst Zuverlässigkeit.", "Ventile, Filter, Schalldämpfer und Schläuche verändern Druckverlust und Geräusch.", "Definieren Sie Anschlüsse und Filter früh.", "Validieren Sie das komplette Modul."]],
  company: { ...english.company, eyebrow: "Unternehmensfähigkeit", title: "F&E, Produktion, Vertrieb und Service aus einer Hand.", body: "Shenzhen Jingsuguang Technology liefert Mikropumpen und Fluidlösungen mit Exporterfahrung, inklusive Membranpumpen, Flüssigkeitspumpen, Kolbenpumpen, Kompressoren, Zubehör und kundenspezifischen Modulen." },
  industries: [["Medizintechnik", "Diagnose, Therapie, Proben"], ["Kosmetikgeräte", "Saugung, Druck, Flüssigkeit"], ["Vakuumproben", "Monitoring und Analyse"], ["Lebensmittel & Getränke", "Dosieren, Füllen, Transfer"], ["Haushaltsgeräte", "Luft- und Flüssigkeitsmodule"], ["Elektrowerkzeuge", "Kompakte Drucksysteme"], ["Automation & Robotik", "Luft, Vakuum, Steuerung"], ["Reinigung", "Pumpe und Kompressor"], ["Wasserreiniger", "Selbstansaugmodul"], ["3D-Druck", "Mini-Kompressor"], ["Umweltmonitoring", "Probenahme"], ["Labor", "Präzise Medienbewegung"]]
});

Object.assign(copy.id, {
  productCards: productCardsFor([
    ["Pompa Diafragma Mikro Udara & Vakum", "Platform BD-01 hingga BD-04 untuk udara bebas oli, hisap vakum, sampling gas, perangkat medis, dan modul pneumatik ringkas."],
    ["Pompa Diafragma Cairan & Tinta", "Pompa self-priming untuk dosing, tinta, transfer, pemurnian, pengisian, pembersihan, minuman, dan lab."],
    ["Pompa Udara Piston", "Platform tekanan tinggi untuk medis, kosmetik, peralatan rumah, alat listrik, otomasi, dan robotik."],
    ["Kompresor Mini", "Kompresor bebas oli ringkas untuk rehabilitasi, 3D printing, pembersihan busa, alat portabel, dan monitoring lingkungan."],
    ["Pompa Sampling Gas, Medis & Khusus", "Pilihan pompa untuk IVD, sampling gas, breast pump, dental suction, oksigen, inkjet, dan perangkat khusus."],
    ["Aksesori & Kontrol", "Komponen untuk jalur bersih, pengurangan suara, filtrasi, kontrol kecepatan, peredam, feedback aliran, dan switching pneumatik."]
  ]),
  blogPosts: [["Panduan Seleksi", "Cara memilih pompa diafragma mikro untuk perangkat medis"], ["Pompa Cairan", "Seleksi pompa cairan diafragma untuk dosing dan purifier"], ["Sistem Tekanan", "Pompa piston vs kompresor mini: tekanan, aliran, duty cycle"], ["Integrasi OEM", "Mengurangi suara dan getaran pada modul pompa mikro"], ["Aksesori", "Katup, tubing, filter, dan silencer untuk reliabilitas"]],
  blogBodies: [["Pilih berdasarkan aliran, vakum, tekanan, tegangan, suara, umur, dan ruang pemasangan.", "Uji seluruh jalur udara dengan tubing, filter, valve, dan housing.", "Konfirmasi duty cycle.", "Periksa beban startup."], ["Konfirmasi viskositas, sifat kimia, tinggi hisap, dan hambatan outlet.", "Pilih EPDM atau FKM sesuai media.", "Validasi tubing dan check valve bersama.", "Periksa risiko kebocoran."], ["Bandingkan tekanan, aliran, panas, suara, dan daya.", "BD-07, BD-79, dan BD-08 memiliki rentang berbeda.", "Tambahkan relief, peredam, dan desain akustik.", "Uji pada duty cycle nyata."], ["Suara berasal dari sistem lengkap.", "Mounting kaku, tubing sempit, dan resonansi meningkatkan suara.", "Gunakan mounting lunak, silencer, dan PWM stabil.", "Ukur di housing final."], ["Aksesori memengaruhi reliabilitas.", "Valve, filter, silencer, dan tubing mengubah pressure loss dan suara.", "Tentukan konektor dan filtrasi sejak awal.", "Validasi modul lengkap."]],
  company: { ...english.company, eyebrow: "Kapabilitas perusahaan", title: "R&D, produksi, penjualan, dan layanan dalam satu pemasok pompa mikro.", body: "Shenzhen Jingsuguang Technology menyediakan produk dan solusi pompa mikro dengan pengalaman ekspor, mencakup pompa udara, cairan, piston, kompresor, aksesori, dan modul khusus." },
  industries: [["Peralatan Medis", "Diagnostik, terapi, sampling"], ["Kecantikan", "Hisap, tekanan, cairan"], ["Sampling Vakum", "Monitoring dan analisis"], ["Makanan & Minuman", "Dosing, filling, transfer"], ["Peralatan Rumah", "Modul udara dan cairan"], ["Alat Listrik", "Sistem tekanan ringkas"], ["Otomasi & Robotik", "Udara, vakum, kontrol"], ["Pembersihan", "Pompa cairan dan kompresor"], ["Pemurni Air", "Modul self-priming"], ["3D Printing", "Kompresor mini"], ["Monitoring Lingkungan", "Sampling"], ["Laboratorium", "Gerak fluida presisi"]]
});

Object.assign(copy.it, {
  productCards: productCardsFor([
    ["Micro pompe a membrana aria e vuoto", "Piattaforme BD-01-BD-04 per aria senza olio, aspirazione, campionamento gas, dispositivi medicali e moduli pneumatici compatti."],
    ["Pompe a membrana per liquidi e inchiostro", "Pompe autoadescanti per dosaggio, inchiostro, trasferimento, purificazione, riempimento, pulizia, bevande e laboratorio."],
    ["Pompe aria a pistone", "Piattaforme alta pressione per medicale, cosmetica, elettrodomestici, utensili, automazione e robotica."],
    ["Mini compressori", "Compressori compatti senza olio per riabilitazione, stampa 3D, pulizia schiuma, utensili portatili e monitoraggio."],
    ["Pompe gas, medicali e speciali", "Opzioni per IVD, campionamento gas, tiralatte, aspirazione dentale, ossigeno, inkjet e dispositivi compatti."],
    ["Accessori e controlli", "Componenti per routing pulito, riduzione rumore, filtrazione, controllo velocità, smorzamento, feedback flusso e commutazione pneumatica."]
  ]),
  blogPosts: [["Guida selezione", "Come scegliere una micro pompa a membrana per dispositivi medicali"], ["Pompa liquida", "Pompa liquida a membrana per dosaggio e depuratori"], ["Sistemi pressione", "Pompa a pistone vs mini compressore: pressione, flusso e ciclo"], ["Integrazione OEM", "Ridurre rumore e vibrazioni nei moduli pompa"], ["Accessori", "Valvole, tubi, filtri e silenziatori per affidabilità"]],
  blogBodies: [["Selezionare per portata, vuoto, pressione, tensione, rumore, vita e spazio.", "Testare tutto il circuito con tubi, filtri, valvole e contenitore.", "Confermare il ciclo di lavoro.", "Verificare il carico di avvio."], ["Confermare viscosità, chimica, altezza di aspirazione e restrizione uscita.", "Scegliere EPDM o FKM secondo il fluido.", "Validare tubi e valvole insieme.", "Controllare le perdite."], ["Confrontare pressione, flusso, calore, rumore e potenza.", "BD-07, BD-79 e BD-08 coprono bande diverse.", "Prevedere valvola, smorzamento e acustica.", "Testare nel ciclo reale."], ["Il rumore nasce dal sistema completo.", "Montaggio rigido, tubi stretti e risonanza lo aumentano.", "Usare supporti morbidi, silenziatori e PWM stabile.", "Misurare nel contenitore finale."], ["Gli accessori influenzano l'affidabilità.", "Valvole, filtri, silenziatori e tubi modificano perdite e rumore.", "Definire presto connettori e filtrazione.", "Validare il modulo completo."]],
  company: { ...english.company, eyebrow: "Capacità aziendale", title: "R&D, produzione, vendita e servizio in un unico fornitore.", body: "Shenzhen Jingsuguang Technology fornisce prodotti e soluzioni di micro pompe con esperienza export, coprendo pompe aria, liquido, pistone, compressori, accessori e moduli personalizzati." },
  industries: [["Medicale", "Diagnosi, terapia, campionamento"], ["Cosmetica", "Aspirazione, pressione, liquidi"], ["Campionamento vuoto", "Monitoraggio e analisi"], ["Food & beverage", "Dosaggio, riempimento, trasferimento"], ["Elettrodomestici", "Moduli aria e liquido"], ["Utensili", "Sistemi compatti"], ["Automazione & robotica", "Aria, vuoto, controllo"], ["Pulizia", "Pompa liquida e compressore"], ["Depuratore acqua", "Modulo autoadescante"], ["Stampa 3D", "Mini compressore"], ["Ambiente", "Campionamento"], ["Laboratorio", "Movimento preciso"]]
});

Object.assign(copy.ko, {
  productCards: productCardsFor([
    ["마이크로 다이어프램 공기 및 진공 펌프", "BD-01~BD-04 플랫폼은 오일프리 공기, 진공 흡입, 가스 샘플링, 의료기기, 소형 공압 모듈에 적합합니다."],
    ["다이어프램 액체 및 잉크 펌프", "정량 주입, 잉크 공급, 이송, 정수, 충진, 세척, 음료 및 실험실 시스템용 자흡식 펌프입니다."],
    ["피스톤 공기 펌프", "의료, 미용, 가전, 전동공구, 자동화 및 로봇 시스템용 고압 피스톤 플랫폼입니다."],
    ["미니 컴프레서", "재활 장비, 3D 프린팅, 폼 세척, 휴대용 공구, 환경 모니터링용 소형 오일프리 컴프레서입니다."],
    ["가스 샘플, 의료 및 특수 펌프", "IVD, 가스 샘플링, 유축기, 치과 흡입, 산소 장비, 잉크젯 및 맞춤형 장치용 펌프 옵션입니다."],
    ["액세서리 및 제어", "배관 정리, 저소음, 필터링, 속도 제어, 방진, 유량 피드백 및 공압 전환용 부품입니다."]
  ]),
  blogPosts: [["선정 가이드", "의료기기용 마이크로 다이어프램 펌프 선택 방법"], ["액체 펌프", "정밀 정량 및 정수기용 다이어프램 액체 펌프 선정"], ["압력 시스템", "피스톤 펌프와 미니 컴프레서: 압력, 유량, 듀티"], ["OEM 통합", "마이크로 펌프 모듈의 소음과 진동 감소"], ["액세서리", "밸브, 튜브, 필터, 소음기로 신뢰성 향상"]],
  blogBodies: [["유량, 진공, 압력, 전압, 소음, 수명, 설치 공간으로 선정합니다.", "튜브, 필터, 밸브, 하우징을 포함한 전체 공기 경로를 테스트합니다.", "듀티 사이클을 확인합니다.", "시동 부하를 검증합니다."], ["점도, 화학 특성, 흡입 높이, 출구 저항을 확인합니다.", "매체에 따라 EPDM 또는 FKM을 선택합니다.", "튜브와 체크밸브를 함께 검증합니다.", "누수 위험을 확인합니다."], ["압력, 유량, 발열, 소음, 전력을 비교합니다.", "BD-07, BD-79, BD-08은 서로 다른 범위를 지원합니다.", "릴리프, 방진, 소음 설계를 포함합니다.", "실제 듀티로 테스트합니다."], ["소음은 전체 시스템에서 발생합니다.", "강한 고정, 좁은 튜브, 공진은 소음을 높입니다.", "소프트 마운트, 소음기, 안정적 PWM을 사용합니다.", "최종 하우징에서 측정합니다."], ["액세서리는 신뢰성에 영향을 줍니다.", "밸브, 필터, 소음기, 튜브는 압력 손실과 소음을 바꿉니다.", "커넥터와 필터링을 조기에 정의합니다.", "완성 모듈을 검증합니다."]],
  company: { ...english.company, eyebrow: "회사 역량", title: "R&D, 생산, 판매, 서비스를 통합한 마이크로 펌프 공급업체.", body: "Shenzhen Jingsuguang Technology는 수출 경험을 기반으로 공기, 액체, 피스톤, 컴프레서, 액세서리 및 맞춤 모듈을 제공합니다." },
  industries: [["의료 장비", "진단, 치료, 샘플링"], ["미용 기기", "흡입, 압력, 액체"], ["진공 샘플링", "모니터링 및 분석"], ["식음료", "정량, 충진, 이송"], ["가전", "공기 및 액체 모듈"], ["전동공구", "소형 압력 시스템"], ["자동화 및 로봇", "공기, 진공, 제어"], ["세척 및 소독", "액체 펌프와 컴프레서"], ["정수기", "자흡식 액체 모듈"], ["3D 프린팅", "미니 컴프레서"], ["환경 모니터링", "샘플링"], ["실험실", "정밀 유체 이동"]]
});

Object.assign(copy.es, {
  productCards: productCardsFor([
    ["Micro bombas de diafragma de aire y vacío", "Plataformas BD-01 a BD-04 para aire sin aceite, succión, muestreo de gas, dispositivos médicos y módulos neumáticos."],
    ["Bombas de diafragma para líquido y tinta", "Bombas autocebantes para dosificación, tinta, transferencia, purificación, llenado, limpieza, bebidas y laboratorio."],
    ["Bombas de aire de pistón", "Plataformas de alta presión para medicina, belleza, electrodomésticos, herramientas, automatización y robótica."],
    ["Mini compresores", "Compresores compactos sin aceite para rehabilitación, impresión 3D, limpieza de espuma, herramientas portátiles y monitoreo."],
    ["Bombas de gas, médicas y especiales", "Opciones para IVD, muestreo de gas, extractores, succión dental, oxígeno, inkjet y equipos personalizados."],
    ["Accesorios y control", "Componentes para rutas limpias, menor ruido, filtración, control de velocidad, amortiguación, feedback de caudal y conmutación."]
  ]),
  blogPosts: [["Guía de selección", "Cómo elegir una micro bomba de diafragma para equipos médicos"], ["Bomba líquida", "Bomba líquida de diafragma para dosificación y purificadores"], ["Sistemas de presión", "Bomba de pistón vs mini compresor: presión, caudal y ciclo"], ["Integración OEM", "Reducir ruido y vibración en módulos de micro bomba"], ["Accesorios", "Válvulas, tubos, filtros y silenciadores para mejorar fiabilidad"]],
  blogBodies: [["Seleccione por caudal, vacío, presión, voltaje, ruido, vida útil y espacio.", "Pruebe todo el circuito con tubos, filtros, válvulas y carcasa.", "Confirme el ciclo de trabajo.", "Verifique la carga de arranque."], ["Confirme viscosidad, química, altura de succión y restricción de salida.", "Elija EPDM o FKM según el medio.", "Valide tubos y válvulas juntos.", "Controle el riesgo de fugas."], ["Compare presión, caudal, calor, ruido y potencia.", "BD-07, BD-79 y BD-08 cubren rangos diferentes.", "Incluya alivio, amortiguación y acústica.", "Pruebe con el ciclo real."], ["El ruido viene del sistema completo.", "Montaje rígido, tubos estrechos y resonancia aumentan el ruido.", "Use soportes blandos, silenciadores y PWM estable.", "Mida en la carcasa final."], ["Los accesorios afectan la fiabilidad.", "Válvulas, filtros, silenciadores y tubos cambian pérdidas y ruido.", "Defina conectores y filtración temprano.", "Valide el módulo completo."]],
  company: { ...english.company, eyebrow: "Capacidad de la empresa", title: "I+D, producción, ventas y servicio en un proveedor de micro bombas.", body: "Shenzhen Jingsuguang Technology ofrece productos y soluciones de micro bombas con experiencia exportadora, cubriendo bombas de aire, líquido, pistón, compresores, accesorios y módulos personalizados." },
  industries: [["Equipo médico", "Diagnóstico, terapia, muestreo"], ["Belleza", "Succión, presión, líquidos"], ["Muestreo por vacío", "Monitoreo y análisis"], ["Alimentos y bebidas", "Dosificación, llenado, transferencia"], ["Electrodomésticos", "Módulos aire y líquido"], ["Herramientas", "Sistemas compactos"], ["Automatización y robótica", "Aire, vacío y control"], ["Limpieza", "Bomba líquida y compresor"], ["Purificador de agua", "Módulo autocebante"], ["Impresión 3D", "Mini compresor"], ["Monitoreo ambiental", "Muestreo"], ["Laboratorio", "Movimiento preciso"]]
});

const dcPumpArticles = [
  {
    category: "DC Pump Guide",
    title: "What Is a DC Pump? A Practical Guide for OEM Equipment Buyers",
    excerpt: "A DC pump uses direct-current power to move air, gas, water, ink, or other media in compact equipment where voltage, size, and control matter.",
    points: ["Match the pump principle to the medium before comparing voltage or price.", "Confirm flow, pressure, vacuum, duty cycle, noise, and installation space together.", "For OEM projects, test the pump in the real circuit with valves, filters, tubing, and enclosure load."]
  },
  {
    category: "12V DC Pump",
    title: "How to Choose a 12V DC Pump for Compact Devices",
    excerpt: "A 12V DC pump is common in portable instruments, appliances, cleaning devices, and small automation modules because it balances power availability and compact size.",
    points: ["Check whether the system needs air pressure, vacuum, liquid transfer, or dosing.", "Use the required working point, not only the open-flow rating.", "Verify startup current because small power supplies may fail under load."]
  },
  {
    category: "24V DC Pump",
    title: "When a 24V DC Pump Is Better Than a 12V Pump",
    excerpt: "A 24V DC pump can reduce current draw for the same power class and is often preferred in industrial controls, automation, and higher-load OEM equipment.",
    points: ["Lower current can simplify wiring and thermal design.", "A 24V platform may provide stronger pressure or flow in the same pump family.", "Confirm driver, PWM, connector, and safety margin before changing voltage."]
  },
  {
    category: "Brushless Pump",
    title: "Brushless DC Pump vs Brushed DC Pump: Selection Factors",
    excerpt: "Brushless DC pumps are selected for longer life, lower maintenance, and better speed control, while brushed pumps can still fit cost-sensitive compact devices.",
    points: ["Brushless motors remove brush wear and can reduce electrical noise.", "Brushed motors may be simpler when the duty cycle is short and cost pressure is high.", "Select by lifetime target, control method, acoustic target, and operating hours."]
  },
  {
    category: "Micro Pump",
    title: "Micro DC Pump Selection: Flow, Pressure, Vacuum, and Size",
    excerpt: "Micro DC pump selection should begin with the real system requirement rather than the smallest available pump body.",
    points: ["Define the required flow at load, not only nominal flow.", "Include pressure loss from tubing, filters, fittings, and check valves.", "Reserve space for vibration isolation and service access."]
  },
  {
    category: "Diaphragm Pump",
    title: "DC Diaphragm Pump Advantages for Air and Liquid Systems",
    excerpt: "A DC diaphragm pump can provide self-priming transfer, oil-free air output, liquid isolation, and compact integration for many equipment designs.",
    points: ["The diaphragm separates the drive side from the pumped medium.", "Check valve design strongly affects flow stability and pressure.", "Material choices such as EPDM or FKM should match the medium."]
  },
  {
    category: "Vacuum Pump",
    title: "Mini DC Vacuum Pump Selection for Suction and Sampling",
    excerpt: "Mini DC vacuum pumps are used in suction devices, sampling instruments, environmental monitoring, and compact analytical equipment.",
    points: ["Vacuum level must be confirmed with the final tubing and filter resistance.", "Noise and vibration are often determined by mounting and enclosure design.", "Gas sampling applications should consider contamination and lifetime."]
  },
  {
    category: "Liquid Pump",
    title: "DC Liquid Pump for Dosing, Transfer, and Dispensing",
    excerpt: "A DC liquid pump should be selected by flow stability, self-priming ability, pressure, leakage control, and compatibility with the liquid.",
    points: ["Confirm viscosity, temperature, and chemical properties before choosing materials.", "Check whether dry running can occur at startup or during tank empty conditions.", "Use matching tubing diameter and valves to reduce pressure loss."]
  },
  {
    category: "Water Pump",
    title: "12V DC Water Pump Applications in OEM Products",
    excerpt: "A 12V DC water pump can support appliances, cleaning tools, beverage modules, water purifiers, and portable transfer systems.",
    points: ["Water flow ratings change when filters, nozzles, or check valves are installed.", "Food or beverage systems require suitable wetted materials.", "Self-priming height and leakage control are critical in compact layouts."]
  },
  {
    category: "Solar Pump",
    title: "DC Pump Considerations for Solar and Battery-Powered Systems",
    excerpt: "DC pumps are often used in solar or battery-powered systems because the power source already provides direct current.",
    points: ["Size the panel, battery, controller, and pump as one system.", "Startup current and low-voltage behavior matter in weak sunlight.", "Use protection against dry running, blocked outlet, and reverse polarity."]
  },
  {
    category: "Compressor",
    title: "Mini DC Compressor vs DC Air Pump: What Is the Difference?",
    excerpt: "A mini DC compressor is usually chosen for stronger compressed-air output, while a DC air pump may be better for lower pressure and quieter operation.",
    points: ["Compare pressure, flow, heat rise, duty cycle, and noise.", "Compressor systems often need relief, cooling, and vibration control.", "Air pump systems may be easier for compact suction or low-pressure output."]
  },
  {
    category: "Piston Pump",
    title: "DC Piston Pump Guide for High-Pressure Air Systems",
    excerpt: "DC piston pumps can deliver higher pressure than many small diaphragm pumps and are used in pressure, suction, and compact pneumatic systems.",
    points: ["Check continuous pressure instead of only peak pressure.", "Include heat rise and duty cycle in the test plan.", "Use damping and mounting design to control vibration."]
  },
  {
    category: "Medical Pump",
    title: "DC Pump Selection for Medical and Diagnostic Equipment",
    excerpt: "Medical and diagnostic equipment often requires compact size, stable output, oil-free operation, low noise, and predictable lifetime.",
    points: ["Confirm airflow or liquid flow under the complete device load.", "Material and contamination control are important for medical-adjacent designs.", "Validate noise, vibration, and temperature inside the actual enclosure."]
  },
  {
    category: "Gas Sampling",
    title: "DC Pump for Gas Sampling: Vacuum, Flow, and Clean Air Path",
    excerpt: "Gas sampling pumps must maintain controlled flow while handling filters, sensors, tubing resistance, and long operating periods.",
    points: ["Define target flow after the sampling filter and sensor path.", "Use stable voltage or speed control to improve sampling repeatability.", "Consider pump life, diaphragm material, and contamination risk."]
  },
  {
    category: "Ink Pump",
    title: "DC Ink Pump Selection for Printers and Fluid Delivery",
    excerpt: "Ink pump selection depends on liquid compatibility, small-flow stability, pulsation, leakage control, and tubing layout.",
    points: ["Check ink chemistry against diaphragm, valve, and connector materials.", "Avoid excessive pulsation if the downstream process needs stable flow.", "Validate cleaning cycles and long idle periods."]
  },
  {
    category: "Noise Control",
    title: "How to Reduce Noise in a DC Pump Module",
    excerpt: "DC pump noise is not only a motor issue; it comes from airflow, liquid pulsation, mounting, enclosure resonance, and power control.",
    points: ["Use soft mounting, suitable tubing, silencers, and stable voltage.", "Avoid sharp bends and restrictive fittings near the inlet or outlet.", "Measure the final product, not only the bare pump."]
  },
  {
    category: "Pump Life",
    title: "How to Estimate DC Pump Lifetime in OEM Equipment",
    excerpt: "DC pump lifetime depends on motor type, load, temperature, duty cycle, medium, mounting, and electrical control.",
    points: ["Use a realistic duty cycle for life testing.", "Heat, blocked outlet, and dry running can shorten pump life.", "Brushless motors can improve lifetime when the cost and controller fit the design."]
  },
  {
    category: "PWM Control",
    title: "Using PWM Speed Control With a DC Pump",
    excerpt: "PWM control can adjust flow or pressure in many DC pump systems, but the pump and driver must be matched correctly.",
    points: ["Confirm the motor type and recommended PWM frequency.", "Avoid unstable low-speed operation when startup torque is required.", "Measure pressure, flow, noise, and temperature at each control point."]
  },
  {
    category: "Power Design",
    title: "DC Pump Power Supply: Voltage, Current, and Startup Load",
    excerpt: "A DC pump can draw higher current at startup or under blocked-load conditions than its nominal running value.",
    points: ["Choose a power supply with enough startup and safety margin.", "Check voltage drop across long wires or small connectors.", "Use protection against reverse polarity, overcurrent, and overheating."]
  },
  {
    category: "Materials",
    title: "Choosing Diaphragm and Valve Materials for DC Pumps",
    excerpt: "Wetted material selection affects chemical resistance, sealing, pump life, flow stability, and compliance requirements.",
    points: ["Start with the medium, temperature, and cleaning process.", "EPDM and FKM can fit different liquid or gas compatibility needs.", "Confirm material choices with sample testing before mass production."]
  },
  {
    category: "Accessories",
    title: "DC Pump Accessories: Tubing, Valves, Filters, and Silencers",
    excerpt: "Accessories can decide whether a DC pump works quietly and reliably in the real device.",
    points: ["Filters and check valves add pressure loss that changes flow.", "Silencers and shock absorbers can improve user experience.", "Connector and tubing choices affect leakage, assembly speed, and maintenance."]
  },
  {
    category: "Water Purifier",
    title: "DC Pump Selection for Water Purifiers and Beverage Modules",
    excerpt: "Water purifiers and beverage equipment need controlled flow, safe materials, self-priming behavior, and stable pressure.",
    points: ["Check inlet height, filter restriction, and outlet valve behavior.", "Use compatible tubing and diaphragm materials for the liquid.", "Validate taste, leakage, noise, and long-term startup conditions."]
  },
  {
    category: "Beauty Device",
    title: "DC Pump Applications in Beauty and Cosmetic Instruments",
    excerpt: "Beauty devices may require suction, pressure, liquid delivery, misting, or cleaning functions in a compact and quiet format.",
    points: ["User comfort makes noise and vibration control important.", "Pump size, heat rise, and airflow path must fit the handheld or desktop enclosure.", "Use accessories to tune suction strength and pulsation."]
  },
  {
    category: "Automation",
    title: "DC Pump Modules for Automation and Robotics",
    excerpt: "Automation and robotics systems use DC pumps for vacuum grip, pneumatic actuation, sampling, fluid transfer, and compact pressure generation.",
    points: ["Control repeatability matters more than open-flow rating.", "Use sensors, PWM, or valves when the process needs feedback.", "Confirm vibration isolation when the pump is mounted near precision mechanisms."]
  },
  {
    category: "Environmental",
    title: "DC Pump Selection for Environmental Monitoring Equipment",
    excerpt: "Environmental monitoring equipment often needs stable gas sampling flow, long runtime, low power use, and resistance to changing conditions.",
    points: ["Define sampling flow through filters and sensor chambers.", "Consider humidity, dust, temperature, and maintenance interval.", "Use stable control to improve measurement consistency."]
  },
  {
    category: "Laboratory",
    title: "DC Pump Use in Laboratory and Analytical Instruments",
    excerpt: "Laboratory instruments may use DC pumps for small-volume liquid handling, gas movement, vacuum generation, and sample preparation.",
    points: ["Repeatability and contamination control are key design goals.", "Small changes in tubing and valve resistance can affect dosing accuracy.", "Select materials and control method according to the assay or process."]
  },
  {
    category: "OEM Design",
    title: "How to Write a DC Pump RFQ That Gets Accurate Recommendations",
    excerpt: "A complete RFQ helps suppliers recommend a pump faster and reduces sample iterations.",
    points: ["Include medium, flow, pressure, vacuum, voltage, noise, duty cycle, and size limit.", "Describe the real equipment function, not only the pump type.", "Share annual quantity, target lifetime, certificates, and accessory needs."]
  },
  {
    category: "Troubleshooting",
    title: "Why a DC Pump Flow Rate Drops After Installation",
    excerpt: "A pump can meet catalog flow in open testing but deliver less flow after installation due to system resistance.",
    points: ["Check tubing length, small fittings, filters, valves, nozzles, and height difference.", "Confirm voltage at the pump terminals while it is running.", "Compare open-flow testing with the final device load."]
  },
  {
    category: "Failure Analysis",
    title: "Common DC Pump Failure Modes in Compact Equipment",
    excerpt: "Common failure causes include overheating, blocked outlet, dry running, material mismatch, vibration, water ingress, and electrical overload.",
    points: ["Use protection and testing around abnormal operating conditions.", "Choose wetted materials according to the actual medium.", "Review mounting, sealing, and connector design during prototype validation."]
  },
  {
    category: "Supplier Selection",
    title: "How to Choose a DC Pump Manufacturer for OEM Projects",
    excerpt: "The right DC pump supplier should support model selection, sample tuning, accessories, testing, and production consistency.",
    points: ["Ask about pump families, customization range, quality process, and export experience.", "Evaluate response quality during sample selection, not only unit price.", "A supplier with accessories and module experience can reduce integration risk."]
  }
];

const dcPumpArticleBodies = [
  [
    "For OEM buyers, a DC pump is not a single product category. It can be a diaphragm air pump, diaphragm liquid pump, piston pump, vacuum pump, compressor, or a complete pump module with valves and accessories. The correct choice starts with the medium and the working function: move air, create vacuum, transfer liquid, dispense small volumes, or build pressure.",
    "A useful selection process compares the pump inside the real circuit. Tubing length, inlet filters, check valves, nozzles, silencers, and enclosure space can change flow, pressure, noise, and heat. When the application is a medical device, beauty instrument, water purifier, analyzer, or small appliance, sample testing should include the final power supply and control method.",
    "The safest RFQ gives the supplier the medium, target flow at load, pressure or vacuum, voltage, duty cycle, noise target, life target, space limit, annual quantity, and any material or compliance needs."
  ],
  [
    "A 12V DC pump is widely used because many compact devices already provide a 12V rail or battery pack. It is a good starting point for portable instruments, cleaning devices, water purifier modules, small air systems, and low-power dispensing equipment.",
    "The key mistake is choosing from open-flow data only. A 12V pump that looks strong in free-flow testing may lose output after the circuit adds filters, narrow tubing, check valves, or a spray nozzle. The working point should be measured at the pressure, vacuum, or outlet restriction that the final product actually creates.",
    "Before production, check startup current, voltage drop at the pump terminals, heat rise, noise, and repeated startup under load. These items often decide whether a 12V pump runs reliably in a compact enclosure."
  ],
  [
    "A 24V DC pump is often preferred when the equipment has higher power demand or a more industrial control architecture. For the same power class, 24V can reduce current, which helps wiring, connector temperature, and voltage drop over longer cable runs.",
    "In automation, robotics, environmental monitoring, and fixed instruments, 24V systems are common. A 24V pump may also offer stronger pressure or flow in the same family, but the motor, controller, PWM range, and thermal behavior still need confirmation.",
    "Switching from 12V to 24V should not be treated as a direct substitution. Confirm driver compatibility, insulation margin, connector rating, safety protection, noise, and expected duty cycle before approving the change."
  ],
  [
    "Brushless DC pumps are usually selected when the project needs longer service life, stable speed control, or lower maintenance. Removing brush wear helps in instruments that run many hours, devices that are difficult to service, or applications where electrical noise and carbon dust are concerns.",
    "Brushed DC pumps can still be the right choice for low-cost products, intermittent duty, or simple devices with short operating time. The better decision depends on lifetime target, operating hours, startup frequency, duty cycle, acoustic requirement, and total product cost.",
    "For OEM projects, compare both motor options with the final load. A brushless pump may need a driver or control signal, while a brushed pump may need more margin for brush wear, heat, and voltage variation."
  ],
  [
    "A micro DC pump should be selected by system performance, not only by the smallest body size. Very compact pumps can be attractive in layout drawings, but they may not have enough pressure, vacuum, flow stability, or lifetime margin once the real circuit is connected.",
    "Start with useful flow at load, target pressure or vacuum, allowable noise, operating time, and the exact installation space. Tubing diameter, bend radius, filter resistance, valve cracking pressure, and connector size should be included early because they can change the working point more than expected.",
    "Reserve space for mounting rubber, airflow around the motor, wire routing, and service access. These details make the difference between a prototype that works on the bench and a pump module that survives production use."
  ],
  [
    "A DC diaphragm pump is a strong option for oil-free air, vacuum, liquid transfer, and self-priming fluid movement. The diaphragm creates a sealed pumping chamber, which can help isolate the drive side from the pumped medium and reduce contamination risk.",
    "Valve design and diaphragm material are critical. EPDM, FKM, silicone, or other materials may be chosen according to water, cleaning liquid, ink, gas, temperature, and chemical exposure. The wrong material can cause swelling, leakage, reduced flow, or shortened life.",
    "For stable performance, test the diaphragm pump with the real inlet height, outlet restriction, duty cycle, and mounting method. Pulsation, noise, and flow variation should be evaluated as part of the complete device."
  ],
  [
    "A mini DC vacuum pump is used where a compact product needs suction or gas sampling without a large compressor. Common applications include medical-adjacent suction, diagnostic sampling, environmental monitors, beauty devices, dental or cleaning tools, and analytical equipment.",
    "Vacuum data should be confirmed after the final filter, sensor path, tubing, and fitting resistance are installed. A pump may meet catalog vacuum in a simple test but deliver lower sampling flow when the system adds a fine filter or long tube.",
    "Noise and vibration depend heavily on mounting and enclosure design. Use soft mounting, avoid rigid contact with thin plastic panels, and test the pump inside the final housing before selecting the production model."
  ],
  [
    "A DC liquid pump for dosing or dispensing must be selected by more than maximum flow. The real priorities are priming behavior, flow stability, leakage control, wetted material compatibility, allowable pulsation, and resistance to dry running or air bubbles.",
    "Confirm liquid viscosity, temperature, cleaning method, chemical content, and whether the pump will contact drinking water, beverage, ink, reagent, or cosmetic liquid. These details affect diaphragm, valve, tubing, connector, and seal choices.",
    "During validation, run startup, empty-tank, blocked outlet, and long idle tests. Many liquid systems fail because the pump is tested with clean water, while the final liquid has different viscosity, foaming, or material compatibility."
  ],
  [
    "A 12V DC water pump is common in small appliances, purifiers, beverage devices, cleaning tools, and portable water systems. The design challenge is usually not moving water in open flow; it is keeping stable flow after filters, check valves, nozzles, or vertical lift are added.",
    "For purifier and beverage modules, wetted materials and tubing must match the water quality and any food-contact requirements. Taste, odor, leakage, and long idle startup should be checked because these affect customer experience directly.",
    "Self-priming height, inlet air leakage, outlet restriction, and pump noise should be tested in the same orientation and enclosure used by the final product. Small installation changes can create large performance differences."
  ],
  [
    "DC pumps are suitable for solar and battery-powered systems because the power source is already direct current. The pump, battery, solar panel, controller, and protection circuit should be sized as one system instead of separate parts.",
    "Startup current is especially important. In weak sunlight or low battery conditions, a pump can fail to start even if the nominal running power looks acceptable. Low-voltage behavior, reverse polarity protection, and blocked-outlet protection should be included in the design.",
    "If the pump may run dry or face changing inlet conditions, add a control strategy. Dry-run protection, pressure relief, filters, and stable wiring improve reliability in outdoor or portable installations."
  ],
  [
    "A mini DC compressor is usually chosen for higher pressure compressed air, while a DC air pump is often better for lower pressure, lower noise, or continuous airflow. The right choice depends on pressure, flow, heat rise, duty cycle, and the user's acoustic expectation.",
    "Compressor systems may need a relief valve, damping volume, cooling path, and stronger vibration isolation. Air pump systems can be easier to integrate for suction, gas movement, inflation at low pressure, or pneumatic assistance in compact devices.",
    "When comparing options, test both at the final pressure and duty cycle. A compressor with strong peak pressure may overheat in a small enclosure, while a lower-pressure air pump may be quieter and more efficient for the actual task."
  ],
  [
    "A DC piston pump is useful when compact equipment needs higher pressure than a typical small diaphragm air pump can provide. Applications can include pressure generation, suction assistance, pneumatic tools, beauty equipment, and small automation systems.",
    "The main selection items are continuous pressure, flow at pressure, heat rise, vibration, and expected duty cycle. Peak pressure alone is not enough because a product may need repeated operation or long cycles in a closed housing.",
    "Piston movement can create more noticeable vibration than some diaphragm designs. Use proper mounting, damping, and tubing layout, then measure noise and vibration in the final product rather than judging the bare pump on a desk."
  ],
  [
    "Medical and diagnostic equipment often needs compact size, oil-free operation, stable flow, low noise, and predictable lifetime. Pumps may support air movement, suction, sample handling, liquid transfer, or pressure control in medical-adjacent systems.",
    "The pump should be evaluated in the complete fluid path. Filters, sensor chambers, reagent lines, valves, and disposable parts can all change pressure loss and flow stability. Material selection also matters when the medium or air path must stay clean.",
    "Before release, validate startup current, heat rise, noise, vibration, long-run behavior, and repeatability. For regulated products, the pump supplier should support documentation, sample traceability, and consistent production quality."
  ],
  [
    "Gas sampling pumps must deliver controlled flow through filters, tubing, sensor chambers, and sometimes long sample paths. In environmental monitoring and analytical instruments, repeatable sampling flow is more important than a high open-flow number.",
    "The inlet filter and sensor path should be included in every performance test. Dust, humidity, condensation, and chemical exposure may affect diaphragm and valve life, so material choice and maintenance interval need attention.",
    "Stable voltage or speed control can improve measurement consistency. If the instrument uses feedback from a flow sensor, check the pump response, PWM range, and noise at the actual sampling points."
  ],
  [
    "A DC ink pump or small fluid-delivery pump must handle compatibility, small-flow stability, and leakage risk. Ink, cleaning fluid, and functional liquids can behave differently from water because of viscosity, pigments, solvents, and long idle periods.",
    "Material selection should include the diaphragm, valves, pump chamber, fittings, tubing, and seals. A material that works in short testing may swell, harden, or contaminate the liquid after extended exposure.",
    "For printer or dispensing systems, check pulsation, priming, bubble handling, cleaning cycles, and startup after storage. Stable fluid delivery depends on the whole circuit, not only the pump head."
  ],
  [
    "DC pump noise comes from several sources: motor vibration, diaphragm or piston movement, airflow, liquid pulsation, check valves, tubing resonance, enclosure panels, and unstable power control. Replacing the pump is not always the first solution.",
    "Begin with mounting. Soft supports, correct screw torque, and avoiding contact with thin plastic walls can reduce transmitted vibration. On the fluid side, silencers, damping chambers, larger tubing, and smoother bends can lower air or liquid noise.",
    "Measure sound in the final enclosure and at the user's listening position. A pump that seems acceptable as a loose sample can become louder after it is fixed to a resonant housing."
  ],
  [
    "DC pump lifetime is affected by motor type, diaphragm or seal material, load, temperature, medium, duty cycle, mounting stress, and electrical control. Catalog life values only help when the test condition is close to the final application.",
    "A realistic life test should include the actual pressure or vacuum, operating cycle, voltage range, inlet medium, ambient temperature, and enclosure heat. Blocked outlets, dry running, high temperature, and chemical mismatch can shorten life quickly.",
    "For long-life OEM products, consider brushless motors, conservative working points, stable power, clean inlet filtration, and enough thermal margin. Confirm the supplier's production consistency before volume orders."
  ],
  [
    "PWM control can adjust pump speed, flow, or pressure, but it must be matched to the motor and driver. Too low a duty ratio can cause unstable startup, vibration, heat, or inconsistent flow, especially when the pump starts under load.",
    "Confirm the recommended PWM frequency, voltage range, minimum startup duty, and whether the pump uses a brushed or brushless motor. Some brushless pumps need a specific driver or control interface rather than direct low-frequency switching.",
    "Test every control point that the product will use. Measure flow, pressure, noise, current, and temperature at low, medium, and high speed, then check repeated starts after the system has been idle."
  ],
  [
    "A DC pump power supply should be sized for startup and abnormal load, not only nominal running current. Pumps can draw higher current when starting, when the outlet is blocked, when liquid is viscous, or when voltage is low.",
    "Voltage drop across small connectors, thin wires, or long cable runs can reduce performance. Measure voltage at the pump terminals while it is running under the real load, then compare it with the rated supply voltage.",
    "Use appropriate protection for reverse polarity, overcurrent, overheating, and stalled conditions. A stable power design improves flow consistency, acoustic behavior, and long-term reliability."
  ],
  [
    "Diaphragm and valve materials directly affect chemical resistance, sealing, flow stability, and lifetime. The correct material depends on the medium, temperature, exposure time, cleaning method, and any compliance requirements.",
    "EPDM may fit many water-based applications, while FKM may be chosen for stronger chemical resistance in selected cases. Silicone, NBR, or other materials may also be considered depending on flexibility, temperature, and medium compatibility.",
    "Do not approve material selection from a chart alone. Run sample soaking, pump operation, leakage, flow stability, and long idle tests with the actual liquid or gas used by the final product."
  ],
  [
    "Accessories often decide whether a DC pump performs well in the finished device. Tubing, check valves, filters, connectors, silencers, damping parts, and speed controls all change the final flow, noise, pressure loss, and assembly quality.",
    "A filter protects the pump but adds resistance. A check valve prevents backflow but may increase startup pressure. A silencer lowers air noise but can reduce flow if it is undersized. These tradeoffs should be tested together.",
    "For OEM production, define accessory specifications early: tube material, inner diameter, connector type, valve direction, filter grade, and mounting hardware. This reduces sample variation and assembly problems."
  ],
  [
    "Water purifiers and beverage modules need pumps that provide controlled flow, safe wetted materials, self-priming behavior, and stable pressure through filters and valves. The pump must work after long idle periods and repeated starts.",
    "Filter restriction changes over time as the cartridge loads. The selected pump should have enough margin for both new and used filter conditions, while keeping noise and heat acceptable in the enclosure.",
    "Test leakage, taste or odor impact, startup with air in the line, inlet height, outlet valve behavior, and cleaning cycles. These product-level tests are more useful than open-flow comparison alone."
  ],
  [
    "Beauty and cosmetic instruments may use DC pumps for suction, pressure, misting, liquid delivery, cleaning, or air movement. User comfort makes noise, vibration, heat, and smooth control especially important.",
    "Handheld devices need compact pumps with careful mounting and airflow management. Desktop devices may allow larger pump modules but still need controlled acoustic performance and stable output over repeated treatment cycles.",
    "Tuning accessories such as silencers, soft tubing, damping chambers, filters, and PWM control can improve the user experience. The final selection should be tested with the real nozzle, hose, and enclosure."
  ],
  [
    "Automation and robotics systems use DC pumps for vacuum gripping, pneumatic actuation, sample movement, liquid transfer, and compact pressure generation. Repeatability and response time often matter more than maximum free-flow data.",
    "If the process needs stable pressure or flow, use sensors, valves, or PWM control as part of the pump module. A bare pump may be enough for simple movement, but closed-loop control can improve precision in repeated cycles.",
    "Mounting is important when the pump sits near cameras, sensors, or precision mechanisms. Isolate vibration, secure tubing, and check electrical noise so the pump does not disturb the rest of the machine."
  ],
  [
    "Environmental monitoring equipment often runs for long periods and may operate in changing temperature, humidity, dust, or gas conditions. The pump must maintain stable sampling flow through filters and sensor chambers.",
    "The sampling path should be tested as a complete system. Filter loading, condensation, long tubing, and sensor chamber resistance can reduce flow or increase pump load over time.",
    "For field instruments, consider power consumption, maintenance interval, diaphragm material, corrosion risk, and protection from dust or water ingress. Stable speed control can help keep measurement data consistent."
  ],
  [
    "Laboratory and analytical instruments may use DC pumps for small-volume liquid handling, gas movement, vacuum generation, washing, waste transfer, or sample preparation. Repeatability and cleanliness are usually more important than maximum flow.",
    "Small changes in tubing diameter, valve resistance, or liquid viscosity can change dosing accuracy. When the pump supports an assay or analytical process, test the complete fluid path with the real reagents and timing sequence.",
    "Material compatibility, bubble handling, pulsation, and contamination control should be reviewed early. A stable pump module can reduce calibration work and improve instrument reliability."
  ],
  [
    "A good DC pump RFQ reduces back-and-forth and helps the supplier recommend the right family quickly. Instead of asking only for a 12V pump or a small vacuum pump, describe the product function and the real operating condition.",
    "Include medium, required flow at load, pressure or vacuum, voltage, duty cycle, noise target, life target, installation space, tubing size, inlet height, outlet restriction, operating temperature, and annual quantity.",
    "If accessories are needed, mention valves, filters, silencers, connectors, tubing, mounting parts, cable length, and control method. Sharing drawings or a simple fluid schematic can speed up sample selection."
  ],
  [
    "A DC pump may show strong flow in open testing but drop sharply after installation. The most common cause is system resistance from long tubing, small fittings, filters, check valves, nozzles, height difference, or a blocked outlet path.",
    "Start troubleshooting by measuring voltage at the pump terminals while it is running. Low voltage from long wires, weak adapters, or undersized connectors can reduce speed and output even when the power supply label looks correct.",
    "Then compare open-flow, partial-load, and final-device results. This separates pump capability from system restriction and helps decide whether to change the pump, tubing, valve, filter, or power design."
  ],
  [
    "Compact DC pump failures often come from conditions outside the ideal catalog test: overheating, blocked outlet, dry running, chemical attack, water ingress, vibration, wiring errors, or overload from a restricted circuit.",
    "Failure analysis should inspect the pump and the system together. Check diaphragm and valve condition, motor heat marks, corrosion, inlet contamination, loose mounting, connector damage, and signs of overpressure or liquid leakage.",
    "For prevention, design protection into the module: filters, relief paths, correct materials, stable power, dry-run rules, sealing, and vibration isolation. Prototype validation should include abnormal conditions, not only normal operation."
  ],
  [
    "Choosing a DC pump manufacturer for OEM projects is about more than unit price. A useful supplier should help with model selection, sample tuning, accessories, testing feedback, customization, documentation, and stable production.",
    "Ask about available pump families, voltage options, diaphragm and valve materials, motor options, acoustic solutions, quality process, export experience, and support for tubing, filters, silencers, connectors, or complete modules.",
    "During sample selection, evaluate response quality and engineering understanding. A supplier that can explain tradeoffs and adjust the pump module around the application can reduce integration risk and shorten development time."
  ]
];

const dcPumpArticleLocales = {
  zh: {
    categories: ["DC 泵指南", "12V DC 泵", "24V DC 泵", "无刷泵", "微型泵", "隔膜泵", "真空泵", "液泵", "水泵", "太阳能泵", "压缩机", "活塞泵", "医疗泵", "气体采样", "墨水泵", "噪音控制", "泵寿命", "PWM 控制", "电源设计", "材料", "配件", "净水器", "美容设备", "自动化", "环境监测", "实验室", "OEM 设计", "故障排查", "失效分析", "供应商选择"],
    titles: [
      "什么是 DC 泵？面向 OEM 设备买家的实用指南",
      "如何为紧凑设备选择 12V DC 泵",
      "什么时候 24V DC 泵比 12V 泵更合适",
      "无刷 DC 泵与有刷 DC 泵：选型因素",
      "微型 DC 泵选型：流量、压力、真空和尺寸",
      "DC 隔膜泵在气体与液体系统中的优势",
      "迷你 DC 真空泵在吸附和采样中的选型",
      "用于定量、转移和分配的 DC 液泵",
      "12V DC 水泵在 OEM 产品中的应用",
      "太阳能和电池供电系统中的 DC 泵注意事项",
      "迷你 DC 压缩机与 DC 气泵有什么区别",
      "高压空气系统用 DC 活塞泵指南",
      "医疗与诊断设备中的 DC 泵选型",
      "气体采样 DC 泵：真空、流量与洁净气路",
      "打印机和流体输送用 DC 墨水泵选型",
      "如何降低 DC 泵模块噪音",
      "如何评估 OEM 设备中的 DC 泵寿命",
      "DC 泵 PWM 调速使用指南",
      "DC 泵电源：电压、电流与启动负载",
      "DC 泵膜片和阀片材料如何选择",
      "DC 泵配件：管路、阀门、过滤器和消音器",
      "净水器和饮料模块用 DC 泵选型",
      "DC 泵在美容仪器中的应用",
      "自动化和机器人用 DC 泵模块",
      "环境监测设备用 DC 泵选型",
      "DC 泵在实验室和分析仪器中的使用",
      "如何编写能获得准确推荐的 DC 泵 RFQ",
      "为什么 DC 泵安装后流量下降",
      "紧凑设备中常见 DC 泵失效模式",
      "如何为 OEM 项目选择 DC 泵制造商"
    ],
    excerpt: (title) => `本文围绕“${title}”，说明 DC 泵在 OEM 设备中的介质、流量、压力/真空、电压、寿命、噪音和集成注意事项。`,
    note: "这是 JSG DC Pump 为 B2B 买家编写的原创工程文章，用于比较 DC 泵在 OEM 设备和流体控制模块中的选型方案。",
    points: ["先确认介质、目标流量、压力或真空、电压、工作周期、噪音和安装空间。", "把管路、过滤器、阀门、接头、电源和外壳负载纳入同一套测试。", "量产前用真实设备工况验证启动电流、温升、寿命、材料兼容性和维护方式。"]
  },
  fr: {
    categories: ["Guide pompe DC", "Pompe 12V DC", "Pompe 24V DC", "Pompe brushless", "Micro-pompe", "Pompe à membrane", "Pompe à vide", "Pompe liquide", "Pompe à eau", "Pompe solaire", "Compresseur", "Pompe à piston", "Pompe médicale", "Échantillonnage gaz", "Pompe encre", "Réduction bruit", "Durée de vie", "Contrôle PWM", "Alimentation", "Matériaux", "Accessoires", "Purificateur d'eau", "Appareil beauté", "Automatisation", "Environnement", "Laboratoire", "Conception OEM", "Dépannage", "Analyse panne", "Choix fournisseur"],
    titles: ["Qu'est-ce qu'une pompe DC ? Guide pratique pour acheteurs OEM", "Choisir une pompe 12V DC pour appareils compacts", "Quand une pompe 24V DC est préférable à une 12V", "Pompe DC brushless ou à balais : critères de choix", "Sélection micro-pompe DC : débit, pression, vide et taille", "Avantages d'une pompe DC à membrane pour air et liquide", "Sélection d'une mini pompe à vide DC pour aspiration et prélèvement", "Pompe liquide DC pour dosage, transfert et distribution", "Applications d'une pompe à eau 12V DC en OEM", "Pompes DC pour systèmes solaires et batterie", "Mini compresseur DC ou pompe à air DC : différence", "Guide pompe à piston DC pour air haute pression", "Sélection pompe DC pour équipement médical et diagnostic", "Pompe DC pour échantillonnage gaz : vide, débit et circuit propre", "Sélection pompe encre DC pour imprimantes et fluides", "Réduire le bruit d'un module pompe DC", "Estimer la durée de vie d'une pompe DC en OEM", "Utiliser le contrôle PWM avec une pompe DC", "Alimentation pompe DC : tension, courant et démarrage", "Choisir membranes et valves pour pompes DC", "Accessoires pompe DC : tubes, valves, filtres et silencieux", "Pompe DC pour purificateurs d'eau et boissons", "Applications pompe DC dans les instruments beauté", "Modules pompe DC pour automatisation et robotique", "Sélection pompe DC pour surveillance environnementale", "Pompes DC en laboratoire et instrumentation analytique", "Rédiger une RFQ pompe DC pour une recommandation précise", "Pourquoi le débit chute après installation", "Modes de panne courants des pompes DC compactes", "Choisir un fabricant de pompes DC pour projets OEM"],
    excerpt: (title) => `Cet article présente ${title.toLowerCase()} avec les points de sélection DC pump pour les projets OEM : fluide, débit, pression/vide, tension, bruit, durée de vie et intégration.`,
    note: "Article technique original JSG DC Pump pour les acheteurs B2B comparant des solutions de pompe DC et de modules fluidiques OEM.",
    points: ["Définir le fluide, le débit utile, la pression ou le vide, la tension, le cycle et l'espace disponible.", "Tester la pompe avec tubes, filtres, valves, alimentation, raccords et boîtier réel.", "Valider courant de démarrage, échauffement, bruit, matériaux et durée de vie avant production."]
  },
  de: {
    categories: ["DC-Pumpen-Leitfaden", "12V DC-Pumpe", "24V DC-Pumpe", "Bürstenlose Pumpe", "Mikropumpe", "Membranpumpe", "Vakuumpumpe", "Flüssigkeitspumpe", "Wasserpumpe", "Solarpumpe", "Kompressor", "Kolbenpumpe", "Medizinpumpe", "Gasprobenahme", "Tintenpumpe", "Geräuschkontrolle", "Lebensdauer", "PWM-Steuerung", "Stromversorgung", "Materialien", "Zubehör", "Wasserreiniger", "Beauty-Gerät", "Automation", "Umweltmonitoring", "Labor", "OEM-Design", "Fehlersuche", "Ausfallanalyse", "Lieferantenauswahl"],
    titles: ["Was ist eine DC-Pumpe? Praxisleitfaden für OEM-Einkäufer", "12V DC-Pumpe für kompakte Geräte auswählen", "Wann eine 24V DC-Pumpe besser als 12V ist", "Bürstenlose DC-Pumpe vs. Bürstenmotor: Auswahlfaktoren", "Mikro-DC-Pumpe: Durchfluss, Druck, Vakuum und Größe", "Vorteile von DC-Membranpumpen für Luft und Flüssigkeit", "Mini-DC-Vakuumpumpe für Ansaugung und Probenahme", "DC-Flüssigkeitspumpe für Dosierung, Transfer und Abgabe", "12V DC-Wasserpumpe in OEM-Produkten", "DC-Pumpen für Solar- und Batteriesysteme", "Mini-DC-Kompressor vs. DC-Luftpumpe", "DC-Kolbenpumpe für Hochdruck-Luftsysteme", "DC-Pumpen für Medizin- und Diagnosegeräte", "DC-Pumpe für Gasproben: Vakuum, Durchfluss und sauberer Luftweg", "DC-Tintenpumpe für Drucker und Fluidzufuhr", "Geräusch in DC-Pumpenmodulen reduzieren", "Lebensdauer von DC-Pumpen in OEM-Geräten abschätzen", "PWM-Drehzahlregelung mit DC-Pumpen", "DC-Pumpen-Netzteil: Spannung, Strom und Startlast", "Membran- und Ventilmaterialien für DC-Pumpen wählen", "DC-Pumpenzubehör: Schläuche, Ventile, Filter, Schalldämpfer", "DC-Pumpe für Wasserreiniger und Getränkemodule", "DC-Pumpen in Beauty- und Kosmetikgeräten", "DC-Pumpenmodule für Automation und Robotik", "DC-Pumpen für Umweltmonitoring", "DC-Pumpen in Labor- und Analyseinstrumenten", "RFQ für DC-Pumpen richtig schreiben", "Warum der Durchfluss nach Einbau sinkt", "Häufige Ausfallarten kompakter DC-Pumpen", "DC-Pumpenhersteller für OEM-Projekte auswählen"],
    excerpt: (title) => `Dieser Beitrag behandelt ${title.toLowerCase()} und erklärt die wichtigsten OEM-Auswahlpunkte: Medium, Durchfluss, Druck/Vakuum, Spannung, Geräusch, Lebensdauer und Integration.`,
    note: "Originaler JSG DC Pump Engineering-Hinweis für B2B-Käufer, die DC-Pumpen und OEM-Fluidmodule vergleichen.",
    points: ["Medium, Nutzdurchfluss, Druck oder Vakuum, Spannung, Zyklus, Geräusch und Bauraum festlegen.", "Pumpe mit Schläuchen, Filtern, Ventilen, Stromversorgung, Anschlüssen und Gehäuse testen.", "Startstrom, Wärme, Geräusch, Materialien und Lebensdauer vor Serienfertigung validieren."]
  },
  id: {
    categories: ["Panduan Pompa DC", "Pompa DC 12V", "Pompa DC 24V", "Pompa Brushless", "Pompa Mikro", "Pompa Diafragma", "Pompa Vakum", "Pompa Cairan", "Pompa Air", "Pompa Surya", "Kompresor", "Pompa Piston", "Pompa Medis", "Sampling Gas", "Pompa Tinta", "Kontrol Suara", "Umur Pompa", "Kontrol PWM", "Desain Daya", "Material", "Aksesori", "Pemurni Air", "Perangkat Kecantikan", "Otomasi", "Lingkungan", "Laboratorium", "Desain OEM", "Troubleshooting", "Analisis Kegagalan", "Pemilihan Supplier"],
    titles: ["Apa itu pompa DC? Panduan praktis untuk pembeli OEM", "Cara memilih pompa DC 12V untuk perangkat ringkas", "Kapan pompa DC 24V lebih baik daripada 12V", "Pompa DC brushless vs brushed: faktor seleksi", "Seleksi pompa mikro DC: aliran, tekanan, vakum, ukuran", "Keunggulan pompa diafragma DC untuk udara dan cairan", "Seleksi mini pompa vakum DC untuk hisap dan sampling", "Pompa cairan DC untuk dosing, transfer, dan dispensing", "Aplikasi pompa air DC 12V dalam produk OEM", "Pertimbangan pompa DC untuk sistem surya dan baterai", "Mini kompresor DC vs pompa udara DC", "Panduan pompa piston DC untuk udara tekanan tinggi", "Seleksi pompa DC untuk medis dan diagnostik", "Pompa DC untuk sampling gas: vakum, aliran, jalur bersih", "Seleksi pompa tinta DC untuk printer dan fluida", "Cara mengurangi suara pada modul pompa DC", "Memperkirakan umur pompa DC di peralatan OEM", "Menggunakan kontrol PWM dengan pompa DC", "Catu daya pompa DC: tegangan, arus, beban startup", "Memilih material diafragma dan valve untuk pompa DC", "Aksesori pompa DC: tubing, valve, filter, silencer", "Pompa DC untuk pemurni air dan modul minuman", "Aplikasi pompa DC dalam perangkat kecantikan", "Modul pompa DC untuk otomasi dan robotik", "Seleksi pompa DC untuk monitoring lingkungan", "Pompa DC di laboratorium dan instrumen analitik", "Menulis RFQ pompa DC agar rekomendasi akurat", "Mengapa aliran pompa DC turun setelah instalasi", "Mode kegagalan umum pompa DC ringkas", "Memilih produsen pompa DC untuk proyek OEM"],
    excerpt: (title) => `Artikel ini membahas ${title.toLowerCase()} untuk proyek OEM, termasuk media, aliran, tekanan/vakum, tegangan, suara, umur pakai, dan integrasi modul.`,
    note: "Catatan teknik original JSG DC Pump untuk pembeli B2B yang membandingkan pompa DC dan modul kontrol fluida OEM.",
    points: ["Tentukan media, aliran kerja, tekanan atau vakum, tegangan, duty cycle, suara, dan ruang pemasangan.", "Uji pompa bersama tubing, filter, valve, catu daya, konektor, dan housing nyata.", "Validasi arus startup, panas, suara, material, dan umur sebelum produksi."]
  },
  it: {
    categories: ["Guida pompe DC", "Pompa DC 12V", "Pompa DC 24V", "Pompa brushless", "Micro pompa", "Pompa a membrana", "Pompa vuoto", "Pompa liquida", "Pompa acqua", "Pompa solare", "Compressore", "Pompa pistone", "Pompa medicale", "Campionamento gas", "Pompa inchiostro", "Controllo rumore", "Vita pompa", "Controllo PWM", "Alimentazione", "Materiali", "Accessori", "Depuratore acqua", "Dispositivo beauty", "Automazione", "Ambiente", "Laboratorio", "Design OEM", "Risoluzione problemi", "Analisi guasti", "Scelta fornitore"],
    titles: ["Cos'è una pompa DC? Guida pratica per buyer OEM", "Come scegliere una pompa DC 12V per dispositivi compatti", "Quando una pompa DC 24V è meglio di una 12V", "Pompa DC brushless vs brushed: fattori di scelta", "Selezione micro pompa DC: flusso, pressione, vuoto e dimensioni", "Vantaggi pompa DC a membrana per aria e liquidi", "Mini pompa vuoto DC per aspirazione e campionamento", "Pompa liquida DC per dosaggio, trasferimento e dispensing", "Applicazioni pompa acqua DC 12V in prodotti OEM", "Pompe DC per sistemi solari e a batteria", "Mini compressore DC vs pompa aria DC", "Guida pompa pistone DC per aria alta pressione", "Selezione pompa DC per medicale e diagnostica", "Pompa DC per campionamento gas: vuoto, flusso, circuito pulito", "Pompa inchiostro DC per stampanti e fluidi", "Ridurre il rumore in un modulo pompa DC", "Stimare la vita di una pompa DC in OEM", "Uso del controllo PWM con una pompa DC", "Alimentazione pompa DC: tensione, corrente e startup", "Scegliere materiali membrana e valvole per pompe DC", "Accessori pompa DC: tubi, valvole, filtri e silenziatori", "Pompa DC per depuratori acqua e moduli bevande", "Applicazioni pompa DC in strumenti beauty", "Moduli pompa DC per automazione e robotica", "Selezione pompa DC per monitoraggio ambientale", "Pompe DC in laboratorio e strumenti analitici", "Scrivere una RFQ pompa DC per raccomandazioni accurate", "Perché il flusso cala dopo l'installazione", "Guasti comuni delle pompe DC compatte", "Scegliere un produttore di pompe DC per OEM"],
    excerpt: (title) => `Questo articolo tratta ${title.toLowerCase()} e riassume i punti OEM: fluido, portata, pressione/vuoto, tensione, rumore, durata e integrazione.`,
    note: "Nota tecnica originale JSG DC Pump per buyer B2B che confrontano pompe DC e moduli fluidici OEM.",
    points: ["Definire fluido, portata utile, pressione o vuoto, tensione, ciclo, rumore e spazio.", "Testare la pompa con tubi, filtri, valvole, alimentazione, raccordi e contenitore reale.", "Validare corrente di avvio, calore, rumore, materiali e durata prima della produzione."]
  },
  ko: {
    categories: ["DC 펌프 가이드", "12V DC 펌프", "24V DC 펌프", "브러시리스 펌프", "마이크로 펌프", "다이어프램 펌프", "진공 펌프", "액체 펌프", "워터 펌프", "태양광 펌프", "컴프레서", "피스톤 펌프", "의료 펌프", "가스 샘플링", "잉크 펌프", "소음 제어", "펌프 수명", "PWM 제어", "전원 설계", "소재", "액세서리", "정수기", "미용 기기", "자동화", "환경 모니터링", "실험실", "OEM 설계", "문제 해결", "고장 분석", "공급사 선정"],
    titles: ["DC 펌프란? OEM 구매자를 위한 실용 가이드", "소형 장치용 12V DC 펌프 선택 방법", "24V DC 펌프가 12V보다 적합한 경우", "브러시리스 DC 펌프와 브러시 DC 펌프 선택 요소", "마이크로 DC 펌프 선정: 유량, 압력, 진공, 크기", "공기 및 액체 시스템에서 DC 다이어프램 펌프 장점", "흡입 및 샘플링용 미니 DC 진공 펌프 선정", "정량, 이송, 디스펜싱용 DC 액체 펌프", "OEM 제품의 12V DC 워터 펌프 적용", "태양광 및 배터리 시스템용 DC 펌프 고려사항", "미니 DC 컴프레서와 DC 에어 펌프 차이", "고압 공기 시스템용 DC 피스톤 펌프 가이드", "의료 및 진단 장비용 DC 펌프 선정", "가스 샘플링 DC 펌프: 진공, 유량, 청정 경로", "프린터와 유체 공급용 DC 잉크 펌프 선정", "DC 펌프 모듈 소음 줄이는 방법", "OEM 장비에서 DC 펌프 수명 평가", "DC 펌프 PWM 속도 제어 사용", "DC 펌프 전원: 전압, 전류, 시동 부하", "DC 펌프 다이어프램과 밸브 소재 선택", "DC 펌프 액세서리: 튜브, 밸브, 필터, 소음기", "정수기와 음료 모듈용 DC 펌프 선정", "미용 및 화장품 기기의 DC 펌프 적용", "자동화 및 로봇용 DC 펌프 모듈", "환경 모니터링 장비용 DC 펌프 선정", "실험실 및 분석 장비의 DC 펌프 사용", "정확한 추천을 받는 DC 펌프 RFQ 작성법", "설치 후 DC 펌프 유량이 떨어지는 이유", "소형 장비의 일반적인 DC 펌프 고장 모드", "OEM 프로젝트용 DC 펌프 제조사 선택"],
    excerpt: (title) => `이 글은 ${title} 주제를 중심으로 OEM 장비의 매체, 유량, 압력/진공, 전압, 소음, 수명, 모듈 통합 기준을 설명합니다.`,
    note: "JSG DC Pump가 B2B 구매자를 위해 작성한 오리지널 엔지니어링 노트로, DC 펌프와 OEM 유체 제어 모듈 선택을 돕습니다.",
    points: ["매체, 실제 유량, 압력 또는 진공, 전압, 듀티, 소음, 설치 공간을 먼저 정의합니다.", "튜브, 필터, 밸브, 전원, 커넥터, 실제 하우징과 함께 펌프를 테스트합니다.", "양산 전 시동 전류, 발열, 소음, 소재, 수명과 유지보수 방식을 검증합니다."]
  },
  es: {
    categories: ["Guía bomba DC", "Bomba DC 12V", "Bomba DC 24V", "Bomba brushless", "Micro bomba", "Bomba diafragma", "Bomba vacío", "Bomba líquida", "Bomba agua", "Bomba solar", "Compresor", "Bomba pistón", "Bomba médica", "Muestreo gas", "Bomba tinta", "Control ruido", "Vida bomba", "Control PWM", "Diseño energía", "Materiales", "Accesorios", "Purificador agua", "Equipo belleza", "Automatización", "Ambiental", "Laboratorio", "Diseño OEM", "Diagnóstico", "Análisis fallas", "Selección proveedor"],
    titles: ["Qué es una bomba DC: guía práctica para compradores OEM", "Cómo elegir una bomba DC 12V para dispositivos compactos", "Cuándo una bomba DC 24V es mejor que 12V", "Bomba DC brushless vs brushed: factores de selección", "Selección micro bomba DC: caudal, presión, vacío y tamaño", "Ventajas de bomba DC de diafragma para aire y líquido", "Mini bomba de vacío DC para succión y muestreo", "Bomba líquida DC para dosificación, transferencia y dispensing", "Aplicaciones de bomba de agua DC 12V en productos OEM", "Bombas DC para sistemas solares y de batería", "Mini compresor DC vs bomba de aire DC", "Guía de bomba de pistón DC para aire de alta presión", "Selección de bomba DC para equipos médicos y diagnóstico", "Bomba DC para muestreo de gas: vacío, caudal y ruta limpia", "Bomba de tinta DC para impresoras y fluidos", "Cómo reducir ruido en un módulo de bomba DC", "Cómo estimar la vida útil de una bomba DC en OEM", "Uso de control PWM con una bomba DC", "Fuente para bomba DC: voltaje, corriente y arranque", "Elegir materiales de diafragma y válvula para bombas DC", "Accesorios bomba DC: tubos, válvulas, filtros y silenciadores", "Bomba DC para purificadores de agua y bebidas", "Aplicaciones de bomba DC en instrumentos de belleza", "Módulos de bomba DC para automatización y robótica", "Selección bomba DC para monitoreo ambiental", "Bombas DC en laboratorio e instrumentos analíticos", "Cómo escribir una RFQ de bomba DC precisa", "Por qué baja el caudal después de instalar la bomba", "Modos de falla comunes en bombas DC compactas", "Cómo elegir fabricante de bombas DC para OEM"],
    excerpt: (title) => `Este artículo aborda ${title.toLowerCase()} y resume criterios OEM: medio, caudal, presión/vacío, voltaje, ruido, vida útil e integración.`,
    note: "Nota técnica original de JSG DC Pump para compradores B2B que comparan bombas DC y módulos OEM de control de fluidos.",
    points: ["Definir medio, caudal útil, presión o vacío, voltaje, ciclo, ruido y espacio disponible.", "Probar la bomba con tubos, filtros, válvulas, fuente, conectores y carcasa real.", "Validar corriente de arranque, calor, ruido, materiales y vida útil antes de producción."]
  }
};

Object.assign(copy.zh, { readArticle: "阅读文章" });
Object.assign(copy.fr, { readArticle: "Lire l'article" });
Object.assign(copy.de, { readArticle: "Artikel lesen" });
Object.assign(copy.id, { readArticle: "Baca artikel" });
Object.assign(copy.it, { readArticle: "Leggi articolo" });
Object.assign(copy.ko, { readArticle: "기사 읽기" });
Object.assign(copy.es, { readArticle: "Leer artículo" });

const setText = (selector, value) => {
  const node = document.querySelector(selector);
  if (node && value) node.textContent = value;
};

const setTexts = (selector, values) => {
  document.querySelectorAll(selector).forEach((node, index) => {
    if (values[index]) node.textContent = values[index];
  });
};

const setPlaceholders = (selector, values) => {
  document.querySelectorAll(selector).forEach((node, index) => {
    if (values[index]) node.placeholder = values[index];
  });
};

const setRfqLabels = (labels) => {
  const fieldNames = ["name", "company", "email", "country", "product", "quantity", "requirements", "message"];
  fieldNames.forEach((fieldName, index) => {
    const field = rfqForm?.elements[fieldName];
    const label = field?.closest("label")?.querySelector("span");
    if (label && labels[index]) label.textContent = labels[index];
  });
};

const applyLanguage = (lang) => {
  const active = copy[lang] ? lang : "en";
  const t = copy[active];

  document.documentElement.lang = langAttrs[active];
  document.title = t.metaTitle;
  document.querySelector("meta[name='description']")?.setAttribute("content", t.metaDescription || english.metaDescription);
  languageSelect && (languageSelect.value = active);

  setText(".brand small", t.brandSmall);
  setTexts(".nav-links a", t.nav);
  setText(".nav-cta", t.navCta);
  setText(".hero-copy .eyebrow", t.heroEyebrow);
  setText(".hero-copy h1", t.heroTitle);
  setText(".hero-lede", t.heroLede);
  setTexts(".hero-actions a", t.heroActions);
  setTexts(".hero-metrics dd", t.metrics);
  setTexts(".trust-item strong", t.trust);

  setText("#products .section-heading .eyebrow", t.productsHeading.eyebrow);
  setText("#products .section-heading h2", t.productsHeading.title);
  setText("#products .section-heading p:not(.eyebrow)", t.productsHeading.body);
  document.querySelectorAll(".product-card").forEach((card, index) => {
    const item = t.productCards[index] || english.productCards[index];
    setTextFrom(card, "h3", item.title);
    setTextFrom(card, "p", item.body);
    card.querySelectorAll("li").forEach((li, liIndex) => {
      li.textContent = item.specs[liIndex] || english.productCards[index].specs[liIndex];
    });
    setTextFrom(card, "a", t.askSpecs);
  });

  setSectionHeading("#matrix", t.matrixHeading);
  setTexts(".matrix-table th", t.matrixHeaders);
  setSectionHeading("#catalog", t.catalogHeading);
  setTexts(".catalog-card figcaption", t.catalogCaptions);

  setText("#oem .solution-copy .eyebrow", t.oem.eyebrow);
  setText("#oem .solution-copy h2", t.oem.title);
  setText("#oem .solution-copy p:not(.eyebrow)", t.oem.body);
  setTexts(".process-list strong", t.oem.steps);
  setTexts(".panel-topline span", t.oem.panelTop);
  setTexts(".spec-list dt", t.oem.specTerms);
  setTexts(".spec-list dd", t.oem.specDefs);

  setSectionHeading("#blog", t.blogHeading);
  document.querySelectorAll(".blog-card").forEach((card, index) => {
    const post = t.blogPosts[index] || english.blogPosts[index];
    if (!post) return;
    card.dataset.blogTitle = post[1];
    setTextFrom(card, ".blog-meta span", post[0]);
    setTextFrom(card, "h3", post[1]);
    setTextFrom(card, "> p", t.blogExcerpts[index] || english.blogExcerpts[index]);
    setTextFrom(card, "summary", t.readArticle);
    const body = card.querySelector(".blog-body");
    const paragraphs = (t.blogBodies && t.blogBodies[index]) || english.blogBodies[index];
    if (body && paragraphs) {
      body.innerHTML = `
        <p>${paragraphs[0]}</p>
        <p>${paragraphs[1]}</p>
        <ul>
          <li>${paragraphs[2]}</li>
          <li>${paragraphs[3]}</li>
        </ul>
      `;
    }
  });
  renderDcPumpArticles(active);

  setText("#company .eyebrow", t.company.eyebrow);
  setText("#company h2", t.company.title);
  setText("#company .company-card p:not(.eyebrow)", t.company.body);
  setTexts(".company-proof span", t.company.proofs);
  setText("#industries .eyebrow", t.industriesHeading.eyebrow);
  setText("#industries h2", t.industriesHeading.title);
  document.querySelectorAll(".industry-grid a").forEach((link, index) => {
    const item = t.industries[index] || english.industries[index];
    link.dataset.industry = item[0];
    const span = link.querySelector("span");
    link.firstChild.textContent = `${item[0]} `;
    if (span) span.textContent = item[1];
  });

  setText("#rfq .eyebrow", t.rfq.eyebrow);
  setText("#rfq h2", t.rfq.title);
  setText("#rfq .rfq-copy p:not(.eyebrow)", t.rfq.body);
  setText(".contact-strip span", t.rfq.strip);
  setRfqLabels(t.rfq.labels);
  setPlaceholders(".rfq-form input[name='quantity'], .rfq-form input[name='requirements'], .rfq-form textarea[name='message']", [
    t.rfq.quantityPlaceholder,
    t.rfq.requirementsPlaceholder,
    t.rfq.messagePlaceholder
  ]);
  setText(".rfq-form .btn", t.rfq.submit);
  document.querySelectorAll("#productSelect option").forEach((option, index) => {
    option.value = baseProducts[index];
    option.textContent = (t.productOptions && t.productOptions[index]) || baseProducts[index];
  });

  setTexts(".catalog-strip span, .catalog-strip strong, .catalog-strip a", t.catalogStrip);
  setText(".site-footer p", t.footer.body);
  setTexts(".site-footer h3", t.footer.headings);
  document.querySelectorAll(".footer-grid > div:not(:first-child)").forEach((col, colIndex) => {
    col.querySelectorAll("a").forEach((link, linkIndex) => {
      const value = t.footer.links[colIndex]?.[linkIndex];
      if (value && !link.href.startsWith("mailto:")) link.textContent = value;
    });
  });
  setText(".footer-bottom span", t.footer.copyright);

  window.__activeCopy = t;
};

function setTextFrom(root, selector, value) {
  const node = selector.startsWith(">") ? root.querySelector(`:scope ${selector}`) : root.querySelector(selector);
  if (node && value) node.textContent = value;
}

function setSectionHeading(sectionSelector, heading) {
  setText(`${sectionSelector} .section-heading .eyebrow`, heading.eyebrow);
  setText(`${sectionSelector} .section-heading h2`, heading.title);
  setText(`${sectionSelector} .section-heading p:not(.eyebrow)`, heading.body);
}

const localizeDcPumpArticle = (article, index, lang) => {
  const locale = dcPumpArticleLocales[lang];
  if (!locale) return article;

  const title = locale.titles[index] || article.title;
  return {
    category: locale.categories[index] || article.category,
    title,
    excerpt: locale.excerpt(title, article, index),
    note: locale.note,
    points: locale.points
  };
};

const getDcPumpArticleBody = (article, index, lang) => {
  if (lang === "en" && dcPumpArticleBodies[index]) return dcPumpArticleBodies[index];
  return [
    article.excerpt,
    article.note || "This article is an original JSG DC Pump engineering note written for B2B buyers comparing DC pump options for OEM devices and fluid-control modules."
  ];
};

const renderDcPumpArticles = (lang = document.documentElement.lang === "zh-CN" ? "zh" : "en") => {
  const container = document.querySelector(".blog-posts");
  if (!container) return;

  container.querySelectorAll(".dc-pump-article").forEach((node) => node.remove());

  const fragment = document.createDocumentFragment();

  dcPumpArticles.forEach((baseArticle, index) => {
    const article = localizeDcPumpArticle(baseArticle, index, lang);
    const bodyParagraphs = getDcPumpArticleBody(article, index, lang);
    const summaryLabel = copy[lang]?.readArticle || english.readArticle;
    const card = document.createElement("article");
    card.className = "blog-card reveal is-visible dc-pump-article";
    card.dataset.blogTitle = article.title;
    card.innerHTML = `
      <div class="blog-meta">
        <span>${article.category}</span>
        <time datetime="2026-07-03">Jul 2026</time>
      </div>
      <h3>${article.title}</h3>
      <p>${article.excerpt}</p>
      <details>
        <summary>${summaryLabel}</summary>
        <div class="blog-body">
          ${bodyParagraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
          <ul>
            ${article.points.map((point) => `<li>${point}</li>`).join("")}
          </ul>
        </div>
      </details>
    `;
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
};

const detectInitialLanguage = () => {
  const params = new URLSearchParams(window.location.search);
  const queryLang = params.get("lang");
  if (languages.includes(queryLang)) return queryLang;

  const pathLang = window.location.pathname.split("/").filter(Boolean)[0];
  if (languages.includes(pathLang)) return pathLang;

  const stored = localStorage.getItem("jsg-language");
  if (languages.includes(stored)) return stored;

  const browserLang = (navigator.language || "en").toLowerCase();
  if (browserLang.startsWith("zh")) return "zh";
  if (browserLang.startsWith("fr")) return "fr";
  if (browserLang.startsWith("de")) return "de";
  if (browserLang.startsWith("id")) return "id";
  if (browserLang.startsWith("it")) return "it";
  if (browserLang.startsWith("ko")) return "ko";
  if (browserLang.startsWith("es")) return "es";
  return "en";
};

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navLinks.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }
});

languageSelect?.addEventListener("change", () => {
  const lang = languageSelect.value;
  localStorage.setItem("jsg-language", lang);
  applyLanguage(lang);
  const url = new URL(window.location.href);
  url.searchParams.set("lang", lang);
  window.history.replaceState({}, "", url);
});

document.querySelectorAll("[data-product-link]").forEach((link) => {
  link.addEventListener("click", () => {
    const card = link.closest("[data-product]");
    if (card && productSelect) {
      productSelect.value = card.dataset.product;
    }
  });
});

document.querySelectorAll("[data-industry]").forEach((link) => {
  link.addEventListener("click", () => {
    const message = rfqForm?.elements.message;
    if (message && !message.value.trim()) {
      const status = window.__activeCopy?.status || english.status;
      message.value = status.application.replace("{industry}", link.dataset.industry);
    }
  });
});

const getFormValue = (name) => (rfqForm?.elements[name]?.value || "").trim();

const buildRfqPayload = (selectedProduct) => {
  return {
    name: getFormValue("name"),
    company: getFormValue("company"),
    email: getFormValue("email"),
    country: getFormValue("country"),
    product: selectedProduct,
    quantity: getFormValue("quantity"),
    requirements: getFormValue("requirements"),
    message: getFormValue("message"),
    website: getFormValue("website"),
    pageUrl: window.location.href
  };
};

rfqForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const status = window.__activeCopy?.status || english.status;
  const requiredFields = Array.from(rfqForm.querySelectorAll("[required]"));
  const invalidField = requiredFields.find((field) => !field.value.trim());
  const email = rfqForm.elements.email;
  const submitButton = rfqForm.querySelector("button[type='submit']");

  if (invalidField) {
    invalidField.focus();
    formStatus.textContent = status.required;
    return;
  }

  if (email && !email.checkValidity()) {
    email.focus();
    formStatus.textContent = status.email;
    return;
  }

  const selectedOption = productSelect?.selectedOptions[0]?.textContent || rfqForm.elements.product.value;
  const payload = buildRfqPayload(selectedOption);

  formStatus.textContent = status.sending;
  submitButton && (submitButton.disabled = true);

  try {
    const response = await fetch("/api/rfq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error("RFQ request failed");

    formStatus.textContent = status.success;
    rfqForm.classList.add("is-submitted");
    rfqForm.reset();
    window.setTimeout(() => {
      window.location.href = "/thank-you/";
    }, 700);
  } catch (error) {
    formStatus.textContent = status.serverError;
  } finally {
    submitButton && (submitButton.disabled = false);
  }
});

if (languageSelect) {
  applyLanguage(detectInitialLanguage());
} else {
  window.__activeCopy = english;
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((node) => revealObserver.observe(node));
