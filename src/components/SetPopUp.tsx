import type { JSX } from "solid-js";
import { Portal } from "solid-js/web";
import * as stylex from "@stylexjs/stylex";
import { Transition } from "solid-transition-group";
import { createSignal, onMount, Show } from 'solid-js';
import { materialEasing } from "~/common/stores";
import SetAlert from "./SetAlert";
import { dragStartHandler, dragMoveHandler, dragEndHandler } from "~/common/drags";
import { smoothCorner } from "~/common/useUtils";
import { useNavigate } from "@solidjs/router";

smoothCorner;

// const spinOnce = stylex.keyframes({
//   '0%': { transform: 'rotate(0deg) scaleX(0.5)' },
//   '100%': { transform: 'rotate(360deg) scaleX(1)'},
// });

const inStyles = stylex.create({
  root: {
    width: '100dvw',
    position: 'fixed',
  },
});
const ixStyles = stylex.create({
  backdrop: {
    ...stylex.include(inStyles.root),
    height: '100dvh',
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(3px)',
  },
  box: {
    ...stylex.include(inStyles.root),
    display: 'flex',
    justifyContent: 'center',
    bottom: 0,
    padding: '10px',
    paddingBottom: '20px',
    touchAction: 'none',
    overflow: 'hidden',
    transition: 'height 0.4s ease',
  },
  boxDrag: {
    transition: 'height 0.4s ease, transform 0.8s var(--spring-easing)',
  },
  boxIn: {
    maxWidth: '430px',
    width: '100%',
    padding: '22px',
    paddingTop: '0px', //was 22px
    borderRadius: "25px",
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
  },
  hintBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingTop: '20px',
    // paddingBottom: '10px',
    // paddingLeft: '12px',
    // paddingRight: '10px',
    //position: 'relative',
    padding: '10px',
    paddingTop: '22px', //was 0px
    paddingBottom: '15px', //was 0px and child had 15px
    //backgroundColor: 'yellow',
  },
  hint: {
    width: '30px',
    height: '5px',
    borderRadius: '2.5px',
    //marginLeft: '12px',
    backgroundColor: '#E5E8EB',
    // backgroundColor: '#CBD0D6',
    // transition: 'color 0.5s ease',
    // animationName: spinOnce,
    // animationDuration: '1.25s',
    // animationTimingFunction: 'cubic-bezier(0.08,0.82,0.17,1)',
    // animationIterationCount: 1,
    // animationFillMode: 'forwards',
    // animationDirection: 'normal',
  },
  active: {
    marginTop: '5px',
    marginBottom: '5px',
    backgroundColor: '#B0B8C1',
  },
  close: {
    //marginRight: '6px',
    // paddingTop: '3px',
    //position: 'absolute',
    // right: '-2px',
    // top: '16px',
    // cursor: 'pointer',
    position: 'relative',
    top: '3px',
  },
  child: {
    width: '100%',
    //padding: '7px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  }
});

type SetPopUpProps<P = {}> = P & {
  children: JSX.Element;
  show: boolean,
  close: () => void,
  isOnce?: boolean,
  isLong?: boolean,
};

