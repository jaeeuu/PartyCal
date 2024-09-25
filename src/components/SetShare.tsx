import type { JSX, Setter } from 'solid-js';
import * as stylex from "@stylexjs/stylex";
import InstagramLogoSvg from '../assets/icons/logo/instagram_logo.svg';
import KakaotalkLogoSvg from '../assets/icons/logo/kakaotalk_logo.svg';
import CopySvg from '../assets/icons/copy.svg';
import { SetButton, SetButtonBox } from './SetBase';
import { CallDialog } from './SetAlert';
// import { copyToClipboard } from "@solid-primitives/clipboard";

// copyToClipboard;

type SetShareProps<P = {}> = P & {
  link: string;
  setShow: Setter<number>;
};

const inStyles = stylex.create({
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  inner: {
    paddingTop: '16px',
    paddingBottom: '16px',
    paddingRight: '1px',
    borderRadius: '17px',
    fontSize: '15px',
    fontWeight: 700,
    gap: '5px',
    width: '100%',
    justifyContent: 'center',
  },
  box0: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '7px',
  }
});

const ixStyles = stylex.create({
  box01: {
    ...stylex.include(inStyles.box0),
    marginBottom: '25px',
  },
  box02: {
    ...stylex.include(inStyles.box0),
    //marginBottom: '10px',
  },
  boxtext: {
    color: "#6b7784",
    fontWeight: 700,
    fontSize: '18px',
    marginBottom: '5px',
    marginLeft: '5px',
  },
  linkBox: {
    ...stylex.include(inStyles.flex),
    fontSize: '15px',
    fontWeight: 500,
    color: "#246ab6",
    backgroundColor: '#f2f4f6',
    gap: '15px',
    padding: '16px 20px 16px 20px',
    borderRadius: '20px',
    userSelect: 'text',
  },
  box2: {
    ...stylex.include(inStyles.flex),
    width: '100%',
    flexDirection: 'column',
    borderColor: "#f2f3f5",
    borderStyle: "solid",
    borderWidth: "1.5px",
    borderRadius: "27px",
    padding: '10px',
    gap: '10px',
  },
  box21: {
    ...stylex.include(inStyles.flex),
    width: '100%',
    gap: '10px',
  },
  box22: {
    ...stylex.include(inStyles.flex),
  },
  kakaoBox: {
    ...stylex.include(inStyles.flex),
    ...stylex.include(inStyles.inner),
    background: "linear-gradient(160deg, #FFE812, #ffcd00)",
    color: "#3e1c00",
  },
  instaBox: {
    ...stylex.include(inStyles.flex),
    ...stylex.include(inStyles.inner),
    background: "linear-gradient(160deg, #833ab4,#fd1d1d,#fcb045)",
    color: "#f2f4f6",
  },
  moreBox: {
    padding: '16px',
    fontSize: '15px',
    fontWeight: 700,
    borderRadius: '17px',
  },
});

