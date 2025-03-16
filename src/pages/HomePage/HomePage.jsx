// src/pages/HomePage/HomePage.jsx
import { useState } from "react";
import UploadModal from "../../components/functionality/UploadModal";
import useDataStore from "../../store/useDataStore";
//import useLocalesStore from "../../store/useLocalesStore";
import styles from "./HomePage.module.css";
import * as XLSX from "xlsx";
import { cleanPhrase } from "../../utils/helperFunction";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const { processedData } = useProcessedDataStore();
  const { data } = useDataStore();

  // Функция для вывода содержимого хранилища в консоль

  const handlePrintStore1 = () => {
    console.log("Processed Data Store:", data);
  };

  // Функция для загрузки файла
  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     const data = new Uint8Array(e.target.result);
  //     const workbook = XLSX.read(data, { type: "array" });
  //     const sheetName = workbook.SheetNames[0];
  //     const worksheet = workbook.Sheets[sheetName];
  //     const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  //     // Обрабатываем данные
  //     const newKeywords = json
  //       .map((row) => ({
  //         phrase: cleanPhrase(row[0]), // Первый столбец — фраза
  //         traffic: Number(row[1]) || 0, // Второй столбец — трафик
  //       }))
  //       .filter((keyword) => keyword.phrase); // Убираем пустые фразы

  //     // Добавляем новые фразы
  //     setKeywords((prevKeywords) => {
  //       const updatedKeywords = [...prevKeywords, ...newKeywords];
  //       // Сортируем по трафику (от большего к меньшему)
  //       return updatedKeywords.sort((a, b) => b.traffic - a.traffic);
  //     });

  //     // Сохраняем изначальные фразы
  //     setOriginalKeywords((prevOriginalKeywords) => [
  //       ...prevOriginalKeywords,
  //       ...newKeywords.map((keyword) => keyword.phrase),
  //     ]);
  //   };
  //   reader.readAsArrayBuffer(file);
  // };

  return (
    <div className={styles.homePage}>
      <h1>Home Page</h1>
      <button onClick={() => setIsModalOpen(true)}>Upload Files</button>
      <button onClick={handlePrintStore1}>Print Used Store to Console</button>
      <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Кнопка для загрузки файла */}
    </div>
  );
};

export default HomePage;
