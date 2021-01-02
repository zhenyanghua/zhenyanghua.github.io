import style from './style.module.css';
import { useEffect } from 'preact/hooks';
import { formatTime } from "../../utils/time";

const gitRoot = 'https://github.com/zhenyanghua/zhenyanghua.github.io/blob/articles/posts';

export default function Post ({ children, path, title, date }) {

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