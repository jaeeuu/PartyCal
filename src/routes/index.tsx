import * as stylex from '@stylexjs/stylex';
import LinkSvg from '../assets/icons/confetti.svg';
import ArrowRightSvg from '../assets/icons/arrow_right.svg';
import RocketSvg from '../assets/icons/rocket.svg';
// import StatSvg from '../assets/icons/data_2.svg';
// import CalendarEditSvg from '../assets/icons/calendar_edit.svg';
import calenderImage from '../assets/images/cal_re.avif';
import { SetButtonBox, SetA, SetButton, SetBox } from '../components/SetBase';
import { createSignal, Show } from 'solid-js';
import SetPopUp from '../components/SetPopUp';
import SolidSvg from '../assets/icons/logo/solidstart_logo.svg';
import SetShare from '../components/SetShare';
import NtexLogoSVg from '../assets/icons/logo/ntex_logo.svg';
import SingleStoreSvg from '../assets/icons/logo/singlestore_logo.svg';
import TauriLogoSvg from '../assets/icons/logo/tauri_logo.svg';
import StylexLogoSvg from '../assets/icons/logo/stylex_logo.svg';
import CubeSvg from '../assets/icons/cube.svg';
import { Meta, MetaProvider } from "@solidjs/meta";
import { showUpAni } from '~/common/animations';
import { materialEasing, store } from '~/common/stores';
import { Transition } from 'solid-transition-group';

const inStyles = stylex.create({
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
});

const ixStyles = stylex.create({
  box1box: {
    display: 'flex',
    width: "100%",
    justifyContent: "space-between",
    padding: '7px',
    alignItems: 'center',
    //paddingBottom: '10px',
    // backgroundColor: 'yellow',
    //paddingRight: '5px',
  },
  box1text: {
    //position: 'absolute',
    fontWeight: 700,
    fontSize: "21px",
    //left: '25px',
    //top: '25px',
    // color: "#6b7784",
    //lineHeight: "1.75",
    fontFamily: "'Basic Fonts'",
    //padding: '5px',
    paddingBottom: '20px',
    //paddingTop: '5px',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    backgroundImage: 'linear-gradient(145deg, hsl(198.1, 100%, 46.1%) 0%, hsl(231.9, 68.6%, 72.5%) 55%)',
    letterSpacing: '-1px',
  },
  box1image: {
    //marginTop: "90px",
    //marginBottom: "35px",
    position: 'relative',
    top: "-5px",
    objectFit: 'contain',
    pointerEvents: 'none',
  },
  box1button: {
    // width: "100%",
    padding: "20px",
    fontWeight: 500,
  },
  box2_1title: {
    color: "#333e4b",
    fontSize: "16px",
    alignSelf: "flex-start",
    fontWeight: 700,
    margin: "0px 0px 5px 7px",
  },
  box2Group: {
    ...stylex.include(inStyles.flex),
    width: "100%",
    gap: "20px",
  },
  box2new: {
    fontWeight: 700,
    fontSize: "20px",
    // color: "#4e5168",
    paddingBottom: '10px',
    // paddingTop: '5px',
    paddingLeft: '5px',
    letterSpacing: '-1px',
    alignSelf: "flex-start",
    fontFamily: "'Basic Fonts'",
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    backgroundImage: 'linear-gradient(170deg, hsl(198.1, 40%, 46.1%) 0%, hsl(231.9, 40%, 72.5%) 55%)',
  },
  box2: {
    //borderColor: "#f2f3f5",
    borderColor: '#e8ebff',
    borderStyle: "solid",
    borderWidth: "1px",
    backgroundColor: "#f8faff",
    color: "#6b6e84",
    fontSize: "16px",
    // backgroundColor: '#e8ebff',
    // color: '#8b97ea',
    padding: "20px",
    width: "100%",
    fontWeight: 500,
    position: "relative",
  },//#6b7784 below text color
  box2_2Image: {
    right: "20px",
    top: "15px",
    position: "absolute",
    color: '#8b97ea',
  },
  box3Group: {
    ...stylex.include(inStyles.flex),
    flexDirection: 'column',
    width: "100%",
    //marginTop: "7px",
  },
  box2_3In: {
    ...stylex.include(inStyles.flex),
    width: "100%",
    backgroundColor: "#fff",
    padding: "15px",
    paddingTop: "20px",
    paddingBottom: "20px",
    justifyContent: "space-between",
  },
  box2_3text: {
    ...stylex.include(inStyles.flex),
    color: "#6b7784",
    gap: "20px",
  },
  subBox_1: {
    color: "#4e5a68",
    fontSize: '18px',
    fontWeight: 700,
    padding: '10px',
    paddingTop: '0px', //this was 15px
    paddingBottom: '0px',
  },
  subBox_2: {
    color: "#B0B8C1",
    fontSize: '14px',
    fontWeight: 400,
    padding: '10px',
    paddingTop: '0px',
    paddingBottom: '15px',
  },
  subBox_3: {
    ...stylex.include(inStyles.flex),
    flexWrap: 'wrap',
    gap: '10px',
    //marginTop: '25px',
    marginBottom: '25px',
    color: "#6b7784",
    borderColor: "#f2f3f5",
    borderStyle: "solid",
    borderWidth: "1.5px",
    borderRadius: "15px",
    padding: '12px',
  },
  subBox_31: {
    ...stylex.include(inStyles.flex),
    gap: '10px',
    width: '100%',
  },
  moreText1: {
    fontWeight: 700,
    fontSize: '17px',
  },
  moreText2: {
    fontWeight: 500,
    fontSize: '13px',
  },
  apps: {
    ...stylex.include(inStyles.flex),
    fontSize: "12px",
    fontWeight: 700,
    gap: "7px",
    padding: "7px 12px 7px 12px",
    borderRadius: '10px',
    color: "#4e5a68",
    backgroundColor: "#F2F4F6",
  },
  recentBox: {
    background: 'linear-gradient(145deg, #5ea3db, #8cbeed)',
    padding: '25px',
    paddingTop: '30px',
    paddingBottom: '30px',
    borderRadius: '25px',
    color: '#fff',
    boxShadow: "0 0 10px 1px #E7E7E7",
    ...stylex.include(inStyles.flex),
    justifyContent: 'space-between',
  },
  recentBoxIn: {
    ...stylex.include(inStyles.flex),
    gap: '20px',
  },
  sero: {
    display: 'flex',
    flexDirection: 'column',
  },
  recentText1: {
    fontWeight: 700,
    fontSize: '18px',
    //textShadow: '0px 0px 15px #CCC'
  },
  recentText2: {
    fontWeight: 500,
    fontSize: '14px',
    //textShadow: '0px 0px 15px #CCC'
  },
  moreBox: {
    padding: '15px',
  },
});

