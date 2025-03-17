import { CopyToClipboard } from "react-copy-to-clipboard"; // Установи библиотеку, если нет
import useTotalStore from "../../store/useTotalStore";
import styles from "./TotalPage.module.css"; // Импортируем стили
import { useState } from "react"; // Добавляем хук для уведомлений

const TotalPage = () => {
  const locales = useTotalStore((state) => state.locales); // Получаем локали из store
  const description = useTotalStore((state) => state.desc); // Получаем description
  const usedKeywords = useTotalStore((state) => state.usedKeywordPhrases); // Получаем usedKeywords
  const [copied, setCopied] = useState(false); // Состояние для уведомления о копировании
  console.log(usedKeywords);

  // Функция для преобразования usedKeywords в читаемый формат
  const formatUsedKeywords = (keywords) => {
    return Object.entries(keywords)
      .map(([locale, words]) => `${locale}\n${words.join("\n")}`)
      .join("\n\n");
  };
  // Функция для обработки успешного копирования
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Уведомление исчезнет через 2 секунды
  };
  return (
    <div className={styles.container}>
      <h1>Total Page</h1>

      {/* Таблица локалей */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Locale</th>
            <th>Name</th>
            <th>Title</th>
            <th>Subtitle</th>
            <th>Keywords</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(locales).map(([locale, data]) => (
            <tr key={locale}>
              <td>{locale}</td>
              <td>{data.name}</td>
              <td>{data.title}</td>
              <td>{data.subtitle}</td>
              <td>{data.keywords}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Кнопка копирования description */}
      <CopyToClipboard text={description} onCopy={handleCopy}>
        <button className={styles.button}>Copy Description</button>
      </CopyToClipboard>

      {/* Кнопка копирования usedWords */}
      <CopyToClipboard
        text={formatUsedKeywords(usedKeywords)}
        onCopy={handleCopy}
      >
        <button className={styles.button}>Copy Used Keywords</button>
      </CopyToClipboard>

      {/* Уведомление о копировании */}
      {copied && (
        <span style={{ color: "green", marginLeft: "10px" }}>Copied!</span>
      )}
    </div>
  );
};

export default TotalPage;
