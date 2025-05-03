import React, { useState } from 'react'
import DRONE1 from '../../assets/DRONE1.png'
import DRONE2 from '../../assets/DRONE2.png'
import DRONE4 from '../../assets/DRONE4.png'
import FireField from '../../assets/FireField.png'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import FieldHistoryModal from './FieldHistoryModal'

const drones = [
  { id: 'drone1', name: 'Дрон 1', img: DRONE1, battery: 78, remaining: '45 мин', schedule: ['Взлет', 'Мониторинг', 'Зарядка', 'Загрузка', 'Распыление'] },
  { id: 'drone2', name: 'Дрон 2', img: DRONE2, battery: 56, remaining: '30 мин', schedule: ['Взлет', 'Мониторинг', 'Зарядка', 'Загрузка', 'Распыление'] },
  { id: 'drone3', name: 'Дрон 3', img: DRONE4, battery: 92, remaining: '60 мин', schedule: ['Взлет', 'Мониторинг', 'Зарядка', 'Загрузка', 'Распыление'] },
  { id: 'drone4', name: 'Дрон 4', img: FireField, battery: 34, remaining: '20 мин', schedule: ['Взлет', 'Мониторинг', 'Зарядка', 'Загрузка', 'Распыление'] },
  { id: 'drone5', name: 'Дрон 5', img: DRONE1, battery: 85, remaining: '50 мин', schedule: ['Взлет', 'Мониторинг', 'Зарядка', 'Загрузка', 'Распыление'] },
  { id: 'drone6', name: 'Дрон 6', img: DRONE2, battery: 42, remaining: '25 мин', schedule: ['Взлет', 'Мониторинг', 'Зарядка', 'Загрузка', 'Распыление'] },
  { id: 'drone7', name: 'Дрон 7', img: DRONE4, battery: 67, remaining: '35 мин', schedule: ['Взлет', 'Мониторинг', 'Зарядка', 'Загрузка', 'Распыление'] },
  { id: 'drone8', name: 'Дрон 8', img: FireField, battery: 91, remaining: '55 мин', schedule: ['Взлет', 'Мониторинг', 'Зарядка', 'Загрузка', 'Распыление'] },
  { id: 'drone9', name: 'Дрон 9', img: DRONE1, battery: 23, remaining: '15 мин', schedule: ['Взлет', 'Мониторинг', 'Зарядка', 'Загрузка', 'Распыление'] },
  { id: 'drone10', name: 'Дрон 10', img: DRONE2, battery: 75, remaining: '40 мин', schedule: ['Взлет', 'Мониторинг', 'Зарядка', 'Загрузка', 'Распыление'] }
]

export default function DroneFeedModule() {
  const [selected, setSelected] = useState('all')

  const filtered = selected === 'all'
    ? drones
    : drones.filter(d => d.id === selected)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Дрон-фид</h2>
      <div className="mb-4">
        <label htmlFor="drone-select" className="mr-2 font-medium">Выбор дрона:</label>
        <select
          id="drone-select"
          value={selected}
          onChange={e => setSelected(e.target.value)}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="all">Все дроны</option>
          {drones.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
      </div>

      {selected === 'all' ? (
        <div className="grid grid-cols-4 grid-rows-3 gap-1">
          {filtered.map(d => (
            <div key={d.id} className="border rounded-lg shadow p-1">
              <div className="relative h-36 mb-0.5">
                <img 
                  src={d.img} 
                  alt={d.name} 
                  className="w-full h-full object-contain rounded" 
                />
              </div>
              <div className="text-[10px]">
                <p className="font-medium mb-0.5">{d.name}</p>
                <p className="leading-tight"><span className="font-medium">Батарея:</span> {d.battery}%</p>
                <p className="leading-tight"><span className="font-medium">Осталось:</span> {d.remaining}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex space-x-4">
          <div className="w-1/3">
            <div className="relative h-64">
              <img 
                src={filtered[0].img} 
                alt={filtered[0].name} 
                className="w-full h-full object-contain rounded-lg shadow" 
              />
            </div>
          </div>
          <div className="flex-1 border rounded-lg shadow p-4">
            <h3 className="text-xl font-semibold mb-3">{filtered[0].name}</h3>
            <p className="mb-1"><span className="font-medium">Уровень батареи:</span> {filtered[0].battery}%</p>
            <p className="mb-4"><span className="font-medium">Примерное время работы:</span> {filtered[0].remaining}</p>
            <div>
              <span className="font-medium">Расписание:</span>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                {filtered[0].schedule.map((step, i) => <li key={i}>{step}</li>)}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}