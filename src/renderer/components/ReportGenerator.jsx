import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Регистрируем шрифт с поддержкой кириллицы
Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf'
});

// Стили для PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Roboto'
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Roboto'
  },
  section: {
    margin: 10,
    padding: 10,
    fontFamily: 'Roboto'
  },
  signature: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'Roboto'
  },
  signatureLine: {
    width: 200,
    borderBottom: '1px solid black',
    marginBottom: 5,
    fontFamily: 'Roboto'
  }
});

// Шаблоны отчетов по ролям
const reportTemplates = {
  DroneOperator: [
    {
      id: 'monitoring',
      title: 'Отчет о проведении мониторинговых мероприятий',
      template: (data) => (
        <Document>
          <Page size="A4" style={styles.page}>
            <Text style={styles.header}>{data.title}</Text>
            <View style={styles.section}>
              <Text>Период: {data.period}</Text>
              <Text>Ответственный: {data.author}</Text>
              <Text>Выполненные облеты: 12</Text>
              <Text>Общая площадь облета: 450 га</Text>
              <Text>Выявленные аномалии: 3</Text>
              <Text>Средняя высота полета: 50 м</Text>
              <Text>Время в воздухе: 4.5 часа</Text>
              <Text>Заряды батарей: 8</Text>
            </View>
            <View style={styles.signature}>
              <View>
                <Text style={styles.signatureLine}>Подпись</Text>
                <Text>{data.author}</Text>
              </View>
            </View>
          </Page>
        </Document>
      )
    },
    {
      id: 'field_processing',
      title: 'Отчет о обработке полей',
      template: (data) => (
        <Document>
          <Page size="A4" style={styles.page}>
            <Text style={styles.header}>{data.title}</Text>
            <View style={styles.section}>
              <Text>Период: {data.period}</Text>
              <Text>Ответственный: {data.author}</Text>
              <Text>Обработано секторов: 5</Text>
              <Text>Общая площадь: 250 га</Text>
              <Text>Тип обработки: Опрыскивание</Text>
              <Text>Расход препарата: 2.5 л/га</Text>
              <Text>Время обработки: 3 часа</Text>
              <Text>Погодные условия: Ясно, ветер 3 м/с</Text>
            </View>
            <View style={styles.signature}>
              <View>
                <Text style={styles.signatureLine}>Подпись</Text>
                <Text>{data.author}</Text>
              </View>
            </View>
          </Page>
        </Document>
      )
    }
  ],
  Agronomist: [
    {
      id: 'monitoring_summary',
      title: 'Общий отчет показателей мониторинговых мероприятий',
      template: (data) => (
        <Document>
          <Page size="A4" style={styles.page}>
            <Text style={styles.header}>{data.title}</Text>
            <View style={styles.section}>
              <Text>Период: {data.period}</Text>
              <Text>Ответственный: {data.author}</Text>
              <Text>Средний NDVI: 0.75</Text>
              <Text>Влажность почвы: 65%</Text>
              <Text>Температура почвы: 18°C</Text>
              <Text>Содержание азота: 45 кг/га</Text>
              <Text>Содержание фосфора: 30 кг/га</Text>
              <Text>Содержание калия: 120 кг/га</Text>
              <Text>pH почвы: 6.8</Text>
            </View>
            <View style={styles.signature}>
              <View>
                <Text style={styles.signatureLine}>Подпись</Text>
                <Text>{data.author}</Text>
              </View>
            </View>
          </Page>
        </Document>
      )
    },
    {
      id: 'field_condition',
      title: 'Общий отчет показателей плодородности и состояния поля',
      template: (data) => (
        <Document>
          <Page size="A4" style={styles.page}>
            <Text style={styles.header}>{data.title}</Text>
            <View style={styles.section}>
              <Text>Период: {data.period}</Text>
              <Text>Ответственный: {data.author}</Text>
              <Text>Тип почвы: Чернозем</Text>
              <Text>Глубина пахотного слоя: 30 см</Text>
              <Text>Содержание гумуса: 4.2%</Text>
              <Text>Плотность почвы: 1.2 г/см³</Text>
              <Text>Водопроницаемость: 120 мм/час</Text>
              <Text>Запасы влаги: 180 мм</Text>
              <Text>Эрозионные процессы: Отсутствуют</Text>
            </View>
            <View style={styles.signature}>
              <View>
                <Text style={styles.signatureLine}>Подпись</Text>
                <Text>{data.author}</Text>
              </View>
            </View>
          </Page>
        </Document>
      )
    },
    {
      id: 'forecast',
      title: 'Отчет о прогнозировании и мероприятиях рекомендованных',
      template: (data) => (
        <Document>
          <Page size="A4" style={styles.page}>
            <Text style={styles.header}>{data.title}</Text>
            <View style={styles.section}>
              <Text>Период: {data.period}</Text>
              <Text>Ответственный: {data.author}</Text>
              <Text>Прогноз урожайности: 45 ц/га</Text>
              <Text>Рекомендуемые удобрения: N-60, P-40, K-80</Text>
              <Text>Сроки внесения: 15-20 мая</Text>
              <Text>Рекомендуемые препараты: Гербицид А, Инсектицид Б</Text>
              <Text>Сроки обработки: 25-30 мая</Text>
              <Text>Прогноз осадков: 40 мм</Text>
              <Text>Риски: Средние</Text>
            </View>
            <View style={styles.signature}>
              <View>
                <Text style={styles.signatureLine}>Подпись</Text>
                <Text>{data.author}</Text>
              </View>
            </View>
          </Page>
        </Document>
      )
    }
  ],
  Manager: [
    {
      id: 'equipment',
      title: 'Отчет о состоянии технических средств',
      template: (data) => (
        <Document>
          <Page size="A4" style={styles.page}>
            <Text style={styles.header}>{data.title}</Text>
            <View style={styles.section}>
              <Text>Период: {data.period}</Text>
              <Text>Ответственный: {data.author}</Text>
              <Text>Трактор МТЗ-82: 95% исправности</Text>
              <Text>Комбайн К-744: 88% исправности</Text>
              <Text>Опрыскиватель: 92% исправности</Text>
              <Text>Плановая замена масла: 2 ед.</Text>
              <Text>Заменены фильтры: 5 ед.</Text>
              <Text>Текущие ремонты: 1 ед.</Text>
              <Text>Простой техники: 12 часов</Text>
            </View>
            <View style={styles.signature}>
              <View>
                <Text style={styles.signatureLine}>Подпись</Text>
                <Text>{data.author}</Text>
              </View>
            </View>
          </Page>
        </Document>
      )
    },
    {
      id: 'maintenance',
      title: 'Отчет о тратах на обслуживание техники',
      template: (data) => (
        <Document>
          <Page size="A4" style={styles.page}>
            <Text style={styles.header}>{data.title}</Text>
            <View style={styles.section}>
              <Text>Период: {data.period}</Text>
              <Text>Ответственный: {data.author}</Text>
              <Text>Затраты на ГСМ: 150,000 ₽</Text>
              <Text>Затраты на запчасти: 45,000 ₽</Text>
              <Text>Затраты на масла: 25,000 ₽</Text>
              <Text>Затраты на фильтры: 15,000 ₽</Text>
              <Text>Затраты на ремонт: 35,000 ₽</Text>
              <Text>Общие затраты: 270,000 ₽</Text>
              <Text>Экономия: 30,000 ₽</Text>
            </View>
            <View style={styles.signature}>
              <View>
                <Text style={styles.signatureLine}>Подпись</Text>
                <Text>{data.author}</Text>
              </View>
            </View>
          </Page>
        </Document>
      )
    },
    {
      id: 'forecast_efficiency',
      title: 'Отчет о эффективности прогнозирования поломок',
      template: (data) => (
        <Document>
          <Page size="A4" style={styles.page}>
            <Text style={styles.header}>{data.title}</Text>
            <View style={styles.section}>
              <Text>Период: {data.period}</Text>
              <Text>Ответственный: {data.author}</Text>
              <Text>Всего прогнозов: 15</Text>
              <Text>Точных прогнозов: 12</Text>
              <Text>Точность прогноза: 80%</Text>
              <Text>Предотвращено поломок: 8</Text>
              <Text>Экономия на ремонте: 120,000 ₽</Text>
              <Text>Среднее время простоя: 4 часа</Text>
              <Text>Эффективность системы: 85%</Text>
            </View>
            <View style={styles.signature}>
              <View>
                <Text style={styles.signatureLine}>Подпись</Text>
                <Text>{data.author}</Text>
              </View>
            </View>
          </Page>
        </Document>
      )
    }
  ]
};

