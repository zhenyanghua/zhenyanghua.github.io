const fs = require('fs');
const path = require('path');
const marked = require('marked');
const matter = require('gray-matter');
const escape = require('escape-html');
const Prism = require('prismjs');
const loadLanguages = require('prismjs/components/');
loadLanguages(['java']);
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
  // FIXME - codeblock hierarchy is nested, it should be flat.
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
      </div>`;
  };
  renderer.heading = (text, level, raw, slugger) => {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    return indent`
      <h${level}>
        <a id="${escapedText}" class="anchor" aria-hidden="true" href="#${escapedText}">
          <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>
        </a>${text}</h${level}>`;
  };
  return renderer;
}

let postRoutes = [];
let postMeta = {};
const outDir = '../public/posts';
const renderer = createRenderer();
marked.use({ renderer })

fs.rmdirSync(outDir, { recursive: true, force: true });

const years = fs.readdirSync('.').filter(x => !x.startsWith("_"));
years.forEach(year => {
  const months = fs.readdirSync(path.join(year));
  months.forEach(month => {
    const posts = fs.readdirSync(path.join(year, month));
    posts.forEach(post => {
      const mdFile = fs.readFileSync(path.join(year, month, post, 'index.md'), 'utf8');
      const url = `/${year}/${month}/${post}`;
      const excerptSeparator = '<!-- Excerpt End -->';
      const { data, content, excerpt } = matter(mdFile, { excerpt_separator: excerptSeparator });
      const contentWithoutExcerpt = content.substring(excerpt.length + excerptSeparator.length);
      const summary = marked(excerpt).replace(/`/g, '\\`');
      const html = marked(contentWithoutExcerpt).replace(/`/g, '\\`');
      const scripts = Array.from(html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)).map(x => x[1].trim());
      // todo - optimization - transpile each script to es5 and bundle using babel and a bundler?
      // todo - SEO - inject meta data to header
      // Idea - post prerender - create a list of {url, title, meta} and write to a file.
      // create another step after this build to traverse the list and update the html with the content.
      const template = indent`
        /**
         * Generated source
         * @author Zhenyang Hua
         */
        import { useEffect } from 'preact/hooks';
        import Post from '../../../../components/Post';
        const scripts = ${JSON.stringify(scripts)};
        export default function() {
          useEffect(() => {
            scripts.forEach(script => new Function(script)());
          }, []);
          return (
            <Post {...${JSON.stringify(data)}} summary={\`${summary}\`}>
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
          summary: \`${summary}\`,
          Route: lazy(() => import('..${url}')),
        }`;
      postRoutes.push({
        date: new Date(data.date).getTime(),
        route
      });
      postMeta[url] = {
        title: data.title,
        summary: summary.replace(/<\/?\w+>/, '')
      };
    });
  });
});

// sort by latest date
postRoutes.sort((a, b) => b.date - a.date);
postRoutes = postRoutes.map(x => x.route);

console.debug('Found posts: ', postRoutes.length);

// writings pagination
const pageSize = 10;
const url = '/writings';
const writingRoutes = [];
const totalPages = Math.ceil(postRoutes.length / pageSize);
let currentPage = 1;

while (currentPage <= totalPages) {
  const page = {
    current: currentPage,
    total: totalPages,
    prev: `${url}/${currentPage === 1 ? currentPage : currentPage - 1}`,
    next: `${url}/${currentPage === totalPages ? currentPage : currentPage + 1}`,
    last: `${url}/${totalPages}`,
    first: `${url}/1`,
  };
  // create writings page route
  const route = indent`
    {
      url: "${url}/${currentPage}",
      title: "Writings - Zhenyang Hua",
      Route: lazy(() => import('./page${currentPage}/writings')),
    }`;
  writingRoutes.push(route);

  const template = indent`
    /**
     * Generated source
     * @author Zhenyang Hua
     */
    import Writings from '../../components/Writings';
    import posts from './posts';
    
    export default function() {
      return (
        <Writings posts={posts} page={${JSON.stringify(page)}} />
      )
    }`;

  const pageDir = path.join(outDir, `page${currentPage}`);
  fs.mkdirSync(pageDir, { recursive: true });
  fs.writeFileSync(path.join(pageDir, 'writings.js'), template);

  const posts = postRoutes.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  fs.writeFileSync(
    path.join(pageDir, 'posts.js'),
    indent`
      /**
       * Generated source
       * @author Zhenyang Hua
       */
      import lazy from 'preact-iso/lazy';
      const posts = [${posts.join(',\n')}];
      export default posts;`
  );

  currentPage++;
}

fs.writeFileSync(
  path.join(outDir, 'writings.js'),
  indent`
      /**
       * Generated source
       * @author Zhenyang Hua
       */
      import lazy from 'preact-iso/lazy';
      const writings = [${writingRoutes.join(',\n')}];
      export default writings;`
);

fs.writeFileSync(
  path.join(outDir, 'posts.js'),
  indent`
    ${new Array(totalPages).fill(0).map((_, i) => `import posts${i + 1} from './page${i + 1}/posts';`).join('\n')}
    
    const posts = [
    ${new Array(totalPages).fill(0).map((_, i) => `...posts${i + 1},`).join('\n')}
    ];
    export default posts;`
);


// createa a post temp data for post prerendering injection
fs.writeFileSync('../postMeta.js', `module.exports=${JSON.stringify(postMeta)};`);

exports.indent = indent;