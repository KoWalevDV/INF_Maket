// src/renderer/components/MechanicDashboard.jsx
import React from 'react';
import DashboardLayout from './DashboardLayout';
import ModuleCard from './ModuleCard';
import { Activity, BarChart2, Wrench } from 'lucide-react';

export default function MechanicDashboard() {
  const modules = ['Monitoring'];
  return (
    <DashboardLayout role="Механизатор" modules={modules}>
      <div className="grid grid-cols-2 gap-6">
        <ModuleCard
          icon={Activity}
          title="Уведомления о поломках"
          description="Мониторинг CAN-шины"
        />
        <ModuleCard
          icon={Wrench}
          title="Параметры техники"
          description="Цветовая индикация по статусам"
        />
        <ModuleCard
          icon={BarChart2}
          title="Прогноз поломок"
          description="ML-алгоритмы"
        />
      </div>
    </DashboardLayout>
  );
}
