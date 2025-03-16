// src/components/TextAreaWithButton/TextAreaWithButton.jsx
import styles from "./TextAreaWithButton.module.css";

const TextAreaWithButton = ({ title, value, onChange, onGenerate }) => {
  return (
    <div className={styles.container}>
      <label>{title}</label>
      <div className={styles.textAreaWrapper}>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${title.toLowerCase()} text`}
        />
        <button className={styles.generateButton} onClick={onGenerate}>
          G
        </button>
      </div>
    </div>
  );
};

export default TextAreaWithButton;
