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

self.onmessage = ({ data: action }) => {
  const { content } = action.payload;

  const gfmHtml = typeof content !== 'string' ?
    false :
    marked(decode(content)); // the expensive op

  self.postMessage({
    type: action.type,
    payload: {
      id: action.payload.id,
      gfmHtml,
    },
  });
};
