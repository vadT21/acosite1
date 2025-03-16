import React from "react";
import LocaleInput from "../common/LocaleInput";
import styles from "./LocaleField.module.css";

const LocaleField = ({
  title,
  subtitle,
  keywordsMeta,
  setTitle,
  setSubtitle,
  setKeywordsMeta,
  keywords,
}) => {
  // Функция для очистки поля
  const handleClear = (setter) => {
    setter("");
  };
  return (
    <div className={styles.container}>
      {/* Поле для title */}
      <div>
        <LocaleInput
          label="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onClear={() => handleClear(setTitle)}
          maxLength={30}
          length={title.length}
        />
      </div>

      {/* Поле для subtitle */}
      <div>
        <LocaleInput
          label="subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          onClear={() => handleClear(setSubtitle)}
          maxLength={30}
          length={subtitle.length}
        />
        {/* Индикатор */}
      </div>

      {/* Поле для keywords */}
      <div>
        <LocaleInput
          label="keywords"
          value={keywordsMeta}
          onChange={(e) => setKeywordsMeta(e.target.value)}
          onClear={() => handleClear(setKeywordsMeta)}
          maxLength={100}
          length={keywordsMeta.length}
        />
      </div>

      <div className={styles.buttonGroup}>
        <button>gen</button>
        <button>add</button>
        <button>lock</button>
      </div>
    </div>
  );
};

export default LocaleField;
