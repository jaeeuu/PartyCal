/* eslint-disable */
import stylex from "@stylexjs/stylex";

const thisStyles = stylex.create({
  reset: {
    borderStyle: "none",
    outlineStyle: "none",
    borderRadius: "15px",
    fontFamily: "' basic font'",
    fontSize: "16px",
  },
  buttons: {
    padding: "12px 15px 12px 15px",
    cursor: {
      default: "pointer",
      ":disabled": "default",
    },
    willChange: "transform",
    transition: {
      default: 'background-color 0.4s linear, transform 0.8s var(--spring-easing), box-shadow 0.4s ease',
      ':active': 'background-color 0.3s linear, transform 0.3s ease, box-shadow 0.3s ease',
      "@media (hover: none)": "background-color 0.4s linear, transform 0.8s var(--spring-mobile), box-shadow 0.4s ease",
    },
    boxShadow: {
      // default: "0px 0px 20px 10px rgba(242, 244, 246, 0.6)",
      default: null,
      ":not(:disabled):not(:active):hover": {
        default: "0px 0px 20px 0px rgba(242, 244, 246, 0.7)",
        "@media (hover: none)": null,
      },
      ":active": "0px 0px 15px 0px rgba(242, 244, 246, 0.8)",
      ":disabled": null,
    },
    transform: {
      default: "scale(1)",
      ":not(:disabled):not(:active):hover": {
        default: "scale(1.02)",
        "@media (hover: none)": null,
      },
      ":active": {
        default: "scale(0.96)",
        "@media (hover: none)": "scale(0.95)",
      },
      ":disabled": null,
    },
  },
  inputs: {
    padding: '10px 15px 10px 15px',
    willChange: "transform",
    transition: {
      default: "background-color 0.4s linear, transform 0.8s var(--spring-easing), box-shadow 0.4s ease",
      ":focus-within": "background-color 0.3s linear, transform 0.3s ease, box-shadow 0.3s ease",
      "@media (hover: none)": "background-color 0.4s linear, transform 0.8s var(--spring-mobile), box-shadow 0.4s ease",
    },
    backgroundColor: {
      default: "#fafafa",
      ":not(:disabled):not(:focus-within):hover": {
        default: "#fcfcfc",
        "@media (hover: none)": null,
      },
      ":focus-within": "#ffffff",
      ":disabled": "#cfcfd0",
    },
    boxShadow: {
      default: "0px 0px 15px 0px rgba(101, 100, 124, 0.1)",
      ":not(:disabled):not(:focus-within):hover": {
        default: "0px 0px 15px 0px rgba(101, 100, 124, 0.2)",
        "@media (hover: none)": null,
      },
      ":focus-within": "0px 0px 15px 0px rgba(101, 100, 124, 0.25)",
      ":disabled": null,
    },
    transform: {
      default: "scale(1)",
      ":not(:disabled):not(:focus-within):hover": {
        default: "scale(1.01)",
        "@media (hover: none)": null,
      },
      ":focus-within": {
        default: "scale(1.02)",
        "@media (hover: none)": "scale(1.03)",
      },
    },
    "::placeholder": {
      fontFamily: "' basic font'",
      color: "#cfcfd0",
    },
    userSelect: "auto",
  }
});

