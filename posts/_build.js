const fs = require('fs');
const path = require('path');
const marked = require('marked');
const matter = require('gray-matter');
const escape = require('escape-html');
const Prism = require('prismjs');
process.chdir(__dirname);

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

function createRenderer() {
  const renderer = new marked.Renderer();
  renderer.code = (code, infostring, escaped) => {
    if (!infostring || !(infostring in Prism.languages)) {
      return indent`
        <div class="codeblock">
          <pre>${escape(code)}</pre>
        </div>`;
    }
    const highlighted = Prism.highlight(
      code,
      Prism.languages[infostring],
      infostring
    );

    return indent`
      <div class="codeblock">
        <pre class="language-${infostring}">${highlighted}</pre>  
      </pre>`;
  };
  renderer.heading = (text, level, raw, slugger) => {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    return indent`
      <h${level}>
        <a id="${escapedText}" class="anchor" aria-hidden="true" href="#${escapedText}">
          <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>
        </a>${text}</h${level}>`;
  };
  return renderer;
}

const postRoutes = [];
const outDir = '../public/posts';
const renderer = createRenderer();

fs.rmdirSync(outDir, { recursive: true, force: true });

const years = fs.readdirSync('.').filter(x => !x.startsWith("_"));
years.forEach(year => {
  const months = fs.readdirSync(path.join(year));
  months.forEach(month => {
    const posts = fs.readdirSync(path.join(year, month));
    posts.forEach(post => {
      const mdFile = fs.readFileSync(path.join(year, month, post, 'index.md'), 'utf8');
      const url = `/${year}/${month}/${post}`;
      const { data, content } = matter(mdFile);
      console.debug(data);
      // inject meta data to header
      const html = marked(content, { renderer }).replace(/`/g, '\\`');
      const template = indent`
        /**
         * Generated source
         * @author Zhenyang Hua
         */
        import Post from '../../../../components/Post';
        export default function() {
          return (
            <Post {...${JSON.stringify(data)}}>
              <article dangerouslySetInnerHTML={{__html: \`${html}\`}} />
            </Post>
          )
        }`;
      const postDir = path.join(outDir, year, month, post);
      fs.mkdirSync(postDir, { recursive: true });
      fs.writeFileSync(path.join(postDir, 'index.js'), template);
      const route = indent`
        {
          url: "${url}",
          title: "${data.title}",
          date: "${data.date}",
          summary: "${data.summary}",
          Route: lazy(() => import('.${url}')),
        }`;
      postRoutes.push(route);
    });
  });
});

fs.writeFileSync(
  path.join(outDir, 'posts.js'),
  indent`
    /**
     * Generated source
     * @author Zhenyang Hua
     */
    import lazy from 'preact-iso/lazy';
    export const posts = [${postRoutes.reverse().join(',\n')}];`
);

