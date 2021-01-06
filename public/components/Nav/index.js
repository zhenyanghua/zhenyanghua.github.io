import style from './style.module.css';
import Link from "../link";
import {routes} from "../routes";

export default function Nav() {
  return (
    <div class={style.host}>
      <nav>
        <h2 class="hidden">Main Navigation</h2>
        <ul>
          {routes.map(route => (
            <li>
              <Link href={route.url} class={style.link} activeClassName={style.active}>{route.label}</Link>
            </li>
          ))}
          <li>
            <Link href="/writings/1" class={style.link} activeClassName={style.active}>Writings</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
