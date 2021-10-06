import style from './style.module.css';
import { formatTime } from "../../utils/time";
import { useRef, useEffect } from 'preact/hooks';

export default function Card({ id, class: clazz, url, title, summary, date }) {
  let className = style.card;
  if (clazz) {
    className = `${className} ${clazz}`;
  }
  const summaryRef = useRef(null);

  // This is to set the formated html text when the page is rendered by React.
  // the dangerouslySetInnerHTML is to set so that the prerender renders the formated text. 
  useEffect(() => {
    if (summaryRef.current) {
      summaryRef.current.innerHTML = summary;
    }
  }, []);

  return (
    <div id={id} class={className}>
      <h2 class={style.title}>
        <a href={url}>{title}</a>
      </h2>
      <p class={style.date}>{formatTime(date)}</p>
      <p class={style.summary} ref={summaryRef} dangerouslySetInnerHTML={{__html: summary}}></p>
      <p class={style.readmore} aria-label={`Read more about ${title}`}>
        <a href={url}>Read more</a>
      </p>
    </div>
  )
}
