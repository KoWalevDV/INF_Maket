// src/renderer/components/NDVITileLayer.jsx
import { GridLayer } from 'leaflet';
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

export default function NDVITileLayer({
  urlTemplate,
  attribution,
  subdomains = ['a','b','c','d']
}) {
  const map = useMap();

  useEffect(() => {
    const VariLayer = GridLayer.extend({
      createTile(coords, done) {
        const tile = document.createElement('canvas');
        const size = this.getTileSize();
        tile.width = size.x;
        tile.height = size.y;
        const ctx = tile.getContext('2d');

        // вычисляем поддомен для {s}
        const idx = Math.abs(coords.x + coords.y) % subdomains.length;
        const s   = subdomains[idx];
        const url = urlTemplate
          .replace('{s}', s)
          .replace('{z}', coords.z)
          .replace('{x}', coords.x)
          .replace('{y}', coords.y);

        const img = new Image();
        img.crossOrigin = '';
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
          const imgData = ctx.getImageData(0, 0, size.x, size.y);
          const d = imgData.data;

          for (let i = 0; i < d.length; i += 4) {
            const R = d[i]   / 255;
            const G = d[i+1] / 255;
            const B = d[i+2] / 255;
            // нормируем по сумме каналов
            const sum = R + G + B + 1e-6;
            const rN = R / sum;
            const gN = G / sum;
            const bN = B / sum;
            // VARI = (G - R) / (G + R - B)
            let vari = (gN - rN) / (gN + rN - bN + 1e-6);
            // мэппим диапазон [−1,1] → цвет
            if (vari >= 0) {
              d[i]   = 0;                                  // R
              d[i+1] = Math.min(255, Math.floor(255*vari)); // G
              d[i+2] = 0;                                  // B
            } else {
              d[i]   = Math.min(255, Math.floor(-255*vari)); // R
              d[i+1] = 0;
              d[i+2] = 0;
            }
            d[i+3] = 200; // альфа для смешения
          }

          ctx.putImageData(imgData, 0, 0);
          done(null, tile);
        };
        img.onerror = err => done(err, tile);
        img.src = url;
        return tile;
      }
    });

    const layer = new VariLayer({ attribution, subdomains });
    layer.addTo(map);
    return () => { map.removeLayer(layer); };
  }, [map, urlTemplate, attribution, subdomains]);

  return null;
}