export default function SetPopUp(props: SetPopUpProps): JSX.Element{

  const isShow = () => props.show;
  const [dragPos, setDragPos] = createSignal<number|null>(null);
  let throttleTimer = false;
  let requestFrame = null;

  const isOnce = () => props.isOnce ?? true;
  let hintAni: Animation | null = null;

  const animateHint = (el: Element) => {
    onMount(() => {
      if (!el) return;
      const keyframes = new KeyframeEffect(
        el,
        [
          { transform: 'rotate(0deg) scaleX(1)' },
          { transform: 'rotate(180deg) scaleX(0.5)'},
          { transform: 'rotate(360deg) scaleX(1)'},
        ],
        {
          duration: 750,
          easing: "cubic-bezier(0.08,0.82,0.17,1)",
          iterations: 1,
        },
      );
      hintAni = new Animation(keyframes);
      hintAni.play();
      // hintAni.finished.then(() => {
      //   if (!isDynamic()) hintAni.cancel();
      // });
      hintAni.onfinish = () => {
        if (isOnce()) hintAni?.cancel();
        else hintAni?.play();
      };
    });
  };

  

  const pointerDown = (e: Event) => {
    dragStartHandler(e);
  };

  const pointerMove = (e: Event) => {
    if (throttleTimer) return;
    else {
      throttleTimer = true;
      requestFrame = requestAnimationFrame(() => {
        const drag = dragMoveHandler(e);
        if (drag.x !== null && drag.y !== null) {
          if (drag.y > 0) {
            setDragPos(drag.y);
          } else if (drag.y < 0) {
            const movement = (drag.y) / (-0.05*drag.y + 1);
            setDragPos(movement);
          }
        }
        throttleTimer = false;
      });
    }
  };

  const pointerUp = (e: Event) => {
    // if (!dragRef) return;
    throttleTimer = false;
    if (requestFrame) cancelAnimationFrame(requestFrame);
    const drag = dragEndHandler(e);
    const wHeight = window.innerHeight;
    if ((drag.last.y??0 / wHeight) > 150 || (drag.delta.y??0 / wHeight) > 20) {
      props.close();
      //setDragPos(0) 충돌발생
    } else {
      setDragPos(0);
    }
  };
  const navigate = useNavigate();

  const afterExit = () => {
    setDragPos(null);
    if (hintAni) hintAni.cancel();
    if (requestFrame) cancelAnimationFrame(requestFrame);
    if (throttleTimer) throttleTimer = false;
    if (!isOnce()) {
      navigate('/');
    }
  };
  
  const backOnEnter = (el: Element, done: () => void) => {
    const a = el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: props.isLong ? 500 : 400, easing: 'ease' });
    a.finished.then(done);
  };
  const backOnExit = (el: Element, done: () => void) => {
    const a = el.animate({ opacity: 0 }, { duration: props.isLong ? 400 : 300, easing: "ease" });
    a.finished.then(done);
  };
  const pageOnEnter = (el: Element, done: () => void) => {
    const a = el.animate([{ transform: "translateY(80vh)", overflowY: "hidden" }, { transform: 'translateY(0px)', overflowY: "hidden" }], { duration: 400, easing: materialEasing });
    a.finished.then(done);
  };
  const pageOnExit = (el: Element, done: () => void) => {
    const a = el.animate( { transform: "translateY(80vh)", overflowY: "hidden" }, { duration: 350, easing: "ease" });
    a.finished.then(done);
  };

  return (
    <Portal>
      <Transition
        onEnter={(el, done) => backOnEnter(el, done)}
        onExit={(el, done) => backOnExit(el, done)}
        onAfterExit={()=>afterExit()}
      >
        <Show when={isShow()} keyed={true}>
          <div {...stylex.attrs(ixStyles.backdrop)} onClick={() => props.close()}>
            &nbsp;
          </div>
        </Show>
      </Transition>
      <Transition
        onEnter={(el, done) => pageOnEnter(el, done)}
        onExit={(el, done) => pageOnExit(el, done)}
      >
        <Show when={isShow()} keyed={true}>
          <div {...stylex.attrs(ixStyles.box, dragPos()===0 && ixStyles.boxDrag)} style={{transform: `translateY(${dragPos()??0}px`}}>
            <div {...stylex.attrs(ixStyles.boxIn)} use:smoothCorner={{}}>
              <div {...stylex.attrs(ixStyles.hintBox)} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}>
                <div ref={(e)=>animateHint(e)} {...stylex.attrs(ixStyles.hint)}>&nbsp;</div>
                {/* <SetButtonBox sx={[ixStyles.close]} onClick={()=>props.setShow(0)}>
                  <CloseSvg width="15px" color="#B5B5B5" />
                </SetButtonBox> */}
              </div>
              <div {...stylex.attrs(ixStyles.child)}>{props.children}</div>
            </div>
          </div>
        </Show>
      </Transition>
      <SetAlert />
    </Portal>
  );
}