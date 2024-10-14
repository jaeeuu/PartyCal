import { getSvgPath } from 'figma-squircle';
import { createEffect, createMemo, onMount } from 'solid-js';

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      showUpAni: number;
      smoothCorner: {};
    }
  }
}

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

export function smoothCorner(el, value) {
  createEffect(() => {
    if (el) {
      const computedStyle = getComputedStyle(el);
      const borderRadius = parseFloat(computedStyle?.borderRadius??'0')??0;
      if (borderRadius > 0) {
        const borderWidth = parseFloat(computedStyle?.borderWidth??'0')??0;
        const size = el.getBoundingClientRect();
        const roundPath = getSvgPath({
          width: size.width+borderWidth,
          height: size.height+borderWidth,
          cornerRadius: borderRadius,
          cornerSmoothing: 0.8,
          preserveSmoothing: true,
        });
        el.style.clipPath = `path('${roundPath})`;
      }
      
    }
  });
}