import type { JSX } from 'solid-js';
import * as stylex from "@stylexjs/stylex";

const ixStyles = stylex.create({
  base: {

  },
});

type SetSendProps<P = {}> = P & {
  link: string;
};

// instagram://sharesheet?text={AnyTextOrLinkToShare}
// https://twitter.com/share?text={TEXT}&url={URL}

export default function SetSend(props: SetSendProps): JSX.Element {
  return (
    <>
      <div>
        <div>{props.link}</div>
        <div>CopyButton</div>
      </div>
      <div>
        <div>instagram</div>
        <a href=''>kakaotalk</a>
        <div>x</div>
        <div>more</div>
      </div>
    </>
  );
}