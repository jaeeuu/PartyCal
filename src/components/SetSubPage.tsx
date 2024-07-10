import type { JSX, Setter } from "solid-js";
import { Portal } from "solid-js/web";
import * as stylex from "@stylexjs/stylex";
import { Transition } from "solid-transition-group";
import { Show } from 'solid-js';
import { SetRootBox } from "./SetShared";
import { materialEasing } from "~/common/store";

const ixStyles = stylex.create({
  backdrop: {
    width: '100svw',
    height: '100dvh',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(1px)',
  },
  box: {

  }
});

type SetSubPageProps<P = {}> = P & {
  children: JSX.Element;
  show: boolean,
  setShow: Setter<boolean>
};

export default function SetSubPage(props: SetSubPageProps): JSX.Element{
  const pageOnEnter = (el, done) => {
    const a = el.animate([{ transform: "translateY(500px) scaleY(0)", overflowY: "hidden" }, { transform: 'translateY(0px) scaleY(1)', overflowY: "hidden" }], { duration: 1000, easing: materialEasing});
    a.finished.then(done);
  };
  const pageOnExit = (el, done) => {
    const a = el.animate([{ transform: 'translateY(0px) scaleY(1)', overflowY: "hidden" }, { transform: "translateY(-500px) scaleY(0)", overflowY: "hidden" }], { duration: 500, easing: "ease" });
    a.finished.then(done);
  };
  return (
    <Portal>
      <Transition>
        <Show when={props.show}>
          <div {...stylex.attrs(ixStyles.backdrop)}>
            &nbsp;
          </div>
        </Show>
      </Transition>
      <Transition>
        <Show when={props.show}>
          <SetRootBox>
            <div {...stylex.attrs(ixStyles.box)}>
              {props.children}
            </div>
          </SetRootBox>
        </Show>
      </Transition>
    </Portal>
  );
}