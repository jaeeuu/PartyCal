// import type { Accessor, Setter } from "solid-js";
// import { createSignal } from "solid-js";

type dragEventReturn = {
  x: number,
  y: number,
};

// const [pointerId, setPointerId] = createSignal<string | null>(null);
//const [startXY, setStartXY] = createSignal<[number, number]>([0, 0]);
let startXY: [number, number] = [-1, -1];
let lastXY: [number, number] = [-1, -1];
let pointerId = null;
// let isDragging = false;

const dragStartHandler = ( e: Event ): void => {
  e.preventDefault();
  const element = e.target as Element;
  if (e instanceof PointerEvent && !pointerId) {
    startXY = [e.clientX, e.clientY];
    pointerId = e.pointerId;
    element.setPointerCapture(pointerId);
  }
};

const dragMoveHandler = ( e: Event ): dragEventReturn|null => {
  e.preventDefault();
  if (e instanceof PointerEvent && e.pointerId === pointerId) {
    lastXY = [e.clientX, e.clientY];
    const deltaX = startXY[0] - lastXY[0];
    const deltaY = startXY[1] - lastXY[1];
    return { x: deltaX, y: deltaY };
  } else return null;
};

const dragEndHandler = ( e: Event ): dragEventReturn|null => {
  e.preventDefault();
  const element = e.target as Element;
  if (e instanceof PointerEvent && e.pointerId === pointerId) {
    startXY = [-1, -1];
    element.releasePointerCapture(pointerId);
    pointerId = null;
    return { x: lastXY[0], y: lastXY[1] };
  } else return null;
};

export { dragStartHandler, dragMoveHandler, dragEndHandler };