import { create } from "zustand";

/* ==== Types ==== */
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

  // Employees (CRUD + RBAC)
  employees: Employee[];
  addEmployee: (e: Omit<Employee,"id">)=>void;
  updateEmployee: (id:string, patch: Partial<Employee>)=>void;
  removeEmployee: (id:string)=>void;
  toggleAccess: (empId:string, module:string)=>void;

  // Customers + audio notes
  customers: Customer[]; audio: AudioNote[];
  addAudio: (a: AudioNote)=>void; summarizeCustomerAudio: (customerId:string)=>string;
  setCustomerNotes: (id:string, notes:string)=>void;

  // Economy (rows for demo)
  economyRows: { id:number; name:string; amount:number; type:'Inkomst'|'Utgift'; date:string }[];
  receipts: Receipt[];
  addReceipt: (r:Receipt)=>void; updateReceipt:(id:string,patch:Partial<Receipt>)=>void;
  ocrExtract: (fileName:string)=>Receipt;

  // AI Supervisor / Reports
  alerts: { id:string; type:string; msg:string }[];
  reports: Report[]; generateReport: ()=>void;
  reportOpen: boolean; openReport: ()=>void; closeReport: ()=>void;

  // KPI overlay
  kpiExpanded: null | "oms" | "ord" | "kos" | "bm"; setKpiExpanded: (k:State["kpiExpanded"])=>void;

  // Finance computed
  totals: ()=>{ revenue:number; cost:number; profit:number };
};

/* ==== Store ==== */
export const useStore = create<State>((set, get)=>({
  page: "dashboard",
  setPage: (p)=>set({ page:p }),

  employees: [
    { id:"emp_1", name:"Jimmie", role:"Sälj", email:"jimmie@example.com", phone:"+46 70 111 22 33",
      department:"Sales", salary:42000, revenue:214000, expenses:9200, access:["dashboard","crm","map","chat","economy","files"] },
    { id:"emp_2", name:"Anna", role:"Ekonomi", email:"anna@example.com",
      department:"Finance", salary:48000, revenue:0, expenses:1200, access:["economy","supervisor","settings","files"] },
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
    return `AI-sammanfattning (${items.length} möten): Fokus på USB-C 60 W, återkoppling inom 14 dagar, föreslå demo + bundling.`;
  },
  setCustomerNotes: (id, notes)=> set(s=> ({ customers: s.customers.map(c=> c.id===id? {...c, notes}: c) })),

  economyRows: [
    { id:1, name:"Order #4502", amount:6400, type:"Inkomst", date:"2025-11-03" },
    { id:2, name:"Faktura #1123", amount:-900, type:"Utgift", date:"2025-11-02" },
  ],

  receipts: [],
  addReceipt: (r)=> set(s=>({ receipts:[...s.receipts, r] })),
  updateReceipt: (id,patch)=> set(s=>({ receipts: s.receipts.map(x=>x.id===id? {...x,...patch}:x) })),
  ocrExtract: (fileName)=>{
    // Mockad OCR: generera realistiska värden
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

## Ekonomi (AI)
- Intäkter: **${tot.revenue.toLocaleString('sv-SE')} kr**
- Kostnader: **${Math.abs(tot.cost).toLocaleString('sv-SE')} kr**
- Resultat: **${tot.profit.toLocaleString('sv-SE')} kr**

## Kunder
- Elon Märsta (demo + offert), Mekonomen Solna (befintlig)

## Rekommendationer
- Kampanj Norra Stockholm, bundla kablar 60 W
- Minska inköp av långsamma artiklar 8 % nästa kvartal

*Genererad av AI-Supervisor*`;
    set(s=>({ reports:[...s.reports, { id:"rep_"+Math.random().toString(36).slice(2,8), createdAt:now, title:"AI-rapport "+now, content }], reportOpen:true }));
  },

  reportOpen:false, openReport:()=>set({reportOpen:true}), closeReport:()=>set({reportOpen:false}),

  kpiExpanded:null, setKpiExpanded:(k)=>set({kpiExpanded:k}),

  totals: ()=>{
    const rows = get().economyRows;
    const revenue = rows.filter(r=>r.amount>0).reduce((a,b)=>a+b.amount,0);
    const cost = rows.filter(r=>r.amount<0).reduce((a,b)=>a+b.amount,0);
    return { revenue, cost, profit: revenue + cost };
  }
}));
