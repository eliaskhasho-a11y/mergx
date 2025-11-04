import { useStore } from "./store";

// 🔹 Standardanrop till Hugging Face API
export async function callAI(prompt: string, options?: { key?: string }) {
  const state = useStore.getState();
  const key = options?.key || state.apiKey || "";
  if (!key) return "Ingen API-nyckel angiven.";

  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, key }),
    });
    const data = await res.json();
    return data.text || "Inget svar från AI.";
  } catch (e) {
    console.error("AI-fel:", e);
    return "Kunde inte nå AI-tjänsten.";
  }
}

// 🔹 Dashboard-sammanfattning
export function promptCompanyOverview() {
  const s = useStore.getState() as any;
  const kpis = [
    `Omsättning: 125 000 kr`,
    `Kostnader: 73 400 kr`,
    `Resultat: 51 600 kr`,
    `Kunder: 312 st`
  ].join(" | ");

  return `Du är en svensk företagscoach. Gör en kort, tydlig översikt (max 8 punkter) om företagsläget.
Data: ${kpis}.
Ge konkreta råd för ekonomi, försäljning och kunder de kommande 2 veckorna.`;
}
