import { useState } from 'preact/hooks';
import style from './style.module.css';

const htmlText = `
<!-- html -->
<script src="https://unpkg.com/houdini-leaf"></script>`;

const codeStyles = (leafSize) => `
pre {
  margin-left: -${leafSize * 5}px !important;
  margin-right: -${leafSize * 5}px !important;
}
@media (min-width: 768px) {
  pre {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }  
}
`;

export default function Leaf() {
  const [variance, setVariance] = useState('left');
  const [size, setSize] = useState(16);
  const [color, setColor] = useState('#73CE8F');

  const leafStyle = {
    '--leaf-variance': variance,
    '--leaf-size': size,
    '--leaf-color': color,
  };

  const updateVariance = (e) => {
    setVariance(e.target.value);
  }

  return (
    <section id="leaf" class={style.host} style={leafStyle}>
      <div>
        <h2>
          <a target="_blank" href="https://github.com/zhenyanghua/houdini/tree/master/leaf">
            CSS Houdini Leaf Effect
          </a>
        </h2>
        <p>
          Leaf effect is a decorative border that uses CSS Houdini Paint API to bring special effect through background
          image or any where an image could be used. Try it out without writing any JavaScript!
        </p>
        <div>
          <div class={`${style.control} ${style.radioGroup}`}>
            <label htmlFor="controls"><code class="lang-css">--leaf-variance</code></label>
            <div>
              <div class="radio">
                <input type="radio" id="left" name="variance" value="left"
                       checked={variance === 'left'} onChange={updateVariance} />
                <label htmlFor="left">left</label>
              </div>
              <div class="radio">
                <input type="radio" id="around" name="variance" value="around"
                       checked={variance === 'around'} onChange={updateVariance}/>
                <label htmlFor="around">around</label>
              </div>
            </div>
          </div>
          <div class={style.control}>
            <label htmlFor="size"><code class="lang-css">--leaf-size</code></label>
            <input type="range" min="10" max="32" id="size" name="size"
              value={size} onChange={e => setSize(e.target.value)} />
          </div>
          <div class={style.control}>
            <label htmlFor="color"><code class="lang-css">--leaf-color</code></label>
            <input type="color" id="color" name="color" value={color}
              onInput={e => setColor(e.target.value)} />
          </div>
        </div>
      </div>
      <codeblock-light>
        <style>{codeStyles(size)}</style>
        <pre>
          <code class="lang-html">{htmlText}</code>
          <code class="lang-css">{`
/* CSS */
.element {
  --leaf-variance: ${variance};
  --leaf-size: ${size};
  --leaf-color: ${color};
  background-image: paint(leaf);
}`}</code>
        </pre>
      </codeblock-light>
    </section>
  );
}