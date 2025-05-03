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
    name: 'Нашествие вредителей',
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
  },
  {
    id: 'disease',
    name: 'Болезни растений',
    coords: { lat: 45.13, lng: 41.71 },
    description: 'Признаки мучнистой росы на листьях.',
    recommendations: [
      'Обработать фунгицидами',
      'Удалить пораженные растения'
    ]
  },
  {
    id: 'wind',
    name: 'Сильный ветер',
    coords: { lat: 45.16, lng: 41.69 },
    description: 'Порывы ветра до 15 м/с.',
    recommendations: [
      'Укрепить опоры растений',
      'Отложить опрыскивание'
    ]
  },
  {
    id: 'flood',
    name: 'Подтопление',
    coords: { lat: 45.11, lng: 41.73 },
    description: 'Скопление воды в низинах.',
    recommendations: [
      'Включить дренажную систему',
      'Проверить отводные каналы'
    ]
  },
  {
    id: 'nutrient',
    name: 'Дефицит питания',
    coords: { lat: 45.17, lng: 41.74 },
    description: 'Недостаток азота в почве.',
    recommendations: [
      'Внести азотные удобрения',
      'Провести анализ почвы'
    ]
  },
  {
    id: 'weed',
    name: 'Сорняки',
    coords: { lat: 45.18, lng: 41.75 },
    description: 'Активный рост сорняков.',
    recommendations: [
      'Провести механическую прополку',
      'Применить гербициды'
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

// 3. Прогноз урожайности по месяцам
const monthlyYield = [
  { month: 'Июнь', value: 8 },
  { month: 'Июль', value: 12 },
  { month: 'Август', value: 15 },
  { month: 'Сентябрь', value: 10 },
  { month: 'Октябрь', value: 5 }
];

// 4. Таблица прогнозов по месяцам
const monthlyTable = [
  { month: 'Июнь', prediction: 8 },
  { month: 'Июль', prediction: 12 },
  { month: 'Август', prediction: 15 },
  { month: 'Сентябрь', prediction: 10 },
  { month: 'Октябрь', prediction: 5 }
];

// 5. Тепловая карта по месяцам
const heatmapData = [
  [8, 12, 15, 10, 5],
  [7, 11, 14, 9, 4],
  [6, 10, 13, 8, 3]
].reverse();

const months = ['Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь'];
const rowLabels = ['Сектор 1', 'Сектор 2', 'Сектор 3'].reverse();

const recommendations = [
  'Увеличить полив в летний период',
  'Добавить комплексные удобрения осенью',
  'Проверить дренажную систему'
];

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
        <div className="max-h-60 overflow-y-auto">
          <ul className="divide-y divide-gray-200">
            {risks.map(risk => (
              <li key={risk.id}>
                <div
                  onClick={() => setSelectedRisk(selectedRisk?.id === risk.id ? null : risk)}
                  className="py-3 px-4 hover:bg-gray-100 cursor-pointer flex justify-between"
                >
                  <span>{risk.name}</span>
                  <span className="text-gray-500 text-sm">
                    [{risk.coords.lat.toFixed(2)}, {risk.coords.lng.toFixed(2)}]
                  </span>
                </div>
                {selectedRisk?.id === risk.id && (
                  <div className="px-4 py-2 bg-gray-50">
                    <p className="text-sm mb-2">{risk.description}</p>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {risk.recommendations.map((rec, i) => (
                        <li key={i} className="text-blue-600">{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. Два участка: общий прогноз и прогноз по месяцам */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2.1 Общий прогноз урожайности с линией тренда */}
        <div className="bg-white rounded-lg shadow p-4 h-64">
          <h3 className="font-medium mb-2">Прогноз урожайности (по годам)</h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={historicalYield} margin={{ top: 5, right: 5, left: 30, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis label={{ value: 'Урожайность (ц/га)', angle: -90, position: 'insideLeft', offset: 15, dy: 85 }} />
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

        {/* 2.2 Прогноз по месяцам */}
        <div className="bg-white rounded-lg shadow p-4 h-64">
          <h3 className="font-medium mb-2">Прогноз урожайности</h3>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={monthlyYield} margin={{ top:5, right:5, left:5, bottom:5 }}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="month"/>
              <YAxis label={{ value: 'Урожайность (ц/га)', angle: -90, position: 'insideLeft', offset: 15, dy: 85 }} />
              <Tooltip formatter={(value) => [`${value} ц/га`, '']}/>
              <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 3. Таблица прогнозов */}
      <section>
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h3 className="font-medium mb-2">Таблица прогнозов</h3>
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Месяц</th>
                <th className="p-2 text-left">Прогноз</th>
              </tr>
            </thead>
            <tbody>
              {monthlyTable.map(({ month, prediction }) => (
                <tr key={month} className="border-t">
                  <td className="p-2">{month}</td>
                  <td className="p-2">{prediction} ц/га</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Тепловая карта */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Тепловая карта прогнозов</h3>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between mb-2">
            <div className="text-sm text-gray-600">Секторы</div>
            <div className="text-sm text-gray-600">Месяцы</div>
          </div>
          <div className="flex justify-center">
            <HeatMap
              xLabels={months}
              yLabels={rowLabels}
              data={heatmapData}
              squares
              height={120}
              width={400}
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
          </div>
          <div className="mt-2 text-sm text-gray-600 text-center">
            Урожайность (ц/га)
          </div>
        </div>
      </section>

      {/* 5. Рекомендации */}
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

