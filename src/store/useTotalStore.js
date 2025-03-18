// src/store/useLocalesStore.js
import { create } from "zustand";

// Начальное состояние стора
const initialState = {
  locales: {},
  desc: "", // Новое состояние для описания
  usedKeywordPhrases: {}, // Новое состояние для использованных фраз
};

// Создаем хранилище
const useTotalStore = create((set, get) => ({
  ...initialState, // Изначальные данные

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
            keywordsMeta: "",
            inappTitle: "",
            inappSubtitle: "",
          }),
          title: data.title || "", // Заголовок
          subtitle: data.subtitle || "", // Подзаголовок
          keywordsMeta: data.keywordsMeta || "", // Ключевые слова
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
            keywordsMeta: "",
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
      get().locales[localeCode] || {
        id: localeCode,
        title: "",
        subtitle: "",
        keywordsMeta: "",
        inappTitle: "",
        inappSubtitle: "",
      }
    );
  },

  // Метод для обновления описания
  updateDesc: (newDesc) => set({ desc: newDesc }),

  // Метод для добавления использованных фраз
  addUsedKeywordPhrases: (localeCode, phrases) =>
    set((state) => ({
      usedKeywordPhrases: {
        ...state.usedKeywordPhrases,
        [localeCode]: [
          ...(state.usedKeywordPhrases[localeCode] || []),
          ...phrases,
        ],
      },
    })),
  // Метод для полной очистки стора
  clearStore: () => set({ ...initialState }),
}));

export default useTotalStore;
