import { NextResponse } from "next/server";

const allowedStartTimes = new Set(["07:00", "13:00", "18:00"]);
const allowedDurations = new Set(["6-ore", "multi"]);
const durationLabels = new Map([
  ["6-ore", "6 ore"],
  ["multi", "Mai multe zile"],
]);
const allowedEquipment = new Map([
  ["kayak-dublu", "KAYAK dublu gonflabil"],
  ["cort", "Cort"],
  ["sac-de-dormit", "Sac de dormit"],
  ["pachet-recomandat", "Pachet Recomandat"],
]);

type NormalizedEquipmentItem = {
  value: string;
  label: string;
  quantity: number;
};

type RentalRequestBody = {
  rentalDate?: unknown;
  startTime?: unknown;
  duration?: unknown;
  equipment?: unknown;
  customerName?: unknown;
  customerPhone?: unknown;
  customerEmail?: unknown;
  customerNote?: unknown;
};

type EquipmentItem = {
  value?: unknown;
  label?: unknown;
  quantity?: unknown;
};

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function optionalText(value: unknown) {
  const text = asText(value);
  return text.length > 0 ? text : null;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatRentalDate(value: string) {
  const [year, month, day] = value.split("-");

  if (!year || !month || !day) {
    return value;
  }

  return `${day}.${month}.${year}`;
}

function getPhoneHref(phone: string | null) {
  const normalizedPhone = phone?.replace(/[^\d+]/g, "") ?? "";
  return normalizedPhone.length > 0 ? `tel:${normalizedPhone}` : null;
}

function getEmailHref(email: string | null, subject: string) {
  if (!email) {
    return null;
  }

  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

function renderEmailButton({
  label,
  href,
  background,
  color = "#ffffff",
}: {
  label: string;
  href: string | null;
  background: string;
  color?: string;
}) {
  if (!href) {
    return "";
  }

  return `
    <a
      class="button"
      href="${escapeHtml(href)}"
      style="display:inline-block;margin:0 8px 10px 0;border-radius:12px;background:${background};color:${color};font-size:14px;font-weight:800;line-height:18px;text-decoration:none;padding:13px 18px;"
    >
      ${escapeHtml(label)}
    </a>
  `;
}

function renderInfoRow(label: string, value: string | null) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #edf3f6;color:#6b7c8f;font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;vertical-align:top;width:36%;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #edf3f6;color:#13233f;font-size:15px;font-weight:800;line-height:22px;vertical-align:top;">
        ${escapeHtml(value ?? "nespecificat")}
      </td>
    </tr>
  `;
}

function normalizeEquipment(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item: EquipmentItem) => {
      const equipmentValue = asText(item?.value);

      if (!allowedEquipment.has(equipmentValue)) {
        return null;
      }

      const quantity =
        typeof item.quantity === "number" && Number.isFinite(item.quantity)
          ? Math.round(item.quantity)
          : 1;

      return {
        value: equipmentValue,
        label: allowedEquipment.get(equipmentValue),
        quantity: Math.min(99, Math.max(1, quantity)),
      };
    })
    .filter((item): item is NormalizedEquipmentItem => Boolean(item));
}

async function sendRentalRequestEmail({
  requestId,
  rentalDate,
  startTime,
  duration,
  equipment,
  customerName,
  customerPhone,
  customerEmail,
  customerNote,
}: {
  requestId: string | null;
  rentalDate: string;
  startTime: string;
  duration: string;
  equipment: NormalizedEquipmentItem[];
  customerName: string | null;
  customerPhone: string | null;
  customerEmail: string | null;
  customerNote: string | null;
}): Promise<{ sent: boolean; toEmail: string | null; reason: string | null }> {
  const apiKey = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  const toEmail = process.env.MAILGUN_TO_EMAIL ?? "burlac.vlad@gmail.com";
  const fromEmail =
    process.env.MAILGUN_FROM_EMAIL ??
    (domain ? `KAYAK Nistru <postmaster@${domain}>` : null);

  if (!apiKey || !domain || !fromEmail) {
    console.warn("Mailgun env is missing, rental request email skipped");
    return { sent: false, toEmail, reason: "Mailgun env is missing" };
  }

  const equipmentLines = equipment
    .map((item) => `- ${item.label}: ${item.quantity}`)
    .join("\n");
  const durationLabel = durationLabels.get(duration) ?? duration;
  const formattedRentalDate = formatRentalDate(rentalDate);
  const firstEquipment = equipment[0]
    ? `${equipment[0].label} x${equipment[0].quantity}`
    : "echipament";
  const subject = `Cerere nouă: ${formattedRentalDate}, ${startTime} - ${firstEquipment}`;
  const receivedAt = new Intl.DateTimeFormat("ro-MD", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Chisinau",
  }).format(new Date());
  const phoneHref = getPhoneHref(customerPhone);
  const emailHref = getEmailHref(customerEmail, `Cerere KAYAK Nistru ${formattedRentalDate}`);
  const actionText = customerPhone
    ? "Acțiune recomandată: sună clientul și confirmă disponibilitatea."
    : "Acțiune recomandată: verifică cererea și revino prin Gmail dacă este completat.";
  const text = [
    "Cerere nouă de arendă KAYAK Nistru",
    "",
    `Primită: ${receivedAt}`,
    `ID Supabase: ${requestId ?? "indisponibil"}`,
    `Data: ${formattedRentalDate}`,
    `Ora de start: ${startTime}`,
    `Durata arendei: ${durationLabel}`,
    "",
    "Echipament:",
    equipmentLines,
    "",
    "Date de contact:",
    `Nume: ${customerName ?? "nespecificat"}`,
    `Telefon: ${customerPhone ?? "nespecificat"}`,
    `Gmail: ${customerEmail ?? "nespecificat"}`,
    `Note: ${customerNote ?? "fără note"}`,
  ].join("\n");

  const equipmentRows = equipment
    .map(
      (item) => `
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #edf3f6;">
            <div style="color:#13233f;font-size:15px;font-weight:850;line-height:22px;">${escapeHtml(item.label)}</div>
            <div style="color:#6b7c8f;font-size:12px;font-weight:700;line-height:18px;">${escapeHtml(item.value)}</div>
          </td>
          <td align="right" style="padding:14px 0;border-bottom:1px solid #edf3f6;">
            <span style="display:inline-block;min-width:34px;border-radius:999px;background:#eaf8fa;color:#087d8f;font-size:14px;font-weight:900;line-height:20px;text-align:center;padding:7px 10px;">
              ${item.quantity}
            </span>
          </td>
        </tr>
      `
    )
    .join("");

  const contactActions = [
    renderEmailButton({
      label: "Sună clientul",
      href: phoneHref,
      background: "#0994a8",
    }),
    renderEmailButton({
      label: "Răspunde pe Gmail",
      href: emailHref,
      background: "#0a3956",
    }),
  ].join("");

  const html = `
    <!doctype html>
    <html lang="ro">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          @media only screen and (max-width: 640px) {
            .container { width: 100% !important; }
            .content { padding: 16px !important; }
            .stack { display: block !important; width: 100% !important; }
            .metric { display: block !important; width: 100% !important; margin-bottom: 10px !important; }
            .button { display: block !important; width: 100% !important; box-sizing: border-box !important; text-align: center !important; }
            .mobile-tight { padding-left: 14px !important; padding-right: 14px !important; }
          }
        </style>
      </head>
      <body style="margin:0;padding:0;background:#eef6f8;font-family:Arial,Helvetica,sans-serif;color:#13233f;">
        <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
          ${escapeHtml(actionText)}
        </div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;background:#eef6f8;border-collapse:collapse;">
          <tr>
            <td align="center" style="padding:24px 12px;">
              <table class="container" role="presentation" width="640" cellspacing="0" cellpadding="0" style="width:640px;max-width:640px;border-collapse:separate;border-spacing:0;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 18px 50px rgba(10,57,86,.14);">
                <tr>
                  <td class="mobile-tight" style="padding:24px 26px;background:#0a3956;background-image:linear-gradient(135deg,#0a3956,#0994a8);">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                      <tr>
                        <td class="stack" style="vertical-align:top;">
                          <div style="color:#dffbff;font-size:12px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;">
                            KAYAK Nistru
                          </div>
                          <h1 style="margin:8px 0 0;color:#ffffff;font-size:25px;line-height:31px;font-weight:900;">
                            Cerere nouă de arendă
                          </h1>
                          <div style="margin-top:8px;color:#dffbff;font-size:14px;font-weight:700;line-height:20px;">
                            Primită: ${escapeHtml(receivedAt)}
                          </div>
                        </td>
                        <td class="stack" align="right" style="vertical-align:top;">
                          <span style="display:inline-block;border-radius:999px;background:#f2a51a;color:#ffffff;font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;padding:8px 12px;">
                            Nou
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td class="content" style="padding:22px 26px 26px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                      <tr>
                        <td class="metric" width="33.33%" style="padding:0 6px 12px 0;">
                          <div style="border:1px solid #dcebf0;border-radius:16px;background:#f8fcfd;padding:14px;">
                            <div style="color:#6b7c8f;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.08em;">Data</div>
                            <div style="margin-top:5px;color:#0a3956;font-size:20px;font-weight:900;line-height:25px;">${escapeHtml(formattedRentalDate)}</div>
                          </div>
                        </td>
                        <td class="metric" width="33.33%" style="padding:0 6px 12px;">
                          <div style="border:1px solid #dcebf0;border-radius:16px;background:#f8fcfd;padding:14px;">
                            <div style="color:#6b7c8f;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.08em;">Ora</div>
                            <div style="margin-top:5px;color:#0a3956;font-size:20px;font-weight:900;line-height:25px;">${escapeHtml(startTime)}</div>
                          </div>
                        </td>
                        <td class="metric" width="33.33%" style="padding:0 0 12px 6px;">
                          <div style="border:1px solid #dcebf0;border-radius:16px;background:#f8fcfd;padding:14px;">
                            <div style="color:#6b7c8f;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.08em;">Durata</div>
                            <div style="margin-top:5px;color:#0a3956;font-size:20px;font-weight:900;line-height:25px;">${escapeHtml(durationLabel)}</div>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <div style="margin:4px 0 18px;border-radius:16px;background:#eaf8fa;border:1px solid #ccecf1;padding:14px 16px;color:#0a6573;font-size:14px;font-weight:800;line-height:21px;">
                      ${escapeHtml(actionText)}
                    </div>

                    <div style="margin-bottom:18px;">
                      ${contactActions}
                    </div>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0;border:1px solid #e4edf1;border-radius:16px;overflow:hidden;margin-bottom:18px;">
                      <tr>
                        <td style="padding:16px 18px;background:#f8fcfd;border-bottom:1px solid #e4edf1;">
                          <div style="color:#0a3956;font-size:16px;font-weight:900;line-height:22px;">Echipament selectat</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 18px 4px;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                            ${equipmentRows}
                          </table>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0;border:1px solid #e4edf1;border-radius:16px;overflow:hidden;margin-bottom:18px;">
                      <tr>
                        <td style="padding:16px 18px;background:#f8fcfd;border-bottom:1px solid #e4edf1;">
                          <div style="color:#0a3956;font-size:16px;font-weight:900;line-height:22px;">Date client</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:2px 18px 6px;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                            ${renderInfoRow("Nume", customerName)}
                            ${renderInfoRow("Telefon", customerPhone)}
                            ${renderInfoRow("Gmail", customerEmail)}
                          </table>
                        </td>
                      </tr>
                    </table>

                    <div style="border-radius:16px;background:#fffaf0;border:1px solid #f4dfad;padding:16px 18px;margin-bottom:18px;">
                      <div style="color:#8a5b00;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.08em;">Note</div>
                      <div style="margin-top:8px;color:#13233f;font-size:15px;font-weight:750;line-height:23px;">
                        ${escapeHtml(customerNote ?? "fără note")}
                      </div>
                    </div>

                    <div style="border-top:1px solid #edf3f6;padding-top:14px;color:#7b8b9b;font-size:12px;font-weight:700;line-height:18px;">
                      ID Supabase: ${escapeHtml(requestId ?? "indisponibil")}<br />
                      Sursa: website
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const formData = new FormData();
  formData.set("from", fromEmail);
  formData.set("to", toEmail);
  formData.set("subject", subject);
  formData.set("text", text);
  formData.set("html", html);

  try {
    const response = await fetch(
      `https://api.mailgun.net/v3/${domain}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString("base64")}`,
        },
        body: formData,
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const details = await response.text();
      console.error("Mailgun rental request email failed", details);
      return {
        sent: false,
        toEmail,
        reason: `Mailgun rejected the request: ${details}`,
      };
    }

    return { sent: true, toEmail, reason: null };
  } catch (error) {
    console.error("Mailgun rental request email failed", error);
    return {
      sent: false,
      toEmail,
      reason:
        error instanceof Error ? `Mailgun fetch failed: ${error.message}` : "Mailgun fetch failed",
    };
  }
}

