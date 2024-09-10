import { useParams } from "@solidjs/router";
import * as stylex from '@stylexjs/stylex';

const ixStyles = stylex.create({
  sliderBox: {
    height: '100px',
    //eslint-disable-next-line
    WebkitAppearance: 'none',
    //eslint-disable-next-line
    "::-webkit-slider-runnable-track": {
      height: '20px',
    },
    //eslint-disable-next-line
    "::-webkit-slider-thumb": {

    },
  },
});

export default function ResultPage() {
  // const params = useParams();
  // navigator.userAgent.includes('KAKAOTALK')

  return (
    <div>
      <input
        {...stylex.attrs(ixStyles.sliderBox)}
        type="range"
        min="0"
        max="100"
        value="0"
      />
    </div>
  );
}