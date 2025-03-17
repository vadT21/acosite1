// src/pages/DescriptionPage/DescriptionPage.jsx
import { useState } from "react";
import TextAreaWithButton from "../../components/functionality/TextAreaWithButton";
import styles from "./DescriptionPage.module.css";
import useTotalStore from "../../store/useTotalStore";
import {
  DOWNLOAD,
  INFO_SUB,
  PRIVACY,
  SUB,
  SUPPORT,
  TERMS,
  TITLE_FEATURES,
  TITLE_PRIVACY,
  TITLE_SUB,
} from "../../data/description";

const DescriptionPage = () => {
  const [fields, setFields] = useState({
    desc: "",
    features: "",
    final_desc: "",
  });

  const [charCount, setCharCount] = useState(0);

  const handleChange = (field, value) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };
  //random phrase
  const getRandomPhrase = (phrases) => {
    const randomIndex = Math.floor(Math.random() * phrases.length); // Генерируем случайный индекс
    return phrases[randomIndex]; // Возвращаем случайную фразу
  };
  const title_features_generated = getRandomPhrase(TITLE_FEATURES);
  const title_sub_generated = getRandomPhrase(TITLE_SUB);
  const sub_generated = getRandomPhrase(SUB);
  const info_sub_generated = getRandomPhrase(INFO_SUB);
  const title_privacy_generated = getRandomPhrase(TITLE_PRIVACY);
  const privacy_generated = getRandomPhrase(PRIVACY);
  const terms_generated = getRandomPhrase(TERMS);
  const support_generated = getRandomPhrase(SUPPORT);
  const download_generated = getRandomPhrase(DOWNLOAD);
  const emptyString = "";
  const handleGenerate = () => {
    const allValues = [
      fields.desc,
      emptyString,
      title_features_generated,
      fields.features,
      title_sub_generated,
      sub_generated,
      emptyString,
      info_sub_generated,
      emptyString,
      title_privacy_generated,
      privacy_generated,
      terms_generated,
      support_generated,
      emptyString,
      download_generated,
    ].join("\n");
    // Соединяем значения через перенос строки

    setFields((prev) => ({ ...prev, final_desc: allValues }));
    setCharCount(allValues.length); // Обновляем счетчик символов
  };

  const handleFinalDescChange = (value) => {
    setFields((prev) => ({ ...prev, final_desc: value }));
    setCharCount(value.length); // Обновляем счетчик символов
  };

  const handleClear = () => {
    setFields({
      desc: "",
      features: "",
      final_desc: "",
    });
    setCharCount(0);
  };
  const handeAddToStore = () => {
    const desc = fields.final_desc;
    useTotalStore.getState().updateDesc(desc);
  };

  return (
    <div className={styles.descriptionPage}>
      <div className={styles.columns}>
        {/* Первый столбец */}
        <div className={styles.column}>
          <TextAreaWithButton
            title="Description"
            value={fields.desc}
            onChange={(value) => handleChange("desc", value)}
            onGenerate={() => handleGenerate("desc")}
          />
          <TextAreaWithButton
            title="Features"
            value={fields.features}
            onChange={(value) => handleChange("features", value)}
            onGenerate={() => handleGenerate("features")}
          />
        </div>

        {/* Третий столбец */}
        <div className={styles.column}>
          <div className={styles.counter}>{charCount} / 4000</div>
          <textarea
            className={styles.generatedTextarea}
            value={fields.final_desc}
            onChange={(e) => handleFinalDescChange(e.target.value)}
            placeholder="Final description will appear here"
          />
          <div className={styles.groupButton}>
            <button className={styles.button} onClick={handleGenerate}>
              Generate
            </button>
            <button className={styles.button} onClick={handleClear}>
              Clear
            </button>
            <button className={styles.button} onClick={handeAddToStore}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionPage;
