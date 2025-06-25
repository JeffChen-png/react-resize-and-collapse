# React Resize and Collapse

Библиотека компонентов React для изменения размера и сворачивания панелей интерфейса.

## Установка

```bash
npm install react-resize-and-collapse
# или
yarn add react-resize-and-collapse
```

## Использование

```jsx
import React from 'react';
import { ResizableContainer } from 'react-resize-and-collapse';

const MIN_HEIGHT = 20;
const RESIZER_HEIGHT = 5;

export function App() {
  return (
    <div
      style={{
        width: 400,
        height: 500,
        margin: '50px auto',
        border: '1px solid #bbb',
      }}
    >
      <ResizableContainer
        minHeight={MIN_HEIGHT}
        resizerHeight={RESIZER_HEIGHT}
        resizer={props => <hr {...props} style={{ height: RESIZER_HEIGHT }} />}
      >
        {({ classname, height }) => (
          <div className={classname} style={{ background: '#b7e', height }}>
            Первый (снизу)
          </div>
        )}
        {({ classname, height }) => (
          <div className={classname} style={{ background: '#be7', height }}>
            Второй
          </div>
        )}
        {({ classname, height }) => (
          <div className={classname} style={{ background: '#7be', height }}>
            Третий (вверху)
          </div>
        )}
      </ResizableContainer>
    </div>
  );
}

```

## Возможности

- Изменение размера панелей перетаскиванием разделителя
- Автоматическое перераспределение пространства между панелями
- Сворачивание и разворачивание панелей кликом
- Сохранение предыдущего размера при разворачивании панели
- Минимальная высота для свернутых панелей

## Параметры

### ResizableContainer

| Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| minHeight | number | | Минимальная высота панели в свернутом состоянии |
| resizerHeight | number | | Высота разделителя между панелями |
| children | ReactNode | | Дочерние элементы (панели) |

## Документация

Подробная документация доступна в [Wiki](https://github.com/JeffChen-png/react-resize-and-collapse/wiki).

## Лицензия

MIT
