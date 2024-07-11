import * as stylex from '@stylexjs/stylex';
import LinkSvg from '../assets/icons/link.svg';
import ArrowRightSvg from '../assets/icons/arrow_right.svg';
import RocketSvg from '../assets/icons/rocket.svg';
import StatSvg from '../assets/icons/data_2.svg';
import CalendarEditSvg from '../assets/icons/calendar_edit.svg';
import calenderImage from '../assets/images/cal-3d.avif';
import LogoTextSvg from '../assets/logo_text.svg';
import LogoImgSvg from '../assets/logo_img.svg';
import { SetButtonBox, SetRootBox, SetA, SetButton } from '~/components/SetShared';
import { createSignal, Show } from 'solid-js';
import SetSubPage from '~/components/SetSubPage';
import SolidSvg from '~/assets/icons/logo/solidstart_logo.svg';
import StylexSvg from '~/assets/icons/logo/stylex_logo.svg';
import SetSend from '~/components/SetSend';
import { MetaProvider, Meta } from "@solidjs/meta";

const inStyles = stylex.create({
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  startAn: {
    // transform: {
    //   default: 'translateY(0)',
    //   '@starting-style': 'translateY(100px)',
    // },
    opacity: {
      default: 1,
      '@starting-style': 0,
    },
    transition: 'opacity 0.5s var(--material-easing)',
  }
});

const ixStyles = stylex.create({
  title: {
    ...stylex.include(inStyles.flex),
    alignSelf: "flex-start",
    marginBottom: "20px",
    gap: "10px",
  },
  boxIn: {
    ...stylex.include(inStyles.flex),
    ...stylex.include(inStyles.startAn),
    flexDirection: 'column',
    backgroundColor: "#fff",
    padding: "25px",
    marginTop: "20px",
    borderRadius: "20px",
    position: "relative",
  },
  box1text: {
    position: 'absolute',
    fontWeight: 700,
    fontSize: "20px",
    left: '25px',
    top: '25px',
    color: "#333e4b",
  },
  box1image: {
    marginTop: "55px",
    marginBottom: "35px",
    objectFit: 'contain',
    pointerEvents: 'none',
  },
  box1button: {
    width: "100%",
    padding: "16px",
    fontWeight: 500,
    textAlign: "center",
  },
  box2_1title: {
    color: "#333e4b",
    fontSize: "16px",
    alignSelf: "flex-start",
    fontWeight: 700,
    margin: "0px 0px 12px 7px",
  },
  box2_2Group: {
    ...stylex.include(inStyles.flex),
    width: "100%",
    gap: "20px",
  },
  box2_2In: {//#425468, #333e4b light, hard
    borderColor: "#f2f3f5",
    borderStyle: "solid",
    borderWidth: "1.5px",
    borderRadius: "15px",
    backgroundColor: "#f8f9fa",
    color: "#4e5a68",
    padding: "20px",
    flexGrow: 1,
    fontWeight: 500,
    lineHeight: "1.5",
    position: "relative",
  },//#6b7784 below text color
  box2_2Image: {
    right: "20px",
    top: "15px",
    position: "absolute",
  },
  box2_3Group: {
    ...stylex.include(inStyles.flex),
    flexDirection: 'column',
    width: "100%",
    marginTop: "7px",
  },
  box2_3In: {
    ...stylex.include(inStyles.flex),
    width: "100%",
    backgroundColor: "#fff",
    padding: "10px",
    justifyContent: "space-between",
  },
  box2_3text: {
    ...stylex.include(inStyles.flex),
    fontWeight: 400,
    fontSize: "16px",
    color: "#6b7784",
    gap: "15px",
  },
  subText: {
    padding: '10px',
    paddingBottom: '40px',
    paddingTop: '20px',
    color: "#4e5a68",
    fontWeight: 700,
  },
  subBox_1: {
    ...stylex.include(inStyles.flex),
    gap: '10px',
    fontWeight: 500,
    fontSize: '14px',
    marginTop: '20px',
    marginLeft: '5px',
  },
  subButton: {
    padding: '17px',
    fontWeight: 500,
    width: '100%',
  },
});

