import * as stylex from '@stylexjs/stylex';
import type { Accessor, JSX, Setter } from 'solid-js';
import { createSignal, splitProps } from 'solid-js';
import type { StyleXStyles } from '@stylexjs/stylex';
import { A } from '@solidjs/router';
import type { AnchorProps } from '@solidjs/router';
import LogoTextSvg from '../assets/logo_text.svg';
//import LogoImgSvg from '../assets/logo_img.svg';

type ButtonMode = 'main' | 'sub' | 'none';

type SetButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: JSX.Element;
  mode?: ButtonMode;
  sx?: StyleXStyles[];
};

type SetInputProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  mode?: 'main';
  sx?: StyleXStyles[];
};

type SetInputBoxProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  mode?: 'text' | 'icon';
  sx?: StyleXStyles[];
  children: JSX.Element;
};

type SetAProps = AnchorProps & {
  children: JSX.Element;
  sx?: StyleXStyles[];
  mode?: ButtonMode;
  disabled?: boolean;
  href: string;
};

type SetRootProps = JSX.HTMLAttributes<HTMLDivElement> & {
  children: JSX.Element;
  sx?: StyleXStyles[];
};

type SetButtonBoxProps = JSX.HTMLAttributes<HTMLDivElement> & {
  children: JSX.Element;
  sx?: StyleXStyles[];
  disabled?: boolean;
};

type SetCheckboxProps = JSX.HTMLAttributes<HTMLDivElement> & {
  sx?: StyleXStyles[];
  disabled?: boolean;
  value: Accessor<boolean>;
  setValue: Setter<boolean>;
  children: JSX.Element;
};

type SetSwitchProps = SetCheckboxProps;

const baseStyles = stylex.create({
  reset: {
    borderStyle: 'none',
    outlineStyle: 'none',
    fontFamily: "'Basic Fonts'",
    fontSize: '16px',
    willChange: 'transform',
    borderRadius: '17px',
  },
  main: {
    padding: '16.5px',
    width: '100%',
    fontWeight: 500,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    userSelect: 'none',
    cursor: 'pointer',
    transition: {
      default: 'transform 0.8s var(--spring-easing), filter 0.4s linear',
      '@media (hover: none)': {
        default: null,
        ':not(:active)': 'transform 0.8s var(--spring-mobile), filter 0.4s linear',
      },
      ':is(:active)': 'transform 0.3s ease, filter 0.3s linear',
    },
    transform: {
      default: 'scale(1)',
      //eslint-disable-next-line
      ':not(:active):is(:hover)': {
        default: null,
        '@media (hover: hover)': 'scale(1.02)',
      },
      ':is(:active)': 'scale(0.95)',
    },
    filter: {
      default: 'brightness(1)',
      //eslint-disable-next-line
      ':not(:active):is(:hover)': {
        default: null,
        '@media (hover: hover)': 'brightness(0.96)',
      },
      ':is(:active)': 'brightness(0.85)',
    },
  },
  input: {
    userSelect: 'auto',
    transition: {
      default: 'filter 0.4s linear, transform 0.8s var(--spring-easing), border-color 0.4s linear',
      '@media (hover: none)': {
        default: null,
        ':not(:focus)': 'filter 0.4s linear, transform 0.8s var(--spring-mobile), border-color 0.4s linear',
      },
      ':focus': 'filter 0.3s linear, transform 0.3s ease, border-color 0.3s linear',
    },
    filter: {
      default: 'brightness(1)',
      //eslint-disable-next-line
      ':not(:focus):is(:hover)': {
        default: null,
        '@media (hover: hover)': 'brightness(0.975)',
      },
      ':is(:focus)': 'brightness(0.95)',
    },
    transform: {
      default: 'scale(1)',
      //eslint-disable-next-line
      ':not(:focus):is(:hover)': {
        default: null,
        '@media (hover: hover)': 'scale(1.015)',
      },
      ':focus': 'scale(1.03)',
    },
  },
});

