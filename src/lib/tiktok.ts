// Helper para disparar eventos do TikTok Pixel
declare global {
  interface Window {
    ttq?: {
      track: (event: string, params?: Record<string, unknown>, options?: { event_id?: string }) => void;
      page: () => void;
      identify: (params: Record<string, unknown>) => void;
    };
  }
}

export type TikTokEvent =
  | "ViewContent"
  | "ClickButton"
  | "Lead"
  | "InitiateCheckout"
  | "AddPaymentInfo"
  | "CompletePayment"
  | "CompleteRegistration"
  | "Contact"
  | "SubmitForm";

function genEventId() {
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function trackTikTok(
  event: TikTokEvent,
  params: Record<string, unknown> = {},
  eventId: string = genEventId(),
) {
  try {
    if (typeof window !== "undefined" && window.ttq) {
      window.ttq.track(event, params, { event_id: eventId });
    }
  } catch (e) {
    console.warn("TikTok pixel track failed", e);
  }
  return eventId;
}

export function identifyTikTok(params: { email?: string; phone_number?: string; external_id?: string }) {
  try {
    if (typeof window !== "undefined" && window.ttq) {
      window.ttq.identify(params);
    }
  } catch (e) {
    console.warn("TikTok pixel identify failed", e);
  }
}
