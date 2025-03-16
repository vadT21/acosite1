// Функция для очистки фразы от всех символов, кроме букв и цифр
export const cleanPhrase = (phrase) => {
  return phrase
    .replace(/[^\p{L}\p{N}]/gu, " ") // Удаляем все, кроме букв и цифр (включая Unicode)
    .replace(/\s+/g, " ") // Убираем лишние пробелы
    .trim();
};
