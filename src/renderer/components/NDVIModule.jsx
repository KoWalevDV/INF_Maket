// // src/renderer/components/NDVIModule.jsx
// import React from 'react';
// import L from 'leaflet';
// import { MapContainer, WMSTileLayer, Polygon } from 'react-leaflet';
// import { fields } from '../data/fields';
// import { allFieldPolygon, sectorPolygons } from '../data/sectorPolygons';

// const INSTANCE_ID = '75e992b4-767b-43e6-92c2-496fb353e65c';   // ваш
// const NDVI_LAYER  = 'VEGETATION_INDEX';                       // имя слоя

// export default function NDVIModule({ fieldKey = 'Все поле' }) {
//   const { minLat, minLng, maxLat, maxLng } = fields['Все поле'];
//   const bounds = [
//     [minLat, minLng],
//     [maxLat, maxLng]
//   ];

//   const highlight =
//     fieldKey !== 'Все поле' && sectorPolygons[fieldKey];

//   return (
//     <MapContainer bounds={bounds} className="w-full h-full">
//       <WMSTileLayer
//         // Sentinel Hub WMS URL
//         url={`https://services.sentinel-hub.com/ogc/wms/${INSTANCE_ID}`}
//         layers={NDVI_LAYER}           // точно как в Capabilities
//         styles="COLOR_MAP"            // любой стиль из Capabilities
//         format="image/png"
//         transparent
//         tiled={true}                  // даёт TILED=TRUE
//         version="1.3.0"
//         crs={L.CRS.EPSG3857}
//         // диапазон лучше одной даты
//         time="2025-04-25/2025-05-02"
//         attribution="© Sentinel Hub"
//       />

//       <Polygon positions={allFieldPolygon}
//                pathOptions={{ color:'#888', weight:2, fillOpacity:0 }} />

//       {highlight && (
//         <Polygon positions={highlight}
//                  pathOptions={{ color:'green', fillOpacity:0.2 }} />
//       )}
//     </MapContainer>
//   );
// }
// src/renderer/components/NDVIModule.jsx
import React, { useState } from 'react';
import L from 'leaflet';
import { MapContainer, WMSTileLayer, Polygon } from 'react-leaflet';
import { allFieldPolygon, sectorPolygons } from '../data/sectorPolygons';

const INSTANCE_ID = '75e992b4-767b-43e6-92c2-496fb353e65c';
const NDVI_LAYER  = 'VEGETATION_INDEX';     // имя из GetCapabilities
const NDVI_STYLE  = 'COLOR_MAP';            // вид раскраски

export default function NDVIModule({ fieldKey, bounds }) {
  const [mapReady, setReady] = useState(false);
  const highlight = fieldKey === 'Все поле' ? null : sectorPolygons[fieldKey];

  return (
    <MapContainer
      bounds={bounds}
      maxBounds={bounds}
      minZoom={13}            // чтобы не запрашивался «всемирный» тайл
      scrollWheelZoom
      className="w-full h-full"
      whenReady={() => setReady(true)}>

      {/*  Добавляем слой только после fitBounds  */}
      {mapReady && (
        <WMSTileLayer
          url={`https://services.sentinel-hub.com/ogc/wms/${INSTANCE_ID}`}
          layers={NDVI_LAYER}
          styles={NDVI_STYLE}
          format="image/png"
          transparent
          version="1.3.0"
          crs={L.CRS.EPSG3857}
          time="2025-04-25/2025-05-02"      // любой диапазон ≤ 30 дней
          noWrap                            // ← важно!
          bounds={bounds}                   // ← важно!
          attribution="© Sentinel Hub"
        />
      )}

      {/* серый контур всего поля */}
      <Polygon positions={allFieldPolygon}
               pathOptions={{ color:'#888', weight:2, fillOpacity:0 }} />

      {/* подсветка выбранного сектора */}
      {highlight && (
        <Polygon positions={highlight}
                 pathOptions={{ color:'green', weight:2, fillOpacity:0.2 }} />
      )}
    </MapContainer>
  );
}

