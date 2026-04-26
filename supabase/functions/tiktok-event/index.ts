// Edge function que envia eventos para a TikTok Events API (server-side)
// deno-lint-ignore-file no-explicit-any

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const PIXEL_CODE = "D5Q09LRC77U10VTVQNMG";
const ENDPOINT = "https://business-api.tiktok.com/open_api/v1.3/event/track/";

async function sha256(value: string) {
  const data = new TextEncoder().encode(value.trim().toLowerCase());
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const token = Deno.env.get("TIKTOK_ACCESS_TOKEN");
    if (!token) throw new Error("TIKTOK_ACCESS_TOKEN não configurado");

    const body = await req.json();
    const {
      event,
      event_id,
      event_time,
      url,
      user_agent,
      ip,
      email,
      phone,
      external_id,
      ttclid,
      ttp,
      value,
      currency = "BRL",
      contents,
    } = body || {};

    if (!event) throw new Error("event é obrigatório");

    const user: Record<string, any> = {};
    if (email) user.email = await sha256(String(email));
    if (phone) user.phone = await sha256(String(phone));
    if (external_id) user.external_id = await sha256(String(external_id));
    if (ttclid) user.ttclid = ttclid;
    if (ttp) user.ttp = ttp;
    if (ip) user.ip = ip;
    if (user_agent) user.user_agent = user_agent;

    const properties: Record<string, any> = {};
    if (typeof value === "number") properties.value = value;
    if (currency) properties.currency = currency;
    if (Array.isArray(contents)) properties.contents = contents;

    const payload = {
      event_source: "web",
      event_source_id: PIXEL_CODE,
      data: [
        {
          event,
          event_time: event_time ?? Math.floor(Date.now() / 1000),
          event_id: event_id ?? `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
          user,
          properties,
          page: url ? { url } : undefined,
        },
      ],
    };

    const r = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Token": token,
      },
      body: JSON.stringify(payload),
    });
    const data = await r.json();

    return new Response(JSON.stringify({ ok: r.ok, status: r.status, data }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erro desconhecido";
    console.error("tiktok-event error:", msg);
    return new Response(JSON.stringify({ ok: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
