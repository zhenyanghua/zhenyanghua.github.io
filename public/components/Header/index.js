import style from './style.module.css';
import SkipLink from "../SkipLink";
import Brand from "../Brand";
import Nav from "../Nav";
import Intro from "../Intro";

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function generateColor() {
  return [
    randomInt(256),
    randomInt(256),
    randomInt(256),
  ];
}

/**
 * Implemented based on the formula from WCAG specs:
 * https://www.w3.org/TR/WCAG20-TECHS/G17.html
 * Note 1: For the sRGB colorspace, the relative luminance of a color is defined as L = 0.2126 * R + 0.7152 * G + 0.0722 * B where R, G and B are defined as:

 if RsRGB <= 0.03928 then R = RsRGB/12.92 else R = ((RsRGB+0.055)/1.055) ^ 2.4

 if GsRGB <= 0.03928 then G = GsRGB/12.92 else G = ((GsRGB+0.055)/1.055) ^ 2.4

 if BsRGB <= 0.03928 then B = BsRGB/12.92 else B = ((BsRGB+0.055)/1.055) ^ 2.4

 and RsRGB, GsRGB, and BsRGB are defined as:

 RsRGB = R8bit/255

 GsRGB = G8bit/255

 BsRGB = B8bit/255
 */
function getRelativeLuminance(color) {
  const [R, G, B] = color
    .map(c => c / 255)
    .map(c => c < 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * (L1 + 0.05) / (L2 + 0.05)
 * @param lighterColor
 * @param darkerColor
 */
function getContrastRatio(lighterColor, darkerColor) {
  return (getRelativeLuminance(lighterColor) + 0.05) / (getRelativeLuminance(darkerColor) + 0.05);
}

/**
 * Find any color that is greater than the contrast ratio
 * @param color
 * @param targetRatio
 *  WCAG contrast ratio 7:1 default
 */
function findAnyColor(color, targetRatio = 7) {
  let testColor = generateColor();
  let ratio = getContrastRatio(testColor, color);
  while(ratio < targetRatio && 1 / ratio < targetRatio) {
    testColor = generateColor();
    ratio = getContrastRatio(testColor, color);
  }
  const [r, g, b] = testColor;
  return `rgb(${r}, ${g}, ${b})`;
}

export default function Header() {
  const backgroundColor = findAnyColor([1, 54, 64]);
  return (
    <div class={style.host} style={{ backgroundColor }}>
      <header>
        <SkipLink />
        <Brand />
        <Nav />
        <Intro />
      </header>
    </div>
  );
}
