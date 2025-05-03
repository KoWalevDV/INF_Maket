// src/renderer/components/ForecastModule.jsx
import React, { useState } from 'react';
import HeatMap from 'react-heatmap-grid';
import ModuleCard from './ModuleCard';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, ReferenceLine
} from 'recharts';
import { AlertOctagon, FileText } from 'lucide-react';

// — Входные данные —

// 1. Риски с координатами, описанием и рекомендациями
const risks = [
  {
    id: 'drought',
    name: 'Засуха',
    coords: { lat: 45.12, lng: 41.70 },
    description: 'Продолжительная засуха в центральной части поля.',
    recommendations: [
      'Увеличить частоту полива на 20%',
      'Проверить систему капельного орошения'
    ]
  },
  {
    id: 'pests',
    name: 'Нашестие вредителей',
    coords: { lat: 45.15, lng: 41.72 },
    description: 'Обнаружены очаги нашествия тли.',
    recommendations: [
      'Обработать инсектицидами класса фосфорорганических соединений',
      'Установить ловчие пояса'
    ]
  },
  {
    id: 'frost',
    name: 'Заморозки',
    coords: { lat: 45.14, lng: 41.68 },
    description: 'Ночные заморозки до −2°C в южном секторе.',
    recommendations: [
      'Запустить антиобледенительные вентиляторы',
      'Укрыть рассаду агротекстилем'
    ]
  }
];

// 2. Прогноз урожайности по годам
const historicalYield = [
  { year: '2023', yield: 30, forecast: 32 },
  { year: '2024', yield: 45, forecast: 42 },
  { year: '2025', yield: 38, forecast: 38 },
  { year: '2026', yield: null, forecast: 45 }
];

// 3. Прогноз урожайности по сезонам
const seasonalYield = [
  { season: 'Весна', value: 12 },
  { season: 'Лето',  value: 22 },
  { season: 'Осень', value: 8  }
];

// 4. Результаты LSTM (по сезонам)
const lstmBySeason = [
  { season: 'Весна', prediction: 11 },
  { season: 'Лето',  prediction: 25 },
  { season: 'Осень', prediction: 9  }
];

// 5. Ещё данные LSTM (таблица, динамика, heatmap, рекомендации)
const lstmTable = [
  { label: 'Весна', prediction: 11 },
  { label: 'Лето',  prediction: 25 },
  { label: 'Осень', prediction: 9  }
];
const lstmTimeline = [
  { step: 'Обработка данных', time: '00:00', value: 11 },
  { step: 'Обучение модели',   time: '02:00', value: 20 },
  { step: 'Валидация',         time: '03:30', value: 22 },
  { step: 'Прогноз',           time: '04:15', value: 25 },
];
const heatmapData = [
  [11, 25, 9],
  [12, 24, 8],
  [10, 23, 7]
];
const recommendations = [
  'Увеличить полив в летний период',
  'Добавить комплексные удобрения осенью',
  'Проверить дренажную систему'
];

const seasons    = ['Весна', 'Лето', 'Осень'];
const rowLabels  = ['Сектор 1', 'Сектор 2', 'Сектор 3'];

