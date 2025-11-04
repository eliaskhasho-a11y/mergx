export type ApiKey = {
  id: string; name: string; key: string; type?: string; description?: string;
  createdAt: string; active: boolean;
};
export type ApiLog = {
  id: string; time: string; provider: string; action: string;
  status: 'ok'|'error'; latencyMs: number; message: string;
};

export async function mockLatency(min=120,max=380){
  const t = Math.round(min + Math.random()*(max-min));
  await new Promise(r=>setTimeout(r,t));
  return t;
}
export async function testKey(provider:string){
  const latency = await mockLatency();
  return { ok:true, latency, message:`${provider} anslutning OK` };
}
export async function sendShipment(payload: any){
  const latency = await mockLatency();
  return { ok:true, latency, tracking:`TRK-${Math.random().toString(36).slice(2,8).toUpperCase()}` };
}
export async function sendFinance(payload: any){
  const latency = await mockLatency();
  return { ok:true, latency, result:"Faktura såld / finansierad (mock)" };
}
export async function sendWhatsApp(payload: any){
  const latency = await mockLatency();
  return { ok:true, latency, result:"Meddelande skickat (mock)" };
}
