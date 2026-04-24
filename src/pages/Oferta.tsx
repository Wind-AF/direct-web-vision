import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  CreditCard,
  Heart,
  UtensilsCrossed,
  Home,
  Car,
  Target,
} from "lucide-react";
import logo from "@/assets/bancred-logo.png";

const fontStack = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

type Reason = {
  id: string;
  label: string;
  Icon: any;
};

const REASONS: Reason[] = [
  { id: "quitar-dividas", label: "Quitar dívidas", Icon: CreditCard },
  { id: "emergencia-medica", label: "Emergência médica", Icon: Heart },
  { id: "meu-negocio", label: "Meu negócio", Icon: UtensilsCrossed },
  { id: "reformar-casa", label: "Reformar casa", Icon: Home },
  { id: "comprar-veiculo", label: "Comprar veículo", Icon: Car },
  { id: "outros-motivos", label: "Outros motivos", Icon: Target },
];

const Oferta = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selected, setSelected] = useState<string | null>(null);

  const STEP = 1;
  const TOTAL = 6;
  const progress = (STEP / TOTAL) * 100;

  const canContinue = !!selected;

  const handleContinue = () => {
    if (!canContinue) return;
    const cpf = searchParams.get("cpf") ?? "";
    const qs = new URLSearchParams();
    if (cpf) qs.set("cpf", cpf);
    qs.set("motivo", selected!);
    navigate(`/simulacao?${qs.toString()}`);
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        background: "#F1F5F9",
        fontFamily: fontStack,
        color: "#0F172A",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <header
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #E2E8F0",
          padding: "16px 16px",
          textAlign: "center",
          paddingTop: "calc(16px + env(safe-area-inset-top))",
        }}
      >
        <img
          src={logo}
          alt="Bancred"
          style={{ height: 76, width: "auto", display: "inline-block", objectFit: "contain" }}
        />
      </header>

      <main style={{ flex: 1, padding: "24px 16px 40px" }}>
        <div style={{ maxWidth: 448, margin: "0 auto" }}>
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 16,
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.05)",
              border: "1px solid #E2E8F0",
              padding: 24,
            }}
          >
            {/* Progress */}
            <div style={{ marginBottom: 4 }}>
              <div
                style={{
                  height: 6,
                  width: "100%",
                  background: "#E2E8F0",
                  borderRadius: 999,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${progress}%`,
                    background: "#2563EB",
                    borderRadius: 999,
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
              <p
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color: "#64748B",
                  marginTop: 12,
                }}
              >
                {STEP} de {TOTAL}
              </p>
            </div>

            {/* Title */}
            <div style={{ marginTop: 8 }}>
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#0F172A",
                  textAlign: "center",
                  letterSpacing: -0.4,
                }}
              >
                Motivo do Empréstimo
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "#64748B",
                  textAlign: "center",
                  marginTop: 4,
                  marginBottom: 20,
                }}
              >
                Para que você precisa do empréstimo?
              </p>

              {/* Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                {REASONS.map(({ id, label, Icon }) => {
                  const isActive = selected === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSelected(id)}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        borderRadius: 12,
                        padding: 16,
                        background: isActive ? "#EFF6FF" : "#FFFFFF",
                        border: `2px solid ${isActive ? "#2563EB" : "#E2E8F0"}`,
                        color: isActive ? "#1D4ED8" : "#334155",
                        cursor: "pointer",
                        transition: "all 0.18s ease",
                        fontFamily: fontStack,
                        minHeight: 96,
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.borderColor = "#CBD5E1";
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.borderColor = "#E2E8F0";
                      }}
                    >
                      <Icon width={24} height={24} strokeWidth={2} />
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          textAlign: "center",
                          lineHeight: 1.2,
                        }}
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Continue */}
            <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 12 }}>
              <button
                type="button"
                disabled={!canContinue}
                onClick={handleContinue}
                style={{
                  flex: 1,
                  borderRadius: 12,
                  height: 48,
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#FFFFFF",
                  border: "none",
                  cursor: canContinue ? "pointer" : "not-allowed",
                  background: canContinue ? "#2563EB" : "#93C5FD",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  transition: "background 0.2s ease, transform 0.08s ease",
                  fontFamily: fontStack,
                }}
                onMouseEnter={(e) => {
                  if (canContinue) e.currentTarget.style.background = "#1D4ED8";
                }}
                onMouseLeave={(e) => {
                  if (canContinue) e.currentTarget.style.background = "#2563EB";
                }}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer
        style={{
          background: "#111827",
          color: "#D1D5DB",
          padding: "24px 16px calc(24px + env(safe-area-inset-bottom))",
          borderTop: "1px solid #1F2937",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 14, color: "#9CA3AF", marginBottom: 4 }}>
          © 2026 Bancred LTDA. Todos os direitos reservados.
        </div>
        <div style={{ fontSize: 14, color: "#6B7280", marginBottom: 4 }}>CNPJ 41.906.644/0001-20</div>
        <p style={{ fontSize: 12, color: "#6B7280" }}>
          Empréstimos rápidos e seguros para realizar seus sonhos
        </p>
      </footer>
    </div>
  );
};

export default Oferta;