export default function ForecastModule() {
  const [selectedRisk, setSelectedRisk] = useState(null);

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-semibold">Прогнозирование</h2>

      {/* 1. Риски (первые) */}
      <section>
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <AlertOctagon className="w-5 h-5 mr-2"/> Риски
        </h3>
        <ul className="divide-y divide-gray-200">
          {risks.map(risk => (
            <li
              key={risk.id}
              onClick={() => setSelectedRisk(risk)}
              className="py-3 px-4 hover:bg-gray-100 cursor-pointer flex justify-between"
            >
              <span>{risk.name}</span>
              <span className="text-gray-500 text-sm">
                [{risk.coords.lat.toFixed(2)}, {risk.coords.lng.toFixed(2)}]
              </span>
            </li>
          ))}
        </ul>
        {selectedRisk && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow">
            <h4 className="font-semibold mb-2">{selectedRisk.name}</h4>
            <p className="text-sm mb-2">{selectedRisk.description}</p>
            <ul className="list-disc list-inside text-sm space-y-1">
              {selectedRisk.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
            <button
              onClick={() => setSelectedRisk(null)}
              className="mt-4 px-3 py-1 text-sm text-gray-600 hover:underline"
            >
              Закрыть
            </button>
          </div>
        )}
      </section>

      {/* 2. Два участка: общий прогноз и LSTM по сезонам */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2.1 Общий прогноз урожайности с линией тренда */}
        <div className="bg-white rounded-lg shadow p-4 h-64">
          <h3 className="font-medium mb-2">Прогноз урожайности (годовой)</h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={historicalYield} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis label={{ value: 'Урожайность (ц/га)', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                formatter={(value) => [`${value} ц/га`, '']}
                labelFormatter={(label) => `Год: ${label}`}
              />
              <Bar dataKey="yield" fill="#22C55E" name="Фактическая урожайность" />
              <Bar dataKey="forecast" fill="#3B82F6" name="Прогноз" />
              <ReferenceLine
                y={40}
                stroke="#EF4444"
                strokeDasharray="3 3"
                label={{ value: 'Мода', position: 'right', fill: '#EF4444' }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 2.2 LSTM-прогноз по сезонам */}
        <div className="bg-white rounded-lg shadow p-4 h-64">
          <h3 className="font-medium mb-2">LSTM прогноз по сезонам</h3>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={lstmBySeason} margin={{ top:5, right:5, left:5, bottom:5 }}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="season"/>
              <YAxis/>
              <Tooltip/>
              <Line type="monotone" dataKey="prediction" stroke="#10B981" strokeWidth={2}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 3. Далее — всё остальное, связанное с LSTM */}
      <section>
        {/* 3.1 Таблица прогнозов */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h3 className="font-medium mb-2">Таблица LSTM-прогноза</h3>
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Сезон</th>
                <th className="p-2 text-left">Прогноз</th>
              </tr>
            </thead>
            <tbody>
              {lstmTable.map(({ label, prediction }) => (
                <tr key={label} className="border-t">
                  <td className="p-2">{label}</td>
                  <td className="p-2">{prediction} ц/га</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </section>

        {/* 3.2 Динамика процесса (таймлайн) */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 h-48">
          <h3 className="font-medium mb-2">Динамика LSTM-прогноза</h3>
          <ul className="text-sm space-y-1">
            {lstmTimeline.map(({ step, time }, i) => (
              <li key={i}><strong>{time}</strong> — {step}</li>
            ))}
          </ul>
        </div>

        {/* 3.3 Тепловая карта */}
        <section>
          <h3 className="text-xl font-semibold mb-2">Тепловая карта прогнозов</h3>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between mb-2">
              <div className="text-sm text-gray-600">Секторы</div>
              <div className="text-sm text-gray-600">Сезоны</div>
            </div>
            <HeatMap
              xLabels={seasons}
              yLabels={rowLabels}
              data={heatmapData}
              squares
              height={120}
              width={300}
              cellStyle={(background, value, min, max) => {
                const ratio = (value - min) / (max - min);
                const lightness = 100 - Math.round(ratio * 100);
                return {
                  background: `hsl(200, 80%, ${lightness}%)`,
                  color: lightness < 50 ? '#fff' : '#000',
                  fontSize: '0.9rem',
                  padding: '8px',
                  textAlign: 'center'
                };
              }}
              cellRender={value => <div>{value}</div>}
            />
            <div className="mt-2 text-sm text-gray-600 text-center">
              Урожайность (ц/га)
            </div>
          </div>
        </section>

        {/* 3.4 Рекомендации */}
        <section>
        <ModuleCard
          title="Рекомендации"
          icon={FileText}
          description={
            <div>
              <ul className="list-disc list-inside text-sm space-y-1">
                {recommendations.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          }
        />
      </section>
    </div>
  );
}

