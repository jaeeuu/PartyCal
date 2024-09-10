// import { getTransitionSizes } from '@formkit/auto-animate';
// import { springEasing } from './Store';

export default function AnimateConfig(el, action, oldCoords, newCoords){
  if (action === 'add') {
    const keyframes = [
      { transform: 'scale(0)', transformOrigin: 'top center'},
      { transform: 'scale(1)', transformOrigin: 'top center' }
    ];
    return new KeyframeEffect(el, keyframes, { duration: 900, easing: springEasing });
  } else if (action === 'remove') {
    const keyframes = [
      { transform: 'scale(1)', opacity: 1, transformOrigin: 'top center' },
      { transform: 'scale(0)', opacity: 0, transformOrigin: 'top center' }
    ];
    return new KeyframeEffect(el, keyframes, { duration: 500, easing: 'ease' });
  } else if (action === 'remain') {
    const deltaX = 0;
    const deltaY = oldCoords.top - newCoords.top;
    // if(oldCoords.top === 0 && oldCoords.left === 0){
    //   const keyframes = [
    //     { filter: 'blur(2px)' },
    //     { filter: 'blur(0px)' }
    //   ];
    //   return new KeyframeEffect(el, keyframes, { duration: 500, easing: 'ease' });
    // }
    if(!(deltaX === 0 && deltaY === 0) && !(oldCoords.top === 0 && oldCoords.left === 0)){
      //const [widthFrom, widthTo, heightFrom, heightTo] = getTransitionSizes(el, oldCoords, newCoords);
      
      const start = { transform: `translate(${deltaX}px, ${deltaY}px)` };
      // const mid = { filter: 'blur(1px)', transform: `translate(${deltaX * -0.05}px, ${deltaY * -0.05}px)`, offset: 0.6 };
      const end = { transform: `translate(0, 0)` };

      // if (widthFrom !== widthTo) {
      //   start.width = `${widthFrom}px`;
      //   // mid.width = `${widthFrom >= widthTo ? widthTo / 1.05 : widthTo * 1.05}px`;
      //   end.width = `${widthTo}px`;
      // }
      // if (heightFrom !== heightTo) {
      //   start.height = `${heightFrom}px`;
      //   // mid.height = `${heightFrom >= heightTo ? heightTo / 1.05 : heightTo * 1.05}px`;
      //   end.height = `${heightTo}px`;
      // }
      const keyframes = [start, end];
      return new KeyframeEffect(el, keyframes, { duration: 800, easing: springEasing });
    }
  }
  return new KeyframeEffect(el, [], { duration: 0, easing: 'linear' });
}