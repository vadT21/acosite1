import React from "react";

const UniqueWordsTable = ({ wordCounts, highlightedWords }) => {
  // Функция для выделения слов
  const highlightText = (text) => {
    const isHighlighted = highlightedWords.includes(text.toLowerCase());
    return isHighlighted ? (
      <span style={{ backgroundColor: "#FFFF00" }}>{text}</span>
    ) : (
      text
    );
  };

  // Преобразуем объект wordCounts в массив и сортируем его по убыванию count
  const wordCountArray = Object.entries(wordCounts)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div>
      <h2 style={{ marginBottom: "16px", fontSize: "18px", color: "#333" }}>
        Уникальные слова
      </h2>
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
              Слово
            </th>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Повторений
            </th>
          </tr>
        </thead>
        <tbody>
          {wordCountArray.map(({ word, count }, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {highlightText(word)}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UniqueWordsTable;
