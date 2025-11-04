import { create } from "zustand";

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

type State = {
  page: string; setPage: (p:string)=>void;

  // Employees (full CRUD + RBAC)
  employees: Employee[];
  addEmployee: (e: Omit<Employee,"id">)=>void;
  updateEmployee: (id:string, patch: Partial<Employee>)=>void;
  removeEmployee: (id:string)=>void;
  toggleAccess: (empId:string, module:string)=>void;

  // Customers + audio
  customers: Customer[]; audio: AudioNote[];
  addAudio: (a: AudioNote)=>void; setCustomerNotes: (id:string, notes:string)=>void;

  // AI Supervisor / Reports
  alerts: { id:string; type:string; msg:string }[];
  reports: Report[];
  generateReport: ()=>void;

  // UI overlays
  reportOpen: boolean; openReport: ()=>void; closeReport: ()=>void;
  kpiExpanded: null | "oms" | "ord" | "kos" | "bm"; setKpiExpanded: (k:State["kpiExpanded"])=>void;
};

export const useStore = create<State>((set, get)=>({
  page: "dashboard",
  setPage: (p)=>set({ page:p }),

  employees: [
    { id:"emp_1", name:"Jimmie", role:"Sälj", email:"jimmie@example.com", phone:"+46 70 111 22 33",
      department:"Sales", salary:42000, revenue:214000, expenses:9200, access:["dashboard","crm","map","chat"] },
    { id:"emp_2", name:"Anna", role:"Ekonomi", email:"anna@example.com",
      department:"Finance", salary:48000, revenue:0, expenses:1200, access:["economy","supervisor"] },
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
    { id:"c1", name:"Elon Kista", city:"Stockholm", status:"Potentiell order (20 dagar)", ownerId:"emp_1", notes:"Vill se demo på USB-C 60 W." },
    { id:"c2", name:"Mekonomen Solna", city:"Solna", status:"Befintlig kund", ownerId:"emp_1" },
    { id:"c3", name:"Power Barkarby", city:"Järfälla", status:"Prospekt", ownerId:"emp_1" },
  ],
  audio: [],
  addAudio: (a)=> set(s=> ({ audio:[...s.audio, a] })),
  setCustomerNotes: (id, notes)=> set(s=> ({ customers: s.customers.map(c=> c.id===id? {...c, notes}: c) })),

  alerts: [
    { id:"a1", type:"DSO", msg:"DSO > 35 dagar — skicka påminnelse" },
    { id:"a2", type:"Margin", msg:"Marginal −1,3 pp — höj pris 3 % på non-braided" },
    { id:"a3", type:"Stock", msg:"Lager under min-nivå för USB-C 60 W — gör inköp" },
  ],
  reports: [],
  generateReport: ()=> {
    const now = new Date().toISOString().slice(0,19).replace("T"," ");
    const emp = get().employees;
    const totalRev = (emp.reduce((a,b)=>a+(b.revenue||0),0)).toLocaleString("sv-SE");
    const totalExp = (emp.reduce((a,b)=>a+(b.expenses||0),0)).toLocaleString("sv-SE");
    const content =
`# MergX — AI-rapport (${now})

## Ekonomi
- Intäkter totalt: **${totalRev} kr**
- Utgifter totalt: **${totalExp} kr**
- Rek: Kampanj 60 W kablar i norra Stockholm (+12 %)

## Kunder (CRM)
- Heta: Elon Kista (demo + offert), Power Barkarby (prospekt)
- Rek: Boka demo och följ upp inom 3 dagar

## Lager
- USB-C 60 W nära min-nivå → föreslå inköp

## Team
- Jimmie driver försäljning; Anna hanterar ekonomi
- Rek: mål +12 % Q1, fokusera på bundling

*Genererad av AI-Supervisor*`;
    set(s=>({ reports:[...s.reports, { id:"rep_"+Math.random().toString(36).slice(2,8), createdAt: now, title:"AI-rapport "+now, content }] }));
    set({ reportOpen:true });
  },

  reportOpen: false,
  openReport: ()=> set({ reportOpen:true }),
  closeReport: ()=> set({ reportOpen:false }),

  kpiExpanded: null,
  setKpiExpanded: (k)=> set({ kpiExpanded:k }),
}));
