import style from './style.module.css';

export default function Nav() {
  return (
    <div class={style.host}>
      <nav>
        <h2 class="hidden">Main Navigation</h2>
        <ul>
          <li>
            <a target="_blank" href="https://www.leafyjava.com">LeafyJava</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}