const content = 
`
!--!
!---
Slide 1
\`\`\`javascript
const a = 's';
\`\`\`
!---

!---
Slide 2
> ABC

\`foo\`
!---
`;

// const content = 
// "!---\nSlide 1\n!---\n" +
// "!---\nSlide 2\n!---\n";

const slide = {
    name: 'slide',
    level: 'block',
    start(src) { 
        return src.match(/\!---[\s]/)?.index; 
    },
    tokenizer(src, tokens) {
        const rule = /^(\!---\s((\s(?!\!---)|.(?!\!---))*)(?!\!---)\s+\!---(?:\s|$))/;
        const match = rule.exec(src);
        if (match) {
            console.log('match', match);
            const token = {
                type: 'slide',
                raw: match[0],
                text: match[2].trim(),
                tokens: []
            };
            this.lexer.blockTokens(token.text, token.tokens);
            return token;
        }
    },
    renderer(token) {
        return indent`
            <div class="slide">
                <div class="slide-controls">
                    <button class="controls controls-prev">Previous</button>
                    <button class="controls controls-next">Next</button>
                </div>
                ${this.parser.parse(token.tokens)}
            </div>
            `;
    }
}

// !--!

const presentation = {
    name: 'presentation',
    level: 'inline',
    start(src) { 
        return src.match(/\!--\!/)?.index; 
    },
    tokenizer(src, tokens) {
        const rule = /^(\!--\!)(?:\s|$)/;
        const match = rule.exec(src);
        if (match) {
            console.log('match', match);
            const token = {
                type: 'presentation',
                raw: match[0],
                text: match[0],
                tokens: []
            };
            // this.lexer.inline(token.text, token.tokens);
            return token;
        }
    },
    renderer(token) {
        return indent`
            <style>
                .slide:fullscreen {
                    width: 100%;
                    height: 100%;
                    background-color: wheat;
                    padding: 100px;
                    font-size: 32px;
                }
                .slide:not(:fullscreen) .controls {
                    display: none;
                }
            
                .slide:fullscreen .controls {
                    position: fixed;
                    top: 10px;
                    right: 10px;
                }
            </style>
            <button class="presentation">
                Presentation
            </button>
            <script>
                document.addEventListener('load', () => {
                    const btnPresentation = document.getElementById('presentation');
                    const btnPrev = [...document.querySelectorAll('.controls-prev')];
                    const btnNext = [...document.querySelectorAll('.controls-next')];
                    const slides = [...document.querySelectorAll('.slide')];

                    let currentSlideIndex = 0;
                    btnPresentation.addEventListener('click', () => {
                        slides[currentSlideIndex].requestFullscreen();
                    });
                    btnPrev.forEach(btn => btn.addEventListener('click', prev))
                    btnNext.forEach(btn => btn.addEventListener('click', next))

                    document.addEventListener('keydown', e => {
                        if (document.fullscreenElement && [...document.fullscreenElement.classList].includes('slide')) {
                            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
                            else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
                        }
                    });

                    function next() {
                        currentSlideIndex = currentSlideIndex === slides.length - 1 ? currentSlideIndex : currentSlideIndex + 1;
                        slides[currentSlideIndex].requestFullscreen();
                    }

                    function prev() {
                        currentSlideIndex = currentSlideIndex === 0 ? 0 : currentSlideIndex - 1;
                        slides[currentSlideIndex].requestFullscreen();
                    }
                })
            </script>
            `;
    }
}


const marked = require('marked');
marked.use({ extensions : [slide, presentation] });
console.log(marked(content));

/**
 * 
  todo 
  - add another token to inject js for switching slides
  - or, try shadow DOM, register the component at the app level, and use it in the renderer.
 */

function indent(strings, ...keys) {
    const match = /[^\s]/.exec(strings);
    if (match) {
      strings = strings.map(string => string.replace(new RegExp(`\\n\\s{${match.index - 1}}`, 'gm'), '\n'));
    }
    let result = '';
    for (let i = 0; i < strings.length; i++) {
      result += strings[i];
      if (i < keys.length) {
        result += keys[i];
      }
    }
    return result.replace('\n', '');
  }