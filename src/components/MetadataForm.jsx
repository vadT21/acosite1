import React from "react";
import LocaleField from "./functionality/LocaleField";

const MetadataForm = ({
  title,
  subtitle,
  keywordsMeta,
  setTitle,
  setSubtitle,
  setKeywordsMeta,
  keywords,
}) => {
  return (
    <div>
      <LocaleField
        title={title}
        subtitle={subtitle}
        keywordsMeta={keywordsMeta}
        setTitle={setTitle}
        setSubtitle={setSubtitle}
        setKeywordsMeta={setKeywordsMeta}
        keywords={keywords}
      />
      <LocaleField
        title={title}
        subtitle={subtitle}
        keywordsMeta={keywordsMeta}
        setTitle={setTitle}
        setSubtitle={setSubtitle}
        setKeywordsMeta={setKeywordsMeta}
        keywords={keywords}
      />
    </div>
  );
};

export default MetadataForm;
