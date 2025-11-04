// ...imports kvar som i 8.60
import Files from '@/components/Files';

export default function Home(){
  const page = useStore(s=>s.page);
  const render = ()=>{
    switch(page){
      case 'crm': return <CRM/>;
      case 'map': return <Map/>;
      case 'supervisor': return <Supervisor/>;
      case 'employees': return <Employees/>;
      case 'settings': return <Settings/>;
      case 'economy': return <Economy/>;
      case 'chat': return <Chat/>;
      case 'files': return <Files/>;
      default: return <Dashboard/>;
    }
  };
  // ...resten oförändrat
}
