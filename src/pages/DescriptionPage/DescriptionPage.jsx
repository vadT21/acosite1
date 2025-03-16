// src/pages/DescriptionPage/DescriptionPage.jsx
import { useState } from "react";
import TextAreaWithButton from "../../components/functionality/TextAreaWithButton";
import styles from "./DescriptionPage.module.css";

const DescriptionPage = () => {
  const [fields, setFields] = useState({
    desc: "",
    title_features: "",
    features: "",
    title_sub: "",
    sub: "",
    info_sub: "",
    title_privacy: "",
    privacy: "",
    terms: "",
    support: "",
    download: "",
    final_desc: "",
  });

  const [charCount, setCharCount] = useState(0);

  const handleChange = (field, value) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    const allValues = Object.values(fields)
      .filter((value, key) => key !== "final_desc") // Исключаем final_desc
      .join("\n"); // Соединяем значения через перенос строки

    setFields((prev) => ({ ...prev, final_desc: allValues }));
    setCharCount(allValues.length); // Обновляем счетчик символов
  };

  const handleFinalDescChange = (value) => {
    setFields((prev) => ({ ...prev, final_desc: value }));
    setCharCount(value.length); // Обновляем счетчик символов
  };

  return (
    <div className={styles.descriptionPage}>
      <div className={styles.columns}>
        {/* Первый столбец */}
        <div className={styles.column}>
          <TextAreaWithButton
            title="Desc"
            value={fields.desc}
            onChange={(value) => handleChange("desc", value)}
            onGenerate={() => handleGenerate("desc")}
          />
          <TextAreaWithButton
            title="title_features"
            value={fields.title_features}
            onChange={(value) => handleChange("title_features", value)}
            onGenerate={() => handleGenerate("title_features")}
          />
          <TextAreaWithButton
            title="features"
            value={fields.features}
            onChange={(value) => handleChange("features", value)}
            onGenerate={() => handleGenerate("features")}
          />
          <TextAreaWithButton
            title="title_sub"
            value={fields.title_sub}
            onChange={(value) => handleChange("title_sub", value)}
            onGenerate={() => handleGenerate("title_sub")}
          />
          <TextAreaWithButton
            title="sub"
            value={fields.sub}
            onChange={(value) => handleChange("sub", value)}
            onGenerate={() => handleGenerate("sub")}
          />
        </div>

        {/* Второй столбец */}
        <div className={styles.column}>
          <TextAreaWithButton
            title="info_sub"
            value={fields.info_sub}
            onChange={(value) => handleChange("info_sub", value)}
            onGenerate={() => handleGenerate("info_sub")}
          />
          <TextAreaWithButton
            title="title_privacy"
            value={fields.title_privacy}
            onChange={(value) => handleChange("title_privacy", value)}
            onGenerate={() => handleGenerate("title_privacy")}
          />
          <TextAreaWithButton
            title="privacy"
            value={fields.privacy}
            onChange={(value) => handleChange("privacy", value)}
            onGenerate={() => handleGenerate("privacy")}
          />
          <TextAreaWithButton
            title="terms"
            value={fields.terms}
            onChange={(value) => handleChange("terms", value)}
            onGenerate={() => handleGenerate("terms")}
          />
          <TextAreaWithButton
            title="support"
            value={fields.support}
            onChange={(value) => handleChange("support", value)}
            onGenerate={() => handleGenerate("support")}
          />
          <TextAreaWithButton
            title="download"
            value={fields.download}
            onChange={(value) => handleChange("download", value)}
            onGenerate={() => handleGenerate("download")}
          />
        </div>

        {/* Третий столбец */}
        <div className={styles.column}>
          <div className={styles.counter}>{charCount} / 4000</div>
          <textarea
            value={fields.final_desc}
            onChange={(e) => handleFinalDescChange(e.target.value)}
            placeholder="Final description will appear here"
          />
          <button onClick={handleGenerate}>Generate</button>
          <button>Add</button>
        </div>
      </div>
    </div>
  );
};

export default DescriptionPage;
