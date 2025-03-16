import React from "react";
import UsedKeywordsTable from "./common/UsedKeywordsTable";

const UsedKeywordsFields = ({ usedKeywords }) => {
  return (
    <div>
      <UsedKeywordsTable data={usedKeywords} />
    </div>
  );
};

export default UsedKeywordsFields;
