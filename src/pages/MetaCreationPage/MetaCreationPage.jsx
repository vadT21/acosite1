import React, { useState } from "react";
import KeywordsTable from "../../components/KeywordsField";
import UniqueWordsTable from "../../components/UniqueWordsField";
import UsedKeywords from "../../components/UsedKeywordsField";
import MetadataForm from "../../components/MetadataForm";
import { ignoredWords } from "../../data/ignoredWords";
import { cleanPhrase } from "../../utils/helperFunction";
import styles from "./MetaCreationPage.module.css";
import { LOCALES } from "../../data/constants";
import LocaleSelector from "../../components/functionality/LocaleSelector";
import useDataStore from "../../store/useDataStore";
import useTotalStore from "../../store/useTotalStore";

const MetaCreationPage = () => {
  // Состояние для данных каждой локали
  const [localesData, setLocalesData] = useState({
    US: { title: "", subtitle: "", keywordsMeta: "", status: true },
    MX: { title: "", subtitle: "", keywordsMeta: "", status: true },
    RU: { title: "", subtitle: "", keywordsMeta: "", status: true },
    CH_S: { title: "", subtitle: "", keywordsMeta: "", status: true },
    CH_T: { title: "", subtitle: "", keywordsMeta: "", status: true },
    SA: { title: "", subtitle: "", keywordsMeta: "", status: true },
    BR: { title: "", subtitle: "", keywordsMeta: "", status: true },
    VI: { title: "", subtitle: "", keywordsMeta: "", status: true },
    KO: { title: "", subtitle: "", keywordsMeta: "", status: true },
    FR: { title: "", subtitle: "", keywordsMeta: "", status: true },
    UK: { title: "", subtitle: "", keywordsMeta: "", status: true },
    AU: { title: "", subtitle: "", keywordsMeta: "", status: true },
    DE: { title: "", subtitle: "", keywordsMeta: "", status: true },
    CA_EN: { title: "", subtitle: "", keywordsMeta: "", status: true },
    CA_FR: { title: "", subtitle: "", keywordsMeta: "", status: true },
  });
  // Функции для обновления данных локали
  const updateLocaleData = (localeID, newData) => {
    setLocalesData((prev) => ({
      ...prev,
      [localeID]: { ...prev[localeID], ...newData },
    }));
  };
  const setTitle = (newTitle, localID) => {
    updateLocaleData(localID, { title: newTitle });
  };
  const setSubtitle = (newSubtitle, localID) => {
    updateLocaleData(localID, { subtitle: newSubtitle });
  };
  const setKeywordsMeta = (newKeywordsMeta, localID) => {
    updateLocaleData(localID, { keywordsMeta: newKeywordsMeta });
  };
  const setStatus = (localeID, newStatus) => {
    updateLocaleData(localeID, { status: newStatus });
  };

  const [keywords, setKeywords] = useState([]); // Очищенные фразы и трафик
  const [usedKeywords, setUsedKeywords] = useState([]);

  const [selectedTab, setSelectedTab] = useState("phrases");

  const [locales, setLocales] = useState({});
  const [localeName, setLocaleName] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [hideCollectedPhrases, setHideCollectedPhrases] = useState(false);
  const [selectedPhrases, setSelectedPhrases] = useState(new Set()); // Выбранные фразы

  const [selectedLocale, setSelectedLocale] = useState(null);
  // для переключения локалей
  const handleLocaleSelect = (code) => {
    const locale = LOCALES.find((loc) => loc.code === code);
    setSelectedLocale(locale);
    updateKeywords(locale.code);
    setSelectedPhrases(new Set());
    setUsedKeywords([]);
  };

  //store
  const updateKeywords = (locale) => {
    // Получаем данные из Zustand-стора
    const storeData = useDataStore.getState().data;
    // Выбираем данные для выбранной локали
    const localeData = storeData[locale] || [];
    // Преобразуем массив, оставляя только id и traffic
    const transformedData = localeData.map((item) => ({
      phrase: item.id,
      traffic: Number(item.traffic) || 0,
    }));
    // Обновляем keywords через setKeywords
    setKeywords(transformedData);
  };

  const getWordCounts = (keywords) => {
    const wordCounts = {};
    const clearKeywords = keywords.map((item) => cleanPhrase(item.phrase));
    clearKeywords.forEach((phrase) => {
      const words = phrase.split(" ");
      words.forEach((word) => {
        if (word && !ignoredWords.includes(word.toLowerCase())) {
          wordCounts[word] = (wordCounts[word] || 0) + 1;
        }
      });
    });

    return wordCounts;
  };

  //проверка на использование фразы
  const isPhraseUsed = (phrase) => {
    const cleanedPhrase = cleanPhrase(phrase);
    const phraseWords = cleanedPhrase
      .toLowerCase()
      .split(" ")
      .filter((word) => !ignoredWords.includes(word));
    // создание массива локали чтобы сравнивать
    const createLocaleArray = (locale) => {
      const title = localesData[locale].title;
      const subtitle = localesData[locale].subtitle;
      const keywords = localesData[locale].keywordsMeta;
      const result = cleanPhrase(
        `${title} ${subtitle} ${keywords}`.toLowerCase(),
      ).split(" ");
      return result;
    };
    //создание массива для сравнения на основе условия + все массивы локалей
    const checkConditionAddArray = () => {
      const counter = selectedLocale.locales;
      const resultArray = counter
        .filter((item) => localesData[item].status)
        .map((item) => createLocaleArray(item));
      return resultArray;
    };
    const allLocalesArray = selectedLocale ? checkConditionAddArray() : [];

    return allLocalesArray.some((localeArr) =>
      phraseWords.every((word) => localeArr.includes(word)),
    );
  };

  // Функция для подсчета использованных фраз
  const countUsedPhrases = () => {
    return keywords.filter(({ phrase }) => isPhraseUsed(phrase)).length;
  };

  // Функция для фильтрации ключевых фраз по поисковому запросу
  const filterKeywords = () => {
    let filtered = keywords.filter(({ phrase }) =>
      phrase.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    // Если включено скрытие "собранных" фраз, фильтруем их
    if (hideCollectedPhrases) {
      filtered = filtered.filter(({ phrase }) => !isPhraseUsed(phrase));
    }

    return filtered;
  };

  // Функция для корректного отображения использованных слов
  const getHighlightedWords = () => {
    // создание массива локали
    const createLocaleArray = (locale) => {
      const title = localesData[locale].title;
      const subtitle = localesData[locale].subtitle;
      const keywords = localesData[locale].keywordsMeta;
      const result = cleanPhrase(
        `${title} ${subtitle} ${keywords}`.toLowerCase(),
      ).split(" ");

      return result;
    };
    const addAllLocalesArray = () => {
      const resultArray = selectedLocale.locales
        .filter((item) => localesData[item].status)
        .map((item) => createLocaleArray(item))
        .flat()
        .filter((str) => str.trim() !== ""); // Удаляем пустые строки
      return resultArray;
    };
    const allLocalesArray = selectedLocale ? addAllLocalesArray() : [];
    return [...new Set(allLocalesArray)];
  };

  // Функция для добавления в использованные слова
  const addPhrasesToUsed = (phrases) => {
    // Проверяем, что массив фраз не пустой
    if (phrases.length === 0) return;

    // Добавляем фразы в список использованных
    setUsedKeywords((prevUsedKeywords) => [...prevUsedKeywords, ...phrases]);
    //add to store
    useTotalStore
      .getState()
      .addUsedKeywordPhrases(selectedLocale.code, phrases);
    // Убираем фразы из списка keywords
    setKeywords((prevKeywords) =>
      prevKeywords.filter(({ phrase }) => !phrases.includes(phrase)),
    );
    // Убираем фразы из выбранных (selectedPhrases)
    setSelectedPhrases((prevSelected) => {
      const newSelected = new Set(prevSelected);
      phrases.forEach((phrase) => newSelected.delete(phrase)); // Удаляем каждую фразу
      return newSelected;
    });
  };

  // Создание локали
  const createLocale = (name, title, subtitle, keywordsMeta) => {
    // Добавляем новую локаль в список локалей
    const data = {
      title,
      subtitle,
      keywordsMeta,
    };
    if (localesData[name].status) {
      setLocales({
        ...locales,
        [name]: { name: name, title, subtitle, keywordsMeta },
      });

      // Находим фразы, которые использованы в локали и берем тольку фразу
      const phrasesUsedInLocale = [
        ...new Set(
          cleanPhrase(`${title} ${subtitle} ${keywordsMeta}`)
            .toLowerCase()
            .split(" ")
            .filter((word) => !ignoredWords.includes(word))
            .filter((str) => str.trim() !== ""), // Удаляем пустые строкиs
        ),
      ];

      const findPhrases = (phrasesAll, wordsUsedinLocale) => {
        // Массив для найденных фраз
        const foundPhrases = [];
        // Проходим по каждой фразе
        //
        phrasesAll.forEach((phraseObj) => {
          // Разделяем фразу на слова
          const phraseWords = cleanPhrase(phraseObj.phrase)
            .split(" ")
            .filter((word) => !ignoredWords.includes(word))
            .filter((str) => str.trim() !== ""); // Удаляем пустые строкиs
          // Проверяем, содержатся ли все слова фразы в массиве слов
          const isPhraseFound = phraseWords.every((word) =>
            wordsUsedinLocale.includes(word),
          );

          // Если фраза найдена, добавляем её в массив
          if (isPhraseFound) {
            foundPhrases.push(phraseObj.phrase);
          }
        });
        return foundPhrases;
      };
      const lastArray = findPhrases(keywords, phrasesUsedInLocale);
      //Используем универсальную функцию для добавления фраз в использованные
      addPhrasesToUsed(lastArray);
      //add to store
      useTotalStore.getState().updateLocaleTab(name, data);
      setStatus(name, false);
    }
  };

  // Функция для выбора/снятия выбора фразы
  const togglePhraseSelection = (phrase) => {
    setSelectedPhrases((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(phrase)) {
        newSelected.delete(phrase);
      } else {
        newSelected.add(phrase);
      }
      return newSelected;
    });
  };

  // Функция для удаления выбранных фраз
  const deleteSelectedPhrases = () => {
    setKeywords((prevKeywords) =>
      prevKeywords.filter(({ phrase }) => !selectedPhrases.has(phrase)),
    );
    setSelectedPhrases(new Set()); // Очищаем выбор
  };

  // Функция для удаления одной фразы
  const deleteSinglePhrase = (phraseToDelete) => {
    setKeywords((prevKeywords) =>
      prevKeywords.filter(({ phrase }) => phrase !== phraseToDelete),
    );
    setSelectedPhrases((prevSelected) => {
      const newSelected = new Set(prevSelected);
      newSelected.delete(phraseToDelete); // Удаляем фразу из выбранных
      return newSelected;
    });
  };

  const generatorKeywords = (
    name,
    title,
    subtitle,
    keywordsMeta,
    maxLength = 100,
  ) => {
    // Собираем все слова из title, subtitle и keywords в один набор
    const usingWords = new Set([
      ...cleanPhrase(title)
        .toLowerCase()
        .split(" ")
        .map((kw) => kw.trim()),

      ...cleanPhrase(subtitle)
        .toLowerCase()
        .split(" ")
        .map((kw) => kw.trim()),

      ...cleanPhrase(keywordsMeta)
        .toLowerCase()
        .split(",")
        .map((kw) => kw.trim()),
    ]);
    const wordCounts = getWordCounts(keywords);
    // Сортируем слова по убыванию количества повторений
    const sortedWords = Object.entries(wordCounts)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count);

    // Начинаем с текущих keywords
    let newKeywords = keywordsMeta.trim();
    // Проверяем, есть ли запятая в конце
    let endsWithComma = newKeywords.endsWith(",") || !newKeywords.length;
    // Проходим по отсортированным словам
    for (const { word } of sortedWords) {
      // Если слово уже использовано, пропускаем
      if (usingWords.has(word)) continue;

      // Проверяем, хватит ли места для нового слова
      const newKeywordLength =
        newKeywords.length + word.length + (endsWithComma ? 0 : 1); // +1 для запятой (если её нет)
      if (newKeywordLength <= maxLength) {
        // Добавляем слово через запятую без пробела
        newKeywords = endsWithComma
          ? `${newKeywords}${word}` // Если есть запятая, добавляем только слово
          : `${newKeywords},${word}`; // Если нет запятой, добавляем запятую и слово
        // Добавляем слово в usedWords, чтобы не повторяться
        usingWords.add(word);
        // Обновляем флаг endsWithComma
        endsWithComma = false;
      }
      // Если слово не помещается, просто пропускаем его и продолжаем цикл
    }
    return setKeywordsMeta(newKeywords, name);
  };

  const highlightedWords = getHighlightedWords();
  const usedPhrasesCount = countUsedPhrases(); // Количество использованных фраз (всех)
  const filteredKeywords = filterKeywords(); // Отфильтрованные ключевые фразы

  return (
    <div className={styles.container}>
      {/* Кнопка для выбора локалей*/}
      <div>
        <LocaleSelector
          locales={LOCALES}
          selectedLocale={selectedLocale?.code}
          onSelect={handleLocaleSelect}
        />
      </div>
      <div className={styles.panel}>
        {/*Левая часть: Таблица уникальных слов и использованных фраз */}
        <div className={styles.leftPanel}>
          <div className={styles.tabButtons}>
            <button
              onClick={() => setSelectedTab("unique")}
              className={
                selectedTab === "unique"
                  ? `${styles.tabButton} ${styles.tabButtonActive}`
                  : styles.tabButton
              }
            >
              Уникальные слова
            </button>
            <button
              onClick={() => setSelectedTab("usedKeywords")}
              className={
                selectedTab === "usedKeywords"
                  ? `${styles.tabButton} ${styles.tabButtonActive}`
                  : styles.tabButton
              }
            >
              Использованные ключевые слова
            </button>
          </div>

          {selectedTab === "unique" && (
            <UniqueWordsTable
              wordCounts={getWordCounts(keywords)}
              highlightedWords={highlightedWords}
            />
          )}
          {selectedTab === "usedKeywords" && (
            <UsedKeywords usedKeywords={usedKeywords} />
          )}
        </div>
        {/* Центр часть: Таблица ключевых фраз */}
        <div className={styles.centerPanel}>
          <KeywordsTable
            keywords={filteredKeywords}
            highlightedWords={highlightedWords}
            usedPhrasesCount={usedPhrasesCount}
            totalPhrasesCount={keywords.length}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            hideCollectedPhrases={hideCollectedPhrases}
            setHideCollectedPhrases={setHideCollectedPhrases}
            selectedPhrases={selectedPhrases}
            setSelectedPhrases={setSelectedPhrases}
            togglePhraseSelection={togglePhraseSelection}
            deleteSelectedPhrases={deleteSelectedPhrases}
            deleteSinglePhrase={deleteSinglePhrase}
            addPhrasesToUsed={addPhrasesToUsed}
          />
        </div>
        {/* Правая часть: Форма с метаданными и таблица локалей */}
        <div className={styles.rightPanel}>
          <div className={styles.section}>
            <MetadataForm
              selectedLocale={selectedLocale}
              localesData={localesData}
              setTitle={setTitle}
              setSubtitle={setSubtitle}
              setKeywordsMeta={setKeywordsMeta}
              setStatus={setStatus}
              createLocale={createLocale}
              generatorKeywords={generatorKeywords}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaCreationPage;
