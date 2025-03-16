import React from "react";
import LocaleInput from "../common/LocaleInput";
import styles from "./LocaleField.module.css";

const LocaleField = ({
  name,
  title,
  subtitle,
  keywordsMeta,
  status,
  setTitle,
  setSubtitle,
  setKeywordsMeta,
  setStatus,
  createLocale,
  generatorKeywords,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.name}>{name}</div>
      {/* Поле для title */}
      <div>
        <LocaleInput
          label="title"
          value={title}
          onChange={(e) => setTitle(e.target.value, name)}
          onClear={() => setTitle("", name)}
          maxLength={30}
          length={title.length}
        />
      </div>

      {/* Поле для subtitle */}
      <div>
        <LocaleInput
          label="subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value, name)}
          onClear={() => setSubtitle("", name)}
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
          onChange={(e) => setKeywordsMeta(e.target.value, name)}
          onClear={() => setKeywordsMeta("", name)}
          maxLength={100}
          length={keywordsMeta.length}
        />
      </div>

      <div className={styles.buttonGroup}>
        <button
          onClick={() => generatorKeywords(name, title, subtitle, keywordsMeta)}
        >
          gen
        </button>
        <button
          onClick={() => createLocale(name, title, subtitle, keywordsMeta)}
        >
          add
        </button>
        <button onClick={() => setStatus(name, !status)}>lock</button>
      </div>
    </div>
  );
};

export default LocaleField;
