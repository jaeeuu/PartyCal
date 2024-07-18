import * as stylex from '@stylexjs/stylex';
import type { Accessor, JSX, Setter } from 'solid-js';
import { createSignal, splitProps } from 'solid-js';
import type { StyleXStyles } from '@stylexjs/stylex';
import { A } from '@solidjs/router';
import LogoTextSvg from '../assets/logo_text.svg';
import LogoImgSvg from '../assets/logo_img.svg';


const baseStyles = stylex.create({
  reset: {
    borderStyle: 'none',
    outlineStyle: 'none',
    textDecoration: 'none',
  },
  main: {
    fontFamily: "'Basic Fonts'",
    fontSize: '16px',
    willChange: 'transform',
    borderRadius: '15px',
    padding: '16.5px',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    userSelect: 'none',
    //padding: '12px 15px 12px 15px',
    cursor: 'pointer',
    transition: {
      default: 'background-color 0.4s linear, transform 0.8s var(--spring-easing), box-shadow 0.4s ease, filter 0.4s linear',
      '@media (hover: none)': {
        default: null,
        ':not(:active)': 'background-color 0.4s linear, transform 0.8s var(--spring-mobile), box-shadow 0.4s ease, filter 0.4s linear',
      },
      ':is(:active)': 'background-color 0.3s linear, transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s linear',
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
  },
  input: {
    '::placeholder': {
      fontFamily: "'Basic Fonts'",
      color: '#cfcfd0',
    },
    userSelect: 'auto',
    //padding: '10px 15px 10px 15px',
    transition: {
      default: 'background-color 0.4s linear, transform 0.8s var(--spring-easing), box-shadow 0.4s ease',
      '@media (hover: none)': {
        default: null,
        ':not(:focus-within)': 'background-color 0.4s linear, transform 0.8s var(--spring-mobile), box-shadow 0.4s ease',
      },
      ':focus-within': 'background-color 0.3s linear, transform 0.3s ease, box-shadow 0.3s ease',
    },
    backgroundColor: {
      default: '#fafafa',
      //eslint-disable-next-line
      ':not(:focus-within):is(:hover)': {
        default: null,
        '@media (hover: hover)': '#fcfcfc',
      },
      ':focus-within': '#ffffff',
    },
    boxShadow: {
      default: '0px 0px 15px 0px rgba(101, 100, 124, 0.1)',
      //eslint-disable-next-line
      ':not(:focus-within):is(:hover)': {
        default: null,
        '@media (hover: hover)': '0px 0px 15px 0px rgba(101, 100, 124, 0.2)',
      },
      ':focus-within': '0px 0px 15px 0px rgba(101, 100, 124, 0.25)',
    },
    transform: {
      default: 'scale(1)',
      //eslint-disable-next-line
      ':not(:focus-within):is(:hover)': {
        default: null,
        '@media (hover: hover)': 'scale(1.015)',
      },
      ':focus-within': 'scale(1.03)',
    },
  },
});

const inputStyles = stylex.create({
  input: {
    ...stylex.include(baseStyles.reset),
    ...stylex.include(baseStyles.main),
    ...stylex.include(baseStyles.input),
    //overflow: 'hidden',
    //fontSize: '16px',
  },
});
const buttonStyles = stylex.create({
  main: {
    ...stylex.include(baseStyles.reset),
    ...stylex.include(baseStyles.main),
    ...stylex.include(baseStyles.button),
    width: '100%',
    fontWeight: 500,
    backgroundColor: {
      default: '#3190f7',
      ':is(:active)': '#246ab6',
      ':disabled': 'rgb(210,210,210)',
    },
    color: {
      default: '#ffffff',
      ':is(:active)': '#BDBDBD',
      ':disabled': 'rgb(150, 150, 150)',
    },
  },
  sub: {
    ...stylex.include(baseStyles.reset),
    ...stylex.include(baseStyles.main),
    ...stylex.include(baseStyles.button),
    width: '100%',
    fontWeight: 500,
    backgroundColor: {
      default: '#e8f3ff',
      ':is(:active)': '#b9d9fc',
      ':disabled': 'rgb(210,210,210)',
    },
    color: {
      default: '#3190f7',
      ':is(:active)': '#246ab6',
      ':disabled': 'rgb(150, 150, 150)',
    },
  },
  none: {
    ...stylex.include(baseStyles.main),
    ...stylex.include(baseStyles.button),
    ...stylex.include(baseStyles.flex),
    backgroundColor: '#F2F4F6',
    color: '#4E5968',
    // backgroundColor: {
    //   default: 'transparent',
    //   ':active': '#E5E7EA',
    //   ':disabled': null,
    // },
    // color: {
    //   default: '#606C7C',
    //   // ':active': '#606C7C',
    //   ':disabled': 'rgb(150, 150, 150)',
    // },
    filter: {
      default: 'brightness(1)',
      //eslint-disable-next-line
      ':not(:active):is(:hover)': {
        default: null,
        '@media (hover: hover)': 'brightness(0.95)',
      },
      ':is(:active)': 'brightness(0.9)',
    },
  },
});

const thisStyles = stylex.create({
  disabled: {
    cursor: 'default',
    pointerEvents: 'none',
    opacity: 0.5,
    boxShadow: null,
  },
  // interact: {
  //   cursor: 'pointer',
  //   userSelect: 'none',
  //   willChange: 'transform',
  //   transition: {
  //     default: 'filter 0.3s linear, transform 0.8s var(--spring-easing)',
  //     '@media (hover: none) and :not(:active):not(:hover)':
  //       'filter 0.3s linear, transform 0.8s var(--spring-mobile)',
  //     ':is(:active)': 'filter 0.3s linear, transform 0.3s ease',
  //   },
  //   filter: {
  //     default: 'brightness(1)',
  //     '@media (hover: hover) and :not(:active):is(:hover)':
  //       'brightness(0.95)',
  //     ':is(:active)': 'brightness(0.85)',
  //   },
  //   transform: {
  //     default: 'scale(1)',
  //     '@media (hover: hover) and :not(:active):is(:hover)':
  //       'scale(1.02)',
  //     '@media (hover: hover) and :is(:active)': 'scale(0.96)',
  //     '@media (hover: none) and :is(:active)': 'scale(0.95)',
  //   },
  // },
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
    ...stylex.include(baseStyles.flex),
    alignSelf: "flex-start",
    marginBottom: "20px",
    marginLeft: "12px",
    gap: "12px",
  },
  boxIn: {
    ...stylex.include(baseStyles.flex),
    flexDirection: 'column',
    backgroundColor: "#fff",
    padding: "25px",
    marginTop: "20px",
    borderRadius: "20px",
    position: "relative",
  },
});

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

