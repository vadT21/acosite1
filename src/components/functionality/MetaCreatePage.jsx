// src/pages/MetaCreatePage/MetaCreatePage.jsx
import { useState, useMemo } from "react";
import { LOCALES } from "../../utils/constants";
import { ignoredWords } from "../../utils/ignoredWords"; // Импортируем игнорируемые слова
import LocaleSelector from "../../components/LocaleSelector/LocaleSelector";
import UniqueWordsTable from "../../components/UniqueWordsTable/UniqueWordsTable";
import KeyPhrasesTable from "../../components/KeyPhrasesTable/KeyPhrasesTable";
import LocaleForm from "../../components/LocaleForm/LocaleForm";
import useProcessedDataStore from "../../store/useProcessedDataStore";
import usePhrasesUsedStore from "../../store/usePhrasesUsedStore"; // Импортируем стор для usedPhrases
import styles from "./MetaCreatePage.module.css";

const MetaCreatePage = () => {
  const [selectedLocale, setSelectedLocale] = useState(null);
  const { processedData } = useProcessedDataStore();
  const { phrases } = usePhrasesUsedStore();

  const handleLocaleSelect = (code) => {
    const locale = LOCALES.find((loc) => loc.code === code);
    setSelectedLocale(locale);
  };

  // Получаем данные для выбранной локали
  const phrasesData = selectedLocale
    ? processedData[selectedLocale.code] || []
    : [];
  const keywordsData = selectedLocale ? phrases[selectedLocale.code] || [] : []; // Заглушка для ключевых слов

  const getUniqueWords = (data) => {
    const wordCounts = {};

    data.forEach((item) => {
      if (item.short) {
        // Разделяем текст на слова
        const words = item.short.toLowerCase().split(/\s+/);

        // Фильтруем и считаем слова
        words.forEach((word) => {
          // Убираем знаки препинания (если нужно)
          const cleanedWord = word.replace(/[^\w]/g, "");

          // Игнорируем слова из списка и пустые строки
          if (cleanedWord && !ignoredWords.includes(cleanedWord)) {
            wordCounts[cleanedWord] = (wordCounts[cleanedWord] || 0) + 1;
          }
        });
      }
    });

    // Преобразуем в массив объектов { word, count }
    const uniqueWords = Object.entries(wordCounts).map(([word, count]) => ({
      word,
      count,
    }));

    // Сортируем по количеству (от большего к меньшему)
    uniqueWords.sort((a, b) => b.count - a.count);

    return uniqueWords;
  };

  const uniqueWordsData = useMemo(() => {
    if (!selectedLocale || !processedData[selectedLocale.code]) return [];
    return getUniqueWords(processedData[selectedLocale.code]);
  }, [selectedLocale, processedData]);

  //состояние инпутов локалей
  const [localeFields, setLocaleFields] = useState({});
  const [inAppFields, setInAppFields] = useState({});
  const [changedInputStatus, setChangedInputStatus] = useState([]);

  const extractWordsByCountry = (data) => {
    const result = {};

    Object.entries(data).forEach(([country, values]) => {
      const words = new Set();

      Object.values(values).forEach((text) => {
        if (typeof text === "string") {
          text
            .replace(/[.,!?]/g, "") // Удаляем знаки препинания
            .toLowerCase()
            .split(/\s+/) // Разбиваем по пробела
            .filter((word) => word)
            .forEach((word) => words.add(word)); // Добавляем уникальные слова
        }
      });

      result[country.toLowerCase()] = [...words]; // Записываем результат в объект (в нижнем регистре)
    });

    return result;
  };

  const handleLocaleFieldChange = (localeCode, field, value) => {
    setLocaleFields((prev) => ({
      ...prev,
      [localeCode]: {
        ...prev[localeCode],
        [field]: value,
      },
    }));
    setChangedInputStatus(extractWordsByCountry(localeFields));
  };

  const handleInAppFieldChange = (localeCode, field, value) => {
    setInAppFields((prev) => ({
      ...prev,
      [localeCode]: {
        ...prev[localeCode],
        [field]: value,
      },
    }));
  };

  return (
    <div className={styles.metaCreatePage}>
      <LocaleSelector
        locales={LOCALES}
        selectedLocale={selectedLocale?.code}
        onSelect={handleLocaleSelect}
      />
      <div className={styles.content}>
        <UniqueWordsTable
          wordsData={uniqueWordsData}
          changedInputStatus={changedInputStatus}
        />
        <KeyPhrasesTable
          phrasesData={phrasesData}
          keywordsData={keywordsData}
          selectedLocale={selectedLocale}
          localeFields={localeFields}
          inAppFields={inAppFields}
        />
        <LocaleForm
          selectedLocale={selectedLocale}
          localeFields={localeFields}
          inAppFields={inAppFields}
          onLocaleFieldChange={handleLocaleFieldChange}
          onInAppFieldChange={handleInAppFieldChange}
        />
      </div>
    </div>
  );
};

export default MetaCreatePage;
