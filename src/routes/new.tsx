// import * as stylex from '@stylexjs/stylex';
import { clientOnly } from '@solidjs/start';
const New2 = clientOnly(() => (import('../components/New2')));

// const ixStyle = stylex.create({

// });

export default function New() {
  return (
    <New2 />
  );
}