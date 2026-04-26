import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Wallet, Clock, Volume2, AlertCircle, ShieldCheck, Award, Car, CheckCircle2, Info } from "lucide-react";

const fontStack = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const Garantia = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const valor = Number(params.get("valor") || 5000);
  const [selected, setSelected] = useState<"seguro" | "bem" | null>(null);

  const handleContinue = () => {
    if (!selected) return;
    if (selected === "seguro") {
      navigate(`/pagamento?${params.toString()}`);
    } else {
      navigate(`/agendamento?${params.toString()}`);
    }
  };

  const optionStyle = (key: "seguro" | "bem") => ({
    width: "100%",
    background: "#FFFFFF",
    border: `2px solid ${selected === key ? "#1C68E3" : "#E5E7EB"}`,
    borderRadius: 14,
    padding: 16,
    textAlign: "left" as const,
    cursor: "pointer",
    marginBottom: 12,
    transition: "border-color 0.2s",
    fontFamily: fontStack,
  });

  return (
    <div style={{ minHeight: "100dvh", background: "#F4F4F7", fontFamily: fontStack, color: "#111827" }}>
      <header style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "14px 16px", textAlign: "center" }}>
        <span style={{ fontSize: 22, fontWeight: 800, color: "#1C68E3", letterSpacing: -0.4 }}>Bancred</span>
      </header>

      <main style={{ padding: "20px 16px", maxWidth: 480, margin: "0 auto" }}>
        <h1 style={{ fontSize: 21, fontWeight: 700, textAlign: "center", lineHeight: 1.3, marginBottom: 18 }}>
          Você está a apenas um passo de receber o valor solicitado
        </h1>

        <div style={{ background: "#F0FDF4", borderRadius: 16, padding: 18, border: "1px solid #DCFCE7", textAlign: "center", marginBottom: 14 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "#15803D", fontWeight: 600, marginBottom: 4 }}>
            <Wallet size={16} /> Valor Aprovado
          </div>
          <div style={{ fontSize: 30, fontWeight: 800, color: "#16A34A", marginBottom: 4 }}>{formatBRL(valor)}</div>
          <div style={{ fontSize: 12, color: "#16A34A", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Clock size={12} /> Liberação imediata após definir garantia
          </div>
        </div>

        <div style={{ background: "#EFF6FF", borderRadius: 16, padding: 14, border: "1px solid #DBEAFE", color: "#1751B5", fontSize: 13, lineHeight: 1.5, marginBottom: 16 }}>
          Para finalizar, precisamos definir a modalidade de garantia. Assista ao vídeo abaixo e escolha a opção que melhor se adequa ao seu perfil.
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, color: "#6B7280", fontSize: 13, marginBottom: 10 }}>
          <Volume2 size={14} /> Aumente o volume
        </div>

        <div style={{ borderRadius: 12, overflow: "hidden", background: "#000", marginBottom: 16, boxShadow: "0 4px 14px rgba(0,0,0,0.15)" }}>
          <video
            controls
            autoPlay
            playsInline
            preload="auto"
            src="/videos/emprestimo-seguro.mp4"
            style={{ width: "100%", display: "block" }}
          >
            Seu navegador não suporta vídeo HTML5.
          </video>
        </div>

        <div style={{ background: "#FFFBEB", borderRadius: 16, padding: 14, border: "1px solid #FDE68A", color: "#78350F", fontSize: 13, lineHeight: 1.5, marginBottom: 22 }}>
          <div style={{ display: "flex", gap: 8 }}>
            <AlertCircle size={16} color="#F97316" style={{ flexShrink: 0, marginTop: 1 }} />
            <span>
              <strong>Importante:</strong> Existe uma alternativa de empréstimo sem a necessidade de contratar um <strong>seguro prestamista</strong>: você pode optar pela <strong>alienação de um bem</strong>, como veículos ou imóveis. Para essa opção, será necessário agendar um atendimento presencial em uma de nossas unidades.
            </span>
          </div>
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Escolha como deseja prosseguir:</h2>

        <button type="button" onClick={() => setSelected("seguro")} style={optionStyle("seguro")}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span style={{ width: 38, height: 38, borderRadius: "50%", background: "#DCFCE7", color: "#16A34A", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <ShieldCheck size={20} />
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Seguro Prestamista</div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 4, background: "#DCFCE7", color: "#15803D", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, letterSpacing: 0.3 }}>
                <Award size={10} /> RECOMENDADO
              </span>
            </div>
          </div>
          {[
            "Liberação imediata do valor total",
            "Devolução 100% do valor do seguro",
            "Sem necessidade de avaliação presencial",
          ].map((t) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#111827", marginBottom: 6 }}>
              <CheckCircle2 size={14} color="#16A34A" /> {t}
            </div>
          ))}
          <div style={{ borderTop: "1px solid #E5E7EB", marginTop: 12, paddingTop: 10, fontSize: 12, color: "#6B7280" }}>
            Processo 100% digital • Receba hoje mesmo
          </div>
        </button>

        <button type="button" onClick={() => setSelected("bem")} style={optionStyle("bem")}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span style={{ width: 38, height: 38, borderRadius: "50%", background: "#FFEDD5", color: "#F97316", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <Car size={20} />
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Veículo ou Imóvel como Garantia</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, marginBottom: 6 }}>
            <Clock size={14} color="#F97316" /> Processo pode levar até 7 dias úteis
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, marginBottom: 6 }}>
            <Clock size={14} color="#F97316" /> Necessária avaliação presencial do bem
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, marginBottom: 6 }}>
            <Info size={14} color="#6B7280" /> Documentação adicional exigida
          </div>
          <div style={{ borderTop: "1px solid #E5E7EB", marginTop: 12, paddingTop: 10, fontSize: 12, color: "#6B7280" }}>
            Processo presencial • Sujeito a aprovação
          </div>
        </button>

        <div style={{ marginTop: 18 }}>
          <button
            type="button"
            disabled={!selected}
            onClick={handleContinue}
            style={{ width: "100%", padding: "15px 20px", background: selected ? "#1C68E3" : "#93C5FD", color: "#fff", border: "none", borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: selected ? "pointer" : "not-allowed", boxShadow: selected ? "0 8px 24px rgba(28,104,227,0.28)" : "none", fontFamily: fontStack, minHeight: 52, opacity: selected ? 1 : 0.7 }}
          >
            {selected ? "Continuar" : "Selecione uma opção para continuar"}
          </button>
        </div>
      </main>

      <footer style={{ background: "#0F172A", color: "#CBD5E1", textAlign: "center", padding: "20px 16px", fontSize: 12, lineHeight: 1.6, marginTop: 24 }}>
        © 2026 Bancred LTDA. Todos os direitos reservados.<br />
        CNPJ 41.906.644/0001-20
      </footer>
    </div>
  );
};

export default Garantia;
