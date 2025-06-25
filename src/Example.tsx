import React from 'react';
import ReactDOM from 'react-dom';

import { ResizableContainer } from './ResizableContainer';

const MIN_HEIGHT = 20;
const RESIZER_HEIGHT = 5;

export function Example() {
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

ReactDOM.render(<Example />, document.getElementById('root'));
