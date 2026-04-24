// Edge function: consulta CPF na api.amnesiatecnologia.rocks
// Mantém o token em segredo no servidor.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const token = Deno.env.get("AMNESIA_API_TOKEN");
    if (!token) {
      return new Response(
        JSON.stringify({ error: "AMNESIA_API_TOKEN não configurada" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = await req.json().catch(() => ({}));
    const rawCpf = String(body?.cpf ?? "").replace(/\D/g, "");

    if (rawCpf.length !== 11) {
      return new Response(
        JSON.stringify({ error: "CPF inválido" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const url = `https://api.amnesiatecnologia.rocks/?token=${encodeURIComponent(token)}&cpf=${rawCpf}`;
    const upstream = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const text = await upstream.text();
    let data: any = null;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    if (!upstream.ok) {
      console.error("amnesiatecnologia erro", upstream.status, text);
      return new Response(
        JSON.stringify({
          error: "Falha ao consultar CPF",
          status: upstream.status,
          details: data,
        }),
        { status: upstream.status, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // A API pode envelopar em { DADOS: {...} } / { dados: {...} } / { data: {...} } ou retornar direto.
    const payload = data?.DADOS ?? data?.dados ?? data?.data ?? data?.result ?? data;

    // Heurística para extrair os campos independentemente do nome da chave.
    const pick = (...keys: string[]) => {
      for (const k of keys) {
        const candidates = [k, k.toUpperCase(), k.toLowerCase()];
        for (const key of candidates) {
          const v = payload?.[key];
          if (v !== undefined && v !== null && String(v).trim() !== "") {
            return String(v);
          }
        }
      }
      return "";
    };

    const nome = pick("nome", "name", "nome_completo", "NOME", "fullName");
    const nascimento = pick(
      "data_nascimento",
      "nascimento",
      "dataNascimento",
      "DATA_NASC",
      "data_nasc",
      "birthDate",
      "nasc",
    );
    const sexo = pick("sexo", "genero", "SEXO", "sex", "gender");
    const mae = pick("nome_mae", "mae", "nomeMae", "NOME_MAE", "NOME_MAE_PF", "motherName");

    if (!nome) {
      return new Response(
        JSON.stringify({ error: "CPF não encontrado", details: payload }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({
        ok: true,
        cpf: rawCpf,
        nome,
        nascimento,
        sexo,
        mae,
        raw: payload,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("consulta-cpf erro inesperado", err);
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
