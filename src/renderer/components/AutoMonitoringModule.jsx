// import React from 'react';
// import { Table, Bell, CheckCircle } from 'lucide-react';
// import { MapContainer, ImageOverlay, Polygon } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';



// const sensorData = [
//   { id: 1, type: 'Влажность', value: '23%', status: 'ok' },
//   { id: 2, type: 'Температура', value: '28°C', status: 'warning' },
// ];

// import { fields } from '../data/fields';
// import { allFieldPolygon, sectorPolygons } from 'сссссссссссссссс../data/sectorPolygons';
// import ndviPng from "../../assets/ndvi/NDVI.png";
// export default function AutoMonitoringModule({ fieldKey }) {
  
//   const { minLat, minLng, maxLat, maxLng } = fields['Все поле'];
//   const bounds = [
//     [minLat, minLng],   // south‑west
//     [maxLat, maxLng],   // north‑east
//   ];

//   const highlight = sectorPolygons[fieldKey];
//   return (
//     <div className="space-y-8">
//       <section>
//         <h2 className="text-xl font-semibold mb-4">Оценка состояния растений (карта NDVI)</h2>
//         <div className="w-full h-64 rounded-lg overflow-hidden shadow">
//         <MapContainer bounds={bounds} className="w-full h-full">
//         <ImageOverlay url={ndviPng} bounds={bounds} />
          
//           {/* контур всего поля */}
//           <Polygon
//             positions={allFieldPolygon}
//             pathOptions={{ color: '#888', weight: 2, fillOpacity: 0 }}
//           />

//           {/* подсветка выбранного сектора */}
//           {Array.isArray(highlight) && highlight.length >= 3 && (
//   <Polygon
//     positions={highlight}
//     pathOptions={{ color: 'green', weight: 2, fillOpacity: 0.2 }}
//   />
// )}

//           {/* здесь ваш NDVI-полигон */}
//         </MapContainer>
//         </div>
//       </section>

//       <section>
//         <h2 className="text-xl font-semibold mb-4">Данные с датчиков</h2>
//         <ul className="divide-y divide-gray-200">
//           {sensorData.map(d => (
//             <li key={d.id} className="py-2 flex justify-between">
//               <span>{d.type}: {d.value}</span>
//               <span className={d.status === 'warning' ? 'text-yellow-500' : 'text-green-500'}>
//                 {d.status === 'warning' ? '⚠️' : '✔️'}
//               </span>
//             </li>
//           ))}
//         </ul>
//       </section>

//       <section>
//         <h2 className="text-xl font-semibold mb-4">Формирование задач на работы</h2>
//         <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center">
//           <Bell className="w-5 h-5 mr-2" /> Добавить задачу
//         </button>
//       </section>

//       <section>
//         <h2 className="text-xl font-semibold mb-4">Журнал проделанных работ</h2>
//         <ul className="divide-y divide-gray-200">
//           <li className="py-2 flex justify-between">
//             <span>01.05.2025 — Прополка участка A</span>
//             <CheckCircle className="w-5 h-5 text-green-500"/>
//           </li>
//         </ul>
//       </section>
//     </div>
//   );
// }
// src/renderer/components/AutoMonitoringModule.jsx
// import React from 'react';
// import NDVIModule from './NDVIModule';
// import { fields } from '../data/fields';

// export default function AutoMonitoringModule({ fieldKey }) {
//   const { minLat, minLng, maxLat, maxLng } = fields['Все поле'];
//   const bounds = [
//     [minLat, minLng],
//     [maxLat, maxLng]
//   ];

//   return (
//     <div className="flex-1 flex flex-col shadow rounded-lg overflow-hidden">
//       <h2 className="p-4 text-xl font-semibold">Карта NDVI (Sentinel‑2)</h2>
//       <div className="flex-1">
//         <NDVIModule fieldKey={fieldKey} bounds={bounds}/>
//       </div>
//     </div>
//   );
// }
// src/renderer/components/AutoMonitoringModule.jsx
import React, { useState, useMemo } from 'react';
import { Bell, CheckCircle, X } from 'lucide-react';          // ★ иконки lucide
import NDVIModule from './NDVIModule';                     // наша карта
import { fields } from '../data/fields';

// ─── Мок‑данные ──────────────────────────────────────────────────────────────
const sensorDataBySector = {
  // 'Все поле': [
  //   { id: 13, type: 'Влажность',   value: 23, unit: '%', status: 'ok' },
  //   { id: 14, type: 'Температура', value: 28, unit: '°C', status: 'warning' },
  //   { id: 15, type: 'pH почвы',    value: 6.8, unit: '', status: 'ok' }
  // ],
  'Сектор №1': [
    { id: 1, type: 'Культура',   value: 1866, unit: '-Рожь', status: 'ok' },
    { id: 2, type: 'Влажность',   value: 23, unit: '%', status: 'ok' },
    { id: 3, type: 'Температура', value: 28, unit: '°C', status: 'warning' },
    { id: 4, type: 'pH почвы',    value: 6.8, unit: '', status: 'ok' }
  ],
  'Сектор №2': [
    { id: 1, type: 'Культура',   value: 97, unit: '-Подсолнух', status: 'ok' },
    { id: 6, type: 'Влажность',   value: 30, unit: '%', status: 'ok' },
    { id: 7, type: 'Температура', value: 26, unit: '°C', status: 'ok' },
    { id: 8, type: 'pH почвы',    value: 6.5, unit: '', status: 'ok' }
  ],
  'Сектор №3': [
    { id: 9, type: 'Культура',   value: 1355, unit: '-Пшено', status: 'ok' },
    { id: 10, type: 'Влажность',   value: 20, unit: '%', status: 'warning' },
    { id: 11, type: 'Температура', value: 30, unit: '°C', status: 'warning' },
    { id: 12, type: 'pH почвы',    value: 6.9, unit: '', status: 'ok' }
  ]
};

