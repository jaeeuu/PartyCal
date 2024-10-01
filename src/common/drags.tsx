// import type { Accessor, Setter } from "solid-js";
// import { createSignal } from "solid-js";

type drageEventHandlerReturn = {
  dir: 'up' | 'down' | 'left' | 'right';
  length: number;
  trigger: boolean;
};

// const [pointerId, setPointerId] = createSignal<string | null>(null);
//const [startXY, setStartXY] = createSignal<[number, number]>([0, 0]);
let startXY: [number, number] = [-1, -1];
let pointerId: string | null = null;
// let isDragging = false;

const dragEventPointerDown = ( e: Event ): void => {
  const element = e.target as Element;
  if (e instanceof PointerEvent && e.isPrimary) {
    startXY = [e.clientX, e.clientY];
    pointerId = e.pointerId.toString();
    e.preventDefault();
    element.setPointerCapture(e.pointerId);
  }
};

const dragEventPointerMove = ( e: Event ): drageEventHandlerReturn|null => {
  if (e instanceof PointerEvent && e.isPrimary && e.pointerId.toString() === pointerId && startXY[0] !== -1) {
    e.preventDefault();
    const [startX, startY] = startXY;
    const deltaX = startX - e.clientX;
    const deltaY = startY - e.clientY;
    const triggerOffset = 50;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        return { dir: 'left', length: deltaX, trigger: deltaX > triggerOffset };
      }
      else return { dir: 'right', length: -deltaX, trigger: deltaX < -triggerOffset };
    } else {
      if (deltaY > 0) return { dir: 'up', length: deltaY, trigger: deltaY > triggerOffset };
      else return { dir: 'down', length: -deltaY, trigger: deltaY < -triggerOffset };
    }
  } else return null;
};

const dragEventPointerUp = ( e: Event ): void => {
  const element = e.target as Element;
  if (e instanceof PointerEvent && e.isPrimary && e.pointerId.toString() === pointerId) {
    e.preventDefault();
    startXY = [-1, -1];
    element.releasePointerCapture(e.pointerId);
    pointerId = null;
  }
};

export { dragEventPointerDown, dragEventPointerMove, dragEventPointerUp };