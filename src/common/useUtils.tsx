import { getSvgPath } from 'figma-squircle';
import { createEffect, onMount } from 'solid-js';

/* eslint-disable */
declare module "solid-js" {
  namespace JSX {
    interface Directives {
      showUpAni: number;
      smoothCorner: {};
    }
  }
}
/* eslint-enable */

export function showUpAni(el, value) {
  if (value()) {
    onMount(() => {
      // const delay = value();
      const keyframes = new KeyframeEffect(
        el,
        [
          { transform: 'translateY(50px) scaleY(1.3)', opacity: 0, transformOrigin: 'center top' },
          { transform: 'translateY(0px) scaleY(1)', opacity: 1, transformOrigin: 'center center' },
        ],
        {
          duration: 700,
          easing: "cubic-bezier(0.08,0.82,0.17,1)",
          iterations: 1,
          delay: value()*100,
          fill: 'both',
        },
      );
      const ani = new Animation(keyframes);
      ani.play();
      // ani.ready.then(() => el.style.opacity = '1');
      ani.finished.then(() => ani.cancel());
    });
  }
};

//eslint-disable-next-line
export function smoothCorner(el, value) {
  createEffect(() => {
    if (el) {
      const computedStyle = getComputedStyle(el);
      const borderRadius = parseFloat(computedStyle.getPropertyValue("border-radius")??'0')??0;
      if (borderRadius > 0) {
        // const borderWidth = parseFloat(computedStyle?.borderWidth??'0')??0;
        const size = el.getBoundingClientRect();
        // const size = { width: el.clientWidth, height: el.clientHight };
        // const size = { width: parseFloat(computedStyle.width), height: parseFloat(computedStyle.height) };
        const roundPath = getSvgPath({
          width: size.width,
          height: size.height,
          cornerRadius: borderRadius,
          cornerSmoothing: 0.8,
          preserveSmoothing: true,
        });
        el.style.setProperty('clip-path', `path('${roundPath}')`, "important");
        // el.style.setProperty('border-radius', '');
        //el.style.setProperty('overflow', 'hidden');
      }
    }
  });
  // if (el) {
    // let beforeSize = null;
    // const resizeObserver = new ResizeObserver((entries) => {
    //   requestAnimationFrame(() => {
    //     for (const entry of entries) {
    //       if (entry.borderBoxSize[0].inlineSize !== beforeSize) {
    //         beforeSize = entry.borderBoxSize[0].inlineSize;
    //         const e = entry.target as HTMLElement;
    //         const computedStyle = getComputedStyle(e);
    //         const borderRadius = parseFloat(computedStyle.getPropertyValue("border-radius")??'0')??0;
    //         if (borderRadius > 0) {
    //           const roundPath = getSvgPath({
    //             width: entry.borderBoxSize[0].inlineSize,
    //             height: entry.borderBoxSize[0].blockSize,
    //             cornerRadius: borderRadius,
    //             cornerSmoothing: 1,
    //             preserveSmoothing: true,
    //           });
    //           e.style.setProperty('clip-path', `path('${roundPath}')`, "important");
    //           e.style.setProperty('border-radius', '');
    //           // e.style.setProperty('overflow', 'hidden');
    //         }
    //       }
    //     }
    //   });
    // });
    // onMount(() => {
    //   resizeObserver.observe(el);
    // });
    // onCleanup(() => {
    //   resizeObserver.disconnect();
    // });
  // }
}