import style from './style.module.css';
import Card from "../Card";
import { useTitle } from "../../utils/dom";
import Pagination from "../Pagination";

export default function Writings({ posts, page }) {
  useTitle('Writings');

  return (
    <div class={style.writings}>
      <Pagination {...page} />
      <div class={style.list}>
        {posts.map(post => (
          <Card id={post.url} class={style.card} key={post.url} {...post} url={`${post.url}#maincontent`} />
        ))}
      </div>
      <Pagination {...page} />
    </div>
  )
}