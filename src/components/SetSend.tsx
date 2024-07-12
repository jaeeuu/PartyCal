import type { JSX, Setter } from 'solid-js';
import * as stylex from "@stylexjs/stylex";
import InstagramLogoSvg from '../assets/icons/logo/instagram_logo.svg';
import XLogoSvg from '../assets/icons/logo/x_logo.svg';
import KakaotalkLogoSvg from '../assets/icons/logo/kakaotalk_logo.svg';
import MoreDotsSvg from '../assets/icons/more_dots.svg';
import CopySvg from '../assets/icons/copy.svg';
import SmsLogoIcon from '../assets/icons/logo/sms_logo.svg';
import { SetButton } from './SetShared';

type SetSendProps<P = {}> = P & {
  link: string;
  setShow: Setter<number>;
};

const inStyles = stylex.create({
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
});

const ixStyles = stylex.create({
  base: {
    ...stylex.include(inStyles.flex),
    flexDirection: 'column',
    width: '100%',
    padding: '25px',
    marginTop: '10px',
    gap: '25px',
  },
  box1: {
    ...stylex.include(inStyles.flex),
    width: '100%',
    borderColor: "#f2f3f5",
    borderStyle: "solid",
    borderWidth: "1.5px",
    borderRadius: "15px",
    backgroundColor: "#f8f9fa",
    paddingLeft: '20px',
    paddingRight: '15px',
  },
  linkBox: {
    ...stylex.include(inStyles.flex),
    width: '100%',
    height: '60px',
    fontSize: '16px',
    fontWeight: 500,
  },
  copyIcon: {
    width: '24px',
  },
  box2: {
    ...stylex.include(inStyles.flex),
    width: '100%',
    gap: '30px',
  },
  logos: {
    width: '100%',
    borderRadius: '15px',
    backgroundColor: '#f2f4f6',
    padding: '10px',
  },
  moreIcon: {
    backgroundColor: '#cdcdcd',
    color: '#fff'
  },
  buttonBox: {
    ...stylex.include(inStyles.flex),
    gap: '20px',
    width: '100%',
  },
});

const kakaoShareMainUrl = 'kakaolink://send?appkey=47709efeaae6b8a5a3a04ba9966d08c0&appver=1.0&linkver=4.0&extras={"KA":"sdk/2.7.2 os/javascript sdk_type/javascript lang/ko-KR device/Win32 origin/file%3A%2F%2F"}&template_json={"P":{"TP":"Feed","ME":"${ME}","SID":"capri_1104132","DID":"https://party-cal.vercel.app","SNM":"Partycal","SIC":"https://k.kakaocdn.net/14/dn/btqvX1CL6kz/sSBw1mbWkyZTkk1Mpt9nw1/o.jpg","L":{"LPC":"https://party-cal.vercel.app","LMO":"https://party-cal.vercel.app"},"SL":{"LPC":"https://party-cal.vercel.app","LMO":"https://party-cal.vercel.app"},"VA":"6.0.0","VI":"5.9.8","VW":"2.5.1","VM":"2.2.0","FW":true,"RF":"out-client"},"C":{"THC":3,"THL":[{"TH":{"THU":"http://k.kakaocdn.net/dn/cqwDMY/btsIvberuiA/UYkKIB3MaYlaKNGWffnAxk/kakaolink40_original.png","W":512,"H":512,"SC":1}}],"TI":{"TD":{"T":"PARTYCAL:  일정 투표 플랫폼","D":"친구들과 함께 일정 투표를 시작해보세요"}},"BUL":[{"BU":{"T":"자세히 보기","SR":"both"}}]}}&template_args={}&template_id=109967';
// instagram://sharesheet?text={AnyTextOrLinkToShare}
// https://twitter.com/share?text={TEXT}&url={URL}

export default function SetSend(props: SetSendProps): JSX.Element {

  const shareUrl = async(data: ShareData): Promise<boolean> => {
    //data.url data.text data.title data.files
    try {
      await navigator.share(data);
      return true;
    } catch {
      return false;
    }
  };
  
  const copyUrl = async(text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  };

  const handleLogoClick = (logo: number) => {

  };

  return (
    <div {...stylex.attrs(ixStyles.base)}>
      <div {...stylex.attrs(ixStyles.box1)}>
        <div {...stylex.attrs(ixStyles.linkBox)}>{props.link}</div>
        <CopySvg {...stylex.attrs(ixStyles.copyIcon)} />
      </div>
      <div {...stylex.attrs(ixStyles.box2)}>
        <KakaotalkLogoSvg {...stylex.attrs(ixStyles.logos)} />
        <InstagramLogoSvg {...stylex.attrs(ixStyles.logos)} />
        <XLogoSvg {...stylex.attrs(ixStyles.logos)} />
        <SmsLogoIcon {...stylex.attrs(ixStyles.logos)} />
      </div>
      <div {...stylex.attrs(ixStyles.buttonBox)}>
        <SetButton mode="sub">더보기</SetButton>
        <SetButton mode="main" onClick={()=>props.setShow(0)}>완료</SetButton>
      </div>
    </div>
  );
}