const inputStyles = stylex.create({
  main: {
    ...stylex.include(baseStyles.reset),
    ...stylex.include(baseStyles.main),
    ...stylex.include(baseStyles.input),
    '::placeholder': {
      fontFamily: "'Basic Fonts'",
      color: '#8B95A1',
    },
    backgroundColor: {
      default: "#F9FAFB",
    },
    color: {
      default: "#4e5a68",
      ":focus": "#333D4B",
    },
    borderStyle: 'solid',
    borderWidth: '1.5px',
    borderColor: {
      default: "#E5E8EB",
      ':focus': "#b1c9e0",
    },
    fontFamily: 'Arial',
  },
});

const buttonStyles = stylex.create({
  main: {
    ...stylex.include(baseStyles.reset),
    ...stylex.include(baseStyles.main),
    ...stylex.include(baseStyles.button),
    backgroundColor: {
      //default: '#3190f7',
      default: "#8b97ea",
      // ':is(:active)': '#246ab6',
      ':disabled': 'rgb(210,210,210)',
    },
    color: {
      default: '#ffffff',
      // ':is(:active)': '#BDBDBD',
      ':disabled': 'rgb(150, 150, 150)',
    },
    textAlign: 'center',
  },
  sub: {
    ...stylex.include(baseStyles.reset),
    ...stylex.include(baseStyles.main),
    ...stylex.include(baseStyles.button),
    backgroundColor: {
      default: '#e8ebff',
      // ':is(:active)': '#b9d9fc',
      ':disabled': 'rgb(210,210,210)',
    },
    color: {
      default: '#8b97ea',
      // ':is(:active)': '#246ab6',
      ':disabled': 'rgb(150, 150, 150)',
    },
  },
  none: {
    ...stylex.include(baseStyles.reset),
    ...stylex.include(baseStyles.button),
    ...stylex.include(baseStyles.flex),
    // backgroundColor: '#F2F4F6',
    // color: '#4E5968',
  },
});

const thisStyles = stylex.create({
  disabled: {
    cursor: 'default',
    pointerEvents: 'none',
    opacity: 0.5,
    backgroundColor: 'rgb(220,220,220)',
    borderColor: 'transparent',
    color: 'rgb(150, 150, 150)',
    // boxShadow: null,
  },
  root: {
    width: '100svw',
    // height: 'max(100lvh, 750px)',
    minHeight: '100dvh',
    position: 'relative',
    padding: '20px',
    ...stylex.include(baseStyles.flex),
    flexDirection: 'column',
  },
  rootIn: {
    width: "min(450px, 100%)",
  },
  title: {
    ...stylex.include(baseStyles.reset),
    ...stylex.include(baseStyles.flex),
    alignSelf: "flex-start",
    // marginBottom: "20px",
    // paddingLeft: "12px",
    // gap: "12px",
  },
  boxIn: {
    ...stylex.include(baseStyles.flex),
    flexDirection: 'column',
    backgroundColor: "#fff",
    padding: "25px",
    marginTop: "20px",
    borderRadius: "20px",
    position: "relative",
    gap: '10px',
  },
});


export function SetRootBox(props: SetRootProps): JSX.Element {
  const [local, others] = splitProps(props, [
    'children',
    'sx'
  ]);
  return (
    <div
      {...stylex.attrs(
        // (local.mode === 'sero' || local.mode === 'garo') && baseStyles.flex,
        // local.mode === 'sero' && flexStyles.sero,
        // local.center && flexStyles.center,
        thisStyles.root,
      )}
    >
      <div {...others} {...stylex.attrs(thisStyles.rootIn, ...(local.sx??[]))}>
        <A {...stylex.attrs(thisStyles.title)} href='/' title="home">
          {/* <LogoImgSvg width="20px" height="20px" /> */}
          <LogoTextSvg height="30px" />
        </A>
        {local.children}
      </div>
    </div>
  );
}

