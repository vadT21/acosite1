import React from "react";
import styles from "./Indicator.module.css";

const Indicator = ({ length, maxLength }) => {
  // Функция для определения цвета индикатора
  const getIndicatorColor = (length, maxLength) => {
    if (length <= maxLength * 0.8) return "#FFC107"; // Желтый
    if (length <= maxLength) return "#4CAF50"; // Зеленый
    return "#F44336"; // Красный
  };

  // Функция для расчета ширины индикатора
  const getIndicatorWidth = (length, maxLength) => {
    return `${(length / maxLength) * 100}%`;
  };
  return (
    <div className={styles.container}>
      <div
        className={styles.indicatorBar}
        style={{
          width: getIndicatorWidth(length, maxLength),
          backgroundColor: getIndicatorColor(length, maxLength),
        }}
      />
    </div>
  );
};

export default Indicator;
