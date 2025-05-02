import React from 'react';
import { Home, Database,ScanEye, BarChart2, ShieldAlert, MapPin } from 'lucide-react';

const navItems = [
  { key: 'Security', label: 'Безопасность', icon: ShieldAlert },
  { key: 'Monitoring', label: 'Мониторинг', icon: Home },
  { key: 'AutoMonitoring', label: 'Автомониторинг', icon: Database },
  { key: 'Forecast', label: 'Прогноз', icon: BarChart2 },
  { key: 'DroneFeed', label: 'Дроны', icon: ScanEye },
  { key: 'FieldMap',     label: 'Карта поля',      icon: MapPin },
];

export default function Sidebar({ modules, active, setActive }) {
  return (
    <nav className="w-72 bg-white border-r border-gray-200 p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8 text-primary-700">ИИС Agro AI</h2>
      <ul className="space-y-4 flex-1">
        {navItems
          .filter(i => modules.includes(i.key))
          .map(({ key, label, icon: Icon }) => (
            <li key={key}>
              <button
                onClick={() => setActive(key)}
                className={`w-full flex items-center p-3 rounded-lg ${
                  active === key
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                } transition`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {label}
              </button>
            </li>
        ))}
      </ul>
    </nav>
  );
}