export default function HomePage() {
  const [showSub, setShowSub] = createSignal<number>(0);
  const boxOnEnter = (el: Element, done: () => void) => {
    const a = el.animate([{ opacity: 0, transform: 'scale(0)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 750,  easing: materialEasing });
    a.finished.then(done);
  };
  const boxOnExit = (el: Element, done: () => void) => {
    const a = el.animate({ opacity: 0, transform: 'scale(0)' }, { duration: 400, easing: "ease" });
    a.finished.then(done);
  };

  return (
    <>
      <MetaProvider>
        <Meta property="og:url" content="https://partycal.site/" />
        <Meta property="og:title" content="PARTYCAL: 일정 투표 플랫폼" />
        <Meta property="og:description" content="친구들과 함께 일정 투표를 시작해보세요" />
        <Meta property="og:image" content="https://jjreset.github.io/act_cdn/shareurl.png" />
      </MetaProvider>
      <Transition
        onEnter={(el, done) => boxOnEnter(el, done)}
        onExit={(el, done) => boxOnExit(el, done)}
        mode='outin'
      >
        <Show when={!!store()}>
          <SetButtonBox sx={[ixStyles.recentBox]} onClick={()=>setShowSub(3)}>
            <div {...stylex.attrs(ixStyles.recentBoxIn)}>
              <CubeSvg width="50px" height="50px" />
              <div {...stylex.attrs(ixStyles.sero)}>
                <div {...stylex.attrs(ixStyles.recentText2)}>최근에 생성된 투표</div>
                <div {...stylex.attrs(ixStyles.recentText1)}>링크 다시보기</div>
              </div>
            </div>
            <ArrowRightSvg width="20px" height="20px" color="#FFF" />
          </SetButtonBox>
        </Show>
      </Transition>
      <SetBox>
        <div {...stylex.attrs(ixStyles.box1box)}>
          <div {...stylex.attrs(ixStyles.box1text)}>
            새로운 투표를 생성하고
            <br/>친구들과 함께
            <br/>일정을 정해보세요
          </div>
          <img {...stylex.attrs(ixStyles.box1image)} height="105px" width="105px" src={calenderImage} decoding='sync' alt="" />
        </div>
        <SetA sx={[ixStyles.box1button]} href='/new' title="new">
          일정 투표 만들기
        </SetA>
      </SetBox>
      {/* <SetBox>
        <div {...stylex.attrs(ixStyles.box2new)}>
          이미 생성된 코드가 있나요?
        </div>
        <div {...stylex.attrs(ixStyles.box2Group)}>
          <SetA mode='none' sx={[ixStyles.box2]} href='/search?m=vote' title="vote">
            <CalendarEditSvg {...stylex.attrs(ixStyles.box2_2Image)} width="24px" height="24px" />
            투표<br/>참여하기
          </SetA>
          <SetA mode='none' sx={[ixStyles.box2]} href='/search?m=result' title="result">
            <StatSvg {...stylex.attrs(ixStyles.box2_2Image)} width="24px" height="24px" />
            투표<br/>결과보기
          </SetA>
        </div>
      </SetBox> */}
      <SetBox sx={[ixStyles.moreBox]}>
        {/* <div {...stylex.attrs(ixStyles.box2_1title)}>
          더보기
        </div> */}
        <div {...stylex.attrs(ixStyles.box3Group)}>
          <SetButtonBox sx={[ixStyles.box2_3In]} onClick={()=>setShowSub(1)}>
            <div {...stylex.attrs(ixStyles.box2_3text)}>
              <LinkSvg width="30px" height="32px" color="#FF5733" />
              <div {...stylex.attrs(ixStyles.sero)}>
                <div {...stylex.attrs(ixStyles.moreText2)}>친구들에게</div>
                <div {...stylex.attrs(ixStyles.moreText1)}>사이트 공유하기</div>
              </div>
            </div>
            <ArrowRightSvg width="18px" height="18px" color="#B0B8C1" />
          </SetButtonBox>
          <SetButtonBox sx={[ixStyles.box2_3In]} onClick={()=>setShowSub(2)}>
            <div {...stylex.attrs(ixStyles.box2_3text)}>
              <RocketSvg width="30px" height="32px" />
              <div {...stylex.attrs(ixStyles.sero)}>
                <div {...stylex.attrs(ixStyles.moreText2)}>라이선스와</div>
                <div {...stylex.attrs(ixStyles.moreText1)}>자세한 정보</div>
              </div>
            </div>
            <ArrowRightSvg width="18px" height="18px" color="#B0B8C1" />
          </SetButtonBox>
        </div>
      </SetBox>
      <SetPopUp show={showSub()>0} close={()=>setShowSub(0)} isLong={showSub()===1}>
        <Show when={showSub()===2}>
          <div {...stylex.attrs(ixStyles.subBox_1)} ref={(e)=>showUpAni(e,1)}>COPYRIGHT 2024 JAEU</div>
          <div {...stylex.attrs(ixStyles.subBox_2)} ref={(e)=>showUpAni(e,2)}>This app is licensed under the terms of the MIT license.</div>
          <div {...stylex.attrs(ixStyles.subBox_3)} ref={(e)=>showUpAni(e,3)}>
            <div {...stylex.attrs(ixStyles.apps)}><SolidSvg height="15px" />SOLID START</div>
            <div {...stylex.attrs(ixStyles.apps)}><NtexLogoSVg height="15px" />NTEX</div>
            <div {...stylex.attrs(ixStyles.apps)}><TauriLogoSvg height="15px" />TAURI</div>
            <div {...stylex.attrs(ixStyles.apps)}><SingleStoreSvg height="15px" />SINGLE STORE</div>
            <div {...stylex.attrs(ixStyles.apps)}><StylexLogoSvg height="15px" />STYLEX</div>
          </div>
          <SetButton mode='main' onClick={()=>setShowSub(0)} ref={(e)=>showUpAni(e,4)}>닫기</SetButton>
        </Show>
        <Show when={showSub()===1||showSub()===3}>
          <SetShare close={()=>setShowSub(0)} id={showSub()===1 ? '' : store()??''} />
        </Show>
      </SetPopUp>
    </>
  );
}
