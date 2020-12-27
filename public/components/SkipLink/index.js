import style from './style.module.css';

export default function SkipLink () {
  return (
    <div class={style.host}>
      <a href="#maincontent">skip to main content</a>
    </div>
  )
}