
import React, { useEffect, useState } from 'react';
import { fields } from './data/fields';
import DashboardLayout from './components/DashboardLayout';
import SecurityModule from './components/SecurityModule';
import MonitoringModule from './components/MonitoringModule';
import AutoMonitoringModule from './components/AutoMonitoringModule';
import ForecastModule from './components/ForecastModule';
import FieldMapModule from './components/FieldMapModule';
import MechanicDashboard from './components/MechanicDashboard';
import AgronomistDashboard from './components/AgronomistDashboard';
import DroneOperatorDashboard from './components/DroneOperatorDashboard';
import DroneFeedModule from './components/DroneFeedModule'

 export default function App({ role }) {

  const [selectedField, setSelectedField] = useState(Object.keys(fields)[0]);

const access = {
   Agronomist:     ['AutoMonitoring', 'Forecast','Agronomist', 'FieldMap'],
   Analyst:        ['Forecast', 'Security',    'FieldMap'],
   Manager:        ['Monitoring', 'Forecast',  'FieldMap'],
   DroneOperator:  ['Security','DroneOperator','DroneFeed', 'FieldMap'],
   Mechanic:       ['Monitoring','Mechanic', 'FieldMap'],
   SoilSpecialist: ['AutoMonitoring', 'FieldMap'],
   Guest:          ['FieldMap'],
 };
 const modules = access[role] || ['FieldMap'];
 const [active, setActive] = useState(modules[0] || '');

 useEffect(() => {
   if (modules.length) setActive(modules[0]);
 }, [role]);

  // const renderModule = () => {
  //   switch (active) {
  //     case 'Security':       return <SecurityModule />;
  //     case 'Monitoring':     return <MonitoringModule />;
  //     case 'AutoMonitoring': return <AutoMonitoringModule />;
  //     case 'Forecast':       return <ForecastModule />;
  //     case 'Mechanic':       return <MechanicDashboard />;
  //     case 'Mechanic':       return <AgronomistDashboard />;
  //     case 'Mechanic':       return <DroneOperatorDashboard />;
  //    case 'FieldMap':       return <FieldMapModule />;
  //     default:               return <p>Нет доступных модулей для роли: {role}</p>;
  //   }
  // };
   const renderModule = () => {
       const props = { fieldKey: selectedField };
       switch (active) {
         case 'Security':       return <SecurityModule {...props} />;
         case 'Monitoring':     return <MonitoringModule {...props} />;
         case 'AutoMonitoring': return <AutoMonitoringModule {...props} />;
         case 'Forecast':       return <ForecastModule />;
         case 'Mechanic':       return <MechanicDashboard />;
         case 'Agronomist':     return <AgronomistDashboard />;
         case 'DroneOperator':  return <DroneOperatorDashboard />;
         case 'DroneFeed':      return <DroneFeedModule />;
         case 'FieldMap':       return <FieldMapModule {...props} />;
         default:               return <p>Нет доступных модулей для роли: {role}</p>;
       }
    };

  return (
   <DashboardLayout
     role={role}
     modules={modules}
     active={active}
    setActive={setActive}
    selectedField={selectedField}
    setSelectedField={setSelectedField}
   >
     {renderModule()}
   </DashboardLayout>
  );
}
