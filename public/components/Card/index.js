import style from './style.module.css';
import { formatTime } from "../../utils/time";

export default function Card({ id, class: clazz, url, title, summary, date }) {
  let className = style.card;
  if (clazz) {
    className = `${className} ${clazz}`;
  }
  return (
    <div id={id} class={className}>
      <h2 class={style.title}>
        <a href={url}>{title}</a>
      </h2>
      <p class={style.date}>{formatTime(date)}</p>
      <p class={style.summary} dangerouslySetInnerHTML={{__html: summary}}></p>
      <p class={style.readmore} aria-label={`Read more about ${title}`}>
        <a href={url}>Read more</a>
      </p>
    </div>
  )
}
