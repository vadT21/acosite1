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
      <div className={styles.block1}>
        <div className={styles.block2}>
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
          </div>
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
            className={styles.button1}
            onClick={() =>
              generatorKeywords(name, title, subtitle, keywordsMeta)
            }
          >
            G
          </button>
          <button
            className={styles.button2}
            onClick={() => createLocale(name, title, subtitle, keywordsMeta)}
          >
            A
          </button>
          <button
            className={styles.button3}
            onClick={() => setStatus(name, !status)}
          >
            {status ? "L" : "U"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocaleField;
