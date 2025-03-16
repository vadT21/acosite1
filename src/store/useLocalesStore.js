// src/store/useLocalesStore.js
import { create } from "zustand";

// Начальное состояние стора
const initialState = {};

// Создаем хранилище
const useLocalesStore = create((set) => ({
  locales: initialState, // Изначальные данные

  // Метод для обновления данных вкладки "Locale"
  updateLocaleTab: (localeCode, data) =>
    set((state) => ({
      locales: {
        ...state.locales,
        [localeCode]: {
          ...(state.locales[localeCode] || {
            id: localeCode,
            title: "",
            subtitle: "",
            keywords: "",
            inappTitle: "",
            inappSubtitle: "",
          }),
          title: data.title || "", // Заголовок
          subtitle: data.subtitle || "", // Подзаголовок
          keywords: data.keywords || "", // Ключевые слова
        },
      },
    })),

  // Метод для обновления данных вкладки "In App"
  updateInAppTab: (localeCode, data) =>
    set((state) => ({
      locales: {
        ...state.locales,
        [localeCode]: {
          ...(state.locales[localeCode] || {
            id: localeCode,
            title: "",
            subtitle: "",
            keywords: "",
            inappTitle: "",
            inappSubtitle: "",
          }),
          inappTitle: data.inappTitle || "", // Заголовок для In App
          inappSubtitle: data.inappSubtitle || "", // Подзаголовок для In App
        },
      },
    })),

  // Метод для получения данных локали
  getLocale: (localeCode) => {
    return (
      useLocalesStore.getState().locales[localeCode] || {
        id: localeCode,
        title: "",
        subtitle: "",
        keywords: "",
        inappTitle: "",
        inappSubtitle: "",
      }
    );
  },

  // Метод для полной очистки стора
  clearStore: () => set({ locales: initialState }), // Возвращаем начальное состояние
}));

export default useLocalesStore;
