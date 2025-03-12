import React, { useState } from "react";
import KeywordsTable from "./components/KeywordsTable";
import UniqueWordsTable from "./components/UniqueWordsTable";
import UsedKeywords from "./components/UsedKeywords";
import MetadataForm from "./components/MetadataForm";
import AddKeywordsForm from "./components/AddKeywordsForm";
import LocalesTable from "./components/LocalesTable";
import IgnoredWordsManager from "./components/IgnoredWordsManager";
import ignoredWords from "./data/ignoredWords";
import * as XLSX from "xlsx";

const App = () => {
  const [keywords, setKeywords] = useState([]); // Очищенные фразы и трафик
  const [originalKeywords, setOriginalKeywords] = useState([]); // Изначальные фразы
  const [usedKeywords, setUsedKeywords] = useState([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [keywordsMeta, setKeywordsMeta] = useState("");
  const [selectedTab, setSelectedTab] = useState("phrases");
  const [locales, setLocales] = useState([]);
  const [localeName, setLocaleName] = useState("");
  const [ignoredWordsList, setIgnoredWordsList] = useState(ignoredWords);
  const [searchQuery, setSearchQuery] = useState("");
  const [hideCollectedPhrases, setHideCollectedPhrases] = useState(false); // Состояние для скрытия "собранных" фраз

  // Функция для очистки фразы от всех символов, кроме букв и цифр
  const cleanPhrase = (phrase) => {
    return phrase
      .replace(/[^\p{L}\p{N}]/gu, " ") // Удаляем все, кроме букв и цифр (включая Unicode)
      .replace(/\s+/g, " ") // Убираем лишние пробелы
      .trim();
  };

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
          phrase: cleanPhrase(row[0]), // Первый столбец — фраза
          traffic: Number(row[1]) || 0, // Второй столбец — трафик
        }))
        .filter((keyword) => keyword.phrase); // Убираем пустые фразы

      // Добавляем новые фразы
      setKeywords((prevKeywords) => {
        const updatedKeywords = [...prevKeywords, ...newKeywords];
        // Сортируем по трафику (от большего к меньшему)
        return updatedKeywords.sort((a, b) => b.traffic - a.traffic);
      });

      // Сохраняем изначальные фразы
      setOriginalKeywords((prevOriginalKeywords) => [
        ...prevOriginalKeywords,
        ...newKeywords.map((keyword) => keyword.phrase),
      ]);
    };
    reader.readAsArrayBuffer(file);
  };

  const addKeywords = (newKeywords) => {
    const cleanedKeywords = newKeywords.map((keyword) => cleanPhrase(keyword));
    const uniqueKeywords = cleanedKeywords.filter(
      (keyword) => !keywords.some((k) => k.phrase === keyword),
    );

    if (uniqueKeywords.length > 0) {
      const newKeywordsWithTraffic = uniqueKeywords.map((phrase) => ({
        phrase,
        traffic: 0, // По умолчанию трафик 0
      }));

      setKeywords((prevKeywords) => {
        const updatedKeywords = [...prevKeywords, ...newKeywordsWithTraffic];
        // Сортируем по трафику (от большего к меньшему)
        return updatedKeywords.sort((a, b) => b.traffic - a.traffic);
      });

      setOriginalKeywords((prevOriginalKeywords) => [
        ...prevOriginalKeywords,
        ...uniqueKeywords,
      ]);
    }
  };

  const getWordCounts = () => {
    const wordCounts = {};

    keywords.forEach(({ phrase }) => {
      const words = phrase.split(" ");
      words.forEach((word) => {
        if (word && !ignoredWordsList.includes(word.toLowerCase())) {
          wordCounts[word] = (wordCounts[word] || 0) + 1;
        }
      });
    });

    return wordCounts;
  };

  const isPhraseUsed = (phrase) => {
    const cleanedPhrase = cleanPhrase(phrase);
    const phraseWords = cleanedPhrase
      .toLowerCase()
      .split(" ")
      .filter((word) => !ignoredWordsList.includes(word));
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

  const getHighlightedWords = () => {
    const allText = `${title} ${subtitle} ${keywordsMeta}`.toLowerCase();
    const words = allText.split(/\s+/);
    return [...new Set(words)];
  };

  const createLocale = () => {
    if (!localeName.trim()) {
      alert("Введите название локали!");
      return;
    }

    const newLocale = {
      name: localeName,
      title,
      subtitle,
      keywords: keywordsMeta,
    };

    setLocales([...locales, newLocale]);

    // Находим фразы, которые использованы в локали
    const phrasesUsedInLocale = originalKeywords.filter((phrase) =>
      isPhraseUsed(phrase),
    );

    // Добавляем использованные фразы в список usedKeywords
    setUsedKeywords([...usedKeywords, ...phrasesUsedInLocale]);

    // Убираем использованные фразы из списка keywords и originalKeywords
    setKeywords((prevKeywords) =>
      prevKeywords.filter(
        ({ phrase }) => !phrasesUsedInLocale.includes(phrase),
      ),
    );
    setOriginalKeywords((prevOriginalKeywords) =>
      prevOriginalKeywords.filter(
        (phrase) => !phrasesUsedInLocale.includes(phrase),
      ),
    );

    // Очищаем поля
    setTitle("");
    setSubtitle("");
    setKeywordsMeta("");
    setLocaleName("");
  };

  const highlightedWords = getHighlightedWords();
  const usedPhrasesCount = countUsedPhrases(); // Количество использованных фраз (всех)
  const filteredKeywords = filterKeywords(); // Отфильтрованные ключевые фразы

  // Сортируем использованные фразы по алфавиту
  const sortedUsedKeywords = [...usedKeywords].sort((a, b) =>
    a.localeCompare(b),
  );

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Левая часть: Кнопка "Добавить ключевые слова" и таблицы */}
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: "20px" }}>
          <AddKeywordsForm addKeywords={addKeywords} />
        </div>

        {/* Кнопка для загрузки файла */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="file"
            accept=".csv, .xlsx"
            onChange={handleFileUpload}
            style={{ display: "none" }}
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            style={{
              padding: "10px 16px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Загрузить из файла
          </label>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <IgnoredWordsManager ignoredWords={ignoredWordsList} />
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
          }}
        >
          <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
            <button
              onClick={() => setSelectedTab("phrases")}
              style={{
                padding: "8px 16px",
                backgroundColor:
                  selectedTab === "phrases" ? "#007bff" : "#f5f5f5",
                color: selectedTab === "phrases" ? "#fff" : "#333",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Ключевые фразы
            </button>
            <button
              onClick={() => setSelectedTab("words")}
              style={{
                padding: "8px 16px",
                backgroundColor:
                  selectedTab === "words" ? "#007bff" : "#f5f5f5",
                color: selectedTab === "words" ? "#fff" : "#333",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Уникальные слова
            </button>
            <button
              onClick={() => setSelectedTab("usedKeywords")}
              style={{
                padding: "8px 16px",
                backgroundColor:
                  selectedTab === "usedKeywords" ? "#007bff" : "#f5f5f5",
                color: selectedTab === "usedKeywords" ? "#fff" : "#333",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Использованные ключевые слова
            </button>
          </div>

          {selectedTab === "phrases" && (
            <KeywordsTable
              keywords={filteredKeywords}
              highlightedWords={highlightedWords}
              usedPhrasesCount={usedPhrasesCount}
              totalPhrasesCount={keywords.length}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              hideCollectedPhrases={hideCollectedPhrases}
              setHideCollectedPhrases={setHideCollectedPhrases}
            />
          )}
          {selectedTab === "words" && (
            <UniqueWordsTable
              wordCounts={getWordCounts()}
              highlightedWords={highlightedWords}
            />
          )}
          {selectedTab === "usedKeywords" && (
            <UsedKeywords usedKeywords={sortedUsedKeywords} />
          )}
        </div>
      </div>

      {/* Правая часть: Форма с метаданными и таблица локалей */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
          }}
        >
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
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "16px",
              }}
            />
          </div>
          <button
            onClick={createLocale}
            style={{
              marginTop: "16px",
              padding: "10px 16px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Сформировать локаль
          </button>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
          }}
        >
          <LocalesTable locales={locales} />
        </div>
      </div>
    </div>
  );
};

export default App;
