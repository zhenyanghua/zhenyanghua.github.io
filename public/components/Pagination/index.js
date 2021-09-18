import style from "./style.module.css";

export default function Pagination({ prev, current, first, last, total, next }) {
  return (
    <div class={style.page}>
      <span><a href={first}>1</a></span>
      <span><a href={prev}>Prev</a></span>
      <span>{current} / <a href={last}>{total}</a></span>
      <span><a href={next}>Next</a></span>
    </div>
  )
}