export const baseStyles = stylex.create({
  input: {
    ...stylex.include(thisStyles.reset),
    ...stylex.include(thisStyles.inputs),
    //overflow: "hidden",
    //fontSize: "16px",
  },
  button1: {
    ...stylex.include(thisStyles.reset),
    ...stylex.include(thisStyles.buttons),
    backgroundColor: {
      default: "#3190f7",
      ":not(:disabled):active": "#246ab6",
      ":disabled": "rgb(210,210,210)",
    },
    color: {
      default: "#ffffff",
      ":not(:disabled):active": "#BDBDBD",
      ":disabled": "rgb(150, 150, 150)",
    },
  },
  button2: {
    ...stylex.include(thisStyles.reset),
    ...stylex.include(thisStyles.buttons),
    backgroundColor: {
      default: "#e8f3ff",
      ":not(:disabled):active": "#b9d9fc",
      ":disabled": "rgb(210,210,210)",
    },
    color: {
      default: "#3190f7",
      ":not(:disabled):active": "#246ab6",
      ":disabled": "rgb(150, 150, 150)",
    },
  },
  button3: {
    ...stylex.include(thisStyles.reset),
    ...stylex.include(thisStyles.buttons),
    backgroundColor: {
      default: "transparent",
      ":not(:disabled):active": "#E5E7EA",
      ":disabled": null,
    },
    color: {
      default: "#606C7C",
      // ":not(:disabled):active": "#606C7C",
      ":disabled": "rgb(150, 150, 150)",
    },
  },
  root: {
    width: "100svw",
    // height: "max(100lvh, 750px)",
    minHeight: "100dvh",
    position: 'relative',
    padding: "20px",
    //overflow: "hidden",
    //backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1800 1200' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientTransform='rotate(315)'%3E%3Cstop offset='.5' stop-color='%23eeebf0'/%3E%3Cstop offset='1' stop-color='%23f4f8f9'/%3E%3C/linearGradient%3E%3ClinearGradient id='d' x1='96.58%25' y1='33.98%25' x2='66.41%25' y2='44.59%25' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23C7F9FF'/%3E%3Cstop offset='1' stop-color='%2371B8EB'/%3E%3C/linearGradient%3E%3ClinearGradient id='e' x1='40.9%25' y1='28.1%25' x2='28.2%25' y2='59.6%25' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23A9BFF4'/%3E%3Cstop offset='.112' stop-color='%23A9BFF4'/%3E%3Cstop offset='.142' stop-color='%238474DE'/%3E%3Cstop offset='.298' stop-color='%23B558C9'/%3E%3Cstop offset='.389' stop-color='%23DB7F96'/%3E%3Cstop offset='.476' stop-color='%23E39C97'/%3E%3Cstop offset='.666' stop-color='%23F0CBA2'/%3E%3Cstop offset='1' stop-color='%23FBF1BB'/%3E%3C/linearGradient%3E%3ClinearGradient id='f' x1='60%25' y1='40%25' x2='30%25' y2='60%25' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23F1DDD6'/%3E%3Cstop offset='.301' stop-color='%23F1DDD6'/%3E%3Cstop offset='.338' stop-color='%23A4B4EA'/%3E%3Cstop offset='.488' stop-color='%2385A3EB'/%3E%3Cstop offset='.586' stop-color='%237492E9'/%3E%3Cstop offset='.697' stop-color='%2376C7EF'/%3E%3Cstop offset='.792' stop-color='%23668EE7'/%3E%3Cstop offset='.879' stop-color='%23668EE7'/%3E%3Cstop offset='.921' stop-color='%239A7DED'/%3E%3Cstop offset='1' stop-color='%239A7DED'/%3E%3C/linearGradient%3E%3CradialGradient id='c' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(-48.00025 308.00014 -410.99984 -64.05223 692 822)'%3E%3Cstop offset='.5' stop-color='%23FFE3CB'/%3E%3Cstop offset='1' stop-color='%23FFDEC7'/%3E%3C/radialGradient%3E%3Cfilter id='b' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='f0'/%3E%3CfeBlend in='SourceGraphic' in2='f0' result='f1'/%3E%3CfeGaussianBlur stdDeviation='300' result='f2'/%3E%3C/filter%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23a)'/%3E%3Cg filter='url(%23b)'%3E%3Cellipse cx='1000' cy='400' rx='350' ry='300' fill='url(%23c)' opacity='.6'/%3E%3Cellipse cx='1600' cy='450' rx='350' ry='300' transform='rotate(-70 1600 450)' fill='url(%23d)' opacity='.3'/%3E%3Cg opacity='.2'%3E%3Cpath transform='translate(0 100) rotate(60 365 475)' fill='url(%23e)' d='M50 250h650v450H50z'/%3E%3Cpath transform='translate(0 100) rotate(120 1050 1050)' fill='url(%23f)' d='M750 650h600v800H750z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
    //backgroundRepeat: "no-repeat",
  },
});

export const shareStyles = stylex.create({
  disabled: {
    cursor: "default",
    pointerEvents: "none",
    opacity: 0.5,
  },
  interact: {
    willChange: "transform",
    transition: {
      default: "filter 0.3s linear, transform 0.8s var(--spring-easing)",
      ":active": "filter 0.3s linear, transform 0.3s ease",
      "@media (hover: none)": "filter 0.3s linear, transform 0.8s var(--spring-mobile)",
    },
    filter: {
      default: "brightness(1)",
      ":not(:active):hover": {
        default: "brightness(0.95)",
        "@media (hover: none)": null,
      },
      ":active": "brightness(0.85)",
    },
    transform: {
      default: "scale(1)",
      ":not(:active):hover": {
        default: "scale(1.02)",
        "@media (hover: none)": null,
      },
      ":active": {
        default: "scale(0.96)",
        "@media (hover: none)": "scale(0.95)",
      },
    },
  },
});

export const flexStyles = stylex.create({
  garo: {
    display: "flex",
    alignItems: "center",
  },
  sero: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});