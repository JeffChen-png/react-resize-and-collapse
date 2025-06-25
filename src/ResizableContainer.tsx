import React, { useRef, useState, RefObject, useImperativeHandle, useCallback } from 'react';
import cn from 'classnames';

import { redistributeHeights } from './redistributeHeights';

import styles from './styles.module.css';

export type TPublicApi = {
  expand: (index: number) => void;
  collapse: (index: number) => void;
};

export interface ResizableContainerProps {
  api?: RefObject<TPublicApi>;
  minHeight: number;
  resizerHeight: number;
  initialHeights?: number[];
  containerClassname?: string;
  children: Array<(props: { classname: string; height: number }) => React.ReactElement>;
  resizer: (props: { onPointerDown: React.MouseEventHandler<HTMLElement> }) => React.ReactElement;
}

interface ResizeState {
  index: number;
  startY: number;
  startHeights: number[];
  totalHeight: number;
}

export function ResizableContainer({
  api,
  children,
  minHeight,
  resizerHeight,
  initialHeights,
  containerClassname,
  resizer,
}: ResizableContainerProps) {
  const [heights, setHeights] = useState(
    initialHeights ? initialHeights : Array(children.length).fill(100)
  );
  const lastExpandedHeights = useRef([...heights]);

  const containerRef = useRef<HTMLDivElement>(null);

  const resize = useRef<ResizeState>();

  const getContainerHeight = () => containerRef.current?.clientHeight || 0;

  const expand = useCallback(
    (index: number) => {
      setHeights(prevHeights => {
        const prev = prevHeights[index];

        // Expand
        const restored = Math.max(lastExpandedHeights.current[index] || minHeight, minHeight);
        const delta = restored - prev;

        return redistributeHeights({
          index,
          delta,
          heights: prevHeights,
          minHeight: minHeight,
          resizerHeight: resizerHeight,
          totalHeight: getContainerHeight(),
          shrinkLower: true,
        });
      });
    },
    [minHeight, resizerHeight]
  );

  const collapse = useCallback(
    (index: number) => {
      setHeights(prevHeights => {
        const prev = prevHeights[index];

        // collapse
        lastExpandedHeights.current[index] = prev;
        const delta = minHeight - prev;

        return redistributeHeights({
          index,
          delta,
          heights: prevHeights,
          minHeight: minHeight,
          resizerHeight: resizerHeight,
          totalHeight: getContainerHeight(),
        });
      });
    },
    [minHeight, resizerHeight]
  );

  useImperativeHandle(
    api,
    () => ({
      expand,
      collapse,
    }),
    [collapse, expand]
  );

  const handleMouseDown = (index: number, e: React.MouseEvent) => {
    e.preventDefault();

    resize.current = {
      index,
      startY: e.clientY,
      startHeights: [...heights],
      totalHeight: getContainerHeight(),
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  };

  const handlePointerMove = (e: MouseEvent) => {
    e.preventDefault();

    if (!resize.current) return;

    const { index, startY, startHeights, totalHeight } = resize.current;
    const delta = startY - e.clientY;

    const newHeights = redistributeHeights({
      index,
      delta,
      heights: startHeights,
      minHeight: minHeight,
      resizerHeight: resizerHeight,
      totalHeight,
    });

    // Только если реально поменяли значения — обновляем
    if (!newHeights.every((h, i) => h === heights[i])) {
      setHeights(newHeights);
    }
  };

  const handlePointerUp = () => {
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerup', handlePointerUp);
  };

  return (
    <div ref={containerRef} className={cn(styles.wrapper, containerClassname)}>
      {children.map((child, index) => (
        <React.Fragment key={index}>
          {resizer({ onPointerDown: (e: React.MouseEvent) => handleMouseDown(index, e) })}
          {child({ classname: styles.child, height: heights[index] })}
        </React.Fragment>
      ))}
    </div>
  );
}
