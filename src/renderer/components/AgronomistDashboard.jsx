// src/renderer/components/AgronomistDashboard.jsx
import React from 'react';
import DashboardLayout from './DashboardLayout';
import ModuleCard from './ModuleCard';
import { Leaf, Thermometer, Table, ClipboardList } from 'lucide-react';

export default function AgronomistDashboard() {
  const modules = ['AutoMonitoring', 'Forecast'];
  return (
    <DashboardLayout role="Главный агроном / Почвовед" modules={modules}>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Автоматический мониторинг</h2>
      <div className="grid grid-cols-2 gap-6 mb-8">
        <ModuleCard
          icon={Leaf}
          title="Состояние растений"
          description="NDVI, тепловые карты"
        />
        <ModuleCard
          icon={Thermometer}
          title="Данные с датчиков"
          description="Влажность, температура"
        />
        <ModuleCard
          icon={Table}
          title="Таблицы и графики"
          description="Интерактивные визуализации"
        />
        <ModuleCard
          icon={ClipboardList}
          title="Журнал работ"
          description="История и задачи"
        />
      </div>

      <h2 className="text-xl font-semibold text-gray-700 mb-4">Прогнозирование</h2>
      <div className="grid grid-cols-2 gap-6">
        <ModuleCard
          icon={BarChart2}
          title="Прогноз урожайности"
          description="LSTM-модели"
        />
        <ModuleCard
          icon={AlertCircle}
          title="Прогноз рисков"
          description="Погодные факторы"
        />
        <ModuleCard
          icon={FileText}
          title="Рекомендации"
          description="Авто-формирование"
        />
        <ModuleCard
          icon={FileText}
          title="Отчёты аналитики"
          description="PDF/Excel"
        />
      </div>
    </DashboardLayout>
  );
}
