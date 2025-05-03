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
import 'leaflet/dist/leaflet.css';
import { Flame, AlertTriangle, MapPin } from 'lucide-react';
import { fields } from '../data/fields';
import fireImg  from 'C:/Users/DANYA/Desktop/QTLAB/DIPLOM_NYSTIA/iis-agro-mockup/src/assets/FireField.png';
import theftImg from 'C:/Users/DANYA/Desktop/QTLAB/DIPLOM_NYSTIA/iis-agro-mockup/src/assets/DRONE1.png';

const incidentImages = {
  Пожар:      fireImg,
  Хищение: theftImg,
};

import { allFieldPolygon, sectorPolygons } from '../data/sectorPolygons';

// -------------- Конфиг данных --------------
const incidents = [
  {
    id: 'fire1',
    type: 'Пожар',
    coords: [45.154, 41.705],
    sector: 'Сектор №2',
    description: 'Обнаружено возгорание соломы',
    recommendations: ['Вызвать пожарную службу', 'Оградить территорию'],
    icon: Flame,
    detectedBy: 'Дрон 3'
  },
  {
    id: 'theft1',
    type: 'Хищение',
    coords: [45.178920, 41.707862],
    sector: 'Сектор №7',
    description: 'Подозрительная активность возле склада',
    recommendations: ['Вызвать охрану', 'Проверить камеры видеонаблюдения'],
    icon: AlertTriangle,
    detectedBy: 'Дрон 1'
  }
];

// Создаем красный маркер
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

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
            pathOptions={{ color: 'yellow', weight: 2, fillOpacity: 0 }}
          />
          {highlight && (
            <Polygon
              positions={highlight}
              pathOptions={{ color: 'green', weight: 2, fillOpacity: 0.2 }}
            />
          )}

          {/* Маркеры происшествий */}
          {incidents.map(evt => (
            <Marker
              key={evt.id}
              position={evt.coords}
              icon={redIcon}
            >
              <Popup
                minWidth={200}
                maxWidth={200}
                className="p-1"
                position="bottom"
                offset={[0, -10]}
              >
                <div className="flex flex-col space-y-1 w-[200px]">
                  <img
                    src={incidentImages[evt.type]}
                    alt={`Видео — ${evt.type}`}
                    className="w-full h-24 object-cover rounded-lg mb-1"
                  />
                  <div className="text-xs space-y-0.5">
                    <p className="text-sm font-medium mb-0.5">DJI Mavic 3T 11488</p>
                    <p><strong>Сектор:</strong> {evt.sector}</p>
                    <p><strong>Коорд.:</strong> {evt.coords[0].toFixed(3)}, {evt.coords[1].toFixed(3)}</p>
                    <p><strong>Угроза:</strong> {evt.description}</p>
                    <p><strong>Рекомендации:</strong></p>
                    <ul className="list-disc list-inside ml-2">
                      {evt.recommendations.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
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
