import { create } from "zustand";

export type Employee = { id: string; name: string; role: string; email: string; access?: string[] };
export type Customer = { id:string; name:string; city:string; status:string; ownerId?:string; notes?:string };

type State = {
  page: string; setPage: (p: string) => void;
  employees: Employee[]; customers: Customer[];
  toggleAccess: (empId:string, module:string)=>void;
};

export const useStore = create<State>((set,get)=> ({
  page:"dashboard",
  setPage:(p)=>set({page:p}),
  employees:[
    {id:"emp_1",name:"Jimmie",role:"Sälj",email:"jimmie@example.com",access:["crm","map","chat"]},
    {id:"emp_2",name:"Anna",role:"Ekonomi",email:"anna@example.com",access:["economy"]},
  ],
  customers:[
    {id:"c1",name:"Elon Kista",city:"Stockholm",status:"Potentiell order (20 dagar)",ownerId:"emp_1"},
    {id:"c2",name:"Mekonomen Solna",city:"Solna",status:"Befintlig kund",ownerId:"emp_1"},
  ],
  toggleAccess:(empId,module)=>{
    set(s=>{
      const emps = s.employees.map(e=>{
        if(e.id===empId){
          const access = e.access||[];
          return access.includes(module)
            ? {...e,access:access.filter(a=>a!==module)}
            : {...e,access:[...access,module]};
        }
        return e;
      });
      return {employees:emps};
    });
  }
}));
