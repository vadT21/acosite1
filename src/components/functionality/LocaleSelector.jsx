// src/components/LocaleSelector/LocaleSelector.jsx
import styles from "./LocaleSelector.module.css";

const LocaleSelector = ({ locales, selectedLocale, onSelect }) => {
  return (
    <div className={styles.localeSelector}>
      <label>Choose Local</label>
      <div className={styles.locales}>
        {locales.map((locale) => (
          <div key={locale.code} className={styles.locale}>
            <input
              type="radio"
              id={locale.code}
              name="locale"
              value={locale.code}
              checked={selectedLocale === locale.code}
              onChange={() => onSelect(locale.code)}
            />
            <label htmlFor={locale.code}>{locale.code}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocaleSelector;