export function SetBox(props: SetRootProps): JSX.Element {
  const [local, others] = splitProps(props, [
    'children',
    'sx'
  ]);
  return (
    <div
      {...stylex.attrs(
        thisStyles.boxIn,
        ...(local.sx??[])
      )}
      {...others}
    >
      {local.children}
    </div>
  );
}

export function SetInput(props: SetInputProps): JSX.Element {
  const [local, others] = splitProps(props, ['mode', 'sx']);
  return (
    <input
      {...stylex.attrs(
        inputStyles[local.mode || 'main'],
        ...(local.sx??[]),
        others.disabled && thisStyles.disabled
      )}
      {...others}
    />
  );
}

const inputBoxStyles = stylex.create({
  box: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100%',
    color: {
      default: '#6b7784',
      ":focus-within": "#528abe",
    },
    transition: 'color 0.3s linear',
  },
  text: {
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '5px',
    marginLeft: '5px',
  },
  icon: {

  },
});

export function SetInputBox(props: SetInputBoxProps): JSX.Element {
  const [local, others] = splitProps(props, ['mode', 'sx', 'children']);
  return (
    <div {...stylex.attrs(inputBoxStyles.box)}>
      <div {...stylex.attrs(
        local.mode === 'text' && inputBoxStyles.text,
        local.mode === 'icon' && inputBoxStyles.icon,
      )}>
        {local.children}
      </div>
      <input
        {...stylex.attrs(
          inputStyles.main,
          ...(local.sx??[]),
          others.disabled && thisStyles.disabled
        )}
        {...others}
      />
    </div>
  );
}

export function SetButton(props: SetButtonProps): JSX.Element {
  const [local, others] = splitProps(props, ['children', 'mode', 'sx']);
  return (
    <button
      {...stylex.attrs(
        buttonStyles[local.mode || 'main'],
        ...(local.sx??[]),
        others.disabled && thisStyles.disabled
      )}
      {...others}
    >
      {local.children}
    </button>
  );
}

export function SetButtonBox(props: SetButtonBoxProps): JSX.Element {
  const [local, others] = splitProps(props, [
    'children',
    'sx',
    'disabled',
  ]);
  return (
    <div
      {...stylex.attrs(
        buttonStyles.none,
        ...(local.sx??[]),
        local.disabled && thisStyles.disabled
      )}
      {...others}
    >
      {local.children}
    </div>
  );
}

const aStyles = stylex.create({
  base: {
    textDecoration: 'none',
  },
});
export function SetA(props: SetAProps): JSX.Element {
  const [local, others] = splitProps(props, [
    'children',
    'sx',
    'mode',
    'disabled',
    'href',
  ]);
  return (
    <A
      {...stylex.attrs(
        baseStyles.reset,
        aStyles.base,
        buttonStyles[local.mode || 'main'],
        ...(local.sx??[]),
        local.disabled && thisStyles.disabled
      )}
      href={local.href}
      {...others}
    >
      {local.children}
    </A>
  );
}

const checkboxStyles = stylex.create({
  box: {
    ...stylex.include(baseStyles.flex),
    ...stylex.include(buttonStyles.none),
    backgroundColor: "#fff",
    padding: '10px',
    gap: '10px',
    // borderRadius: '14px',
  },
  path2: {
    transition: {
      default: 'stroke-dashoffset 0.35s ease',
      "@media (hover: none)": 'stroke-dashoffset 0.25s ease',
    },
    strokeDashoffset: 22,
  },
  path2Checked: {
    strokeDashoffset: 0,
  },
  child: {
    color: '#4e5968',
    fontSize: "15px",
    // marginLeft: "10px",
    // paddingRight: "5px",
  },
});

