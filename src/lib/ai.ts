import { useStore } from './store';

// Hämta första aktiva AI-nyckeln från API Manager
export function getActiveAIKey() {
  const { apiKeys } = useStore.getState() as any;
  const k = (apiKeys || []).find((x:any) => (x.type||'').toLowerCase() === 'ai' && x.active);
  return k || null;
}

export async function callAI(prompt: string, opts?: { model?: string; provider?: 'openai'|'custom'; customEndpoint?: string }) {
  const key = getActiveAIKey();
  if (!key) throw new Error('Ingen aktiv AI-nyckel hittades (lägg till en under API Manager och markera Aktiv).');

  const body = {
    provider: opts?.provider || 'openai',
    model: opts?.model || 'gpt-4o-mini',
    prompt,
    apiKey: key.key,
    customEndpoint: opts?.customEndpoint
  };

  const res = await fetch('/api/ai', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'AI-anrop misslyckades');
  return (data.text as string) || '';
}

// Förifyllda prompts
export function promptDashboardAnalysis() {
  const s = useStore.getState() as any;
  const t = s.totals?.() || { revenue:0, cost:0, profit:0 };
  return `Du är en affärsanalytiker. Analysera kort och konkret (max 6 punkter):
Intäkter: ${t.revenue} kr, Kostnader: ${Math.abs(t.cost)} kr, Resultat: ${t.profit} kr.
Föreslå åtgärder för Q1 för att öka vinstmarginalen. Svara på svenska.`;
}

export function promptSupervisorReport() {
  const s = useStore.getState() as any;
  const t = s.totals?.() || { revenue:0, cost:0, profit:0 };
  const customers = (s.customers||[]).map((c:any)=>`${c.name} (${c.status})`).join(', ');
  return `Skapa en kort AI-rapport på svenska med rubriker:
## Ekonomi
Intäkter: ${t.revenue} kr, Kostnader: ${Math.abs(t.cost)} kr, Resultat: ${t.profit} kr.
## Kunder
${customers}
## Rekommendationer
3-5 konkreta nästa steg för försäljning, kampanj och lager.`;
}

export function promptCRMSummary(customerName:string, notes:string) {
  return `Sammanfatta alla mötesanteckningar för kunden "${customerName}" och ge 3 konkreta nästa steg. Noteringar: ${notes || '—'}. Svara på svenska.`;
}
