import { create } from "zustand";
import type { ApiKey, ApiLog } from "./api";
import { testKey, sendShipment, sendFinance, sendWhatsApp } from "./api";

/* ==== Types (som 8.70) ==== */
export type Employee = {
  id: string; name: string; role: string; email: string;
  phone?: string; salary?: number; department?: string;
  revenue?: number; expenses?: number;
  access?: string[];
};
export type Customer = {
  id: string; name: string; city: string; status: string; ownerId?: string; notes?: string;
};
export type AudioNote = { id:string; customerId:string; fileName:string; duration?:string; summary?:string };
export type Report = { id:string; createdAt:string; title:string; content:string };
export type Receipt = {
  id:string; date:string; supplier:string; amount:number; vat:number; category:string;
  status:'Föreslagen'|'Registrerad'|'Ignorerad'; fileName?:string;
};

/* ==== State ==== */
type State = {
  page: string; setPage: (p:string)=>void;

  // Employees
  employees: Employee[];
  addEmployee: (e: Omit<Employee,"id">)=>void;
  updateEmployee: (id:string, patch: Partial<Employee>)=>void;
  removeEmployee: (id:string)=>void;
  toggleAccess: (empId:string, module:string)=>void;

  // Customers + audio
  customers: Customer[]; audio: AudioNote[];
  addAudio: (a: AudioNote)=>void; summarizeCustomerAudio: (customerId:string)=>string;
  setCustomerNotes: (id:string, notes:string)=>void;

  // Economy
  economyRows: { id:number; name:string; amount:number; type:'Inkomst'|'Utgift'; date:string }[];
  totals: ()=>{ revenue:number; cost:number; profit:number };

  // Receipts (OCR)
  receipts: Receipt[];
  addReceipt: (r:Receipt)=>void; updateReceipt:(id:string,patch:Partial<Receipt>)=>void;
  ocrExtract: (fileName:string)=>Receipt;

  // Reports
  alerts: { id:string; type:string; msg:string }[];
  reports: Report[]; generateReport: ()=>void;
  reportOpen: boolean; openReport: ()=>void; closeReport: ()=>void;

  // KPI
  kpiExpanded: null | "oms" | "ord" | "kos" | "bm"; setKpiExpanded: (k:State["kpiExpanded"])=>void;

  // API Keys & Logs
  apiKeys: ApiKey[];
  apiLogs: ApiLog[];
  addApiKey: (k: Omit<ApiKey,'id'|'createdAt'|'active'> & Partial<Pick<ApiKey,'active'>>) => void;
  updateApiKey: (id:string, patch: Partial<ApiKey>)=>void;
  removeApiKey: (id:string)=>void;
  logApi: (entry: Omit<ApiLog,'id'|'time'>)=>void;
  testApiKey: (id:string)=>Promise<void>;
  actionShipment: (from:string, to:string, weight:number)=>Promise<string>;
  actionFinanceSellInvoice: (invoiceId:string, amount:number)=>Promise<string>;
  actionWhatsApp: (to:string, message:string)=>Promise<string>;
};

