import React, { useState } from "react";

const UsedKeywords = ({ usedKeywords }) => {
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  // Функция для копирования использованных фраз
  const copyUsedKeywords = () => {
    const textToCopy = usedKeywords.join("\n"); // Формируем текст для копирования
    navigator.clipboard.writeText(textToCopy);
    setShowCopyNotification(true);
    setTimeout(() => setShowCopyNotification(false), 2000); // Уведомление исчезает через 2 секунды
  };

  return (
    <div>
      <h2 style={{ marginBottom: "16px", fontSize: "18px", color: "#333" }}>
        Использованные ключевые фразы
      </h2>
      {/* Кнопка для копирования */}
      <button
        onClick={copyUsedKeywords}
        style={{
          marginBottom: "16px",
          padding: "8px 16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Скопировать использованные фразы
      </button>
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
              Фраза
            </th>
          </tr>
        </thead>
        <tbody>
          {usedKeywords.map((phrase, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {phrase}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsedKeywords;
