import type { JSX, Setter } from 'solid-js';
import  stylex from "@stylexjs/stylex";
import InstagramLogoSvg from '../assets/icons/logo/instagram_logo.svg';
import WhatsappLogoSvg from '../assets/icons/logo/whatsapp_logo.svg';
import KakaotalkLogoSvg from '../assets/icons/logo/kakaotalk_logo.svg';
import FacebookLogoSvg from '../assets/icons/logo/facebook_logo.svg';
import { SetButton, SetButtonBox } from './SetShared';
import { CallDialog } from './SetDialog';

type SetSendProps<P = {}> = P & {
  link: string;
  setShow: Setter<number>;
};

const inStyles = stylex.create({
  flex: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
});

const ixStyles = stylex.create({
  base: {
    ...stylex.include(inStyles.flex),
    flexDirection: 'column',
    // padding: '15px',
    marginTop: '10px',
    // gap: '10px',
  },
  box0: {
    ...stylex.include(inStyles.flex),
    flexDirection: 'column',
    gap: '7px',
    paddingRight: '15px',
    paddingLeft: '15px',
    marginBottom: '15px',
  },
  boxtext: {
    paddingLeft: '15px',
    color: "#6b7784",
    fontWeight: 700,
    alignSelf: "flex-start",
    fontSize: '16px',
  },
  box1: {
    ...stylex.include(inStyles.flex),
    borderColor: "#f2f3f5",
    borderStyle: "solid",
    borderWidth: "1.5px",
    // borderRadius: "15px",
    backgroundColor: "#f8f9fa",
    paddingLeft: '20px',
    paddingRight: '15px',
    userSelect: 'text',
  },
  box1help: {
    fontSize: '13px',
    //color: "#4E5968"
    color: "#8B95A1",
  },
  linkBox: {
    ...stylex.include(inStyles.flex),
    height: '60px',
    fontSize: '16px',
    fontWeight: 500,
    color: "#246ab6",
  },
  copyBox: {
    ...stylex.include(inStyles.flex),
    width: null,
  },
  copyIcon: {
    width: '24px',
    color: "#8f8f8f",
  },
  box2: {
    ...stylex.include(inStyles.flex),
    gap: '25px',
    borderColor: "#f2f3f5",
    borderStyle: "solid",
    borderWidth: "1.5px",
    borderRadius: "15px",
    padding: '10px',
    marginBottom: '15px',
  },
  logoBox: {
    ...stylex.include(inStyles.flex),
    padding: '14px',
    backgroundColor: '#f2f4f6',
    borderRadius: '15px',
  },
  logos: {
    width: '100%',
    borderRadius: '10px',
    //padding: '10px',
  },
  buttonBox: {
    ...stylex.include(inStyles.flex),
    gap: '20px',
  },
});

