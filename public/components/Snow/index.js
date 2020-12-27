import style from './style.module.css';
import { useEffect, useRef } from 'preact/hooks';
import SnowFall from 'effect-snow'

const codeText = `
// Create a snow scene instance and
// mount it to the container element
const snow = new Snow(containerElement);
// To start
snow.start();
// To stop
snow.stop();
`;

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
    }, 120000);
  }


  useEffect(() => {
    // snow fall
    if (snowBox.current) {
      snow.current = new SnowFall(snowBox.current);
      startSnow();
    }

    return () => {
      stopSnow();
    }
  }, []);

  return (
    <div class={style.host}>
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
          <pre>
            <code className="lang-js">{codeText}</code>
          </pre>
        </codeblock-dark>
      </div>
    </div>
  );
}