import React from 'react';
import { X } from 'lucide-react';

const fieldHistoryData = [
  {
    id: 1,
    fieldNumber: "Поле-1",
    cropType: "Пшеница",
    cropRotation: "Пшеница-Кукуруза-Соя",
    fertilizers: "NPK 16:16:16, 300 кг/га",
    previousYield: "45 ц/га",
    costs: "25000 ₽/га",
    diseases: "Ржавчина (5% поражения)",
    weather: {
      current: "Температура: 22°C, Осадки: 5мм, Ветер: 3м/с",
      forecast: "Ясно, +25°C",
      historical: "Средняя температура: 20°C"
    },
    equipment: "Трактор МТЗ-82, Сеялка СЗ-3.6"
  },
  {
    id: 2,
    fieldNumber: "Поле-2",
    cropType: "Кукуруза",
    cropRotation: "Кукуруза-Соя-Пшеница",
    fertilizers: "Аммофос, 250 кг/га",
    previousYield: "85 ц/га",
    costs: "30000 ₽/га",
    diseases: "Нет",
    weather: {
      current: "Температура: 24°C, Осадки: 0мм, Ветер: 2м/с",
      forecast: "Облачно, +23°C",
      historical: "Средняя температура: 22°C"
    },
    equipment: "Трактор К-744, Культиватор КПС-4"
  },
  {
    id: 3,
    fieldNumber: "Поле-3",
    cropType: "Соя",
    cropRotation: "Соя-Пшеница-Кукуруза",
    fertilizers: "Сульфат аммония, 200 кг/га",
    previousYield: "28 ц/га",
    costs: "28000 ₽/га",
    diseases: "Аскохитоз (3% поражения)",
    weather: {
      current: "Температура: 25°C, Осадки: 2мм, Ветер: 4м/с",
      forecast: "Дождь, +20°C",
      historical: "Средняя температура: 23°C"
    },
    equipment: "Трактор Т-150, Опрыскиватель ОП-2000"
  },
  {
    id: 4,
    fieldNumber: "Поле-4",
    cropType: "Подсолнечник",
    cropRotation: "Подсолнечник-Пшеница-Кукуруза",
    fertilizers: "Диаммофоска, 350 кг/га",
    previousYield: "32 ц/га",
    costs: "32000 ₽/га",
    diseases: "Нет",
    weather: {
      current: "Температура: 26°C, Осадки: 0мм, Ветер: 3м/с",
      forecast: "Ясно, +28°C",
      historical: "Средняя температура: 24°C"
    },
    equipment: "Трактор МТЗ-1221, Сеялка СУПН-8"
  },
  {
    id: 5,
    fieldNumber: "Поле-5",
    cropType: "Рапс",
    cropRotation: "Рапс-Пшеница-Соя",
    fertilizers: "Азофоска, 280 кг/га",
    previousYield: "38 ц/га",
    costs: "35000 ₽/га",
    diseases: "Альтернариоз (2% поражения)",
    weather: {
      current: "Температура: 23°C, Осадки: 3мм, Ветер: 2м/с",
      forecast: "Облачно, +22°C",
      historical: "Средняя температура: 21°C"
    },
    equipment: "Трактор К-700, Культиватор КПШ-5"
  },
  {
    id: 6,
    fieldNumber: "Поле-6",
    cropType: "Ячмень",
    cropRotation: "Ячмень-Кукуруза-Пшеница",
    fertilizers: "Аммиачная селитра, 250 кг/га",
    previousYield: "42 ц/га",
    costs: "22000 ₽/га",
    diseases: "Нет",
    weather: {
      current: "Температура: 21°C, Осадки: 4мм, Ветер: 3м/с",
      forecast: "Дождь, +19°C",
      historical: "Средняя температура: 20°C"
    },
    equipment: "Трактор МТЗ-82, Сеялка СЗ-3.6"
  },
  {
    id: 7,
    fieldNumber: "Поле-7",
    cropType: "Горох",
    cropRotation: "Горох-Пшеница-Кукуруза",
    fertilizers: "Суперфосфат, 200 кг/га",
    previousYield: "35 ц/га",
    costs: "26000 ₽/га",
    diseases: "Аскохитоз (4% поражения)",
    weather: {
      current: "Температура: 22°C, Осадки: 2мм, Ветер: 2м/с",
      forecast: "Ясно, +24°C",
      historical: "Средняя температура: 21°C"
    },
    equipment: "Трактор Т-150, Сеялка СЗП-3.6"
  },
  {
    id: 8,
    fieldNumber: "Поле-8",
    cropType: "Овес",
    cropRotation: "Овес-Соя-Пшеница",
    fertilizers: "NPK 15:15:15, 280 кг/га",
    previousYield: "40 ц/га",
    costs: "24000 ₽/га",
    diseases: "Нет",
    weather: {
      current: "Температура: 20°C, Осадки: 5мм, Ветер: 4м/с",
      forecast: "Облачно, +21°C",
      historical: "Средняя температура: 19°C"
    },
    equipment: "Трактор МТЗ-82, Сеялка СЗ-3.6"
  },
  {
    id: 9,
    fieldNumber: "Поле-9",
    cropType: "Лен",
    cropRotation: "Лен-Пшеница-Кукуруза",
    fertilizers: "Аммофос, 220 кг/га",
    previousYield: "18 ц/га",
    costs: "30000 ₽/га",
    diseases: "Фузариоз (3% поражения)",
    weather: {
      current: "Температура: 23°C, Осадки: 1мм, Ветер: 3м/с",
      forecast: "Ясно, +25°C",
      historical: "Средняя температура: 22°C"
    },
    equipment: "Трактор К-744, Сеялка СЗЛ-3.6"
  },
  {
    id: 10,
    fieldNumber: "Поле-10",
    cropType: "Гречиха",
    cropRotation: "Гречиха-Пшеница-Соя",
    fertilizers: "Азофоска, 250 кг/га",
    previousYield: "22 ц/га",
    costs: "28000 ₽/га",
    diseases: "Нет",
    weather: {
      current: "Температура: 24°C, Осадки: 0мм, Ветер: 2м/с",
      forecast: "Облачно, +23°C",
      historical: "Средняя температура: 22°C"
    },
    equipment: "Трактор МТЗ-1221, Сеялка СЗ-3.6"
  },
  {
    id: 11,
    fieldNumber: "Поле-11",
    cropType: "Чечевица",
    cropRotation: "Чечевица-Кукуруза-Пшеница",
    fertilizers: "Суперфосфат, 200 кг/га",
    previousYield: "25 ц/га",
    costs: "32000 ₽/га",
    diseases: "Аскохитоз (2% поражения)",
    weather: {
      current: "Температура: 25°C, Осадки: 2мм, Ветер: 3м/с",
      forecast: "Дождь, +20°C",
      historical: "Средняя температура: 23°C"
    },
    equipment: "Трактор Т-150, Сеялка СЗП-3.6"
  },
  {
    id: 12,
    fieldNumber: "Поле-12",
    cropType: "Нут",
    cropRotation: "Нут-Пшеница-Кукуруза",
    fertilizers: "Аммофос, 280 кг/га",
    previousYield: "28 ц/га",
    costs: "35000 ₽/га",
    diseases: "Нет",
    weather: {
      current: "Температура: 26°C, Осадки: 0мм, Ветер: 2м/с",
      forecast: "Ясно, +27°C",
      historical: "Средняя температура: 24°C"
    },
    equipment: "Трактор К-700, Сеялка СЗ-3.6"
  },
  {
    id: 13,
    fieldNumber: "Поле-13",
    cropType: "Люпин",
    cropRotation: "Люпин-Соя-Пшеница",
    fertilizers: "NPK 16:16:16, 250 кг/га",
    previousYield: "30 ц/га",
    costs: "30000 ₽/га",
    diseases: "Антракноз (3% поражения)",
    weather: {
      current: "Температура: 23°C, Осадки: 3мм, Ветер: 4м/с",
      forecast: "Облачно, +22°C",
      historical: "Средняя температура: 21°C"
    },
    equipment: "Трактор МТЗ-82, Сеялка СЗ-3.6"
  },
  {
    id: 14,
    fieldNumber: "Поле-14",
    cropType: "Вика",
    cropRotation: "Вика-Пшеница-Кукуруза",
    fertilizers: "Азофоска, 220 кг/га",
    previousYield: "32 ц/га",
    costs: "28000 ₽/га",
    diseases: "Нет",
    weather: {
      current: "Температура: 24°C, Осадки: 1мм, Ветер: 3м/с",
      forecast: "Ясно, +25°C",
      historical: "Средняя температура: 22°C"
    },
    equipment: "Трактор К-744, Сеялка СЗ-3.6"
  },
  {
    id: 15,
    fieldNumber: "Поле-15",
    cropType: "Кормовые бобы",
    cropRotation: "Бобы-Кукуруза-Пшеница",
    fertilizers: "Аммиачная селитра, 300 кг/га",
    previousYield: "40 ц/га",
    costs: "32000 ₽/га",
    diseases: "Аскохитоз (2% поражения)",
    weather: {
      current: "Температура: 22°C, Осадки: 4мм, Ветер: 2м/с",
      forecast: "Дождь, +19°C",
      historical: "Средняя температура: 20°C"
    },
    equipment: "Трактор Т-150, Сеялка СЗП-3.6"
  }
];

