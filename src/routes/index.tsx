import stylex from '@stylexjs/stylex';
"use client";
import { useNavigate } from '@solidjs/router';
import { baseStyles, flexStyles, shareStyles } from '../common/share.stylex';
import LinkSvg from '../assets/icons/link.svg';
import ArrowRightSvg from '../assets/icons/arrow_right.svg';
import RocketSvg from '../assets/icons/rocket.svg';
import StatSvg from '../assets/icons/data_2.svg';
import CalendarEditSvg from '../assets/icons/calendar_edit.svg';
import calenderImage from '../assets/images/calendar_new.avif';
import LogoTextSvg from '../assets/logo_text.svg';
import LogoImgSvg from '../assets/logo_img.svg';

const ixStyles = stylex.create({
  title: {
    alignSelf: "flex-start",
    margin: "0px 0px 0px 20px",
    gap: "10px",
  },
  titleText: {
    height: "20px",
    color: "rgb(177, 184, 192)",
  },
  titleImage: {
    width: "20px",
    height: "20px",
  },
  boxCase: {
    width: "min(450px, 100%)",
  },
  boxIn: {
    backgroundColor: "#fff",
    padding: "25px",
    margin: "20px 0px 0px 0px",
    borderRadius: "20px",
  },
  box1Group: {
    // width: "100%",
    // aspectRatio: "1/1",
  },
  box1image: {
    width: "min(45vw, 200px)",
    // padding: "40px",
    margin: "15px",
    pointerEvents: 'none',
  },
  box1button: {
    width: "100%",
    padding: "17px",
    margin: "40px 0px 0px 0px",
    fontWeight: 500,
  },
  box2_1title: {
    color: "#333e4b",
    fontSize: "16px",
    alignSelf: "flex-start",
    fontWeight: 700,
    margin: "0px 0px 12px 7px",
  },
  box2_2Group: {
    width: "100%",
    gap: "20px",
  },
  box2_2In: {//#425468, #333e4b light, hard
    borderColor: "#f2f3f5",//linecolor
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
    width: "24px",
    height: "24px",
    position: "absolute",
  },
  box2_3Group: {
    width: "100%",
    //padding: "7px",
    margin: "7px 0px 0px 0px",
  },
  box2_3In: {
    width: "100%",
    backgroundColor: "#fff",
    padding: "10px 10px 10px 10px",
    borderRadius: "15px",
    justifyContent: "space-between",
  },
  box2_3text: {
    fontWeight: 400,
    fontSize: "16px",
    color: "#6b7784",
    gap: "15px",
  },
  box2_3image: {
    width: "24px",
    height: "24px",
  },
  box2_3image2: {
    width: "16px",
    height: "16px",
    color: "#B0B8C1",
  },
});

export default function Home() {
  const navigate = useNavigate();

  return (
    <div {...stylex.attrs(baseStyles.root, flexStyles.sero)}>
      <div {...stylex.attrs(ixStyles.boxCase)}>
        <div {...stylex.attrs(ixStyles.title, flexStyles.garo)}>
          <LogoImgSvg {...stylex.attrs(ixStyles.titleImage)}/>
          <LogoTextSvg {...stylex.attrs(ixStyles.titleText)}/>
        </div>
        <div {...stylex.attrs(flexStyles.sero, flexStyles.center, ixStyles.boxIn, ixStyles.box1Group)}>
          <img {...stylex.attrs(ixStyles.box1image)} src={calenderImage} loading="eager" />
          <button {...stylex.attrs(baseStyles.button1, ixStyles.box1button)} onClick={()=>navigate("/new")}>
            날짜 투표 만들기
          </button>
        </div>
        <div {...stylex.attrs(flexStyles.sero, flexStyles.center, ixStyles.boxIn)}>
          <div {...stylex.attrs(flexStyles.sero, ixStyles.box2_1title)}>
            메뉴 더보기
          </div>
          <div {...stylex.attrs(flexStyles.garo, ixStyles.box2_2Group)}>
            <div {...stylex.attrs(ixStyles.box2_2In, shareStyles.interact)}>
              <CalendarEditSvg {...stylex.attrs(ixStyles.box2_2Image)}/>
              날짜<br/>투표하기
            </div>
            <div {...stylex.attrs(ixStyles.box2_2In, shareStyles.interact)}>
              <StatSvg {...stylex.attrs(ixStyles.box2_2Image)}/>
              투표<br/>결과보기
            </div>
          </div>
          <div {...stylex.attrs(flexStyles.sero, ixStyles.box2_3Group)}>
            <div {...stylex.attrs(shareStyles.interact, ixStyles.box2_3In, flexStyles.garo)}>
              <div {...stylex.attrs(flexStyles.garo, ixStyles.box2_3text)}>
                <LinkSvg {...stylex.attrs(ixStyles.box2_3image)}/>
                사이트 공유하기
              </div>
              <ArrowRightSvg {...stylex.attrs(ixStyles.box2_3image2)}/>
            </div>
            <div {...stylex.attrs(shareStyles.interact, ixStyles.box2_3In, flexStyles.garo)}>
              <div {...stylex.attrs(flexStyles.garo, ixStyles.box2_3text)}>
                <RocketSvg {...stylex.attrs(ixStyles.box2_3image)}/>
                제작자 정보
              </div>
              <ArrowRightSvg {...stylex.attrs(ixStyles.box2_3image2)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
