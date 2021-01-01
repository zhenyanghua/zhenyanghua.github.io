import style from './style.module.css';
import { posts } from '../../posts/posts';

export default function Writings() {
  return (
    <>
      {posts.map(post => (
        <a href={post.url} key={post.url}>{post.label}</a>
      ))}
    </>
  )
}