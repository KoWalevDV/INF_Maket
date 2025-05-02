//import React from 'react';
import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { fields } from '../data/fields';               // ваши min/max для fitBounds
import { allFieldPolygon, sectorPolygons } from '../data/sectorPolygons';

const sectorInfo = [
    { key: 'Все поле',  size: '4000 га', crop: '—' },
    { key: 'Сектор №1',  size: '500 га',  crop: 'Пшеница' },
    { key: 'Сектор №2',  size: '300 га',  crop: 'Кукуруза' },
    { key: 'Сектор №3',  size: '250 га',  crop: 'Подсолнечник' },
    { key: 'Сектор №4',  size: '150 га',  crop: 'Соя' },
    { key: 'Сектор №5',  size: '300 га',  crop: 'Ячмень' },
    { key: 'Сектор №6',  size: '1000 га', crop: 'Рапс' },
    { key: 'Сектор №7',  size: '1000 га', crop: 'Горох' },
    { key: 'Сектор №8',  size: '800 га',  crop: 'Трава' }
  ];

export default function FieldMapModule({ fieldKey }) {
    const { minLat, minLng, maxLat, maxLng } = fields['Все поле'];
    const fitBounds = [
        [minLat, minLng],
        [maxLat, maxLng],
      ];
      const highlightPolygon =
    fieldKey === 'Все поле'
      ? null
      : sectorPolygons[fieldKey];

    //   const rows = fieldKey === 'Все поле'
    // ? Object.entries(sectorInfo)
    // : [[fieldKey, sectorInfo[fieldKey] || {}]];
    const [showInfo, setShowInfo] = useState(false);
    return (
            <div className="flex flex-col h-full">
              {/* Заголовок модуля */}
              <h2 className="px-6 pt-6 text-xl font-semibold">Карта поля</h2>
        
              {/* Контейнер карты растягивается */}
      <div className="flex-1 min-h-0 mx-6 mb-6 rounded-lg overflow-hidden shadow">
                <MapContainer
                  bounds={fitBounds}
                  boundsOptions={{ padding: [20, 20] }}
                  className="w-full h-full"
                >
            {/* <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> */}
            {/* Спутниковые тайлы от Esri */}
                   <TileLayer
                     attribution='Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community'
                     url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                   />
    
            {/* 1) Показываем контур всего поля */}
            <Polygon
              positions={allFieldPolygon}
              pathOptions={{
                color: 'yellow',
                weight: 5,
                fillOpacity: 0,
              }}
            />
    
            {/* 2) Подсвечиваем выбранный сектор (если не «Все поле») */}
            {highlightPolygon && (
              <Polygon
                positions={highlightPolygon}
                pathOptions={{
                  color: 'green',
                  weight: 2,
                  fillOpacity: 0.2,
                }}
              />
            )}
          </MapContainer>
        </div>
         {/* Кнопка-раскрывалка для таблицы */}
     <div className="px-6 pt-4 mx-6">
       <button
         onClick={() => setShowInfo(!showInfo)}
         className="text-primary-600 hover:underline mb-2"
       >
         {showInfo ? 'Скрыть информацию по секторам' : 'Показать информацию по секторам'}
       </button>
     </div>

     {showInfo && (
       <div className="px-6 pb-6 mx-6 bg-white rounded-lg shadow overflow-auto" style={{ maxHeight: 200 }}>
         <h3 className="text-lg font-medium mb-2">Информация по секторам</h3>
         <table className="w-full text-left text-sm border-collapse">
           <thead>
             <tr className="bg-gray-100">
               <th className="px-4 py-2 text-left">№ сектора</th>
               <th className="px-4 py-2 text-left">Размер</th>
               <th className="px-4 py-2 text-left">Культура</th>
             </tr>
           </thead>
           <tbody>
             {sectorInfo.map(({ key, size, crop }) => (
               <tr
                 key={key}
                 className={`border-t ${key === fieldKey ? 'bg-green-100' : ''}`}
               >
                 <td className="px-4 py-2">
                   {key === 'Все поле' ? '—' : key.replace('Сектор ', '')}
                 </td>
                 <td className="px-4 py-2">{size}</td>
                <td className="px-4 py-2">{crop}</td>
              </tr>
            ))}
           </tbody>
         </table>
       </div>
     )}
    </div>
  );
}