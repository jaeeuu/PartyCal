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
        <a href='kakaolink://send?appkey=47709efeaae6b8a5a3a04ba9966d08c0&appver=1.0&linkver=4.0&extras={"KA":"os/javascript lang/en-US","lcba":"serverCallbackArgs_if_any"}&request_url=https://party-cal.vercel.app'>kakaotalk</a>
        <div>x</div>
        <div>more</div>
      </div>
    </>
  );
}