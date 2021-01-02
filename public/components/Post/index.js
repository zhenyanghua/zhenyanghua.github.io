import { useEffect } from 'preact/hooks';
import { useLoc } from "preact-iso/router";
import { formatTime } from "../../utils/time";
import style from './style.module.css';

const gitRoot = 'https://github.com/zhenyanghua/zhenyanghua.github.io/blob/articles/posts';

export default function Post ({ children, title, date }) {
  const { path } = useLoc();

  useEffect(() => {
    document.title = `${title} - Zhenyang Hua`;
  }, []);

  return (
    <div class={style.post}>
      <h1 class={style.title}>{title}</h1>
      <p class={style.date}>Posted on {formatTime(date)}</p>
      {children}
      <h2 class={style.github}>
        <a target="_blank" href={`${gitRoot}${path}/index.md`}>Read on GitHub</a>
      </h2>
    </div>
  );
}