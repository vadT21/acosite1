export const highlightText = (text, highlightedWords) => {
  return text.split(" ").map((word, index) => {
    // Убираем знаки препинания и лишние символы для точного сравнения
    const cleanedWord = word.replace(/[^\p{L}\p{N}]/gu, "").toLowerCase();
    const isHighlighted = highlightedWords.includes(cleanedWord);

    return isHighlighted ? (
      <span key={index} style={{ backgroundColor: "#FFFF00" }}>
        {word}{" "}
      </span>
    ) : (
      <span key={index}>{word} </span>
    );
  });
};
