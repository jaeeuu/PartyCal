import stylex from '@stylexjs/stylex';
import { Show } from 'solid-js';
import { flexStyles, shareStyles } from '../common/share-styles';

const inStyles = stylex.create({
    box: {
      padding: '8px',
      borderRadius: '13px',
    },
    path2: {
      transition: {
        default: 'stroke-dashoffset 0.35s ease',
        "@media (max-width: 575px)": 'stroke-dashoffset 0.25s ease',
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

export default function SetCheckbox(props){

return (
  <div
    {...stylex.attrs(flexStyles.garo, inStyles.box, shareStyles.interact, !!props.disabled && shareStyles.disabled)}
    onClick={() => props.setValue()}
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
          inStyles.path2,
          props.value && inStyles.path2Checked
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
    <Show when={!!props.text}><div {...stylex.attrs(inStyles.text)}>{props.text}</div></Show>
  </div>
);
}