export default function FieldHistoryModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-7xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">История полей</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left border">Номер поля</th>
                <th className="p-3 text-left border">Тип культуры</th>
                <th className="p-3 text-left border">Схема севооборота</th>
                <th className="p-3 text-left border">Удобрения</th>
                <th className="p-3 text-left border">Урожайность</th>
                <th className="p-3 text-left border">Затраты</th>
                <th className="p-3 text-left border">Болезни</th>
                <th className="p-3 text-left border">Текущая погода</th>
                <th className="p-3 text-left border">Прогноз</th>
                <th className="p-3 text-left border">Исторические данные</th>
                <th className="p-3 text-left border">Техника</th>
              </tr>
            </thead>
            <tbody>
              {fieldHistoryData.map((field) => (
                <tr key={field.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{field.fieldNumber}</td>
                  <td className="p-3 border">{field.cropType}</td>
                  <td className="p-3 border">{field.cropRotation}</td>
                  <td className="p-3 border">{field.fertilizers}</td>
                  <td className="p-3 border">{field.previousYield}</td>
                  <td className="p-3 border">{field.costs}</td>
                  <td className="p-3 border">{field.diseases}</td>
                  <td className="p-3 border">{field.weather.current}</td>
                  <td className="p-3 border">{field.weather.forecast}</td>
                  <td className="p-3 border">{field.weather.historical}</td>
                  <td className="p-3 border">{field.equipment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 