import style from './style.module.css';

export default function Card({ class: clazz, url, title, summary }) {
  let className = style.card;
  if (clazz) {
    className = `${className} ${clazz}`;
  }
  return (
    <div class={className}>
      <h2 class={style.title}>
        <a href={url}>{title}</a>
      </h2>
      <p class={style.summary}>{summary}</p>
    </div>
  )
}
