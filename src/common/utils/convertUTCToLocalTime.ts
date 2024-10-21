export function convertUTCToLocalTime(utcDateString: string): string {
  const utcDate = new Date(utcDateString);

  // Получаем смещение временной зоны пользователя в минутах
  const offsetMinutes = new Date().getTimezoneOffset();

  // Добавляем смещение временной зоны пользователя к UTC времени
  utcDate.setMinutes(utcDate.getMinutes() - offsetMinutes);

  // Форматируем часы и минуты
  const hours = utcDate.getHours().toString().padStart(2, "0");
  const minutes = utcDate.getMinutes().toString().padStart(2, "0");

  // Возвращаем время в формате час:минуты
  return hours + ":" + minutes;
}
