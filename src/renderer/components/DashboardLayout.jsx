import React from 'react';
import Sidebar from './Sidebar';
import { fields } from '../data/fields';
import ReportGenerator from './ReportGenerator';
import { Cloud, Sun, CloudRain, CloudSnow } from 'lucide-react';

// Компонент погоды
const WeatherWidget = () => {
  // Имитация данных о погоде
  const weather = {
    temperature: '+18°C',
    condition: 'Облачно',
    forecast: [
      { day: 'Сегодня', temp: '+18°C', icon: Cloud },
      { day: 'Завтра', temp: '+20°C', icon: Sun },
      { day: 'Послезавтра', temp: '+15°C', icon: CloudRain }
    ]
  };

  return (
    <div className="flex items-center space-x-4 bg-blue-50 rounded-lg px-4 py-2">
      <div className="flex items-center space-x-2">
        <Cloud className="w-6 h-6 text-blue-500" />
        <div>
          <div className="text-lg font-medium text-blue-700">{weather.temperature}</div>
          <div className="text-sm text-blue-600">{weather.condition}</div>
        </div>
      </div>
      <div className="h-8 w-px bg-blue-200"></div>
      <div className="flex space-x-4">
        {weather.forecast.map((day, index) => {
          const Icon = day.icon;
          return (
            <div key={index} className="flex flex-col items-center">
              <Icon className="w-5 h-5 text-blue-500" />
              <span className="text-xs text-blue-600">{day.day}</span>
              <span className="text-sm font-medium text-blue-700">{day.temp}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function DashboardLayout({ role, modules, active, setActive, selectedField, setSelectedField, children }) {
  const roleNames = {
    Agronomist: 'Агроном',
    Analyst: 'Аналитик',
    Manager: 'Механизатор',
    DroneOperator: 'Оператор дронов',
    Mechanic: 'Мех',
    SoilSpecialist: 'Почвовед',
    Guest: 'Гость'
  };
  const russianRole = roleNames[role] || role;

  // Определяем доступные шаблоны отчетов в зависимости от роли
  const getReportTemplates = () => {
    switch (role) {
      case 'DroneOperator':
        return ['monitoring', 'field_processing'];
      case 'Agronomist':
        return ['monitoring_summary', 'field_condition', 'forecast'];
      case 'Manager':
        return ['equipment', 'maintenance', 'forecast_efficiency'];
      default:
        return [];
    }
  };

  return (
    <div className="flex h-full font-sans">
      <Sidebar modules={modules} active={active} setActive={setActive} />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-primary-700">Роль: {russianRole}</h1>
          <div className="flex-1 flex justify-center px-8">
            <WeatherWidget />
          </div>
          <div className="space-x-4">
            <select
              value={selectedField}
              onChange={e => setSelectedField(e.target.value)}
              className="border rounded p-2"
            >
              {Object.keys(fields).map(f => (
                <option key={f}>{f}</option>
              ))}
            </select>
            <button
              onClick={() => window.electronAPI.logout()}
              className="text-gray-600 hover:text-gray-800"
            >
              Выйти
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="p-6 bg-gray-50 flex-1 flex flex-col overflow-auto">
          {active === 'ReportGenerator' ? (
            <ReportGenerator userRole={role} />
          ) : (
            children
          )}
        </main>

        <footer className="bg-white px-6 py-2 text-sm text-gray-500">
          © Агрохолдинг «Степь», 2025
        </footer>
      </div>
    </div>
  );
}
