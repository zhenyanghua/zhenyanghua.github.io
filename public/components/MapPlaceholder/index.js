import style from './style.module.css';
import { useState, useRef } from 'preact/hooks';

export default function MapPlaceholder({ onClick }) {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(true);
    onClick();
    if (containerRef.current) {
      containerRef.current.parentElement.parentElement.focus();
    }
  };

  return (
    <div ref={containerRef} class={style.container}>
      <div role="region" aria-live="assertive" className="hidden" tabIndex="-1">
        <h2 tabIndex="-1">{loading ? 'Loading measure tool demo' : ''}</h2>
      </div>
      <div class={style.background}></div>
      <div class={style.dashed}>
        {loading ?
          <div class={style.loader}>
            <div class="ripple" role="img" aria-label="loading measure tool demo"><div></div><div></div></div>
            <p class={style.loadingText}>Loading measure tool demo</p></div> :
          <button class={style.button} onClick={startLoading}>Click here to load measure tool demo</button>}
      </div>
    </div>
  )
}
