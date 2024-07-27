import type { Accessor, JSX, Setter } from "solid-js";
import { Portal } from "solid-js/web";
import * as stylex from "@stylexjs/stylex";
import { Transition } from "solid-transition-group";
import { Show } from 'solid-js';
import { materialEasing } from "~/common/store";
import SetDialog from "./SetDialog";

// "linear-gradient(120deg, rgba(254,247,243,1) 0%, rgba(249,241,250,1) 15%, rgba(237,245,254,1) 50%, rgba(238,251,243,1) 100%)"
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
    backdropFilter: 'blur(1px)',
  },
  box: {
    ...stylex.include(inStyles.root),
    display: 'flex',
    justifyContent: 'center',
    bottom: 0,
    padding: '10px',
    paddingBottom: '20px',
  },
  boxIn: {
    maxWidth: '430px',
    width: '100%',
    padding: '20px',
    paddingTop: '12px',
    borderRadius: "20px",
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowX: 'hidden',
  },
  hint: {
    width: '70px',
    height: '4px',
    borderRadius: '2px',
    backgroundColor: '#E5E8EB',
    alignSelf: 'center',
    marginBottom: '7px',
  }
});

type SetSubPageProps<P = {}> = P & {
  children: JSX.Element;
  show: Accessor<number>,
  setShow: Setter<number>
};

export default function SetSubPage(props: SetSubPageProps): JSX.Element{
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
              <div {...stylex.attrs(ixStyles.hint)}>&nbsp;</div>
              {props.children}
            </div>
          </div>
        </Show>
      </Transition>
      <SetDialog />
    </Portal>
  );
}