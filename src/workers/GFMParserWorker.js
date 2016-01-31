import marked from 'marked';
import { Base64 } from 'js-base64';
const { decode } = Base64;

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
});

self.onmessage = ({ data }) => {
  const { id, content } = data;

  if (typeof content !== 'string') {
    self.postMessage({
      id,
      gfmHtml: false,
    });
  } else {
    const textContent = decode(content);
    self.postMessage({
      id,
      gfmHtml: marked(textContent),
    });
  }
};
