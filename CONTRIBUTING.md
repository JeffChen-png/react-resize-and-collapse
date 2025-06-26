# Руководство по разработке

## Установка и настройка

```bash
# Клонирование репозитория
git clone https://github.com/JeffChen-png/react-resize-and-collapse.git
cd react-resize-and-collapse

# Установка зависимостей
npm install

# Сборка библиотеки
npm run build
```

## Разработка

1. Форкните репозиторий
2. Создайте ветку для новой функциональности (`git checkout -b feature/amazing-feature`)
3. Внесите изменения
4. Отправьте изменения в ваш форк (`git push origin feature/amazing-feature`)
5. Создайте Pull Request в основной репозиторий

## Стиль кода

Проект использует ESLint для проверки стиля кода. Перед созданием PR убедитесь, что код соответствует правилам линтера:

```bash
npm run lint
```

## Версионирование и релизы

Проект использует семантическое версионирование [SemVer](https://semver.org/).

Для создания нового релиза:

1. Обновите версию в `package.json`
2. Создайте новый тег с префиксом `v` (например, `v1.0.0`)
3. Отправьте тег в репозиторий

```bash
npm version patch
git push origin v1.0.0
```

GitHub Actions автоматически опубликует новую версию в npm при пуше тега, начинающегося с `v`.


```bash
npm test
```

## Запуск примеров

Для запуска примеров использования компонентов:

```bash
# Сначала соберите библиотеку
npm run build

# Запустите примеры
cd example
npm install
npm start
