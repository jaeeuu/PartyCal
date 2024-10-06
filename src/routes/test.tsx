import type { JSX } from "solid-js";
import { createSignal } from 'solid-js';
import { dragStartHandler, dragMoveHandler, dragEndHandler } from "~/common/drags";
import * as stylex from "@stylexjs/stylex";

const ixStyles = stylex.create({
  box: {
    height: '500px',
    textAlign: 'center',
    touchAction: 'none',
    backgroundColor: 'yellow',
  },
});

export default function Test(): JSX.Element {

  const [length, setLength] = createSignal<number>(0);
  const [test, setTest] = createSignal<number>(0);
  let throttleTimer = false;

  const pointerDown = (e: Event) => {
    dragStartHandler(e);
  };

  const pointerMove = (e: Event) => {
    if (throttleTimer) return;
    else {
      throttleTimer = true;
      requestAnimationFrame(() => {
        dragMoveHandler(e);
        throttleTimer = false;
      });
    }
  };

  const pointerUp = (e: Event) => {
    // if (!dragRef) return;
    throttleTimer = false;
    const drag = dragEndHandler(e);
    const wHeight = window.innerHeight;
    setLength((drag.last.y??0 / wHeight));
    setTest((drag.delta.y??0 / wHeight));
  };

  return (
    <div>
      <h1>Test</h1>
      <div {...stylex.attrs(ixStyles.box)} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}>
        {length()},{test()}
      </div>
    </div>
  );
}