// src/renderer/components/SecurityModule.jsx
import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon   // ❌ обязательно импортируем Polygon
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Bell, FileText } from 'lucide-react';

import { fields } from '../data/fields';
// ✅ импортируем полигоны
import { allFieldPolygon, sectorPolygons } from '../data/sectorPolygons';

export default function SecurityModule({ fieldKey }) {
  const drones = [
    { id: 1, name: 'Mavic 3T', position: [45.150, 41.700], status: 'Idle' },
    { id: 2, name: 'Mavic 3',  position: [45.152, 41.710], status: 'In Flight' },
  ];
  const anomalies = [
    { time: '10:15', type: 'Пожар',   location: 'Сектор №3' },
    { time: '11:02', type: 'Хищение', location: 'Сектор №5' },
  ];

  // весь периметр для fitBounds
  const { minLat, minLng, maxLat, maxLng } = fields['Все поле'];
  const bounds = [
    [minLat, minLng],
    [maxLat, maxLng],
  ];

  // контур выбранного сектора или null
  const highlight = fieldKey === 'Все поле'
    ? null
    : sectorPolygons[fieldKey];

  return (
    <div className="flex-1 rounded-lg overflow-hidden shadow">
      <MapContainer
        bounds={bounds}
        boundsOptions={{ padding: [20, 20] }}
        className="w-full h-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* серый контур всего поля */}
        <Polygon
          positions={allFieldPolygon}
          pathOptions={{ color: '#888', weight: 2, fillOpacity: 0 }}
        />

        {/* зелёная подсветка выбранного сектора */}
        {highlight && (
          <Polygon
            positions={highlight}
            pathOptions={{ color: 'green', weight: 2, fillOpacity: 0.2 }}
          />
        )}

        {/* маркеры дронов */}
        {drones.map(d => (
          <Marker key={d.id} position={d.position}>
            <Popup>
              <div className="font-bold">{d.name}</div>
              <div>Статус: {d.status}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="p-4 space-y-4 bg-white">
        <h2 className="text-xl font-semibold">Выявленные аномалии</h2>
        <ul className="divide-y divide-gray-200">
          {anomalies.map((a, i) => (
            <li key={i} className="py-2 flex justify-between">
              <span>{a.time} — {a.type}</span>
              <span className="text-gray-500">{a.location}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center bg-yellow-100 p-3 rounded-md">
          <Bell className="w-6 h-6 mr-2 text-yellow-600" />
          <span>
            Последнее: {anomalies[anomalies.length-1].type} в&nbsp;
            {anomalies[anomalies.length-1].location}
          </span>
        </div>
        <button className="mt-2 flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          <FileText className="w-5 h-5 mr-2" /> Скачать отчёт
        </button>
      </div>
    </div>
  );
}
// import React from 'react';
// import ModuleCard from './ModuleCard';
// import { Airplay, AlertTriangle, Bell, FileText } from 'lucide-react';

// export default function SecurityModule({ fieldKey }) {
//   const cards = [
//        {
//          title: 'Управление полётами',
//          icon: Airplay,
//          description: 'Статус дронов и маршруты'
//        },
//        {
//          title: 'Обнаружение аномалий',
//          icon: AlertTriangle,
//          description: 'AI-детекция YOLO'
//        },
//        {
//          title: 'Уведомления',
//          icon: Bell,
//          description: 'Живые оповещения о сбоях'
//        },
//        {
//          title: 'Отчёты безопасности',
//          icon: FileText,
//          description: 'PDF, графики и логи'
//        }
//      ];

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4">Безопасность и контроль</h2>
//       {fieldKey && <p className="mb-4 text-sm text-gray-600">Поле: {fieldKey}</p>}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//         {cards.map(({ title, icon, color }) => (
//           <ModuleCard key={title} title={title}
//                      icon={Icon}
//                      description={description} color={color} />
//         ))}
//       </div>
//     </div>
//   );
// }