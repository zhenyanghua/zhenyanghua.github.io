import { css } from 'lit-element';

export const hidden = css`
  .hidden {
    position: absolute;
    left: 0;
    top: -500px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
`;