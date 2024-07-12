import * as stylex from "@stylexjs/stylex";
import { createSignal, Show } from "solid-js";
import type { JSX } from "solid-js";
import { Transition } from "solid-transition-group";
import CheckCircleSvg from "../assets/icons/circle/check_circle.svg";

const ixStyles = stylex.create({
  base: {
    position: 'fixed',
    top: '25px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#818C99',
    padding: '11px 22px 11px 17px',
    borderRadius: '24px',
    gap: '10px',
  },
  icon: {
    width: '20px',
  },
  text: {
    color: '#fff',
    fontWeight: 700,
    fontSize: '15px',
  }
});

const [dialog, setDialog] = createSignal<[string, number]>(['',0]);

export const CallDialog = (type: number) => {
  let timer = null;
  if (type === 1) {
    setDialog(['복사되었습니다.', 1]);
    clearTimeout(timer);
    timer = setTimeout(() => {
      setDialog(['',0]);
    }, 1500);
  }
};

export default function SetDialog(): JSX.Element {

  const pageOnEnter = (el, done) => {
    const a = el.animate([{ transform: "translateY(-100px)", overflowY: "hidden" }, { transform: 'translateY(0px)', overflowY: "hidden" }], { duration: 300, easing: "ease" });
    a.finished.then(done);
  };
  const pageOnExit = (el, done) => {
    const a = el.animate([{ transform: 'translateY(0px)', overflowY: "hidden" }, { transform: "translateY(-100px)", overflowY: "hidden" }], { duration: 300, easing: "ease" });
    a.finished.then(done);
  };

  const getIcon = (type: number): JSX.Element => {
    if (type === 1) {
      return <CheckCircleSvg {...stylex.attrs(ixStyles.icon)} />;
    }
  };

  return (
    <Transition
    onEnter={(el, done) => pageOnEnter(el, done)}
    onExit={(el, done) => pageOnExit(el, done)}
    >
      <Show when={dialog()[1] !== 0}>
        <div {...stylex.attrs(ixStyles.base)}>
          <div {...stylex.attrs(ixStyles.box)}>
            {getIcon(dialog()[1])}
            <div {...stylex.attrs(ixStyles.text)}>{dialog()[0]}</div>
          </div>
        </div>
      </Show>
    </Transition>
  );
}