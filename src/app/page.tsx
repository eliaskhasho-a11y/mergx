// ...imports kvar som i 8.60
import Files from '@/components/Files';
import ApiManager from '@/components/ApiManager';

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
      case 'api': return <ApiManager/>;
      default: return <Dashboard/>;
    }
  };
  // ...resten oförändrat
}
