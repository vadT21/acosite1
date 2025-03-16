import React from "react";
import KeywordsTable from "./common/KeywordsTable";

const KeywordsField = ({
  keywords,
  highlightedWords,
  usedPhrasesCount,
  totalPhrasesCount,
  searchQuery,
  setSearchQuery,
  hideCollectedPhrases,
  setHideCollectedPhrases,
  selectedPhrases,
  setSelectedPhrases,
  togglePhraseSelection,
  deleteSelectedPhrases,
  deleteSinglePhrase,
  addPhrasesToUsed,
}) => {
  // Обработчик для выбора/снятия всех фраз
  const handleSelectAll = () => {
    if (selectedPhrases.size === keywords.length) {
      setSelectedPhrases(new Set()); // Снять выбор, если все уже выбраны
    } else {
      setSelectedPhrases(new Set(keywords.map(({ phrase }) => phrase))); // Выбрать все
    }
  };

  return (
    <KeywordsTable
      keywords={keywords}
      highlightedWords={highlightedWords}
      usedPhrasesCount={usedPhrasesCount}
      totalPhrasesCount={totalPhrasesCount}
      hideCollectedPhrases={hideCollectedPhrases}
      setHideCollectedPhrases={setHideCollectedPhrases}
      selectedPhrases={selectedPhrases}
      handleSelectAll={handleSelectAll}
      togglePhraseSelection={togglePhraseSelection}
      deleteSelectedPhrases={deleteSelectedPhrases}
      deleteSinglePhrase={deleteSinglePhrase}
      addPhrasesToUsed={addPhrasesToUsed}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
};

export default KeywordsField;
