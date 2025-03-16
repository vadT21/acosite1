// src/store/useDataStore.js
import { create } from "zustand"; // Исправляем импорт

// Начальные данные для каждой локали
const initialData = {};

// Создаем хранилище
const useDataStore = create((set) => ({
  data: initialData, // Изначальные данные

  // Метод для добавления элемента
  addItem: (locale, item) =>
    set((state) => ({
      data: {
        ...state.data,
        [locale]: [...(state.data[locale] || []), item], // Добавляем новый элемент
      },
    })),

  // Метод для очистки хранилища
  clearStore: () =>
    set(() => ({
      data: {}, // Очищаем все данные
    })),
}));

export default useDataStore; // Экспортируем хранилище
