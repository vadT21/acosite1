import React from "react";

const KeywordsTable = ({
  keywords,
  highlightedWords,
  usedPhrasesCount,
  totalPhrasesCount,
  searchQuery,
  setSearchQuery,
  hideCollectedPhrases,
  setHideCollectedPhrases,
}) => {
  // Функция для выделения слов
  const highlightText = (text) => {
    return text.split(" ").map((word, index) => {
      const isHighlighted = highlightedWords.includes(word.toLowerCase());
      return isHighlighted ? (
        <span key={index} style={{ backgroundColor: "#FFFF00" }}>
          {word}{" "}
        </span>
      ) : (
        <span key={index}>{word} </span>
      );
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h2 style={{ fontSize: "18px", color: "#333" }}>
          Ключевые фразы ({usedPhrasesCount}/{totalPhrasesCount})
        </h2>
        <button
          onClick={() => setHideCollectedPhrases(!hideCollectedPhrases)}
          style={{
            padding: "8px 16px",
            backgroundColor: hideCollectedPhrases ? "#007bff" : "#f5f5f5",
            color: hideCollectedPhrases ? "#fff" : "#333",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {hideCollectedPhrases ? "Показать все" : "Скрыть собранные"}
        </button>
      </div>
      {/* Поле для поиска */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Поиск по ключевым фразам"
        style={{
          width: "100%",
          padding: "8px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          marginBottom: "16px",
        }}
      />
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Ключевая фраза
            </th>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Трафик
            </th>
          </tr>
        </thead>
        <tbody>
          {keywords.map(({ phrase, traffic }, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {highlightText(phrase)}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {traffic}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KeywordsTable;
