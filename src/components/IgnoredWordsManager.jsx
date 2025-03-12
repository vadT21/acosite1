import React, { useState } from "react";

const IgnoredWordsManager = ({ ignoredWords }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
        Просмотреть игнорируемые слова
      </button>

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
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <h3 style={{ marginBottom: "16px", fontSize: "18px", color: "#333" }}>
            Игнорируемые слова
          </h3>
          <ul style={{ listStyle: "none", padding: 0, marginBottom: "16px" }}>
            {ignoredWords.map((word, index) => (
              <li
                key={index}
                style={{
                  padding: "8px",
                  borderBottom: "1px solid #ddd",
                }}
              >
                {word}
              </li>
            ))}
          </ul>
          <button
            onClick={closeModal}
            style={{
              padding: "8px 16px",
              backgroundColor: "#6c757d",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Закрыть
          </button>
        </div>
      )}
    </div>
  );
};

export default IgnoredWordsManager;
