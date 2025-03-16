// src/components/UploadModal/UploadModal.jsx
import { useState } from "react";
import * as XLSX from "xlsx";
import useDataStore from "../../store/useDataStore";
import { ignoredWords } from "../../data/ignoredWords";
import { localesImport } from "../../data/constants";
import styles from "./UploadModal.module.css";
import { cleanPhrase } from "../../utils/helperFunction";

const UploadModal = ({ isOpen, onClose }) => {
  const { addItem: addToDataStore } = useDataStore();
  const [files, setFiles] = useState({});

  const formatShortName = (fullName) => {
    // Убираем все символы, кроме букв, цифр и пробелов
    return fullName
      .replace(/[^\p{L}\p{N}\s]/gu, " ") // Убираем все, кроме букв, цифр и пробелов
      .replace(/\s+/g, " ") // Убираем лишние пробелы
      .trim(); // Убираем пробелы в начале и конце
  };

  const splitPhrase = (phrase) => {
    return phrase
      .trim()
      .split(/\s+/)
      .filter((word) => !ignoredWords.includes(word));
  };

  // Обработчик загрузки файла
  const handleFileUpload = (locale, event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Обрабатываем данные (первый и второй столбцы, начиная со второй строки)
      const items = jsonData.slice(1).map((row, index) => {
        console.log(row);
        return {
          id: row[0], // Первый столбец (полное название)
          short: formatShortName(row[0]), // Второй столбец (сокращенное название)
          traffic: row[1], // Пока traffic = 0 (можно изменить логику)
          words: splitPhrase(formatShortName(row[0])),
        };
      });

      // Добавляем данные в оба хранилища
      items.forEach((item) => {
        addToDataStore(locale, item);
      });
    };
    reader.readAsBinaryString(file);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Upload Files</h2>
        <div className={styles.fileInputs}>
          {localesImport.map((locale) => (
            <div key={locale} className={styles.fileInput}>
              <label>{locale}</label>
              <input
                type="file"
                accept=".xlsx"
                onChange={(e) => handleFileUpload(locale, e)}
              />
            </div>
          ))}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UploadModal;