export function SetCheckbox(props: SetCheckboxProps){
  const [local, others] = splitProps(props, [
    'sx',
    'disabled',
    'value',
    'setValue',
    'children',
  ]);
  return (
    <div
      {...stylex.attrs(checkboxStyles.box, ...(local.sx??[]), !!local.disabled && thisStyles.disabled)}
      onClick={()=> local.setValue((prev) => !prev)}
      {...others}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.02 13.47 8.52 17.956 19.45 6.99"
          fill="none"
          stroke="#aaa"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          {...stylex.attrs(
            checkboxStyles.path2,
            local.value() && checkboxStyles.path2Checked
          )}
          d="M4.02 13.47 8.52 17.956 19.45 6.99"
          fill="none"
          stroke="#5ca1e6"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dasharray="22"
        />
      </svg>
      <div {...stylex.attrs(checkboxStyles.child)}>{local.children}</div>
    </div>
  );
}

const switchStyles = stylex.create({
  box: {
    ...stylex.include(baseStyles.flex),
    ...stylex.include(buttonStyles.none),
    backgroundColor: "#fff",
    // borderRadius: "14px",
    padding: "10px",
    gap: "10px",
    fontSize: "15px",
    color: '#4e5968',
  },
  switch: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#e8eae9",
    pointerEvents: "none",
    overflow: "visible",
  },
  switchOut: {
    width: "50px",
    height: "25px",
    borderRadius: "12.5px",
    transition: {
      default: "background-color 0.3s linear, padding 1s var(--spring-easing)",
      "@media (max-width: 575px)": "background-color 0.25s linear, padding 0.8s var(--spring-mobile)",
    },
    backgroundColor: "#FBFBFB",
    paddingTop: "1.5px",
    paddingBottom: "1.5px",
    paddingRight: "24px",
    paddingLeft: "1.5px",
  },
  switchOutActive: {
    backgroundColor: "#E8EAE9",
    paddingTop: "1.5px",
    paddingBottom: "1.5px",
    paddingRight: "11.5px",
    paddingLeft: "1.5px",
  },
  switchOutChecked: {
    backgroundColor: "#8b97ea",
    paddingTop: "1.5px",
    paddingBottom: "1.5px",
    paddingRight: "1.5px",
    paddingLeft: "24px",
  },
  switchOutCheckedActive: {
    backgroundColor: "#7782cb",
    paddingTop: "1.5px",
    paddingBottom: "1.5px",
    paddingRight: "1.5px",
    paddingLeft: "11.5px",
  },
  switchIn: {
    width: "100%",
    height: "100%",
    borderRadius: "11px",
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1), 1px 1px 0px 1px rgba(0, 0, 0, 0.1)",
    background: "#fdfdfd",
    transform: 'scale(0.75)',
    transition: {
      default: "transform 1s var(--spring-easing)",
      "@media (max-width: 575px)": "transform 0.8s var(--spring-mobile)",
    }
  },
  switchInChecked: {
    transform: 'scale(1)',
  },
  child: {
    color: '#4e5968',
    fontSize: "15px",
  },
});
  
export function SetSwitch(props: SetSwitchProps){
  const [active, setActive] = createSignal(false);
  const [local, others] = splitProps(props, [
    'sx',
    'disabled',
    'value',
    'setValue',
    'children',
  ]);

  return(
    <div
      {...stylex.attrs(switchStyles.box, ...(local.sx??[]), !!local.disabled && thisStyles.disabled)}
      onClick={()=> local.setValue((prev) => !prev)}
      onPointerDown={()=> setActive(true)}
      onPointerUp={()=> setActive(false)}
      onPointerCancel={()=> setActive(false)}
      onPointerLeave={()=> setActive(false)}
      {...others}
    >
      <div 
        {...stylex.attrs(switchStyles.switch, switchStyles.switchOut,
          (active() && !local.value()) && switchStyles.switchOutActive,
          (!active() && local.value()) && switchStyles.switchOutChecked,
          (active() && local.value()) && switchStyles.switchOutCheckedActive,
        )}
      >
        <div {...stylex.attrs(switchStyles.switch, switchStyles.switchIn, local.value() && switchStyles.switchInChecked)}>
          &nbsp;
        </div>
      </div>
      <div {...stylex.attrs(switchStyles.child)}>{local.children}</div>
    </div>
  );
}