import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";

const fontStack = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const STEPS = [
  "Conta criada com sucesso",
  "Empréstimo aprovado e disponível",
  "Carnê preparado para envio",
];

const STEP_DURATION = 1500;

const Configurando = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current >= STEPS.length) {
      const t = setTimeout(() => {
        navigate(`/dashboard?${params.toString()}`);
      }, 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCurrent((c) => c + 1), STEP_DURATION);
    return () => clearTimeout(t);
  }, [current, navigate, params]);

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "linear-gradient(160deg, #3B82F6 0%, #1C68E3 55%, #1751B5 100%)",
        fontFamily: fontStack,
        color: "#FFFFFF",
        WebkitFontSmoothing: "antialiased",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 20px",
      }}
    >
      <div style={{ maxWidth: 420, width: "100%", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <Loader2 size={56} className="animate-spin" strokeWidth={2.2} color="#FFFFFF" />
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.6, marginBottom: 32 }}>
          Configurando sua conta
        </h1>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            textAlign: "left",
            maxWidth: 320,
          }}
        >
          {STEPS.map((label, idx) => {
            const isDone = idx < current;
            const isActive = idx === current;
            const isPending = idx > current;
            return (
              <li
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  opacity: isPending ? 0.55 : 1,
                  transition: "opacity 0.3s ease",
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: isDone ? "#16A34A" : isActive ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.18)",
                    color: "#FFFFFF",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "background 0.3s ease",
                    border: isPending ? "1.5px solid rgba(255,255,255,0.4)" : "none",
                  }}
                >
                  {isDone ? (
                    <CheckCircle2 size={18} strokeWidth={2.5} />
                  ) : isActive ? (
                    <Loader2 size={14} className="animate-spin" strokeWidth={2.5} />
                  ) : null}
                </span>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: isActive ? 700 : 600,
                    color: "#FFFFFF",
                  }}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Configurando;
