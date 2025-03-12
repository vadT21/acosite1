import React, { useState } from "react";

const MetadataForm = ({
  title,
  subtitle,
  keywordsMeta,
  setTitle,
  setSubtitle,
  setKeywordsMeta,
  keywords,
}) => {
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  // Функция для копирования текста
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setShowCopyNotification(true);
    setTimeout(() => setShowCopyNotification(false), 2000);
  };

  // Функция для очистки поля
  const handleClear = (setter) => {
    setter("");
  };

  // Функция для генерации ключевых слов с учетом лимита в 100 символов
  const generateKeywords = () => {
    // 1. Собрать все слова из ключевых фраз и привести к нижнему регистру
    const allWords = keywords.flatMap((phrase) =>
      phrase.split(" ").map((word) => word.toLowerCase()),
    );

    // 2. Подсчитать частоту каждого слова
    const wordCounts = {};
    allWords.forEach((word) => {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });

    // 3. Исключить слова, которые уже есть в title и subtitle (также приведены к нижнему регистру)
    const excludedWords = new Set([
      ...title.toLowerCase().split(" "),
      ...subtitle.toLowerCase().split(" "),
    ]);
    const filteredWords = Object.keys(wordCounts).filter(
      (word) => !excludedWords.has(word),
    );

    // 4. Отсортировать слова по частоте (сначала те, которые встречаются чаще)
    const sortedWords = filteredWords.sort(
      (a, b) => wordCounts[b] - wordCounts[a],
    );

    // 5. Объединить слова в строку через запятую без пробелов, учитывая лимит в 100 символов
    let newKeywords = "";
    for (const word of sortedWords) {
      const potentialNewKeywords = newKeywords
        ? `${newKeywords},${word}`
        : word;
      if (potentialNewKeywords.length <= 100) {
        newKeywords = potentialNewKeywords;
      } else {
        break; // Прекращаем добавление, если превышен лимит
      }
    }

    // 6. Установить новое значение для keywordsMeta
    setKeywordsMeta(newKeywords);
  };

  // Функция для определения цвета индикатора
  const getIndicatorColor = (length, maxLength) => {
    if (length <= maxLength * 0.8) return "#FFC107"; // Желтый
    if (length <= maxLength) return "#4CAF50"; // Зеленый
    return "#F44336"; // Красный
  };

  // Функция для расчета ширины индикатора
  const getIndicatorWidth = (length, maxLength) => {
    return `${(length / maxLength) * 100}%`;
  };

  return (
    <div>
      <h2 style={{ marginBottom: "16px", fontSize: "18px", color: "#333" }}>
        Метаданные
      </h2>

      {/* Уведомление о копировании */}
      {showCopyNotification && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            borderRadius: "4px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          Скопировано!
        </div>
      )}

      {/* Поле для title */}
      <div style={{ marginBottom: "24px" }}>
        <label
          style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
        >
          Название:
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              resize: "none",
              fontSize: "16px",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{ fontSize: "14px", color: "#666", whiteSpace: "nowrap" }}
            >
              {title.length}/30
            </span>
            <button
              onClick={() => handleCopy(title)}
              style={{
                padding: "8px",
                backgroundColor: "#f5f5f5",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              📋
            </button>
            <button
              onClick={() => handleClear(setTitle)}
              style={{
                padding: "8px",
                backgroundColor: "#f5f5f5",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              ❌
            </button>
          </div>
        </div>
        {/* Индикатор */}
        <div
          style={{
            width: "100%",
            height: "4px",
            backgroundColor: "#e0e0e0",
            marginTop: "8px",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: getIndicatorWidth(title.length, 30),
              height: "100%",
              backgroundColor: getIndicatorColor(title.length, 30),
            }}
          />
        </div>
      </div>

      {/* Поле для subtitle */}
      <div style={{ marginBottom: "24px" }}>
        <label
          style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
        >
          Подзаголовок:
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              resize: "none",
              fontSize: "16px",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{ fontSize: "14px", color: "#666", whiteSpace: "nowrap" }}
            >
              {subtitle.length}/30
            </span>
            <button
              onClick={() => handleCopy(subtitle)}
              style={{
                padding: "8px",
                backgroundColor: "#f5f5f5",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              📋
            </button>
            <button
              onClick={() => handleClear(setSubtitle)}
              style={{
                padding: "8px",
                backgroundColor: "#f5f5f5",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              ❌
            </button>
          </div>
        </div>
        {/* Индикатор */}
        <div
          style={{
            width: "100%",
            height: "4px",
            backgroundColor: "#e0e0e0",
            marginTop: "8px",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: getIndicatorWidth(subtitle.length, 30),
              height: "100%",
              backgroundColor: getIndicatorColor(subtitle.length, 30),
            }}
          />
        </div>
      </div>

      {/* Поле для keywords */}
      <div style={{ marginBottom: "24px" }}>
        <label
          style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
        >
          Ключевые слова:
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <textarea
            value={keywordsMeta}
            onChange={(e) => setKeywordsMeta(e.target.value)}
            rows={4}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              resize: "none",
              fontSize: "16px",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{ fontSize: "14px", color: "#666", whiteSpace: "nowrap" }}
            >
              {keywordsMeta.length}/100
            </span>
            <button
              onClick={() => handleCopy(keywordsMeta)}
              style={{
                padding: "8px",
                backgroundColor: "#f5f5f5",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              📋
            </button>
            <button
              onClick={() => handleClear(setKeywordsMeta)}
              style={{
                padding: "8px",
                backgroundColor: "#f5f5f5",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              ❌
            </button>
          </div>
        </div>
        {/* Индикатор */}
        <div
          style={{
            width: "100%",
            height: "4px",
            backgroundColor: "#e0e0e0",
            marginTop: "8px",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: getIndicatorWidth(keywordsMeta.length, 100),
              height: "100%",
              backgroundColor: getIndicatorColor(keywordsMeta.length, 100),
            }}
          />
        </div>
        {/* Кнопка "Сгенерировать ключевые слова" */}
        <button
          onClick={generateKeywords}
          style={{
            marginTop: "16px",
            padding: "10px 16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Сгенерировать ключевые слова
        </button>
      </div>
    </div>
  );
};

export default MetadataForm;
