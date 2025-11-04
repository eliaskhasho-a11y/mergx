export interface Customer {
  id: string;
  name: string;
  status: string;
  notes?: string;
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  type: "income" | "expense";
}
