import style from './style.module.css';
import { useEffect, useRef } from 'preact/hooks';

const codeText = `
// Create a snow scene instance and
// mount it to the container element
const snow = new Snow(containerElement);
// To start
snow.start();
// To stop
snow.stop();
`;

const codeStyles = `
pre {
  contain: content;
  margin: 0 !important;
  padding: 0 !important;
  background-color: var(--deepBlue) !important;
  font-size: 1.2rem !important;
}

@media (min-width: 462px) {
  pre {
    display: flex !important;
    justify-content: center !important;
  }
}`

export default function Snow() {
  const snowBox = useRef(null);
  const snow = useRef(null);
  const nextTimeToStopSnow = useRef(null);

  const stopSnow = () => {
    if (!snow.current) return;
    snow.current.stop();
  };

  const startSnow = () => {
    if (!snow.current) return;
    snow.current.start();

    if (nextTimeToStopSnow.current) {
      clearTimeout(nextTimeToStopSnow.current);
    }
    nextTimeToStopSnow.current = setTimeout(() => {
      stopSnow();
      nextTimeToStopSnow.current = null;
    }, 30000);
  }


  useEffect(() => {
    let obs;
    // snow fall
    if (snowBox.current) {
      import('effect-snow').then(({default: SnowFall}) => {
        snow.current = new SnowFall(snowBox.current);
      });

      // start the snow when this section enters 50% threshold and intersection ratio is increasing
      // stop the snow when this section enters 50% threshold and intersection ratio is decreasing
      const obsOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      };
      obs = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            startSnow();
          } else {
            stopSnow();
          }
        }
      }, obsOptions);
      obs.observe(snowBox.current);
    }

    return () => {
      stopSnow();
      if (obs) {
        obs.disconnect();
      }
    }
  }, []);

  return (
    <section class={style.host}>
      <div class={style.snowbox} ref={snowBox} >
        <div>
          <h2>
            <a target="_blank" href="https://github.com/zhenyanghua/effects/tree/main/snow">
              Snow Effect Overlay
            </a>
          </h2>
          <p>
            Try the snow effect in your site with
            three lines of code
          </p>
          <div class="button-group">
            <button class="inverted" onClick={startSnow}>start the snow</button>
            <button class="inverted" onClick={stopSnow}>stop the snow</button>
          </div>
        </div>
        <codeblock-dark>
          <style>{codeStyles}</style>
          <pre>
            <code class="lang-js">{codeText}</code>
          </pre>
        </codeblock-dark>
      </div>
    </section>
  );
}