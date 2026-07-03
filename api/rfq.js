const MAX_FIELD_LENGTH = 2000;
const RFQ_TO_EMAIL = process.env.RFQ_TO_EMAIL || "info@jsgpump.com";
const RFQ_FROM_EMAIL = process.env.RFQ_FROM_EMAIL || "JSG RFQ <no-reply@jsgpump.com>";

const json = (res, statusCode, payload) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
};

const normalize = (value, maxLength = MAX_FIELD_LENGTH) =>
  String(value || "")
    .replace(/\r/g, "")
    .trim()
    .slice(0, maxLength);

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const escapeHtml = (value) =>
  normalize(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const parseBody = (req) => {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");
  return {};
};

const buildEmailContent = (data) => {
  const submittedAt = new Date().toISOString();
  const fields = [
    ["Name", data.name],
    ["Company", data.company],
    ["Email", data.email],
    ["Country / Region", data.country || "Not specified"],
    ["Product type", data.product],
    ["Annual quantity", data.quantity || "Not specified"],
    ["Medium / flow / pressure / vacuum / voltage", data.requirements || "Not specified"],
    ["Page", data.pageUrl || "Not specified"],
    ["Submitted at", submittedAt]
  ];

  const text = [
    "New RFQ submitted from jsgpump.com",
    "",
    ...fields.map(([label, value]) => `${label}: ${value}`),
    "",
    "Application description:",
    data.message
  ].join("\n");

  const rows = fields
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:8px 12px;border:1px solid #d9e2ec;background:#f6f9fc;">${escapeHtml(label)}</th><td style="padding:8px 12px;border:1px solid #d9e2ec;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#0c1b2a;line-height:1.55;">
      <h2>New RFQ submitted from jsgpump.com</h2>
      <table cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;max-width:760px;">${rows}</table>
      <h3>Application description</h3>
      <p style="white-space:pre-wrap;">${escapeHtml(data.message)}</p>
    </div>
  `;

  return { text, html, submittedAt };
};

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { ok: false, message: "Method not allowed" });
  }

  try {
    const body = parseBody(req);

    if (normalize(body.website, 100)) {
      return json(res, 200, { ok: true });
    }

    const data = {
      name: normalize(body.name, 120),
      company: normalize(body.company, 160),
      email: normalize(body.email, 180),
      country: normalize(body.country, 120),
      product: normalize(body.product, 180),
      quantity: normalize(body.quantity, 120),
      requirements: normalize(body.requirements, 500),
      message: normalize(body.message, 2000),
      pageUrl: normalize(body.pageUrl, 500)
    };

    if (!data.name || !data.company || !data.email || !data.message || !data.product || !isEmail(data.email)) {
      return json(res, 400, { ok: false, message: "Invalid RFQ details" });
    }

    if (!process.env.RESEND_API_KEY) {
      return json(res, 503, { ok: false, message: "RFQ mail service is not configured" });
    }

    const { text, html } = buildEmailContent(data);
    const subjectParts = ["RFQ", data.product, data.company || data.name].filter(Boolean);
    const payload = {
      from: RFQ_FROM_EMAIL,
      to: [RFQ_TO_EMAIL],
      reply_to: data.email,
      subject: subjectParts.join(" - "),
      text,
      html
    };

    if (process.env.RFQ_BCC_EMAIL && isEmail(process.env.RFQ_BCC_EMAIL)) {
      payload.bcc = [process.env.RFQ_BCC_EMAIL];
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      return json(res, 502, { ok: false, message: "RFQ mail delivery failed" });
    }

    return json(res, 200, { ok: true });
  } catch (error) {
    return json(res, 500, { ok: false, message: "RFQ request failed" });
  }
};
