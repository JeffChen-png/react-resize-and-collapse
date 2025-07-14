import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

import { ResizableContainer, TPublicApi } from './ResizableContainer';

const MIN_HEIGHT = 20;
const RESIZER_HEIGHT = 5;
const DEFAULT_HEIGHT = 100;

export function Example() {
  const api = useRef<TPublicApi>(null);

  const toggle = (index: number, height: number) => {
    if (height === MIN_HEIGHT) {
      api.current?.expand(index);
    } else {
      api.current?.collapse(index);
    }
  };

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
        api={api}
        minHeight={MIN_HEIGHT}
        resizerHeight={RESIZER_HEIGHT}
        initialHeights={[MIN_HEIGHT, MIN_HEIGHT, MIN_HEIGHT]}
        defaultHeight={DEFAULT_HEIGHT}
        resizer={props => (
          <hr
            {...props}
            style={{
              height: RESIZER_HEIGHT,
              width: '100%',
              margin: 0,
              border: 'none',
              background: 'gray',
              cursor: 'row-resize',
            }}
          />
        )}
      >
        {({ classname, height }) => (
          <div
            className={classname}
            style={{ background: '#b7e', height }}
            onClick={() => toggle(0, height)}
          >
            Первый (снизу)
          </div>
        )}
        {({ classname, height }) => (
          <div
            className={classname}
            style={{ background: '#be7', height }}
            onClick={() => toggle(1, height)}
          >
            Второй
          </div>
        )}
        {({ classname, height }) => (
          <div
            className={classname}
            style={{ background: '#7be', height }}
            onClick={() => toggle(2, height)}
          >
            Третий (вверху)
          </div>
        )}
      </ResizableContainer>
    </div>
  );
}

ReactDOM.render(<Example />, document.getElementById('root'));
