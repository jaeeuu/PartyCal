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

function getPath(x: number, y: number, width: number, height: number, radius: number): string {
  const iterator = points(x, y, width, height, radius);
  // @ts-expect-error
  const { x: initialX, y: initialY } = iterator.next().value ?? { x: 0, y: 0 };
  let out = `M ${initialX} ${initialY} `;
  for (const { x, y } of iterator) {
    out += `L ${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return out;
}

function* points(x: number, y: number, width: number, height: number, radius: number) {
  const w = Math.max(0, width);
  const h = Math.max(0, height);
  const l = Math.min(w, h) / 2;
  const r = Math.max(0, Math.min(radius, l));
  const segments = Math.ceil(Math.sqrt(r)) * 4;
  const exponent = r / l;
  const indexToParameter = Math.PI / 2 / segments;

  for (let i = 0; i < 4; i++) {
    const sideX = i === 0 || i === 3 ? 0 : 1;
    const sideY = i < 2 ? 0 : 1;
    const odd = i % 2;
    const even = 1 - odd;
    const rotateX = (sideX * 2 - 1) * l;
    const rotateY = (sideY * 2 - 1) * l;
    const m11 = rotateY * even;
    const m21 = rotateY * odd;
    const m12 = rotateX * odd;
    const m22 = rotateX * even;
    const m13 = w * sideX + l * (1 - sideX * 2) + x;
    const m23 = h * sideY + l * (1 - sideY * 2) + y;

    for (let i = 0; i < segments + 1; i++) {
      const t = i * indexToParameter;
      const x0 = Math.cos(t) ** exponent;
      const y0 = Math.sin(t) ** exponent;
      const x = x0 * m11 + y0 * m12 + m13;
      const y = x0 * m21 + y0 * m22 + m23;
      yield { x, y };
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

//eslint-disable-next-line
export function smoothCorner(el, value) {
  createEffect(() => {
    if (el) {
      const computedStyle = getComputedStyle(el);
      const borderRadius = parseFloat(computedStyle?.borderRadius??'0')??0;
      if (borderRadius > 0) {
        // const borderWidth = parseFloat(computedStyle?.borderWidth??'0')??0;
        const size = el.getBoundingClientRect();
        const roundPath = getPath(0, 0, size.width, size.height, borderRadius);
        el.style.clipPath = `path('${roundPath})`;
        el.style.borderRadius = '';
      }
    }
  });
}