export default function Home() {
  const [showSub, setShowSub] = createSignal<number>(0);
  return (
    <SetRootBox>
      <MetaProvider>
        <Meta property="og:title" content="PARTYCAL: 일정 투표 플랫폼" />
        <Meta property="og:description" content="친구들과 함께 일정 투표를 시작해보세요" />
        <Meta property="og:image" content="https://jjreset.github.io/act_cdn/shareurl.png" />
      </MetaProvider>
      <div {...stylex.attrs(ixStyles.title)}>
        <LogoImgSvg width="20px" height="20px" />
        <LogoTextSvg height="20px" color="#b1b8c0" />
      </div>
      <div {...stylex.attrs(ixStyles.boxIn)}>
        <div {...stylex.attrs(ixStyles.box1text)}>친구들과 함께<br/>일정 투표를 시작해보세요</div>
        <img {...stylex.attrs(ixStyles.box1image)} height="100px" src={calenderImage} loading="eager" decoding='sync' />
        <SetA sx={[ixStyles.box1button]} href='/new' >
          일정 투표 만들기
        </SetA>
      </div>
      <div {...stylex.attrs(ixStyles.boxIn)}>
        <div {...stylex.attrs(ixStyles.box2_1title)}>
          메뉴 더보기
        </div>
        <div {...stylex.attrs(ixStyles.box2_2Group)}>
          <SetButtonBox sx={[ixStyles.box2_2In]} onClick={()=>setShowSub(3)}>
            <CalendarEditSvg {...stylex.attrs(ixStyles.box2_2Image)} width="24px" height="24px" />
            일정<br/>투표하기
          </SetButtonBox>
          <SetButtonBox sx={[ixStyles.box2_2In]} onClick={()=>setShowSub(3)}>
            <StatSvg {...stylex.attrs(ixStyles.box2_2Image)} width="24px" height="24px" />
            투표<br/>결과보기
          </SetButtonBox>
        </div>
        <div {...stylex.attrs(ixStyles.box2_3Group)}>
          <SetButtonBox sx={[ixStyles.box2_3In]} onClick={()=>setShowSub(1)}>
            <div {...stylex.attrs(ixStyles.box2_3text)}>
              <LinkSvg width="24px" height="24px" />
              사이트 공유하기
            </div>
            <ArrowRightSvg width="16px" height="16px" color="#B0B8C1" />
          </SetButtonBox>
          <SetButtonBox sx={[ixStyles.box2_3In]} onClick={()=>setShowSub(2)}>
            <div {...stylex.attrs(ixStyles.box2_3text)}>
              <RocketSvg width="24px" height="24px" />
              라이센스 정보
            </div>
            <ArrowRightSvg width="16px" height="16px" color="#B0B8C1" />
          </SetButtonBox>
        </div>
      </div>
      <SetSubPage show={showSub} setShow={setShowSub}>
        <Show when={showSub()===2}>
          <div>
            <div {...stylex.attrs(ixStyles.subText)}>
              This project is licensed under the terms of the MIT license. Copyright (c) 2024 JAEU
              <div {...stylex.attrs(ixStyles.subBox_1)}><SolidSvg height="20px" />SolidStart by Ryan Carniato</div>
              <div {...stylex.attrs(ixStyles.subBox_1)}><StylexSvg height="20px" />Stylex by Meta Platforms</div>
            </div>
            <SetButton sx={[ixStyles.subButton]} onClick={()=>setShowSub(0)}>
              확인
            </SetButton>
          </div>
        </Show>
        <Show when={showSub()===1}>
          <SetSend link="mainpage" />
        </Show>
        <Show when={showSub()===3}>
          <div>Nothing here yet...</div>
        </Show>
      </SetSubPage>
    </SetRootBox>
  );
}
