import type { Accessor, JSX, Setter } from "solid-js";
import { Portal } from "solid-js/web";
import * as stylex from "@stylexjs/stylex";
import { Transition } from "solid-transition-group";
import { onMount, Show } from 'solid-js';
import { materialEasing } from "~/common/stores";
import SetAlert from "./SetAlert";

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
  },
  boxIn: {
    maxWidth: '430px',
    width: '100%',
    padding: '22px',
    // paddingTop: '0px',
    borderRadius: "24px",
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
    paddingTop: '0px',
    paddingBottom: '0px',
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
  show: Accessor<number>,
  setShow: Setter<number>,
  isDynamic?: boolean,
};

export default function SetCreate(props: SetPopUpProps): JSX.Element{
  const backOnEnter = (el: Element, done: () => void) => {
    const a = el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, easing: 'ease' });
    a.finished.then(done);
  };
  const backOnExit = (el: Element, done: () => void) => {
    const a = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, easing: "ease" });
    a.finished.then(done);
  };
  const pageOnEnter = (el: Element, done: () => void) => {
    const a = el.animate([{ transform: "translateY(80vh)", overflowY: "hidden" }, { transform: 'translateY(0px)', overflowY: "hidden" }], { duration: 400, easing: materialEasing });
    a.finished.then(done);
  };
  const pageOnExit = (el: Element, done: () => void) => {
    const a = el.animate([{ transform: 'translateY(0px)', overflowY: "hidden" }, { transform: "translateY(80vh)", overflowY: "hidden" }], { duration: 350, easing: "ease" });
    a.finished.then(done);
  };

  const isDynamic = () => props.isDynamic ?? false;

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
          duration: isDynamic() ? 900 : 700,
          easing: "cubic-bezier(0.08,0.82,0.17,1)",
          iterations: isDynamic() ? Infinity : 1,
        },
      );
      const hintAni = new Animation(keyframes);
      hintAni.play();
      hintAni.finished.then(() => hintAni.cancel());
    });
  };
  

  return (
    <Portal>
      <Transition
        onEnter={(el, done) => backOnEnter(el, done)}
        onExit={(el, done) => backOnExit(el, done)}
      >
        <Show when={props.show()!==0}>
          <div {...stylex.attrs(ixStyles.backdrop)} onClick={() => props.setShow(0)}>
            &nbsp;
          </div>
        </Show>
      </Transition>
      <Transition
        onEnter={(el, done) => pageOnEnter(el, done)}
        onExit={(el, done) => pageOnExit(el, done)}
      >
        <Show when={props.show()!==0}>
          <div {...stylex.attrs(ixStyles.box)}>
            <div {...stylex.attrs(ixStyles.boxIn)}>
              <div {...stylex.attrs(ixStyles.hintBox)}>
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