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
  id?: string | null;
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
    fontWeight: 600,
    gap: '5px',
    width: '100%',
    justifyContent: 'center',
  },
  box0: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    //gap: '7px',
  },
  showup: {
    transform: {
      default: "translateY(0px) scaleY(1)",
      '@starting-style': "translateY(50px) scaleY(1.2)",
    },
    opacity: {
      default: 1,
      '@starting-style': 0,
    },
    transition: 'transform 0.75s cubic-bezier(0.08,0.82,0.17,1), opacity 0.75s cubic-bezier(0.08,0.82,0.17,1)',
  }
});

const ixStyles = stylex.create({
  box01: {
    ...stylex.include(inStyles.box0),
    marginBottom: '5px',
  },
  box02: {
    ...stylex.include(inStyles.box0),
    marginBottom: '20px',
  },
  title: {
    color: "#6b7784",
    fontWeight: 700,
    fontSize: '18px',
    padding: '10px',
    paddingTop: '15px',
    paddingBottom: '0px',
    ...stylex.include(inStyles.showup),
    transitionDelay: '0.1s',
  },
  title2: {
    color: "#B0B8C1",
    // color: '#8B95A1',
    fontSize: '14px',
    fontWeight: 400,
    padding: '10px',
    paddingTop: '0px',
    paddingBottom: '15px',
    ...stylex.include(inStyles.showup),
    transitionDelay: '0.1s',
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
    ...stylex.include(inStyles.showup),
    transitionDelay: '0.15s',
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
    ...stylex.include(inStyles.showup),
    transitionDelay: '0.15s',
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
    fontWeight: 600,
    borderRadius: '17px',
  },
  closeButton: {
    ...stylex.include(inStyles.showup),
    transitionDelay: '0.22s',
  }
});

export default function SetShare(props: SetShareProps): JSX.Element {

  const getId = () => props.id || '';
  const getFullLink = () => {
    if (getId()) return `https://partycal.site/s/${getId()}`;
    else return 'https://partycal.site/';
  };

  const copyUrl = async(event): Promise<void> => {
    const element = event.target;
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
    await navigator.clipboard.writeText(getFullLink());
    CallDialog(1);
  };

  const handleShowMore = async () => {
    const shareUrl = async(data: ShareData): Promise<void> => await navigator.share(data);
    props.setShow(0);

    if(getId()){
      const shareData: ShareData = {
        title: '우리 언제 만날까?',
        text: '지금 바로 투표에 참여해보세요!',
        url: getFullLink(),
      };
      await shareUrl(shareData);
    } else {
      const shareData: ShareData = {
        title: 'PARTYCAL: 일정 투표 플랫폼',
        text: '친구들과 함께 일정 투표를 시작해보세요',
        url: getFullLink(),
      };
      await shareUrl(shareData);
    }
  };

  const handleSnsClick = (type: number) => {
    const user = navigator.userAgent;
    const devices = ["iPhone", "iPad", "Android"];
    const isMobile = () => devices.some(d => user.includes(d));
    const openUrl = (url: string | URL) => window.open(url, '_blank', 'popup=true, noopener, noreferrer');

    props.setShow(0);

    if (isMobile()) {
      if (type === 1) {
        if (getId()) openUrl('kakaolink://send?appkey=47709efeaae6b8a5a3a04ba9966d08c0&appver=1.0&linkver=4.0&extras={"KA":"sdk/2.7.2 os/javascript sdk_type/javascript lang/ko-KR device/Win32 origin/file%3A%2F%2F"}&template_json={"P":{"TP":"Feed","ME":"${ME}","SID":"capri_1104132","DID":"${}","SNM":"Partycal","SIC":"https://k.kakaocdn.net/14/dn/btqvX1CL6kz/sSBw1mbWkyZTkk1Mpt9nw1/o.jpg",'+`"L":{"LPC":${getFullLink()},"LMO":${getFullLink()}},"SL":{"LPC":"https://partycal.site","LMO":"https://partycal.site"},"VA":"6.0.0","VI":"5.9.8","VW":"2.5.1","VM":"2.2.0","FW":true,"RF":"out-client"},"C":{"THC":3,"THL":[{"TH":{"THU":"http://k.kakaocdn.net/dn/iDQJL/btsIvvjsFXL/h3mAITjXCyvsPv8vmgZW00/kakaolink40_original.png","W":512,"H":512,"SC":1}}],"TI":{"TD":{"T":"우리 언제 만날까?","D":"지금 바로 투표에 참여해보세요!"}},"BUT":0,"BUL":[{"BU":{"T":"투표하기","SR":"both"}}]}}&template_args=`+'{"${share}":"'+`s/${getId()}"}&template_id=109953`);
        else openUrl('kakaolink://send?appkey=47709efeaae6b8a5a3a04ba9966d08c0&appver=1.0&linkver=4.0&extras={"KA":"sdk/2.7.2 os/javascript sdk_type/javascript lang/ko-KR device/Win32 origin/file%3A%2F%2F"}&template_json={"P":{"TP":"Feed","ME":"${ME}","SID":"capri_1104132","DID":"https://partycal.site","SNM":"Partycal","SIC":"https://k.kakaocdn.net/14/dn/btqvX1CL6kz/sSBw1mbWkyZTkk1Mpt9nw1/o.jpg","L":{"LPC":"https://partycal.site","LMO":"https://partycal.site"},"SL":{"LPC":"https://partycal.site","LMO":"https://partycal.site"},"VA":"6.0.0","VI":"5.9.8","VW":"2.5.1","VM":"2.2.0","FW":true,"RF":"out-client"},"C":{"THC":3,"THL":[{"TH":{"THU":"http://k.kakaocdn.net/dn/cqwDMY/btsIvberuiA/UYkKIB3MaYlaKNGWffnAxk/kakaolink40_original.png","W":512,"H":512,"SC":1}}],"TI":{"TD":{"T":"PARTYCAL:  일정 투표 플랫폼","D":"친구들과 함께 일정 투표를 시작해보세요"}},"BUL":[{"BU":{"T":"자세히 보기","SR":"both"}}]}}&template_args={}&template_id=109967');
      }
      else openUrl(`instagram://sharesheet?text=${getFullLink()}`);
    } else {
      if (type === 1) {
        if (getId()) openUrl('about:blank');
        else openUrl('about:blank');
      }
      else CallDialog(2);
    }
    
  };

  return (
    <>
      <div {...stylex.attrs(ixStyles.box01)}>
        <div {...stylex.attrs(ixStyles.title)}>링크 복사하기</div>
        <div {...stylex.attrs(ixStyles.title2)}>누르면 링크가 클립보드에 복사돼요</div>
        <SetButtonBox sx={[ixStyles.linkBox]} onClick={copyUrl}>
          <CopySvg width="17px" color="#246ab6" />
          {getFullLink()}
        </SetButtonBox>
      </div>
      <div {...stylex.attrs(ixStyles.box02)}>
        <div {...stylex.attrs(ixStyles.title)}>공유하기</div>
        <div {...stylex.attrs(ixStyles.title2)}>채팅방에 링크를 보낼 수 있어요</div>
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
          <SetButton sx={[ixStyles.moreBox]} mode='main' onClick={handleShowMore}>
            더보기
          </SetButton>
        </div>
      </div>
      <SetButton sx={[ixStyles.closeButton]} mode='sub' onClick={()=>props.setShow(0)}>닫기</SetButton>
    </>
  );
}