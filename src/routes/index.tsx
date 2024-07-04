import stylex from '@stylexjs/stylex';
import { useNavigate } from '@solidjs/router';
import { baseStyles, flexStyles, shareStyles } from '~/common/share-styles';
import CalendarNormalSvg from '../assets/icons/calendar_normal.svg';
import LinkSvg from '../assets/icons/link.svg';
import ArrowRightSvg from '../assets/icons/arrow_right.svg';
import RocketSvg from '../assets/icons/rocket.svg';
import StatSvg from '../assets/icons/data_2.svg';
import CalendarEditSvg from '../assets/icons/calendar_edit.svg';

const inStyles = stylex.create({
  title: {
    fontFamily: "'basicfont'",
    fontSize: "24px",
    fontWeight: 700,
    alignSelf: "flex-start",
    margin: "0px 0px 0px 20px",
    color: "rgb(177, 184, 192)",
    gap: "10px",
  },
  titleImage: {
    width: "25px",
    height: "25px",
    color: "rgb(177, 184, 192)",
    margin: "2px 0px 0px 0px",
  },
  boxCase: {
    width: "min(500px, 100%)",
  },
  boxIn: {
    backgroundColor: "#fff",
    padding: "25px",
    margin: "20px 0px 0px 0px",
    borderRadius: "15px",
  },
  box1image: {
    width: "200px",
    pointerEvents: 'none',
  },
  box1button: {
    width: "100%",
    padding: "17px",
    margin: "40px 0px 0px 0px",
    fontWeight: 600,
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
    borderRadius: "12px",
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
  leftover: {
    width: "100%",
    height: "500px",
  }
});

export default function Home() {
  const navigate = useNavigate();

  return (
    <div {...stylex.attrs(baseStyles.root, flexStyles.sero)}>
      <div {...stylex.attrs(inStyles.boxCase)}>
        <div {...stylex.attrs(inStyles.title, flexStyles.garo)}>
          <CalendarNormalSvg {...stylex.attrs(inStyles.titleImage)}/>
          PartyCal
        </div>
        <div {...stylex.attrs(flexStyles.sero, flexStyles.center, inStyles.boxIn)}>
          <img {...stylex.attrs(inStyles.box1image)} src="/images/calendar-3d.avif" />
          <button {...stylex.attrs(baseStyles.button1, inStyles.box1button)} onClick={()=>navigate("/new")}>
            날짜 투표 만들기
          </button>
        </div>
        <div {...stylex.attrs(flexStyles.sero, flexStyles.center, inStyles.boxIn)}>
          <div {...stylex.attrs(flexStyles.sero, inStyles.box2_1title)}>
            메뉴 더보기
          </div>
          <div {...stylex.attrs(flexStyles.garo, inStyles.box2_2Group)}>
            <div {...stylex.attrs(inStyles.box2_2In, shareStyles.interact)}>
              <CalendarEditSvg {...stylex.attrs(inStyles.box2_2Image)}/>
              날짜<br/>투표하기
            </div>
            <div {...stylex.attrs(inStyles.box2_2In, shareStyles.interact)}>
              <StatSvg {...stylex.attrs(inStyles.box2_2Image)}/>
              투표<br/>결과보기
            </div>
          </div>
          <div {...stylex.attrs(flexStyles.sero, inStyles.box2_3Group)}>
            <div {...stylex.attrs(shareStyles.interact, inStyles.box2_3In, flexStyles.garo)}>
              <div {...stylex.attrs(flexStyles.garo, inStyles.box2_3text)}>
                <LinkSvg {...stylex.attrs(inStyles.box2_3image)}/>
                사이트 공유하기
              </div>
              <ArrowRightSvg {...stylex.attrs(inStyles.box2_3image2)}/>
            </div>
            <div {...stylex.attrs(shareStyles.interact, inStyles.box2_3In, flexStyles.garo)}>
              <div {...stylex.attrs(flexStyles.garo, inStyles.box2_3text)}>
                <RocketSvg {...stylex.attrs(inStyles.box2_3image)}/>
                제작자 정보
              </div>
              <ArrowRightSvg {...stylex.attrs(inStyles.box2_3image2)}/>
            </div>
          </div>
        </div>
        <div {...stylex.attrs(inStyles.leftover)}>
          &nbsp;
        </div>
      </div>
    </div>
  );
}
