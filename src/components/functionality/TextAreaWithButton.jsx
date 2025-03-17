// src/components/TextAreaWithButton/TextAreaWithButton.jsx
import styles from "./TextAreaWithButton.module.css";

const TextAreaWithButton = ({ title, value, onChange }) => {
  return (
    <div className={styles.container}>
      <label>{title}</label>
      <div className={styles.textAreaWrapper}>
        <textarea
          className={`${styles.textarea} ${
            title == "Description" ? styles.descTextarea : ""
          }`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${title.toLowerCase()} text`}
        />
      </div>
    </div>
  );
};

export default TextAreaWithButton;
