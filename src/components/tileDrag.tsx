"use client";
import type { Setter } from "solid-js";

function isMouseEvent(event: Event): event is MouseEvent {
  return event instanceof MouseEvent;
}

function isTouchEvent(event: Event): event is TouchEvent {
  return 'ontouchstart' in window && event.type.startsWith('touch');
}

function getTileIndex(e: Event): number {
  if (isTouchEvent(e) && e.cancelable) e.preventDefault();
  let target = null;
  if (isTouchEvent(e) && e.touches) {
    const { clientX, clientY } = e.touches[0];
    target = document.elementFromPoint(clientX, clientY);
  } else if (isMouseEvent(e)) {
    target = e.target;
  } else {
    return -1;
  }
  const itemIndex = parseInt(target.dataset.index, 10);
  if (isNaN(itemIndex)) return -1;
  return itemIndex;
}

export function handlePointerStart(e: Event, tileState: {currentTile: [number, boolean, number], memTile: boolean[]}, setTile: Setter<boolean[]>) {
  const itemIndex = getTileIndex(e);
  if (itemIndex === -1) return;
  if (isMouseEvent(e) && e.buttons !== 1) return;
  setTile((prev) => {
    tileState.currentTile[0] = itemIndex;
    tileState.currentTile[1] =  !prev[itemIndex];
    tileState.memTile = [...prev];
    tileState.memTile[itemIndex] = tileState.currentTile[1];
    return tileState.memTile;
  });
}

export function handlePointerMove(e: Event, tileState: {currentTile: [number, boolean, number], memTile: boolean[]}, setTile: Setter<boolean[]>) {
  const itemIndex = getTileIndex(e);
  if (tileState.currentTile[0] === -1 || itemIndex === -1) return;
  if (itemIndex === tileState.currentTile[2]) {
    return;
  } else {
    tileState.currentTile[2] = itemIndex;
  }
  if (isMouseEvent(e) && e.buttons !== 1) return;
  if (tileState.currentTile[0] === itemIndex) {
    setTile([...tileState.memTile]);
    return;
  }

  // const minX = Math.min(vars.startTile[0], x);
  // const maxX = Math.max(vars.startTile[0], x);
  // const minY = Math.min(vars.startTile[1], y);
  // const maxY = Math.max(vars.startTile[1], y);

  setTile((prev) => {
    const newTableValues = [...prev];
    newTableValues.forEach((_: boolean, ind: number) => {
      if (ind < Math.min(tileState.currentTile[0], itemIndex) || ind > Math.max(tileState.currentTile[0], itemIndex)) {
        newTableValues[ind] = tileState.memTile[ind];
      } else {
        newTableValues[ind] = tileState.currentTile[1];
      }
    });
    return newTableValues;
  });
}

export function handlePointerEnd(e: Event, tileState: {currentTile: [number, boolean, number], memTile: boolean[]}) {
  if (e.cancelable) e.preventDefault();
  tileState.currentTile = [-1, false, -1];
}
