import stylex from "@stylexjs/stylex";
import type { JSX } from "solid-js";

const spin = stylex.keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'},
});

const spinnerDash = stylex.keyframes({
  '0%': {strokeDasharray: '0 150', strokeDashoffset: '0'},
  '47.5%': {strokeDasharray: '42 150', strokeDashoffset: '-16'},
  '95%, 100%': {strokeDasharray: '42 150', strokeDashoffset: '-59'}
});

const ixStyles = stylex.create({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    maxWidth: '50px',
    width: '100%',
    mask: 'url(#spinnerMask)',
    maskRepeat: "no-repeat",
    transformOrigin: 'center',
    animationName: spin,
    animationDuration: '2s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    background: "linear-gradient(146deg, #FF9292, #F6A7BA, #FFC5C5, #F7A4A4)",
  },
  circle: {
    animationName: spinnerDash,
    animationDuration: '1.5s',
    animationTimingFunction: 'ease-in',
    animationIterationCount: 'infinite',
  },
});


export default function Spinner(): JSX.Element {

  return (
    <div {...stylex.attrs(ixStyles.root)}>
      <div {...stylex.attrs(ixStyles.main)}>
        <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <mask id="spinnerMask" maskContentUnits="objectBoundingBox">
              <circle {...stylex.attrs(ixStyles.circle)} cx="12" cy="12" r="9.5" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" transform="scale(0.0417, 0.0417)"/>
            </mask>
          </defs>
        </svg>
      </div>
    </div>
  );
}