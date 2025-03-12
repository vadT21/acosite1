import React, { useState } from "react";

const AddKeywordsForm = ({ addKeywords }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keywordInput, setKeywordInput] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setKeywordInput("");
  };

  const handleAddKeyword = () => {
    const newKeywords = keywordInput
      .split("\n")
      .map((word) => word.trim())
      .filter((word) => word.length > 0);

    const uniqueKeywords = [...new Set(newKeywords)];
    addKeywords(uniqueKeywords);
    closeModal();
  };

  return (
    <div>
      <button
        onClick={openModal}
        style={{
          padding: "10px 16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Добавить ключевые слова
      </button>

      {/* Модальное окно */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            zIndex: 1000,
            width: "400px",
          }}
        >
          <h3 style={{ marginBottom: "16px", fontSize: "18px", color: "#333" }}>
            Добавить ключевые слова
          </h3>
          <textarea
            placeholder="Введите ключевые слова, каждую фразу с новой строки"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            rows={10}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
          <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
            <button
              onClick={handleAddKeyword}
              style={{
                padding: "8px 16px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Добавить
            </button>
            <button
              onClick={closeModal}
              style={{
                padding: "8px 16px",
                backgroundColor: "#6c757d",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddKeywordsForm;
