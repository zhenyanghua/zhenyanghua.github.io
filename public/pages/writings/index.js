import style from './style.module.css';
import { posts } from '../../posts/posts';
import Card from "../../components/Card";
import { useTitle } from "../../utils/dom";

export default function Writings() {
  useTitle('Writings');

  return (
    <div class={style.writings}>
      <div className={style.list}>
        {posts.map(post => (
          <Card class={style.card} key={post.url} {...post} url={`${post.url}#maincontent`} />
        ))}
      </div>
    </div>
  )
}