export default function SetShare(props: SetShareProps): JSX.Element {
  
  const copyUrl = async(text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      CallDialog(1);
      return true;
    } catch {
      return false;
    }
  };

  const showShareMore = async (link: string) => {
    const shareUrl = async(data: ShareData): Promise<boolean> => {
      try {
        await navigator.share(data);
        return true;
      } catch {
        return false;
      }
    };
    if(link === 'mainpage'){
      const shareData: ShareData = {
        title: 'PARTYCAL: 일정 투표 플랫폼',
        text: '친구들과 함께 일정 투표를 시작해보세요',
        url: link,
      };
      await shareUrl(shareData);
    } else {
      const shareData: ShareData = {
        title: '우리 언제 만날까?',
        text: '지금 바로 투표에 참여해보세요!',
        url: link,
      };
      await shareUrl(shareData);
    }
  };

  const handleSnsClick = async (type: number) => {
    const user = navigator.userAgent;
    const devices = ["iPhone", "iPad", "Android"];
    const check = devices.some(d => user.includes(d));
    let openUrl = '';
    if (!check && (type < 4)) {
      CallDialog(2);
      return;
    }
    props.setShow(0);
    if (type === 1) {
      if (props.link === 'mainpage') {
        openUrl = 'kakaolink://send?appkey=47709efeaae6b8a5a3a04ba9966d08c0&appver=1.0&linkver=4.0&extras={"KA":"sdk/2.7.2 os/javascript sdk_type/javascript lang/ko-KR device/Win32 origin/file%3A%2F%2F"}&template_json={"P":{"TP":"Feed","ME":"${ME}",'+`"SID":"capri_1104132","DID":${props.link},"SNM":"Partycal","SIC":"https://k.kakaocdn.net/14/dn/btqvX1CL6kz/sSBw1mbWkyZTkk1Mpt9nw1/o.jpg","L":{"LPC":${props.link},"LMO":${props.link}},"SL":{"LPC":${props.link},"LMO":${props.link}},"VA":"6.0.0","VI":"5.9.8","VW":"2.5.1","VM":"2.2.0","FW":true,"RF":"out-client"},"C":{"THC":3,"THL":[{"TH":{"THU":"http://k.kakaocdn.net/dn/cqwDMY/btsIvberuiA/UYkKIB3MaYlaKNGWffnAxk/kakaolink40_original.png","W":512,"H":512,"SC":1}}],"TI":{"TD":{"T":"PARTYCAL:  일정 투표 플랫폼","D":"친구들과 함께 일정 투표를 시작해보세요"}},"BUL":[{"BU":{"T":"자세히 보기","SR":"both"}}]}}&template_args={}&template_id=109967`;
      } else {
        // openUrl = 'kakaolink://send?appkey=47709efeaae6b8a5a3a04ba9966d08c0&appver=1.0&linkver=4.0&extras={"KA":"sdk/2.7.2 os/javascript sdk_type/javascript lang/ko-KR device/Win32 origin/file%3A%2F%2F"}&template_json={"P":{"TP":"Feed","ME":"${ME}","SID":"capri_1104132","DID":"${}","SNM":"Partycal","SIC":"https://k.kakaocdn.net/14/dn/btqvX1CL6kz/sSBw1mbWkyZTkk1Mpt9nw1/o.jpg","L":{"LPC":"https://partycal.site/s/something","LMO":"https://partycal.site/s/something"},"SL":{"LPC":"https://partycal.site","LMO":"https://partycal.site"},"VA":"6.0.0","VI":"5.9.8","VW":"2.5.1","VM":"2.2.0","FW":true,"RF":"out-client"},"C":{"THC":3,"THL":[{"TH":{"THU":"http://k.kakaocdn.net/dn/iDQJL/btsIvvjsFXL/h3mAITjXCyvsPv8vmgZW00/kakaolink40_original.png","W":512,"H":512,"SC":1}}],"TI":{"TD":{"T":"우리 언제 만날까?","D":"지금 바로 투표에 참여해보세요!"}},"BUT":0,"BUL":[{"BU":{"T":"투표하기","SR":"both"}}]}}&template_args={"${share}":"s/something"}&template_id=109953';
      }
    } else if (type === 2) {
      openUrl = `instagram://sharesheet?text=${props.link}`;
    } else if (type === 3) {
      openUrl = `fb-messenger://share?link=${props.link}&app_id=871917468158080`;
    } else if (type === 4) {
      openUrl = `https://api.whatsapp.com/send?text=${props.link}`;
    }
    window.open(openUrl, '_blank', 'popup=true, noopener, noreferrer');
  };

  return (
    <>
      <div {...stylex.attrs(ixStyles.box01)}>
        <div {...stylex.attrs(ixStyles.boxtext)}>링크 복사하기</div>
        <SetButtonBox sx={[ixStyles.linkBox]} onClick={()=>copyUrl(props.link)}>
          <CopySvg width="17px" color="#246ab6" />
          {props.link}
        </SetButtonBox>
        {/* <div {...stylex.attrs(ixStyles.box1text)}>복사하려면 누르세요</div> */}
      </div>
      <div {...stylex.attrs(ixStyles.box02)}>
        <div {...stylex.attrs(ixStyles.boxtext)}>공유하기</div>
        <div {...stylex.attrs(ixStyles.box2)}>
          <div {...stylex.attrs(ixStyles.box21)}>
            <SetButtonBox sx={[ixStyles.kakaoBox]} onClick={()=>handleSnsClick(1)}>
              <KakaotalkLogoSvg width="20px" />
              카카오톡
            </SetButtonBox>
            <SetButtonBox sx={[ixStyles.instaBox]} onClick={()=>handleSnsClick(2)}>
              <InstagramLogoSvg width="20px" />
              인스타그램
            </SetButtonBox>
          </div>
          <SetButton sx={[ixStyles.moreBox]} mode='sub' onClick={()=>showShareMore(props.link)}>
            더보기
          </SetButton>
        </div>
      </div>
    </>
  );
}