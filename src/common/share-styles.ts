import * as stylex from '@stylexjs/stylex';

export const flexStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
  },
  sero: {
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
  },
});