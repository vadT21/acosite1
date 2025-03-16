import React from "react";
import styles from "./SectionHeader.module.css";

const SectionHeader = ({
  usedPhrasesCount,
  totalPhrasesCount,
  hideCollectedPhrases,
  setHideCollectedPhrases,
}) => {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>
        Ключевые фразы ({usedPhrasesCount}/{totalPhrasesCount})
      </h2>
      <button
        onClick={() => setHideCollectedPhrases(!hideCollectedPhrases)}
        className={styles.button}
      >
        {hideCollectedPhrases ? "Показать все" : "Скрыть собранные"}
      </button>
    </div>
  );
};

export default SectionHeader;
