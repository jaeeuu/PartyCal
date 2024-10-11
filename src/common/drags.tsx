// import type { Accessor, Setter } from "solid-js";
// import { createSignal } from "solid-js";

type posXY = {
  x: number|null;
  y: number|null;
};

// const [pointerId, setPointerId] = createSignal<string | null>(null);
//const [startPos, setstartPos] = createSignal<[number, number]>([0, 0]);
let startPos: posXY = { x: null, y: null };
let lastPos: posXY = { x: null, y: null };
let deltaPos: posXY = { x: null, y: null };
let pointerId: number|null = null;
// let isDragging = false;

const dragStartHandler = ( e: Event ): void => {
  e.preventDefault();
  const element = e.target as Element;
  if (e instanceof PointerEvent && !pointerId) {
    startPos = { x: e.clientX, y: e.clientY };
    pointerId = e.pointerId;
    element.setPointerCapture(pointerId);
  }
};

const dragMoveHandler = ( e: Event ): posXY => {
  e.preventDefault();
  if (e instanceof PointerEvent && e.pointerId === pointerId && startPos.x !== null) {
    const diffPos = { x: e.clientX - (startPos.x??0), y: e.clientY - (startPos.y??0) };
    deltaPos = {x: diffPos.x - (lastPos.x??0), y: diffPos.y - (lastPos.y??0)};
    lastPos = { x: diffPos.x, y: diffPos.y };
    return diffPos;
  } else return {x: null, y: null};
};

const dragEndHandler = ( e: Event ): {last: posXY, delta: posXY} => {
  e.preventDefault();
  const element = e.target as Element;
  if (e instanceof PointerEvent && e.pointerId === pointerId) {
    element.releasePointerCapture(pointerId);
    pointerId = null;
    return {last: lastPos, delta: deltaPos};
  } else return {last: {x: null, y: null}, delta: {x: null, y: null}};
};

export { dragStartHandler, dragMoveHandler, dragEndHandler };