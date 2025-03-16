import React, { useState } from "react";
import KeywordsTable from "../../components/KeywordsField";
import UniqueWordsTable from "../../components/UniqueWordsField";
import UsedKeywords from "../../components/UsedKeywordsField";
import MetadataForm from "../../components/MetadataForm";
import { ignoredWords } from "../../data/ignoredWords";
import { cleanPhrase } from "../../utils/helperFunction";
import * as XLSX from "xlsx";
import styles from "./MetaCreationPage.module.css";

const MetaCreationPage = () => {
  const [keywords, setKeywords] = useState([]); // Очищенные фразы и трафик
  const [usedKeywords, setUsedKeywords] = useState([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [keywordsMeta, setKeywordsMeta] = useState("");
  const [selectedTab, setSelectedTab] = useState("phrases");
  const [locales, setLocales] = useState([]);
  const [localeName, setLocaleName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [hideCollectedPhrases, setHideCollectedPhrases] = useState(false);
  const [selectedPhrases, setSelectedPhrases] = useState(new Set()); // Выбранные фразы

  // Функция для загрузки файла
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Обрабатываем данные
      const newKeywords = json
        .map((row) => ({
          phrase: row[0], // Первый столбец — фраза
          traffic: Number(row[1]) || 0, // Второй столбец — трафик
        }))
        .filter((keyword) => keyword.phrase); // Убираем пустые фразы

      // Добавляем новые фразы
      setKeywords((prevKeywords) => {
        const updatedKeywords = [...prevKeywords, ...newKeywords];
        // Сортируем по трафику (от большего к меньшему)
        return updatedKeywords.sort((a, b) => b.traffic - a.traffic);
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const getWordCounts = () => {
    const wordCounts = {};

    keywords.forEach(({ phrase }) => {
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
    const allText = `${title} ${subtitle} ${keywordsMeta}`.toLowerCase();

    return phraseWords.every((word) => allText.includes(word));
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
    const allText = `${title} ${subtitle} ${keywordsMeta}`.toLowerCase();
    const words = allText
      .replace(/[^\p{L}\p{N}]/gu, " ") // Убираем все, кроме букв и цифр
      .split(/\s+/) // Разбиваем на слова по пробелам
      .filter((word) => word.length > 0); // Убираем пустые строки (если они есть)
    return [...new Set(words)];
  };

  // Функция для добавления в использованные слова
  const addPhrasesToUsed = (phrases) => {
    // Проверяем, что массив фраз не пустой
    if (phrases.length === 0) return;

    // Добавляем фразы в список использованных
    setUsedKeywords((prevUsedKeywords) => [...prevUsedKeywords, ...phrases]);

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
  const createLocale = () => {
    if (!localeName.trim()) {
      alert("Введите название локали!");
      return;
    }

    // Создаем новую локаль
    const newLocale = {
      name: localeName,
      title,
      subtitle,
      keywords: keywordsMeta,
    };

    // Добавляем новую локаль в список локалей
    setLocales([...locales, newLocale]);

    // Находим фразы, которые использованы в локали
    const phrasesUsedInLocale = keywords
      .filter((item) => isPhraseUsed(item.phrase))
      .map((item) => item.phrase);
    // Используем универсальную функцию для добавления фраз в использованные
    addPhrasesToUsed(phrasesUsedInLocale);

    // Очищаем поля
    setTitle("");
    setSubtitle("");
    setKeywordsMeta("");
    setLocaleName("");
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

  const highlightedWords = getHighlightedWords();
  const usedPhrasesCount = countUsedPhrases(); // Количество использованных фраз (всех)
  const filteredKeywords = filterKeywords(); // Отфильтрованные ключевые фразы

  return (
    <div className={styles.container}>
      {/* Кнопка для загрузки файла */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="file"
          accept=".csv, .xlsx"
          onChange={handleFileUpload}
          style={{ display: "none" }}
          id="fileInput"
        />
        <label htmlFor="fileInput" className={styles.fileUploadLabel}>
          Загрузить из файла
        </label>
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
              wordCounts={getWordCounts()}
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
              title={title}
              subtitle={subtitle}
              keywordsMeta={keywordsMeta}
              setTitle={setTitle}
              setSubtitle={setSubtitle}
              setKeywordsMeta={setKeywordsMeta}
              keywords={keywords}
            />
            <div style={{ marginTop: "16px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                Название локали:
              </label>
              <input
                type="text"
                value={localeName}
                onChange={(e) => setLocaleName(e.target.value)}
                placeholder="Введите название локали (например, ru-RU)"
                className={styles.localeInput}
              />
            </div>
            <button onClick={createLocale} className={styles.localeButton}>
              Сформировать локаль
            </button>
            <button
              onClick={() => console.log(usedKeywords)}
              className={styles.localeButton}
            >
              proverka
            </button>
            <button
              onClick={() => console.log(selectedPhrases)}
              className={styles.localeButton}
            >
              proverka orig
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaCreationPage;
