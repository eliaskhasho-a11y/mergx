
import { create } from "zustand";
export type Employee = { id: string; name: string; role: string; email: string; phone?: string; revenue?: number; expenses?: number };
type State = {
  page: string; setPage: (p: string) => void;
  range: "day"|"week"|"month"; setRange: (r: "day"|"week"|"month") => void;
  employees: Employee[];
  addEmployee: (e: Employee) => void; updateEmployee: (id: string, patch: Partial<Employee>) => void; removeEmployee: (id: string) => void;
};
export const useStore = create<State>((set) => ({
  page: "dashboard", setPage: (p) => set({ page: p }),
  range: "day", setRange: (r) => set({ range: r }),
  employees: [
    { id:"emp_1", name:"Jimmie", role:"Sälj", email:"jimmie@example.com", phone:"+46 70 111 22 33", revenue:214000, expenses:9200 },
    { id:"emp_2", name:"Anna", role:"Ekonomi", email:"anna@example.com", revenue:0, expenses:1200 },
  ],
  addEmployee: (e) => set(s => ({ employees: [...s.employees, e] })),
  updateEmployee: (id, patch) => set(s => ({ employees: s.employees.map(x => x.id===id ? { ...x, ...patch } : x) })),
  removeEmployee: (id) => set(s => ({ employees: s.employees.filter(x => x.id!==id) })),
}));
