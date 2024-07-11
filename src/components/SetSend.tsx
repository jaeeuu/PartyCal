import type { JSX } from 'solid-js';
import * as stylex from "@stylexjs/stylex";

const ixStyles = stylex.create({
  base: {

  },
});

type SetSendProps<P = {}> = P & {
  link: string;
};

export default function SetSend(props: SetSendProps): JSX.Element {
  return (
    <>
    </>
  );
}