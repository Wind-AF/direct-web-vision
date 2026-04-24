import { useEffect, useMemo, useRef, useState } from "react";
import { Bell } from "lucide-react";

const fontStack = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

type Notification = {
  name: string;
  city: string;
  amount: string;
};

const NOTIFICATIONS: Notification[] = [
  { name: "Felipe M.", city: "Guarulhos", amount: "R$ 13.800,00" },
  { name: "Mariana S.", city: "Recife", amount: "R$ 8.500,00" },
  { name: "Carlos R.", city: "Belo Horizonte", amount: "R$ 22.000,00" },
  { name: "Ana P.", city: "Curitiba", amount: "R$ 5.200,00" },
  { name: "João V.", city: "Salvador", amount: "R$ 17.400,00" },
  { name: "Patrícia L.", city: "Fortaleza", amount: "R$ 9.900,00" },
  { name: "Roberto N.", city: "Porto Alegre", amount: "R$ 26.500,00" },
];

const SocialProofToast = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const timeoutsRef = useRef<number[]>([]);

  const current = useMemo(() => NOTIFICATIONS[index % NOTIFICATIONS.length], [index]);

  useEffect(() => {
    const clearAll = () => {
      timeoutsRef.current.forEach((t) => window.clearTimeout(t));
      timeoutsRef.current = [];
    };

    const cycle = () => {
      // Show
      setProgress(0);
      setVisible(true);
      // Animate progress bar
      timeoutsRef.current.push(window.setTimeout(() => setProgress(100), 60));
      // Hide after 5s
      timeoutsRef.current.push(
        window.setTimeout(() => {
          setVisible(false);
        }, 5200),
      );
      // Next notification after hide animation
      timeoutsRef.current.push(
        window.setTimeout(() => {
          setIndex((i) => i + 1);
          cycle();
        }, 8000),
      );
    };

    // Initial delay
    const initial = window.setTimeout(cycle, 3500);
    timeoutsRef.current.push(initial);

    return () => clearAll();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "calc(16px + env(safe-area-inset-bottom))",
        left: 12,
        right: 12,
        maxWidth: 360,
        margin: "0 auto",
        zIndex: 30,
        transition: "transform 0.4s, opacity 0.4s",
        transform: visible ? "translateY(0)" : "translateY(140%)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: 14,
          boxShadow: "0 10px 30px -10px rgba(17,24,39,0.25)",
          border: "1px solid #E5E7EB",
          padding: 14,
          fontFamily: fontStack,
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div
            style={{
              width: 38,
              height: 38,
              background: "#DCFCE7",
              color: "#16A34A",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Bell width={18} height={18} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>{current.name}</span>
              <span style={{ fontSize: 12, color: "#6B7280" }}>de {current.city}</span>
            </div>
            <p style={{ fontSize: 13, color: "#6B7280", marginTop: 2, marginBottom: 8 }}>
              Conseguiu o crédito de {current.amount}
            </p>
            <div style={{ background: "#E5E7EB", borderRadius: 999, height: 4, overflow: "hidden" }}>
              <div
                style={{
                  background: "#16A34A",
                  height: 4,
                  width: `${progress}%`,
                  borderRadius: 999,
                  transition: "width 5s linear",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProofToast;
