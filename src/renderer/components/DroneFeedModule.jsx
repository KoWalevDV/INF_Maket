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
  { id: 'drone4', name: 'Дрон 4', img: FireField, battery: 34, remaining: '20 мин', schedule: ['Взлет', 'Мониторинг', 'Зарядка', 'Загрузка', 'Распыление'] }
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
        <div className="grid grid-cols-2 gap-4">
          {filtered.map(d => (
            <div key={d.id} className="border rounded-lg shadow p-3 max-w-md">
              <div className="relative h-48">
                <img 
                  src={d.img} 
                  alt={d.name} 
                  className="w-full h-full object-contain rounded" 
                />
              </div>
              <div className="mt-2 text-sm">
                <p><span className="font-medium">Батарея:</span> {d.battery}%</p>
                <p><span className="font-medium">Осталось:</span> {d.remaining}</p>
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