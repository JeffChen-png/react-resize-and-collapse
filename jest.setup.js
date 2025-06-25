// Добавление глобальных настроек для тестов
import "@testing-library/jest-dom";

// Устранение ошибок с requestAnimationFrame в тестовой среде
global.requestAnimationFrame = function (callback) {
  setTimeout(callback, 0);
  return 0;
};
