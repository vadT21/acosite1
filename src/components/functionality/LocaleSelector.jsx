// src/components/LocaleSelector/LocaleSelector.jsx
import styles from "./LocaleSelector.module.css";

const LocaleSelector = ({ locales, selectedLocale, onSelect }) => {
  return (
    <div className={styles.localeSelector}>
      <div>Choose Local:</div>
      <div className={styles.locales}>
        {locales.map((locale) => (
          <div key={locale.code} className={styles.locale}>
            <label htmlFor={locale.code}>{locale.code}</label>
            <input
              type="radio"
              id={locale.code}
              name="locale"
              value={locale.code}
              checked={selectedLocale === locale.code}
              onChange={() => onSelect(locale.code)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocaleSelector;