function aggregateSensors(dataBySector) {
  const all = Object.values(dataBySector).flat();
  const grouped = all.reduce((acc, { type, value, unit, status }) => {
    if (!acc[type]) acc[type] = { sum: 0, count: 0, unit, worst: 'ok' };
    acc[type].sum += value;
    acc[type].count += 1;
    if (status === 'warning') acc[type].worst = 'warning';
    return acc;
  }, {});
  return Object.entries(grouped).map(([type, { sum, count, unit, worst }], idx) => ({
    id: idx,
    type,
    value: (sum / count).toFixed(1),
    unit,
    status: worst
  }));
}

// Журнал выполненных и текущих задач
const initialWorkLog = [
  { id: 1, date: '01.05.2025 08:30', task: 'Прополка сектора 1', completed: true },
  { id: 2, date: '01.05.2025 10:15', task: 'Проверка дронов', completed: true }
];
const initialCurrentTasks = [
  { id: 101, date: '02.05.2025 09:00', task: 'Полив сектора 4', completed: false }
];

// ─── Основной компонент ─────────────────────────────────────────────────────
export default function AutoMonitoringModule({ fieldKey }) {
  const [openModal, setOpenModal] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [workLog, setWorkLog] = useState(initialWorkLog);
  const [currentTasks, setCurrentTasks] = useState(initialCurrentTasks);

  // Отображаемые датчики
  const displayedSensors = useMemo(() => {
    return fieldKey === 'Все поле'
      ? aggregateSensors(sensorDataBySector)
      : (sensorDataBySector[fieldKey] || []);
  }, [fieldKey]);

  const handleAddTask = () => {
    if (!newTask) return;
    const now = new Date();
    const dateStr = now.toLocaleDateString('ru-RU') + ' ' + now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    setCurrentTasks(prev => [...prev, { id: Date.now(), date: dateStr, task: newTask, completed: false }]);
    setNewTask('');
    setOpenModal(false);
  };
  const { minLat, minLng, maxLat, maxLng } = fields['Все поле'];
  const bounds = [
    [minLat, minLng],
    [maxLat, maxLng]
  ];

  return (
    <div className="space-y-8">
      <section>
      {/* ───────────── КАРТА ───────────── */}
      <div className="flex-1 flex flex-col shadow rounded-lg overflow-hidden">
       <h2 className="p-4 text-xl font-semibold">Оценка состояния растений (карта NDVI)</h2>
       <div className="h-80">
         <NDVIModule fieldKey={fieldKey} bounds={bounds}/>
       </div>
     </div>
     </section>
      {/* ───────────── ДАТЧИКИ ─────────── */}
      <section>
      <h2 className="text-xl font-semibold mb-4">Данные с датчиков</h2>
        <ul className="divide-y divide-gray-200">
          {displayedSensors.map(d => (
            <li
              key={d.id}
              className={`py-2 px-4 flex justify-between ${d.status === 'warning' ? 'bg-gray-100' : 'bg-green-50'}`}
            >
              <span>{d.type}: {d.value}{d.unit}</span>
              <span className={d.status === 'warning' ? 'text-yellow-500' : 'text-green-500'}>
                {d.status === 'warning' ? <Bell /> : <CheckCircle />}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ───────────── ЗАДАЧИ ───────────── */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Формирование задач на работы</h2>
        <button
          onClick={() => setOpenModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
        >
          <Bell className="w-5 h-5 mr-2" /> Добавить задачу
        </button>

        {/* Модальное окно */}
        {openModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Новая задача</h3>
                <button onClick={() => setOpenModal(false)}><X /></button>
              </div>
              <input
                type="text"
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
                placeholder="Описание задачи"
                className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={handleAddTask}
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >Добавить</button>
            </div>
          </div>
        )}
      </section>

      {/* ───────────── ЖУРНАЛ ───────────── */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Журнал проделанных работ</h2>
        <ul className="divide-y divide-gray-200">
          {[...workLog, ...currentTasks].map(item => (
            <li
              key={item.id}
              className={`py-2 px-4 flex justify-between items-center ${item.completed ? 'bg-green-50' : 'bg-gray-100'}`}
            >
              <span>{item.date} — {item.task}</span>
              {item.completed ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Bell className="w-5 h-5 text-gray-500" />}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

















