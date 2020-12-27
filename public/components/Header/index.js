import style from './style.module.css';
import SkipLink from "../SkipLink";
import Brand from "../Brand";
import Nav from "../Nav";
import Intro from "../Intro";

export default function Header() {
  return (
    <div class={style.host}>
      <header>
        <SkipLink />
        <Brand />
        <Nav />
        <Intro />
      </header>
    </div>
  );
}
