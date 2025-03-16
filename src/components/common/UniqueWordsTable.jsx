import React from "react";
import styles from "./UniqueWordsTable.module.css";
import { highlightText } from "../../utils/highlightText";

const UniqueWordsTable = ({ data, highlightedWords }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.headerRow}>
            <th className={styles.headerCell}>Слово</th>
            <th className={styles.headerCell}>Повторений</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ word, count }, index) => (
            <tr key={index} className={styles.row}>
              <td className={styles.cell}>
                {highlightText(word, highlightedWords)}
              </td>
              <td className={styles.cell}>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UniqueWordsTable;
