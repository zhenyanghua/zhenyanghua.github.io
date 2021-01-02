import style from './style.module.css';
import { useEffect } from 'preact/hooks';

const gitRoot = 'https://github.com/zhenyanghua/zhenyanghua.github.io/blob/articles/posts';

export default function Post ({ children, path, title, date }) {
  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  useEffect(() => {
    document.title = `${title} - Zhenyang Hua`;
  }, []);

  return (
    <div class={style.post}>
      <h1 class="title">{title}</h1>
      <p class="date">Posted on {formattedDate}</p>
      {children}
      <div>
        <a target="_blank" href={`${gitRoot}${path}/index.md`}>Read on GitHub</a>
      </div>
    </div>
  );
}