import { useEffect } from 'preact/hooks';
import style from './style.module.css';
import { posts } from '../../posts/posts';
import Card from "../../components/Card";

export default function Writings() {
  useEffect(() => {
    document.title = 'Writings - Zhenyang Hua';
  }, []);

  return (
    <div class={style.writings}>
      <div className={style.list}>
        {posts.map(post => (
          <Card class={style.card} key={post.url} {...post} />
        ))}
      </div>
    </div>
  )
}