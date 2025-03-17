import React from "react";
import Indicator from "./Indicator";
import styles from "./LocaleInput.module.css";

const LocaleInput = ({
  label,
  value,
  onChange,
  onClear,
  maxLength,
  length,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.sectionHeader}>
        <label className={styles.label}>{label}</label>
        <div className={styles.groupInfo}>
          <span className={styles.counter}>
            {value.length}/{maxLength}
          </span>
          <button onClick={onClear} className={styles.button}>
            ❌
          </button>
        </div>
      </div>

      <div className={styles.inputContainer}>
        <textarea
          type="text"
          value={value}
          onChange={onChange}
          className={`${styles.input} ${maxLength == 30 ? styles.input30 : ""}`}
        />
        <div className={styles.forIndicator}>
          <Indicator length={length} maxLength={maxLength} />
        </div>
      </div>
    </div>
  );
};

export default LocaleInput;