export default function SetSend(props: SetSendProps): JSX.Element {

  const getUrl = (url: string): string => {
    if (url === 'mainpage'){
      return 'https://partycal.site';
    } else {
      return url;
    }
  };
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
      CallDialog(1);
      return true;
    } catch {
      return false;
    }
  };

  const handleMoreClick = async (url: string) => {
    props.setShow(0);
    const urlAll = getUrl(url);
    if(url === 'mainpage'){
      const shareData: ShareData = {
        title: 'PARTYCAL: 일정 투표 플랫폼',
        text: '친구들과 함께 일정 투표를 시작해보세요',
        url: urlAll,
      };
      await shareUrl(shareData);
    } else {
      const shareData: ShareData = {
        title: '우리 언제 만날까?',
        text: '지금 바로 투표에 참여해보세요!',
        url: urlAll,
      };
      await shareUrl(shareData);
    }
  };

  const handleCopyClick = async (url: string) => {
    // props.setShow(0);
    const urlAll = getUrl(url);
    await copyUrl(urlAll);
  };

  const handleSnsClick = async (url: string, type: number) => {
    
    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
    const urlAll = getUrl(url);
    let openUrl = '';
    if (!isMobile && (type < 4)) {
      CallDialog(2);
      return;
    }
    props.setShow(0);
    if (type === 1) {
      if (url === 'mainpage') {
        openUrl = 'kakaolink://send?appkey=47709efeaae6b8a5a3a04ba9966d08c0&appver=1.0&linkver=4.0&extras={"KA":"sdk/2.7.2 os/javascript sdk_type/javascript lang/ko-KR device/Win32 origin/file%3A%2F%2F"}&template_json={"P":{"TP":"Feed","ME":"${ME}","SID":"capri_1104132","DID":"https://partycal.site","SNM":"Partycal","SIC":"https://k.kakaocdn.net/14/dn/btqvX1CL6kz/sSBw1mbWkyZTkk1Mpt9nw1/o.jpg","L":{"LPC":"https://partycal.site","LMO":"https://partycal.site"},"SL":{"LPC":"https://partycal.site","LMO":"https://partycal.site"},"VA":"6.0.0","VI":"5.9.8","VW":"2.5.1","VM":"2.2.0","FW":true,"RF":"out-client"},"C":{"THC":3,"THL":[{"TH":{"THU":"http://k.kakaocdn.net/dn/cqwDMY/btsIvberuiA/UYkKIB3MaYlaKNGWffnAxk/kakaolink40_original.png","W":512,"H":512,"SC":1}}],"TI":{"TD":{"T":"PARTYCAL:  일정 투표 플랫폼","D":"친구들과 함께 일정 투표를 시작해보세요"}},"BUL":[{"BU":{"T":"자세히 보기","SR":"both"}}]}}&template_args={}&template_id=109967';
      } else {
        // openUrl = 'kakaolink://send?appkey=47709efeaae6b8a5a3a04ba9966d08c0&appver=1.0&linkver=4.0&extras={"KA":"sdk/2.7.2 os/javascript sdk_type/javascript lang/ko-KR device/Win32 origin/file%3A%2F%2F"}&template_json={"P":{"TP":"Feed","ME":"${ME}","SID":"capri_1104132","DID":"${}","SNM":"Partycal","SIC":"https://k.kakaocdn.net/14/dn/btqvX1CL6kz/sSBw1mbWkyZTkk1Mpt9nw1/o.jpg","L":{"LPC":"https://partycal.site/s/something","LMO":"https://partycal.site/s/something"},"SL":{"LPC":"https://partycal.site","LMO":"https://partycal.site"},"VA":"6.0.0","VI":"5.9.8","VW":"2.5.1","VM":"2.2.0","FW":true,"RF":"out-client"},"C":{"THC":3,"THL":[{"TH":{"THU":"http://k.kakaocdn.net/dn/iDQJL/btsIvvjsFXL/h3mAITjXCyvsPv8vmgZW00/kakaolink40_original.png","W":512,"H":512,"SC":1}}],"TI":{"TD":{"T":"우리 언제 만날까?","D":"지금 바로 투표에 참여해보세요!"}},"BUT":0,"BUL":[{"BU":{"T":"투표하기","SR":"both"}}]}}&template_args={"${share}":"s/something"}&template_id=109953';
      }
    } else if (type === 2) {
      openUrl = `instagram://sharesheet?text=${urlAll}`;
    } else if (type === 3) {
      openUrl = `fb-messenger://share?link=${urlAll}&app_id=871917468158080`;
    } else if (type === 4) {
      openUrl = `https://api.whatsapp.com/send?text=${urlAll}`;
    }
    window.open(openUrl, '_blank', 'popup=true, noopener, noreferrer');
  };

  return (
    <div {...stylex.attrs(ixStyles.base)}>
      <div {...stylex.attrs(ixStyles.box0)}>
        <div {...stylex.attrs(ixStyles.boxtext)}>URL 링크</div>
        <SetButtonBox sx={[ixStyles.box1]} onClick={()=>handleCopyClick(props.link)}>
          <div {...stylex.attrs(ixStyles.linkBox)}>{getUrl(props.link)}</div>
          {/* <SetButtonBox sx={[ixStyles.copyBox]} onClick={()=>handleCopyClick(props.link)}><CopySvg {...stylex.attrs(ixStyles.copyIcon)} /></SetButtonBox> */}
        </SetButtonBox>
        <div {...stylex.attrs(ixStyles.box1help)}>누르면 링크가 복사돼요!</div>
      </div>
      <div {...stylex.attrs(ixStyles.box0)}>
        <div {...stylex.attrs(ixStyles.boxtext)}>SNS로 보내기</div>
        <div {...stylex.attrs(ixStyles.box2)}>
          <SetButtonBox sx={[ixStyles.logoBox]} onClick={()=>handleSnsClick(props.link, 1)}><KakaotalkLogoSvg {...stylex.attrs(ixStyles.logos)} /></SetButtonBox>
          <SetButtonBox sx={[ixStyles.logoBox]} onClick={()=>handleSnsClick(props.link, 2)}><InstagramLogoSvg {...stylex.attrs(ixStyles.logos)} /></SetButtonBox>
          <SetButtonBox sx={[ixStyles.logoBox]} onClick={()=>handleSnsClick(props.link, 3)}><FacebookLogoSvg {...stylex.attrs(ixStyles.logos)} /></SetButtonBox>
          <SetButtonBox sx={[ixStyles.logoBox]} onClick={()=>handleSnsClick(props.link, 4)}><WhatsappLogoSvg {...stylex.attrs(ixStyles.logos)} /></SetButtonBox>
        </div>
      </div>
      <div {...stylex.attrs(ixStyles.buttonBox)}>
        <SetButton mode="sub" onClick={()=>props.setShow(0)}>닫기</SetButton>
        <SetButton mode="main" onClick={()=>handleMoreClick(props.link)}>더보기</SetButton>
      </div>
    </div>
  );
}