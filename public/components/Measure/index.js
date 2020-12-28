import style from './style.module.css';
import { useEffect, useRef } from 'preact/hooks';
import {injectScript} from "../../utils/dom";

const gmapsApiKey = 'AIzaSyBTdH3AFSWLD3SrgbNqTGoRsg3U6W0qAAg';

const htmlText = `<!-- html -->
<script src="https://unpkg.com/measuretool-googlemaps-v3"></script>
`;

const codeText = `
// Pass in the google maps instance to create the measure tool
const measureTool = new MeasureTool(map);`

const codeStyles = `

`;
const center = {lat: 41.70, lng: -71.47};
const segments = [
  {
    "lat": 41.69547509615208,
    "lng": -71.36993408203125
  },
  {
    "lat": 41.434490308949215,
    "lng": -71.3671875
  },
  {
    "lat": 41.50857729743936,
    "lng": -71.20513916015625
  },
  {
    "lat": 41.66923209813446,
    "lng": -71.18435546874998
  },
  {
    "lat": 41.80245339578072,
    "lng": -71.34365722656248
  },
  {
    "lat": 41.910875425626266,
    "lng": -71.39034912109373
  },
  {
    "lat": 42.01299182987659,
    "lng": -71.38760253906248
  },
  {
    "lat": 42.01299182987659,
    "lng": -71.80508300781248
  },
  {
    "lat": 41.69957665997156,
    "lng": -71.795654296875
  },
  {
    "lat": 41.3566211272796,
    "lng": -71.82156249999998
  },
  {
    "lat": 41.37723402378496,
    "lng": -71.49471923828123
  },
  {
    "lat": 41.6154423246811,
    "lng": -71.48529052734375
  },
  {

    "lat": 41.69547509615208,
    "lng": -71.36993408203125
  }
];

export default function Measure() {
  const mapRef = useRef(null);
  const measureTool = useRef(null);

  const start = () => {
    if (measureTool.current) {
      measureTool.current.start([center]);
    }
  };

  const stop = () => {
    if (measureTool.current) {
      measureTool.current.end();
    }
  };

  useEffect(() => {
    let obs;
    let map;

    const initMap = async () => {
      const isApiLoaded = Array.from(document.head.querySelectorAll('script')).some(x => x.src.includes(gmapsApiKey));
      if (!isApiLoaded) {
        await injectScript(`https://maps.googleapis.com/maps/api/js?key=${gmapsApiKey}&libraries=geometry`);
        await injectScript(`https://unpkg.com/measuretool-googlemaps-v3`);
      }
      if (!map) {
        map = new window.google.maps.Map(mapRef.current, {
          center,
          zoom: 9,
          clickableIcons: false,
          disableDefaultUI: true,
          disableDoubleClickZoom: true,
          gestureHandling: 'none',
          draggable: false
        });
        measureTool.current = new window.MeasureTool(map, {
          contextMenu: false,
          unit: 'IMPERIAL'
        });
        measureTool.current.start(segments);
      }
    };

    if (mapRef.current) {
      // start loading the google maps script when this section enters 25% threshold
      const obsOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.25
      };
      obs = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            initMap();
          }
        }
      }, obsOptions);
      obs.observe(mapRef.current);
    }

    return () => {
      if (obs) {
        obs.disconnect();
      }
      if (measureTool.current) {
        measureTool.current.end();
      }
    }
  }, []);

  return (
    <section class={style.host}>
      <div class={style.mapsection} tab-index="-1">
        <div class={style.map} ref={mapRef}></div>
      </div>
      <div class={style.instruction}>
        <h2>
          <a target="_blank" href="https://github.com/zhenyanghua/MeasureTool-GoogleMaps-V3">
            Measurement Tool for Google Maps JS API
          </a>
        </h2>
        <p>
          A handy measurement widget for Google Maps API v3.
          The functionalities are implemented as close as to what current Google Maps offers.
        </p>
        <div>
          <button onClick={start}>start</button>
          <button onClick={stop}>stop</button>
        </div>
        <codeblock-light class={style.codeblock}>
          <style>{codeStyles}</style>
          <pre>
            <code class="lang-html">{htmlText}</code>
            <code class="lang-js">{codeText}</code>
          </pre>
        </codeblock-light>
      </div>
    </section>
  )
}