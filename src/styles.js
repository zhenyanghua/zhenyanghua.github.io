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

export const button = css`
  button {
    color: white;
    background-color: rgb(1 54 64);
    border-color: white;
    font-size: 1.2rem;
    border-radius: 4px;
  }
  
  button.inverted {
    color: rgb(1 54 64);
    background-color: white;
    border-color: rgb(1 54 64);
  }
`;