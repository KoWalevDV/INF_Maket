// src/renderer/components/DroneOperatorDashboard.jsx
import React from 'react';
import DashboardLayout from './DashboardLayout';
import ModuleCard from './ModuleCard';
import { ScanEye, AlertCircle, Bell, FileText } from 'lucide-react';
export default function DroneOperatorDashboard() {
  const modules = ['Security'];  // Sidebar нужно прокинуть те же модули
  return (
    <DashboardLayout role="Оператор дронов" modules={modules}>
      <div className="grid grid-cols-2 gap-6">
        <ModuleCard
          icon={ScanEye}
          title="Управление полётами"
          description="Статус дронов и маршруты"
        />
        <ModuleCard
          icon={AlertCircle}
          title="Аномалии и хищения"
          description="AI-детекция YOLO"
        />
        <ModuleCard
          icon={Bell}
          title="Уведомления"
          description="Живые оповещения о сбоях"
        />
        <ModuleCard
          icon={FileText}
          title="Отчёты безопасности"
          description="PDF, графики и логи"
        />
      </div>
    </DashboardLayout>
  );
}
