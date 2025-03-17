import React from "react";
import { highlightText } from "../../utils/highlightText";
import styles from "./KeywordsTable.module.css";
import SectionHeader from "./SectionHeader";
import SearchInput from "./SearchInput";

const KeywordsTable = ({
  keywords,
  highlightedWords,
  usedPhrasesCount,
  totalPhrasesCount,
  hideCollectedPhrases,
  setHideCollectedPhrases,
  selectedPhrases,
  handleSelectAll,
  togglePhraseSelection,
  deleteSelectedPhrases,
  deleteSinglePhrase,
  addPhrasesToUsed,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <SectionHeader
          usedPhrasesCount={usedPhrasesCount}
          totalPhrasesCount={totalPhrasesCount}
          hideCollectedPhrases={hideCollectedPhrases}
          setHideCollectedPhrases={setHideCollectedPhrases}
        />
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </header>

      {/* Таблица с ключевыми фразами */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={styles.headerCell}>
                <input
                  type="checkbox"
                  checked={selectedPhrases.size === keywords.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th className={styles.headerCell}>Ключевая фраза</th>
              <th className={styles.headerCell}>Трафик</th>
              <th className={styles.headerCell}>
                <button
                  onClick={() => addPhrasesToUsed(Array.from(selectedPhrases))}
                  className={styles.buttonAdd}
                  disabled={selectedPhrases.size === 0}
                  title="Добавить выбранные"
                >
                  ➕
                </button>
              </th>
              <th className={styles.headerCell}>
                <button
                  onClick={() =>
                    deleteSelectedPhrases(Array.from(selectedPhrases))
                  }
                  className={styles.buttonDelete}
                  disabled={selectedPhrases.size === 0}
                  title="Удалить выбранные"
                >
                  ❌
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {keywords.map(({ phrase, traffic }, index) => (
              <tr key={index} className={styles.row}>
                <td className={styles.cell}>
                  <input
                    type="checkbox"
                    checked={selectedPhrases.has(phrase)}
                    onChange={() => togglePhraseSelection(phrase)}
                  />
                </td>
                <td className={`${styles.cell} ${styles.cell2}`}>
                  {highlightText(phrase, highlightedWords)}
                </td>
                <td className={styles.cell}>{traffic}</td>
                <td className={styles.cell}>
                  <button
                    onClick={() => addPhrasesToUsed([phrase])}
                    className={styles.buttonAdd}
                    title="Добавить"
                  >
                    ➕
                  </button>
                </td>
                <td className={styles.cell}>
                  <button
                    onClick={() => deleteSinglePhrase(phrase)}
                    className={styles.buttonDelete}
                    title="Удалить"
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KeywordsTable;
