import React from "react";
import styles from "./UsedKeywordsTable.module.css";

const UsedKeywordsTable = ({ data }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.headerRow}>
          <th className={styles.headerCell}>Фраза</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className={styles.row}>
            <td className={styles.cell}>{item}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsedKeywordsTable;
