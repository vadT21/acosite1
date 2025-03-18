// src/pages/HomePage/HomePage.jsx
import { useState } from "react";
import UploadModal from "../../components/functionality/UploadModal";
import useDataStore from "../../store/useDataStore";
import useTotalStore from "../../store/useTotalStore";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentState = useTotalStore.getState();
  const handleRefreshStore = () => {
    useTotalStore.getState().clearStore();
  };
  const handleClearStore = () => {
    useTotalStore.getState().clearStore();
    useDataStore.getState().clearStore();
  };

  return (
    <div className={styles.homePage}>
      <h1>Home Page</h1>
      <div className={styles.groupButton}>
        <button className={styles.button} onClick={() => setIsModalOpen(true)}>
          Upload Files
        </button>
        <button className={styles.button} onClick={handleRefreshStore}>
          Refresh Store
        </button>
        <button className={styles.button} onClick={handleClearStore}>
          Clear Store
        </button>
        <button
          className={styles.button}
          onClick={() => console.log(currentState)}
        >
          check
        </button>
      </div>

      <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Кнопка для загрузки файла */}
    </div>
  );
};

export default HomePage;
