export interface RedistributeHeightsParams {
  index: number;
  delta: number;
  heights: number[];
  minHeight: number;
  resizerHeight: number;
  totalHeight: number;
  shrinkLower?: boolean;
}

export function redistributeHeights({
  index,
  delta,
  heights,
  minHeight,
  resizerHeight,
  totalHeight,
  shrinkLower = false,
}: RedistributeHeightsParams): number[] {
  const count = heights.length;
  const totalResizers = count;
  const sumResizers = totalResizers * resizerHeight;

  const occupied = heights.reduce((a, b) => a + b, 0) + sumResizers;
  const gap = totalHeight - occupied;

  if (delta === 0) return heights;

  // ↑ Увеличение (тянуть вверх или expand)
  if (delta > 0) {
    const needDelta = delta;
    if (gap < needDelta) {
      let restDelta = needDelta - gap;
      const newHeights = [...heights];

      // ===== Если restDelta осталось и включён shrinkLower, уменьшаем нижние элементы =====
      if (shrinkLower) {
        for (let i = index; i < count; i++) {
          const canShrink = newHeights[i] - minHeight;
          if (canShrink >= restDelta) {
            newHeights[i] -= restDelta;
            restDelta = 0;
            break;
          } else {
            restDelta -= canShrink;
            newHeights[i] = minHeight;
          }
        }
      }

      // Сжимаем верхние элементы до minHeight при нехватке места
      for (let i = 0; i < index; i++) {
        const canShrink = newHeights[i] - minHeight;
        if (canShrink >= restDelta) {
          newHeights[i] -= restDelta;
          restDelta = 0;
          break;
        } else {
          restDelta -= canShrink;
          newHeights[i] = minHeight;
        }
      }

      // Если даже после shrinkLower не хватило места
      if (restDelta > 0) return heights;
      newHeights[index] = heights[index] + delta;
      return newHeights;
    } else {
      const newHeights = [...heights];
      newHeights[index] = Math.max(heights[index] + delta, minHeight);
      return newHeights;
    }
  }

  // ↓ Уменьшение (тянуть вниз)
  if (delta < 0) {
    let needDelta = delta;
    const newHeights = [...heights];

    const newHeight = newHeights[index] + needDelta;
    if (newHeight < minHeight) {
      needDelta = newHeight - minHeight;
      newHeights[index] = minHeight;
    } else {
      newHeights[index] = newHeight;
      needDelta = 0;
    }

    let i = index + 1;
    while (needDelta < 0 && i < heights.length) {
      const canShrink = newHeights[i] - minHeight;
      if (canShrink >= -needDelta) {
        newHeights[i] += needDelta;
        needDelta = 0;
        break;
      } else {
        newHeights[i] = minHeight;
        needDelta += canShrink;
      }
      i++;
    }
    if (needDelta < 0) return heights;
    return newHeights;
  }

  return heights;
}
