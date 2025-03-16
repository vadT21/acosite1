import React from "react";
import LocaleField from "./functionality/LocaleField";

const MetadataForm = ({
  selectedLocale,
  localesData,
  setTitle,
  setSubtitle,
  setKeywordsMeta,
  setStatus,
  createLocale,
  generatorKeywords,
}) => {
  return (
    <div>
      {selectedLocale?.locales ? (
        selectedLocale.locales.map((localeID) => (
          <LocaleField
            key={localeID}
            name={localeID}
            title={localesData[localeID].title}
            subtitle={localesData[localeID].subtitle}
            status={localesData[localeID].status}
            keywordsMeta={localesData[localeID].keywordsMeta}
            setTitle={setTitle}
            setSubtitle={setSubtitle}
            setKeywordsMeta={setKeywordsMeta}
            setStatus={setStatus}
            createLocale={createLocale}
            generatorKeywords={generatorKeywords}
          />
        ))
      ) : (
        <div>Нет выбранных локалей. Пожалуйста, выберите локаль.</div>
      )}
    </div>
  );
};

export default MetadataForm;
