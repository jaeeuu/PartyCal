import type { JSX } from 'solid-js';
import * as stylex from "@stylexjs/stylex";

const ixStyles = stylex.create({
  base: {

  },
});

type SetSendProps<P = {}> = P & {
  link: string;
};

const kakaoUrl = 'kakaolink://send?appkey=47709efeaae6b8a5a3a04ba9966d08c0&appver=1.0&linkver=4.0&extras={"KA":"sdk/2.7.2 os/javascript sdk_type/javascript lang/ko-KR device/Win32 origin/file%3A%2F%2F"}&template_json={"P":{"TP":"Feed","ME":"${ME}","SID":"capri_1104132","DID":"https://party-cal.vercel.app/s/something","SNM":"Partycal","SIC":"https://k.kakaocdn.net/14/dn/btqvX1CL6kz/sSBw1mbWkyZTkk1Mpt9nw1/o.jpg","L":{"LPC":"https://party-cal.vercel.app/s/something","LMO":"https://party-cal.vercel.app/s/something"},"SL":{"LPC":"https://party-cal.vercel.app/s/something","LMO":"https://party-cal.vercel.app/s/something"},"VA":"6.0.0","VI":"5.9.8","VW":"2.5.1","VM":"2.2.0","FW":true,"RF":"out-client"},"C":{"THC":3,"THL":[{"TH":{"THU":"http://k.kakaocdn.net/dn/iDQJL/btsIvvjsFXL/h3mAITjXCyvsPv8vmgZW00/kakaolink40_original.png","W":512,"H":512,"SC":1}}],"TI":{"TD":{"T":"우리 언제 만날까?","D":"지금 바로 투표에 참여해보세요!"}},"BUT":0,"BUL":[{"BU":{"T":"투표하기","SR":"both"}}]}}&template_args={"${share}":"s/something"}&template_id=109953';
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
        <a href={kakaoUrl}>kakaotalk</a>
        <div>x</div>
        <div>more</div>
      </div>
    </>
  );
}