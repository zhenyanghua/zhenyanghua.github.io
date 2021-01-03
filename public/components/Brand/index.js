import style from './style.module.css';

export default function Brand() {
  return (
    <div class={style.host}>
      <h2 class={style.title}>
        <a href="/">
          Zhenyang Hua
        </a>
      </h2>
    </div>
  );
}