export default function ReportGenerator({ userRole }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [author, setAuthor] = useState('');
  const [period, setPeriod] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Добавляем состояние для списка отчетов
  const [reports] = useState([
    {
      id: 1,
      title: 'Отчет о проведении мониторинговых мероприятий',
      author: 'Иванов И.И.',
      period: '2025-05-01 - 2025-05-07',
      createdAt: '2025-05-07 15:30'
    },
    {
      id: 2,
      title: 'Отчет о состоянии технических средств',
      author: 'Петров П.П.',
      period: '2025-05-01 - 2025-05-07',
      createdAt: '2025-05-07 14:15'
    },
    {
      id: 3,
      title: 'Общий отчет показателей мониторинговых мероприятий',
      author: 'Сидоров С.С.',
      period: '2025-05-01 - 2025-05-07',
      createdAt: '2025-05-07 13:45'
    }
  ]);

  const templates = reportTemplates[userRole] || [];

  const handleGenerate = () => {
    if (!selectedTemplate || !author || !startDate || !endDate) return;
    setPeriod(`${startDate} - ${endDate}`);
  };

  return (
    <div className="p-4 space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Создание отчета
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Выберите шаблон отчета
            </label>
            <select
              className="w-full p-2 border rounded-lg"
              value={selectedTemplate?.id || ''}
              onChange={(e) => setSelectedTemplate(templates.find(t => t.id === e.target.value))}
            >
              <option value="">Выберите шаблон</option>
              {templates.map(template => (
                <option key={template.id} value={template.id}>
                  {template.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ФИО ответственного
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Введите ФИО"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Дата начала периода
              </label>
              <input
                type="date"
                className="w-full p-2 border rounded-lg"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Дата окончания периода
              </label>
              <input
                type="date"
                className="w-full p-2 border rounded-lg"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {selectedTemplate && author && startDate && endDate && (
            <PDFDownloadLink
              document={selectedTemplate.template({
                title: selectedTemplate.title,
                author,
                period: `${startDate} - ${endDate}`
              })}
              fileName={`${selectedTemplate.title}_${startDate}_${endDate}.pdf`}
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {({ loading }) => (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  {loading ? 'Загрузка...' : 'Скачать отчет'}
                </>
              )}
            </PDFDownloadLink>
          )}
        </div>
      </div>

      {/* Список созданных отчетов */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Созданные отчеты
        </h2>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Автор</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Период</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Создан</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.period}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.createdAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900">Скачать</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 