export async function POST(request: Request) {
  let body: RentalRequestBody;

  try {
    body = (await request.json()) as RentalRequestBody;
  } catch {
    return NextResponse.json(
      { error: "Cererea nu este validă." },
      { status: 400 }
    );
  }

  const rentalDate = asText(body.rentalDate);
  const startTime = asText(body.startTime);
  const duration = asText(body.duration);
  const equipment = normalizeEquipment(body.equipment);

  if (!rentalDate || Number.isNaN(Date.parse(`${rentalDate}T00:00:00`))) {
    return NextResponse.json(
      { error: "Alege o dată validă pentru arendă." },
      { status: 400 }
    );
  }

  if (!allowedStartTimes.has(startTime)) {
    return NextResponse.json(
      { error: "Alege ora de start: 07:00, 13:00 sau 18:00." },
      { status: 400 }
    );
  }

  if (!allowedDurations.has(duration)) {
    return NextResponse.json(
      { error: "Alege durata arendei." },
      { status: 400 }
    );
  }

  if (equipment.length === 0) {
    return NextResponse.json(
      { error: "Alege cel puțin un tip de echipament." },
      { status: 400 }
    );
  }

  const restUrl =
    process.env.SUPABASE_REST_URL ??
    (process.env.SUPABASE_URL
      ? `${process.env.SUPABASE_URL.replace(/\/+$/, "")}/rest/v1`
      : null);
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!restUrl || !secretKey) {
    return NextResponse.json(
      { error: "Configurarea Supabase lipsește pe server." },
      { status: 500 }
    );
  }

  const endpoint = `${restUrl.replace(/\/+$/, "")}/rental_requests`;
  const payload = {
    rental_date: rentalDate,
    start_time: startTime,
    duration,
    equipment,
    customer_name: optionalText(body.customerName),
    customer_phone: optionalText(body.customerPhone),
    customer_email: optionalText(body.customerEmail),
    customer_note: optionalText(body.customerNote),
    source: "website",
  };

  const emailResult = await sendRentalRequestEmail({
    requestId: null,
    rentalDate,
    startTime,
    duration,
    equipment,
    customerName: payload.customer_name,
    customerPhone: payload.customer_phone,
    customerEmail: payload.customer_email,
    customerNote: payload.customer_note,
  });
  const emailSent = emailResult.sent;

  let data: unknown = null;
  let supabaseSaved = false;

  try {
    const supabaseResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Prefer: "return=representation",
        apikey: secretKey,
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (supabaseResponse.ok) {
      data = (await supabaseResponse.json()) as unknown;
      supabaseSaved = true;
    } else {
      const details = await supabaseResponse.text();
      console.error("Supabase rental_requests insert failed", details);
    }
  } catch (error) {
    console.error("Supabase rental_requests fetch failed", error);
  }

  if (emailSent && supabaseSaved && data) {
    return NextResponse.json({
        ok: true,
        emailSent,
        emailTo: emailResult.toEmail,
        emailError: emailResult.reason,
        data,
      });
  }

  if (emailSent && !supabaseSaved) {
    return NextResponse.json(
      {
        ok: true,
        emailSent: true,
        emailTo: emailResult.toEmail,
        emailError: emailResult.reason,
        data: null,
        warning:
          "Emailul a fost trimis, dar cererea nu s-a salvat în Supabase.",
      },
      { status: 200 }
    );
  }

  if (!emailSent && supabaseSaved) {
    return NextResponse.json(
      {
        ok: true,
        emailSent: false,
        emailTo: emailResult.toEmail,
        emailError: emailResult.reason,
        data,
        warning:
          "Cererea s-a salvat în Supabase, dar emailul nu a putut fi trimis.",
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    {
      error:
        "Nu am putut trimite nici emailul, nici salva cererea. Încearcă din nou sau sună direct.",
    },
    { status: 502 }
  );

  return NextResponse.json({
    ok: true,
    emailSent,
    data,
  });
}
