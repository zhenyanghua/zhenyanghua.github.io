import { css } from 'lit-element';

// global behavior styles
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

// global UI styles
export const button = css`
  button {
    color: white;
    background-color: rgb(1 54 64);
    border-color: white;
    font-size: 1.2rem;
    border-radius: 4px;
    padding: 8px;
    cursor: pointer;
  }

  button.inverted {
    color: rgb(1 54 64);
    background-color: white;
    border-color: rgb(1 54 64);
  }
`;

export const a = css`
  a {
    color: rgb(1 54 64);
  }
`;

// export global UI styles
export const all = [
  button,
  a
];

