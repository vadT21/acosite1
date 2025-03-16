import React from "react";
import styles from "./SearchInput.module.css";

const SearchInput = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Поиск по ключевым фразам"
      className={styles.input}
    />
  );
};

export default SearchInput;
