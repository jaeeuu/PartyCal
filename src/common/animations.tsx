import { onMount } from 'solid-js';

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      showUpAni: number;
    }
  }
}

export function showUpAni(el: Element, value: number) {
  onMount(() => {
    // const delay = value();
    const keyframes = new KeyframeEffect(
      el,
      [
        { transform: 'translateY(50px) scaleY(1.3)', opacity: 0, transformOrigin: 'center top' },
        { transform: 'translateY(0px) scaleY(1)', opacity: 1, transformOrigin: 'center top' },
      ],
      {
        duration: 750,
        easing: "cubic-bezier(0.08,0.82,0.17,1)",
        iterations: 1,
        delay: value*100,
        fill: 'both',
      },
    );
    const ani = new Animation(keyframes);
    ani.play();
    // ani.ready.then(() => el.style.opacity = '1');
    ani.finished.then(() => ani.cancel());
  });
};