export const useStore = create<State>((set, get)=>({
  page: "dashboard",
  setPage: (p)=>set({ page:p }),

  employees: [
    { id:"emp_1", name:"Jimmie", role:"Sälj", email:"jimmie@example.com", phone:"+46 70 111 22 33",
      department:"Sales", salary:42000, revenue:214000, expenses:9200, access:["dashboard","crm","map","chat","economy","files","api"] },
    { id:"emp_2", name:"Anna", role:"Ekonomi", email:"anna@example.com",
      department:"Finance", salary:48000, revenue:0, expenses:1200, access:["economy","supervisor","settings","files","api"] },
  ],
  addEmployee: (e)=> set(s=>({ employees:[...s.employees, { ...e, id:"emp_"+Math.random().toString(36).slice(2,8) }] })),
  updateEmployee: (id, patch)=> set(s=>({ employees: s.employees.map(x=> x.id===id ? {...x, ...patch} : x) })),
  removeEmployee: (id)=> set(s=>({ employees: s.employees.filter(x=> x.id!==id) })),
  toggleAccess: (empId,module)=> set(s=>{
    const employees = s.employees.map(e=>{
      if(e.id!==empId) return e;
      const acc = e.access||[];
      return acc.includes(module) ? {...e, access: acc.filter(a=>a!==module)} : {...e, access:[...acc, module]};
    });
    return { employees };
  }),

  customers: [
    { id:"c1", name:"Elon Märsta", city:"Sigtuna", status:"Potentiell order (14 dagar)", ownerId:"emp_1", notes:"Vill testa 60 W." },
    { id:"c2", name:"Mekonomen Solna", city:"Solna", status:"Befintlig kund", ownerId:"emp_1" },
  ],
  audio: [],
  addAudio: (a)=> set(s=> ({ audio:[...s.audio, a] })),
  summarizeCustomerAudio: (customerId)=>{
    const items = get().audio.filter(a=>a.customerId===customerId);
    if(!items.length) return "Inga ljudanteckningar ännu.";
    return `AI-sammanfattning (${items.length} möten): Fokus på USB-C 60 W, uppföljning inom 14 dagar, föreslå demo + bundling.`;
  },
  setCustomerNotes: (id,stringNotes)=> set(s=> ({ customers: s.customers.map(c=> c.id===id? {...c, notes:stringNotes}: c) })),

  economyRows: [
    { id:1, name:"Order #4502", amount:6400, type:"Inkomst", date:"2025-11-03" },
    { id:2, name:"Faktura #1123", amount:-900, type:"Utgift", date:"2025-11-02" },
  ],
  totals: ()=>{
    const rows = get().economyRows;
    const revenue = rows.filter(r=>r.amount>0).reduce((a,b)=>a+b.amount,0);
    const cost = rows.filter(r=>r.amount<0).reduce((a,b)=>a+b.amount,0);
    return { revenue, cost, profit: revenue + cost };
  },

  receipts: [],
  addReceipt: (r)=> set(s=>({ receipts:[...s.receipts, r] })),
  updateReceipt: (id,patch)=> set(s=>({ receipts: s.receipts.map(x=>x.id===id? {...x,...patch}:x) })),
  ocrExtract: (fileName)=>{
    return {
      id: "rec_"+Math.random().toString(36).slice(2,8),
      fileName,
      supplier: "Elgiganten AB",
      date: new Date().toISOString().slice(0,10),
      amount: 1290, vat: 258, category: "Inköp / Tillbehör",
      status: "Föreslagen"
    };
  },

  alerts: [
    { id:"a1", type:"DSO", msg:"DSO > 35 dagar — skicka påminnelse" },
    { id:"a2", type:"Margin", msg:"Marginal −1,0 pp — höj pris 3 % på non-braided" },
    { id:"a3", type:"Stock", msg:"USB-C 60 W nära min-nivå — planera inköp" },
  ],
  reports: [],
  generateReport: ()=> {
    const now = new Date().toISOString().slice(0,19).replace("T"," ");
    const tot = get().totals();
    const content =
`# AI-rapport ${now}

## Ekonomi
- Intäkter: **${tot.revenue.toLocaleString('sv-SE')} kr**
- Kostnader: **${Math.abs(tot.cost).toLocaleString('sv-SE')} kr**
- Resultat: **${tot.profit.toLocaleString('sv-SE')} kr**

## Kunder
- Elon Märsta (demo + offert), Mekonomen Solna (befintlig)

## Rekommendationer
- Kampanj Norra Stockholm, bundla kablar 60 W
- Minska inköp av långsamma artiklar 8 % nästa kvartal

*Genererad av MergX AI*`;
    set(s=>({ reports:[...s.reports, { id:"rep_"+Math.random().toString(36).slice(2,8), createdAt:now, title:"AI-rapport "+now, content }], reportOpen:true }));
  },
  reportOpen:false, openReport:()=>set({reportOpen:true}), closeReport:()=>set({reportOpen:false}),
  kpiExpanded:null, setKpiExpanded:(k)=>set({kpiExpanded:k}),

  // API Keys & Logs
  apiKeys: [
    { id:'k1', name:'OpenAI', key:'sk-***', type:'AI', description:'LLM', createdAt:new Date().toISOString(), active:true },
    { id:'k2', name:'WhatsApp (mock)', key:'wa-***', type:'Comms', description:'Meddelanden', createdAt:new Date().toISOString(), active:true }
  ],
  apiLogs: [],
  addApiKey: (k)=> set(s=>({
    apiKeys: [...s.apiKeys, {
      id: 'key_'+Math.random().toString(36).slice(2,8),
      createdAt: new Date().toISOString(),
      active: k.active ?? true,
      ...k
    }]
  })),
  updateApiKey: (id, patch)=> set(s=>({ apiKeys: s.apiKeys.map(x=> x.id===id? {...x,...patch}: x) })),
  removeApiKey: (id)=> set(s=>({ apiKeys: s.apiKeys.filter(x=>x.id!==id) })),
  logApi: (e)=> set(s=>({
    apiLogs: [
      ...s.apiLogs.slice(-9),
      { id:'log_'+Math.random().toString(36).slice(2,8), time:new Date().toISOString(), ...e }
    ]
  })),
  testApiKey: async (id)=>{
    const key = get().apiKeys.find(k=>k.id===id);
    if(!key) return;
    try{
      const res = await testKey(key.name);
      get().logApi({ provider:key.name, action:'test', status:'ok', latencyMs:res.latency, message:res.message });
    }catch(err:any){
      get().logApi({ provider:key?.name||'unknown', action:'test', status:'error', latencyMs:0, message:String(err?.message||err) });
    }
  },
  actionShipment: async (from,to,weight)=>{
    const res = await sendShipment({from,to,weight});
    get().logApi({ provider:'Shipping', action:'book', status:'ok', latencyMs:res.latency, message:`Tracking: ${res.tracking}` });
    return res.tracking;
  },
  actionFinanceSellInvoice: async (invoiceId,amount)=>{
    const res = await sendFinance({invoiceId,amount});
    get().logApi({ provider:'Finance', action:'sell-invoice', status:'ok', latencyMs:res.latency, message:res.result });
    return res.result;
  },
  actionWhatsApp: async (to,message)=>{
    const res = await sendWhatsApp({to,message});
    get().logApi({ provider:'WhatsApp', action:'send', status:'ok', latencyMs:res.latency, message:res.result });
    return res.result;
  },
}));
