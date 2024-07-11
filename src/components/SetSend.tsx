import type { JSX } from 'solid-js';
import * as stylex from "@stylexjs/stylex";

const ixStyles = stylex.create({
  base: {

  },
});

type SetSendProps<P = {}> = P & {
  link: string;
};

const kakaoShareUrl = 'kakaolink://send?appkey=47709efeaae6b8a5a3a04ba9966d08c0&appver=1.0&linkver=4.0&extras={"KA":"sdk/2.7.2 os/javascript sdk_type/javascript lang/ko-KR device/Win32 origin/file%3A%2F%2F"}&template_json={"P":{"TP":"Feed","ME":"${ME}","SID":"capri_1104132","DID":"https://party-cal.vercel.app","SNM":"Partycal","SIC":"https://k.kakaocdn.net/14/dn/btqvX1CL6kz/sSBw1mbWkyZTkk1Mpt9nw1/o.jpg","L":{"LPC":"https://party-cal.vercel.app","LMO":"https://party-cal.vercel.app"},"SL":{"LPC":"https://party-cal.vercel.app","LMO":"https://party-cal.vercel.app"},"VA":"6.0.0","VI":"5.9.8","VW":"2.5.1","VM":"2.2.0","FW":true,"RF":"out-client"},"C":{"THC":3,"THL":[{"TH":{"THU":"http://k.kakaocdn.net/dn/cqwDMY/btsIvberuiA/UYkKIB3MaYlaKNGWffnAxk/kakaolink40_original.png","W":512,"H":512,"SC":1}}],"TI":{"TD":{"T":"PARTYCAL:  일정 투표 플랫폼","D":"친구들과 함께 일정 투표를 시작해보세요"}},"BUL":[{"BU":{"T":"자세히 보기","SR":"both"}}]}}&template_args={}&template_id=109967';
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
        <a href={kakaoShareUrl}>kakaotalk</a>
        <div>x</div>
        <div>more</div>
      </div>
    </>
  );
}