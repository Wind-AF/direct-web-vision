import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  TrendingUp,
  ArrowUpRight,
  Receipt,
  PiggyBank,
  ArrowRight,
  CreditCard,
  Percent,
  House,
  ArrowDownToLine,
} from "lucide-react";

const fontStack = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const PixIcon = ({ size = 22 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 315.63 315.63">
    <g transform="translate(-2394 -4352.093)">
      <path
        d="M246.13,264.53A46.07,46.07,0,0,1,213.35,251L166,203.62a9,9,0,0,0-12.44,0l-47.51,47.51A46.09,46.09,0,0,1,73.27,264.7H64l60,60a48,48,0,0,0,67.81,0l60.12-60.13Z"
        transform="translate(2394.023 4329.001)"
        fill="#32bcad"
      />
      <path
        d="M73.28,97.09a46.08,46.08,0,0,1,32.78,13.57l47.51,47.52a8.81,8.81,0,0,0,12.44,0l47.34-47.34a46,46,0,0,1,32.78-13.58h5.7L191.71,37.14a47.94,47.94,0,0,0-67.81,0L64,97.09Z"
        transform="translate(2394.023 4329.001)"
        fill="#32bcad"
      />
      <path
        d="M301.56,147l-36.33-36.33a7,7,0,0,1-2.58.52H246.13a32.62,32.62,0,0,0-22.93,9.5L175.86,168a22.74,22.74,0,0,1-32.13,0L96.21,120.51A32.62,32.62,0,0,0,73.28,111H53a7.12,7.12,0,0,1-2.44-.49L14,147a48,48,0,0,0,0,67.81l36.48,36.48a6.85,6.85,0,0,1,2.44-.49H73.28a32.63,32.63,0,0,0,22.93-9.51l47.51-47.51c8.59-8.58,23.56-8.58,32.14,0l47.34,47.33a32.62,32.62,0,0,0,22.93,9.5h16.52a6.9,6.9,0,0,1,2.58.52l36.33-36.33a47.94,47.94,0,0,0,0-67.81"
        transform="translate(2394.023 4329.001)"
        fill="#32bcad"
      />
    </g>
  </svg>
);

const Dashboard = () => {
  const [params] = useSearchParams();
  const [hideBalance, setHideBalance] = useState(false);

  const valor = Number(params.get("valor") || 5000);
  const nomeRaw = params.get("nome") || "";
  const primeiroNome = (nomeRaw.split(" ")[0] || "Cliente").toUpperCase();

  const proximoVenc = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 90);
    return d.toLocaleDateString("pt-BR");
  })();

  const parcelas = Number(params.get("parcelas") || 36);
  const parcelaMensal = (() => {
    const i = 0.022;
    return (valor * i) / (1 - Math.pow(1 + i, -parcelas));
  })();

  const quickActions = [
    { Icon: ArrowUpRight, label: "Sacar agora" },
    { Icon: PixIcon, label: "PIX", isPix: true },
    { Icon: Receipt, label: "Pagar boleto" },
    { Icon: PiggyBank, label: "Cofrinhos" },
  ];

  const services = [
    {
      Icon: CreditCard,
      title: "Cartões",
      desc: "Cartão de crédito sem anuidade com limite pré-aprovado.",
    },
    {
      Icon: Percent,
      title: "Empréstimos",
      desc: "Gerencie ou solicite novos valores.",
    },
    {
      Icon: TrendingUp,
      title: "Investimentos",
      desc: "Faça seu dinheiro render com 100% do CDI.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "#F4F4F7",
        paddingBottom: 80,
        fontFamily: fontStack,
      }}
    >
      <header
        style={{
          background: "linear-gradient(160deg, #3B82F6 0%, #1C68E3 55%, #1751B5 100%)",
          color: "#fff",
          padding: "calc(14px + env(safe-area-inset-top)) 18px 32px",
          borderBottomLeftRadius: 28,
          borderBottomRightRadius: 28,
          boxShadow: "0 12px 32px -16px rgba(28,104,227,0.55)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <button
            type="button"
            aria-label="Perfil"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              border: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#fff",
            }}
          >
            <User size={18} />
          </button>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="button"
              aria-label="Mostrar saldo"
              onClick={() => setHideBalance((s) => !s)}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.18)",
                border: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#fff",
              }}
            >
              {hideBalance ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            <button
              type="button"
              aria-label="Segurança"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.18)",
                border: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#fff",
              }}
            >
              <ShieldCheck size={18} />
            </button>
          </div>
        </div>

        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, letterSpacing: -0.4 }}>
          Olá, {primeiroNome}
        </h1>
        <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 4, fontWeight: 500 }}>
          Saldo em conta
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 800,
            marginBottom: 10,
            letterSpacing: -1,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {hideBalance ? "R$ ••••••" : formatBRL(valor)}
        </div>
        <div
          style={{
            fontSize: 12,
            color: "#86efac",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(22,163,74,0.18)",
            padding: "4px 10px",
            borderRadius: 999,
            fontWeight: 600,
          }}
        >
          <TrendingUp size={13} /> rendendo 102% do CDI
        </div>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 8,
          padding: "18px 14px 6px",
        }}
      >
        {quickActions.map(({ Icon, label, isPix }) => (
          <button
            key={label}
            type="button"
            style={{
              background: "transparent",
              border: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              cursor: "pointer",
              padding: 4,
              fontFamily: fontStack,
            }}
          >
            <span
              style={{
                width: 54,
                height: 54,
                borderRadius: 16,
                background: "#FFFFFF",
                color: "#1C68E3",
                border: "1px solid #E5E7EB",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 1px 2px rgba(17,24,39,0.04), 0 6px 14px -8px rgba(28,104,227,0.28)",
              }}
            >
              {isPix ? <PixIcon size={22} /> : <Icon size={20} />}
            </span>
            <span
              style={{
                fontSize: 11.5,
                color: "#111827",
                textAlign: "center",
                lineHeight: 1.2,
                fontWeight: 600,
                letterSpacing: -0.1,
              }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>

      <section
        style={{
          margin: "12px 14px",
          background: "#EFF6FF",
          border: "1px solid #DBEAFE",
          borderRadius: 14,
          padding: 18,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>Seu Empréstimo</h2>
          <button
            type="button"
            style={{
              background: "#1C68E3",
              color: "#fff",
              border: "none",
              borderRadius: 999,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: fontStack,
              boxShadow: "0 8px 24px rgba(28,104,227,0.28)",
            }}
          >
            Sacar <ArrowRight size={14} />
          </button>
        </div>
        <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 4 }}>Valor disponível</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: "#111827", marginBottom: 14 }}>
          {formatBRL(valor)}
        </div>
        <div
          style={{
            borderTop: "1px solid #DBEAFE",
            paddingTop: 12,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 13,
            color: "#6B7280",
          }}
        >
          <span>Próximo vencimento</span>
          <span style={{ fontWeight: 600, color: "#111827" }}>
            {proximoVenc} • {formatBRL(parcelaMensal)}
          </span>
        </div>
      </section>

      <section style={{ padding: "6px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
        {services.map(({ Icon, title, desc }) => (
          <button
            key={title}
            type="button"
            style={{
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: 14,
              padding: 14,
              display: "flex",
              alignItems: "center",
              gap: 12,
              textAlign: "left",
              cursor: "pointer",
              width: "100%",
              fontFamily: fontStack,
            }}
          >
            <span
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#EFF6FF",
                color: "#1C68E3",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon size={18} />
            </span>
            <span style={{ flex: 1 }}>
              <span style={{ display: "block", fontSize: 14, fontWeight: 700, color: "#111827" }}>
                {title}
              </span>
              <span style={{ display: "block", fontSize: 12, color: "#6B7280", marginTop: 2 }}>
                {desc}
              </span>
            </span>
            <ArrowUpRight size={18} color="#9CA3AF" />
          </button>
        ))}
      </section>

      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          borderTop: "1px solid #E5E7EB",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          padding: "10px 0 calc(10px + env(safe-area-inset-bottom))",
          zIndex: 50,
        }}
      >
        {[
          { Icon: House, label: "Home", active: true },
          { Icon: ArrowDownToLine, label: "Saque" },
          { Icon: User, label: "Meus Dados" },
        ].map(({ Icon, label, active }) => (
          <button
            key={label}
            type="button"
            style={{
              background: "transparent",
              border: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              color: active ? "#1C68E3" : "#6B7280",
              cursor: "pointer",
              padding: 4,
              fontFamily: fontStack,
            }}
          >
            <Icon size={22} />
            <span style={{ fontSize: 11, fontWeight: active ? 600 : 500 }}>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Dashboard;
