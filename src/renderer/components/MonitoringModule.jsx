// src/renderer/components/MonitoringModule.jsx
import React from 'react';
import { Wrench, AlertTriangle, Calendar } from 'lucide-react';

const faults = [
  { id: 1, machine: 'Трактор #5', issue: 'Датчик давления', time: '2025-05-03 09:30' },
  { id: 2, machine: 'Комбайн #2', issue: 'Перегрев радиатора', time: '2025-05-03 10:45' },
];

// Расширенная CAN-таблица из 5 строк
const canTable = [
  {
    id: 'CAN1',
    machine: 'Трактор #5',
    oilLevel: '4.2 л',
    pressure: '2.1 бар',
    temp: '75 °C',
    fluid: '1.8 л',
    fuel: '120 л',
    avgSpeed: '12 км/ч',
    engineLoad: '65 %',
    battery: '24.5 В',
    gps: 'OK',
    errorCount: 0
  },
  {
    id: 'CAN2',
    machine: 'Комбайн #2',
    oilLevel: '3.8 л',
    pressure: '2.4 бар',
    temp: '80 °C',
    fluid: '2.0 л',
    fuel: '150 л',
    avgSpeed: '8 км/ч',
    engineLoad: '72 %',
    battery: '24.0 В',
    gps: 'OK',
    errorCount: 1
  },
  {
    id: 'CAN3',
    machine: 'Опрыскиватель #1',
    oilLevel: '2.5 л',
    pressure: '1.8 бар',
    temp: '70 °C',
    fluid: '1.2 л',
    fuel: '90 л',
    avgSpeed: '15 км/ч',
    engineLoad: '55 %',
    battery: '25.1 В',
    gps: 'OK',
    errorCount: 0
  },
  {
    id: 'CAN4',
    machine: 'Бульдозер #4',
    oilLevel: '5.0 л',
    pressure: '2.5 бар',
    temp: '78 °C',
    fluid: '2.5 л',
    fuel: '200 л',
    avgSpeed: '6 км/ч',
    engineLoad: '80 %',
    battery: '23.8 В',
    gps: 'Откл.',
    errorCount: 2
  },
  {
    id: 'CAN5',
    machine: 'Плуг #3',
    oilLevel: '3.0 л',
    pressure: '2.0 бар',
    temp: '73 °C',
    fluid: '1.5 л',
    fuel: '60 л',
    avgSpeed: '10 км/ч',
    engineLoad: '60 %',
    battery: '24.9 В',
    gps: 'OK',
    errorCount: 0
  }
];

const tasks = [
  {
    id: 1,
    received: '2025-05-03 08:00',
    sector: 'Сектор 2',
    task: 'Обработка почвы',
    start: '2025-05-03 09:00',
    end:   '2025-05-03 11:30'
  },
  {
    id: 2,
    received: '2025-05-03 07:45',
    sector: 'Сектор 5',
    task: 'Полив культур',
    start: '2025-05-03 08:00',
    end:   '2025-05-03 10:00'
  }
];

export default function MonitoringModule() {
  return (
    <div className="space-y-8">

      {/* Уведомления о поломках */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Уведомления</h2>
        <ul className="divide-y divide-gray-200">
          {faults.map(f => (
            <li key={f.id} className="py-2 flex justify-between">
              <span>
                <Wrench className="inline w-5 h-5 mr-1 text-red-500" />
                {f.machine}
              </span>
              <span>{f.issue} — {f.time}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Параметры CAN-шины */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Параметры CAN-шины</h2>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-1">CAN ID</th>
                <th className="px-2 py-1">Техника</th>
                <th className="px-2 py-1">Ур. масла</th>
                <th className="px-2 py-1">Давл.</th>
                <th className="px-2 py-1">Темп.</th>
                <th className="px-2 py-1">Ур. жидк.</th>
                <th className="px-2 py-1">Топливо</th>
                <th className="px-2 py-1">Ср. скор.</th>
                <th className="px-2 py-1">Нагрузка</th>
                <th className="px-2 py-1">АКБ (В)</th>
                <th className="px-2 py-1">GPS</th>
                <th className="px-2 py-1">Ошибки</th>
              </tr>
            </thead>
            <tbody>
              {canTable.map(row => (
                <tr key={row.id} className="border-t">
                  <td className="px-2 py-1">{row.id}</td>
                  <td className="px-2 py-1">{row.machine}</td>
                  <td className="px-2 py-1">{row.oilLevel}</td>
                  <td className="px-2 py-1">{row.pressure}</td>
                  <td className="px-2 py-1">{row.temp}</td>
                  <td className="px-2 py-1">{row.fluid}</td>
                  <td className="px-2 py-1">{row.fuel}</td>
                  <td className="px-2 py-1">{row.avgSpeed}</td>
                  <td className="px-2 py-1">{row.engineLoad}</td>
                  <td className="px-2 py-1">{row.battery}</td>
                  <td className="px-2 py-1">{row.gps}</td>
                  <td className="px-2 py-1">{row.errorCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Прогнозирование поломок
      <section>
        <h2 className="text-xl font-semibold mb-4">Прогнозирование поломок</h2>
        <div className="bg-blue-100 p-4 rounded-lg flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-blue-600" />
          <span>Скорее всего, датчик давления выйдет из строя через 12 часов</span>
        </div>
      </section> */}

      {/* Задачи на работы */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Задачи на выполнение работ</h2>
        {tasks.map(t => (
          <div key={t.id} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">
                <Calendar className="inline w-4 h-4 mr-1" />
                Получена: {t.received}
              </p>
              <p><strong>Сектор:</strong> {t.sector}</p>
              <p><strong>Задача:</strong> {t.task}</p>
            </div>
            <div className="text-right">
              <p className="text-sm"><strong>Начало:</strong> {t.start}</p>
              <p className="text-sm"><strong>Окончание:</strong> {t.end}</p>
            </div>
          </div>
        ))}
      </section>

    </div>
  );
}
