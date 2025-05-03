// src/renderer/components/AutoMonitoringModule.jsx
import React, { useState, useMemo } from 'react';
import { Bell, CheckCircle, X } from 'lucide-react';          // ★ иконки lucide
import NDVIModule from './NDVIModule';                     // наша карта
import { fields } from '../data/fields';
import FieldHistoryModal from './FieldHistoryModal'

// ─── Мок‑данные ──────────────────────────────────────────────────────────────
const sensorDataBySector = {
  'Сектор №1': [
    { id: 1, type: 'Культура', value: 'Рожь', unit: '', status: 'ok' },
    { id: 2, type: 'Влажность', value: 23, unit: '%', status: 'ok' },
    { id: 3, type: 'Кислотность', value: 6.8, unit: 'pH', status: 'ok' },
    { id: 4, type: 'Температура', value: 28, unit: '°C', status: 'warning' },
    { id: 5, type: 'Азот', value: 45, unit: 'мг/кг', status: 'ok' },
    { id: 6, type: 'Калий', value: 180, unit: 'мг/кг', status: 'ok' },
    { id: 7, type: 'Фосфор', value: 35, unit: 'мг/кг', status: 'warning' },
    { id: 8, type: 'Время замера', value: '02.05.2025 14:30', unit: '', status: 'ok' }
  ],
  'Сектор №2': [
    { id: 1, type: 'Культура', value: 'Подсолнух', unit: '', status: 'ok' },
    { id: 2, type: 'Влажность', value: 30, unit: '%', status: 'ok' },
    { id: 3, type: 'Кислотность', value: 6.5, unit: 'pH', status: 'ok' },
    { id: 4, type: 'Температура', value: 26, unit: '°C', status: 'ok' },
    { id: 5, type: 'Азот', value: 38, unit: 'мг/кг', status: 'warning' },
    { id: 6, type: 'Калий', value: 165, unit: 'мг/кг', status: 'ok' },
    { id: 7, type: 'Фосфор', value: 42, unit: 'мг/кг', status: 'ok' },
    { id: 8, type: 'Время замера', value: '02.05.2025 14:35', unit: '', status: 'ok' }
  ],
  'Сектор №3': [
    { id: 1, type: 'Культура', value: 'Пшено', unit: '', status: 'ok' },
    { id: 2, type: 'Влажность', value: 20, unit: '%', status: 'warning' },
    { id: 3, type: 'Кислотность', value: 6.9, unit: 'pH', status: 'ok' },
    { id: 4, type: 'Температура', value: 30, unit: '°C', status: 'warning' },
    { id: 5, type: 'Азот', value: 42, unit: 'мг/кг', status: 'ok' },
    { id: 6, type: 'Калий', value: 175, unit: 'мг/кг', status: 'ok' },
    { id: 7, type: 'Фосфор', value: 38, unit: 'мг/кг', status: 'ok' },
    { id: 8, type: 'Время замера', value: '02.05.2025 14:40', unit: '', status: 'ok' }
  ]
};

// Добавляем данные NDVI
const ndviData = {
  'Сектор №1': { value: 0.78, status: 'ok' },
  'Сектор №2': { value: 0.65, status: 'warning' },
  'Сектор №3': { value: 0.82, status: 'ok' }
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
  const [showHistoryModal, setShowHistoryModal] = useState(false)

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

     {/* ───────────── NDVI СТАТИСТИКА ───────────── */}
     <section>
       <h2 className="text-xl font-semibold mb-4">NDVI</h2>
       <div className="bg-white rounded-lg shadow p-4">
         <div className="grid grid-cols-3 gap-4">
           {Object.entries(ndviData).map(([sector, data]) => (
             <div 
               key={sector}
               className={`p-4 rounded-lg ${
                 data.status === 'warning' ? 'bg-yellow-50' : 'bg-green-50'
               }`}
             >
               <div className="text-sm text-gray-600 mb-1">
                 {sensorDataBySector[sector].find(s => s.type === 'Культура')?.value || sector}
               </div>
               <div className="flex items-center justify-between">
                 <div className="text-2xl font-semibold">
                   {(data.value * 100).toFixed(1)}%
                 </div>
                 <div className={data.status === 'warning' ? 'text-yellow-500' : 'text-green-500'}>
                   {data.status === 'warning' ? <Bell /> : <CheckCircle />}
                 </div>
               </div>
               <div className="mt-2 text-sm text-gray-500">
                 {data.value >= 0.8 ? 'Отличное состояние' :
                  data.value >= 0.7 ? 'Хорошее состояние' :
                  data.value >= 0.6 ? 'Среднее состояние' :
                  'Требует внимания'}
               </div>
             </div>
           ))}
         </div>
       </div>
     </section>

      {/* ───────────── ДАТЧИКИ ─────────── */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Данные с датчиков</h2>
        <div className="mb-4">
          <select 
            className="w-full p-2 border rounded-lg"
            onChange={(e) => {
              const selectedCulture = e.target.value;
              const filteredSensors = Object.values(sensorDataBySector)
                .flat()
                .filter(s => s.type !== 'Культура' && s.type !== 'Время замера')
                .filter(s => selectedCulture === 'all' || 
                  sensorDataBySector[Object.keys(sensorDataBySector).find(sector => 
                    sensorDataBySector[sector].find(sensor => 
                      sensor.type === 'Культура' && sensor.value === selectedCulture
                    )
                  )]?.some(sensor => sensor.type === 'Культура' && sensor.value === selectedCulture)
                );
              setDisplayedSensors(filteredSensors);
            }}
          >
            <option value="all">Все культуры</option>
            {Array.from(new Set(Object.values(sensorDataBySector)
              .flat()
              .filter(s => s.type === 'Культура')
              .map(s => s.value)
            )).map(culture => (
              <option key={culture} value={culture}>{culture}</option>
            ))}
          </select>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Параметр</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Значение</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {displayedSensors.filter(d => d.type !== 'Культура' && d.type !== 'Время замера').map(d => (
                <tr 
                  key={d.id}
                  className={`${d.status === 'warning' ? 'bg-yellow-50' : 'bg-white'}`}
                >
                  <td className="px-4 py-3 text-sm">{d.type}</td>
                  <td className="px-4 py-3 text-sm">{`${d.value}${d.unit}`}</td>
                  <td className="px-4 py-3">
                    <span className={d.status === 'warning' ? 'text-yellow-500' : 'text-green-500'}>
                      {d.status === 'warning' ? <Bell className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
        <h2 className="text-xl font-semibold mb-4">Журнал работ</h2>
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

      <section>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowHistoryModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              История поля
            </button>
          </div>
        </div>
      </section>

      {showHistoryModal && (
        <FieldHistoryModal onClose={() => setShowHistoryModal(false)} />
      )}
    </div>
  );
}

















