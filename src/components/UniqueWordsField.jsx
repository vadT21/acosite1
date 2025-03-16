import React from "react";
import UniqueWordsTable from "./common/UniqueWordsTable";

const UniqueWordsField = ({ wordCounts, highlightedWords }) => {
  // Преобразуем объект wordCounts в массив и сортируем его по убыванию count
  const wordCountArray = Object.entries(wordCounts)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div>
      <UniqueWordsTable
        data={wordCountArray}
        highlightedWords={highlightedWords}
      />
    </div>
  );
};

export default UniqueWordsField;
