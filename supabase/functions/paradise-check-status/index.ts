import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

const PARADISE_BASE = "https://multi.paradisepags.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const PARADISE_SECRET_KEY = Deno.env.get("PARADISE_SECRET_KEY");
    if (!PARADISE_SECRET_KEY) throw new Error("PARADISE_SECRET_KEY ausente");

    const url = new URL(req.url);
    const transactionId = url.searchParams.get("transaction_id");
    if (!transactionId) throw new Error("transaction_id obrigatório");

    const resp = await fetch(
      `${PARADISE_BASE}/api/v1/query.php?action=get_transaction&id=${encodeURIComponent(transactionId)}`,
      { method: "GET", headers: { "X-API-Key": PARADISE_SECRET_KEY } },
    );

    const data = await resp.json();
    if (!resp.ok) {
      console.error("Paradise status error", resp.status, data);
      return new Response(JSON.stringify({ error: data?.message || "Falha ao consultar", details: data }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ status: data.status, raw_status: data.raw_status, amount: data.amount }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("paradise-check-status:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
