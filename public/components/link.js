import { useLoc } from 'preact-iso/router';

export default function Link({ activeClassName, ...props }) {
  const { path } = useLoc();
  let className = props.class;
  if (props.href === path) {
    className = `${className} ${activeClassName}`;
  }
  return (
    <a {...props} class={className} />
  );
}