type SetAProps = JSX.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: JSX.Element;
  sx?: StyleXStyles[];
  mode?: ButtonMode;
  disabled?: boolean;
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
  text?: string;
  value: Accessor<boolean>;
  setValue: Setter<boolean>;
};

type SetSwitchProps = SetCheckboxProps;

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
        <a {...stylex.attrs(baseStyles.reset, thisStyles.title)} href='/'>
          <LogoImgSvg width="20px" height="20px" />
          <LogoTextSvg height="20px" color="#b1b8c0" />
        </a>
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
      {...others}
      {...stylex.attrs(
        inputStyles[local.mode || 'main'],
        ...(local.sx??[]),
        others.disabled && thisStyles.disabled
      )}
    />
  );
}

export function SetButton(props: SetButtonProps): JSX.Element {
  const [local, others] = splitProps(props, ['children', 'mode', 'sx']);
  return (
    <button
      {...others}
      {...stylex.attrs(
        buttonStyles[local.mode || 'main'],
        ...(local.sx??[]),
        others.disabled && thisStyles.disabled
      )}
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
      {...others}
      {...stylex.attrs(
        buttonStyles.none,
        ...(local.sx??[]),
        local.disabled && thisStyles.disabled
      )}
    >
      {local.children}
    </div>
  );
}

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
      {...others}
      {...stylex.attrs(
        baseStyles.reset,
        buttonStyles[local.mode || 'main'],
        ...(local.sx??[]),
        local.disabled && thisStyles.disabled
      )}
      href={local.href}
    >
      {local.children}
    </A>
  );
}

const checkboxStyles = stylex.create({
  box: {
    ...stylex.include(baseStyles.flex),
    ...stylex.include(buttonStyles.none),
    padding: '8px',
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
  text: {
    color: "#242424",
    fontSize: "14px",
    marginLeft: "10px",
    paddingRight: "5px",
  },
});

export function SetCheckbox(props: SetCheckboxProps){
  const [local, others] = splitProps(props, [
    'sx',
    'disabled',
    'text',
    'value',
  ]);
  return (
    <div
      {...stylex.attrs(checkboxStyles.box, buttonStyles.none, ...(local.sx??[]), !!local.disabled && thisStyles.disabled)}
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
      <div {...stylex.attrs(checkboxStyles.text)}>{local.text}</div>
    </div>
  );
}

const switchStyles = stylex.create({
  box: {
    ...stylex.include(baseStyles.flex),
    //...stylex.include(buttonStyles.none),
    ...stylex.include(baseStyles.main),
    ...stylex.include(baseStyles.button),
    borderRadius: "14px",
    padding: "10px",
    gap: "10px",
    fontSize: "15px",
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
    backgroundColor: "#9AC5F4",
    paddingTop: "1.5px",
    paddingBottom: "1.5px",
    paddingRight: "1.5px",
    paddingLeft: "24px",
  },
  switchOutCheckedActive: {
    backgroundColor: "#7faee0",
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
});
  
export function SetSwitch(props: SetSwitchProps){
  const [active, setActive] = createSignal(false);
  const [local, others] = splitProps(props, [
    'sx',
    'disabled',
    'text',
    'value',
    'setValue',
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
      {local.text}
    </div>
  );
}