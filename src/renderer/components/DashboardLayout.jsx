
import React from 'react';
import Sidebar from './Sidebar';
import { fields } from '../data/fields';

export default function DashboardLayout({ role, modules, active, setActive,selectedField, setSelectedField, children }) {
  const roleNames = {
        Agronomist:      'Агроном',
        Analyst:         'Аналитик',
        Manager:         'Механизатор',
        DroneOperator:   'Оператор дронов',
        Mechanic:        'Мех',
        SoilSpecialist:  'Почвовед',
        Guest:           'Гость'
      };
      const russianRole = roleNames[role] || role;
  return (
    <div className="flex h-full font-sans">
      <Sidebar modules={modules} active={active} setActive={setActive} />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-primary-700">Роль: {russianRole}</h1>
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
          {children}
        </main>

        <footer className="bg-white px-6 py-2 text-sm text-gray-500">
          © Агрохолдинг «Степь», 2025
        </footer>
      </div>
    </div>
  );
}
