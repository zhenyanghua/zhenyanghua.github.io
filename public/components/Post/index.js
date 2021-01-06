import { useLoc } from "preact-iso/router";
import { formatTime } from "../../utils/time";
import { useAnchor, useTitle } from "../../utils/dom";
import style from './style.module.css';

const gitRoot = 'https://github.com/zhenyanghua/zhenyanghua.github.io/blob/master/posts';

export default function Post ({ children, title, date, summary }) {
  useTitle(title);
  useAnchor();
  const { path } = useLoc();

  return (
    <div class={style.post}>
      <h1 class={style.title}>{title}</h1>
      <p class={style.date}>Posted on {formatTime(date)}</p>
      <div class={style.summary} dangerouslySetInnerHTML={{ __html: summary }} />
      {children}
      <h2 class={style.github}>
        <a target="_blank" href={`${gitRoot}${path}/index.md`}>Read on GitHub</a>
      </h2>
    </div>
  );
}
