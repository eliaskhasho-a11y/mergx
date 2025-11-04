import { create } from "zustand";
import { Customer, Invoice } from "./types";
import { callAI, promptCompanyOverview } from "./ai";

interface State {
  apiKey: string;
  aiBusy: boolean;
  companyAISummary: string;
  customers: Customer[];
  invoices: Invoice[];

  // actions
  setApiKey: (key: string) => void;
  runCompanyAISummary: () => Promise<void>;
  addCustomer: (c: Customer) => void;
  addInvoice: (i: Invoice) => void;
}

export const useStore = create<State>((set, get) => ({
  apiKey: "",
  aiBusy: false,
  companyAISummary: "",
  customers: [],
  invoices: [],

  setApiKey: (key) => set({ apiKey: key }),

  async runCompanyAISummary() {
    set({ aiBusy: true });
    try {
      const text = await callAI(promptCompanyOverview());
      set({ companyAISummary: text });
    } finally {
      set({ aiBusy: false });
    }
  },

  addCustomer: (c) => set((s) => ({ customers: [...s.customers, c] })),
  addInvoice: (i) => set((s) => ({ invoices: [...s.invoices, i] })),
}));
