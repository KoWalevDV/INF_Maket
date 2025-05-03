// src/renderer/components/ForecastManager.jsx
import React, { useState } from 'react';
import { AlertTriangle, AlertCircle } from 'lucide-react';
import Modal from './Modal'; // допустим, у вас есть простой компонент Modal

// 1) Прогнозы по CAN-ID: теперь есть статус «предупреждение» (синий) и «сбой» (красный)
const canPredictions = [
  { id: 'CAN1', issue: 'Датчик давления', recommendation: 'Проверить давление масла и заменить фильтр', status: 'warning' },
  { id: 'CAN2', issue: 'Перегрев радиатора', recommendation: 'Почистить радиатор и проверить термостат', status: 'alert' },
  { id: 'CAN3', issue: 'Низкий уровень масла', recommendation: 'Долить масло до нормы', status: 'warning' },
  { id: 'CAN4', issue: 'Сбой насоса', recommendation: 'Проверить работу насоса смазки', status: 'alert' },
  { id: 'CAN5', issue: 'Коррозия контактов', recommendation: 'Очистить и обработать контакты антиокислителем', status: 'warning' },
];

// 2) Изначальный список задач — время окончания «–»
const initialRepairs = [
  { id: 'CAN1', issue: 'Датчик давления', action: 'Заменить фильтр и прокладки', start: '2025-05-04 09:00', end: '-', critical: false },
  { id: 'CAN2', issue: 'Перегрев радиатора', action: 'Промыть радиатор, заменить термостат', start: '2025-05-05 10:00', end: '-', critical: true },
  { id: 'CAN3', issue: 'Низкий уровень масла', action: 'Долить моторное масло', start: '2025-05-04 08:30', end: '-', critical: false },
];

// 3) Список сервисов для «записи»
const services = [
  { name: 'АгроСервис', address: 'ул. Фермеров, 12', eta: '2025-05-06 14:00' },
  { name: 'ТехноРемонт', address: 'пр. Машиностроителей, 45', eta: '2025-05-07 10:00' },
  { name: 'ПолеРемСервис', address: 'ул. Полевая, 8', eta: '2025-05-05 16:30' },
];

export default function ForecastManager() {
  const [repairs, setRepairs] = useState(initialRepairs);
  const [modal, setModal] = useState({ open: false, id: null, mode: null });
  const [selfDate, setSelfDate] = useState(new Date());
  const [selectedService, setSelectedService] = useState(null);

  const openModal = (id) => setModal({ open: true, id, mode: null });
  const closeModal = () => {
    setModal({ open: false, id: null, mode: null });
    setSelectedService(null);
  };

  const confirmSelf = () => {
    setRepairs(rs => rs.map(r => r.id === modal.id
      ? { ...r, end: selfDate.toLocaleString('ru-RU'), actionLabel: 'Самостоятельное обслуживание' }
      : r
    ));
    closeModal();
  };

  const confirmService = () => {
    const svc = services.find(s => s.name === selectedService);
    setRepairs(rs => rs.map(r => r.id === modal.id
      ? { ...r,
          end: svc.eta,
          actionLabel: svc.name + ', ' + svc.address
        }
      : r
    ));
    closeModal();
  };

  return (
    <div className="space-y-8">
      {/* Прогнозирование поломок */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Прогнозирование поломок</h2>
        {canPredictions.map(p => (
          <div
            key={p.id}
            className={
              p.status === 'alert'
                ? 'flex items-center p-3 mb-2 rounded-lg bg-red-100 text-red-800'
                : 'flex items-center p-3 mb-2 rounded-lg bg-blue-100 text-blue-800'
            }
          >
            {p.status === 'alert' ? (
              <AlertCircle className="w-6 h-6 mr-3 text-red-600" />
            ) : (
              <AlertTriangle className="w-6 h-6 mr-3 text-blue-600" />
            )}
            <div className="flex-1">
              <span className="font-semibold">{p.id}</span>:&nbsp;
              <span className="italic">{p.issue}</span>&nbsp;— рекомендация:&nbsp;
              <span>{p.recommendation}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Запланированные ремонтные работы */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Запланированные ремонтные работы</h2>
        <div className="space-y-4">
          {repairs.map(r => (
            <div
              key={r.id}
              className={`bg-white p-4 rounded-lg shadow flex justify-between items-start ${
                r.critical ? 'border-l-4 border-red-500' : ''
              }`}
            >
              <div className="flex-1">
                <p><strong>{r.id}</strong> — <em>{r.issue}</em></p>
                <p>Что сделать: {r.action}</p>
              </div>
              <div className="text-right space-y-1">
                <p>Начало: {r.start}</p>
                <p>Окончание: {r.end}</p>
                {!r.actionLabel ? (
                  <button
                    onClick={() => openModal(r.id)}
                    className="mt-2 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    Ремонт
                  </button>
                ) : (
                  <span className="mt-2 text-blue-600">{r.actionLabel}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Модальное окно */}
      {modal.open && (
        <Modal onClose={closeModal}>
          {modal.mode == null && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Выберите способ ремонта</h3>
              <button
                className="w-full py-2 bg-blue-500 text-white rounded"
                onClick={() => setModal(m => ({ ...m, mode: 'self' }))}
              >Самостоятельно</button>
              <button
                className="w-full py-2 bg-green-500 text-white rounded"
                onClick={() => setModal(m => ({ ...m, mode: 'booking' }))}
              >Запись в сервис</button>
            </div>
          )}

{modal.mode === 'self' && (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Выберите дату окончания</h3>
    <input
      type="datetime-local"
      value={selfDate.toISOString().slice(0,16)}
      onChange={e => {
        const dt = new Date(e.target.value);
        setSelfDate(dt);
      }}
      className="w-full border p-2 rounded"
    />
    <button
      className="w-full py-2 bg-blue-500 text-white rounded"
      onClick={confirmSelf}
    >
      Подтвердить
    </button>
  </div>
)}

          {modal.mode === 'booking' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Выберите сервис</h3>
              {services.map(s => (
                <div key={s.name} className="border p-2 rounded hover:bg-gray-100">
                  <button
                    className="w-full text-left"
                    onClick={() => setSelectedService(s.name)}
                  >{s.name}</button>
                  {selectedService === s.name && (
                    <div className="mt-2 p-2 bg-gray-50 rounded space-y-1">
                      <p>Адрес: {s.address}</p>
                      <p>Окончание: {s.eta}</p>
                      <button
                        className="mt-2 py-1 px-3 bg-green-500 text-white rounded"
                        onClick={confirmService}
                      >Подтвердить</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
