// src/renderer/components/SecurityModule.jsx
import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon
} from 'react-leaflet';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import 'leaflet/dist/leaflet.css';
import { Command, Flame, AlertTriangle, MapPin } from 'lucide-react';
import { fields } from '../data/fields';
import fireImg  from 'C:/Users/DANYA/Desktop/QTLAB/DIPLOM_NYSTIA/iis-agro-mockup/src/assets/FireField.png';
import theftImg from 'C:/Users/DANYA/Desktop/QTLAB/DIPLOM_NYSTIA/iis-agro-mockup/src/assets/DRONE1.png';

const incidentImages = {
  Пожар:      fireImg,
  Хищение: theftImg,
  // …
};
import { allFieldPolygon, sectorPolygons } from '../data/sectorPolygons';

// -------------- Конфиг данных --------------
const drones = [
  { id: 1, name: 'Mavic 3T', position: [45.177211, 41.707645], status: 'Мониторинг' },
  { id: 2, name: 'Mavic 3',  position: [45.152, 41.710], status: 'Мониторинг:!ВОЗГОРАНИЕ!' },
  { id: 3, name: 'Mavic 33', position: [45.152435, 41.677454], status: 'Мониторинг' },
];

const incidents = [
  {
    id: 'fire1',
    type: 'Пожар',
    coords: [45.154, 41.705],
    sector: 'Сектор №2',
    description: 'Обнаружено возгорание соломы',
    recommendations: ['Вызвать пожарную службу', 'Оградить территорию'],
    icon: Flame
  },
  {
    id: 'theft1',
    type: 'Хищение',
    coords: [45.178920, 41.707862],
    sector: 'Сектор №7',
    description: 'Подозрительная активность возле склада',
    recommendations: ['Вызвать охрану', 'Проверить камеры видеонаблюдения'],
    icon: AlertTriangle
  }
];

// -------------- Хелперы для кастомных иконок --------------
function createDroneIcon(rotation = 0) {
  // рендерим белую иконку Command побольше
  const commandSvg = renderToStaticMarkup(
    <Command color="#fff" size={20} />
  );
  const html = `
    <div style="
      transform: rotate(${rotation}deg);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
    ">
      ${commandSvg}
    </div>`;
  return L.divIcon({
    html,
    className: '',
    iconSize: [20, 20],
    iconAnchor: [20, 20],
  });
}

  function createIncidentIcon(IconComponent, color) {
      const svg = renderToStaticMarkup(
        <IconComponent className={`text-[${color}]`} />
      );
      const html = `<div style="font-size:1.4rem; color:${color};">${svg}</div>`;
      return L.divIcon({ html, className: '', iconAnchor: [12, 12] });
    }

// -------------- Основной компонент --------------
export default function SecurityModule({ fieldKey }) {
  // границы всего поля
  const { minLat, minLng, maxLat, maxLng } = fields['Все поле'];
  const bounds = [[minLat, minLng], [maxLat, maxLng]];

  // подсветка выбранного сектора
  const highlight = fieldKey === 'Все поле' ? null : sectorPolygons[fieldKey];

  return (
    <div className="flex flex-col h-full">
      {/* Карта */}
      <div className="h-96 w-full rounded-t-lg overflow-hidden shadow">
        <MapContainer
          bounds={bounds}
          boundsOptions={{ padding: [20, 20] }}
          className="w-full h-full"
        >
          <TileLayer
            attribution="Tiles © Esri"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />

          {/* Контуры поля */}
          <Polygon
            positions={allFieldPolygon}
            pathOptions={{ color: 'yellow', weight: 4, fillOpacity: 0 }}
          />
          {highlight && (
            <Polygon
              positions={highlight}
              pathOptions={{ color: 'green', weight: 2, fillOpacity: 0.2 }}
            />
          )}

          {/* Маркеры дронов */}
          {drones.map((d, i) => (
            <Marker
              key={d.id}
              position={d.position}
              icon={createDroneIcon(i * 90)} // разный угол обзора
            >
              <Popup>
                <div className="font-semibold">{d.name}</div>
                <div>Статус: {d.status}</div>
              </Popup>
            </Marker>
          ))}

          {/* Маркеры происшествий */}
          {incidents.map(evt => {
            const Icon = evt.icon;
            const color = evt.type === 'Пожар' ? 'red' : 'orange';
            return (
              <Marker
                key={evt.id}
                position={evt.coords}
                icon={createIncidentIcon(Icon, color)}
              >
                <Popup
     minWidth={200}
     maxWidth={400}
     className="p-1"
   >
      <div className="flex flex-col space-y-2">
    {/* горизонтальный прямоугольник */}
       <img
         src={incidentImages[evt.type]}
         alt={`Видео — ${evt.type}`}
         className="w-full h-32 object-cover rounded-lg mb-2"
       />
       <div className="text-sm space-y-1">
                      <p><strong>Сектор:</strong> {evt.sector}</p>
                      <p><strong>Коорд.:</strong> {evt.coords[0].toFixed(3)}, {evt.coords[1].toFixed(3)}</p>
                      <p><strong>Угроза:</strong> {evt.description}</p>
                      <p><strong>Рекомендации:</strong></p>
                      <ul className="list-disc list-inside ml-4">
                        {evt.recommendations.map((r, i) => <li key={i}>{r}</li>)}
                      </ul>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Список аномалий */}
      <div className="p-4 bg-white rounded-b-lg shadow-inner">
        <h2 className="text-xl font-semibold mb-2">Выявленные аномалии</h2>
        <ul className="divide-y divide-gray-200">
          {incidents.map((a, idx) => (
            <li key={idx} className="py-2 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                {a.type === 'Пожар'
                  ? <Flame className="w-5 h-5 text-red-600" />
                  : <AlertTriangle className="w-5 h-5 text-orange-600" />
                }
                <span>{a.type} — {a.sector}</span>
              </div>
              <MapPin className="w-5 h-5 text-gray-500" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
