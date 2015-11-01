import 'isomorphic-fetch';

const TOKEN = false;

const resToJson = (res) => {
  // spreads the error info if there's an error
  return res.ok ? res.json() : {
    ...(res.json()),
    url: res.url,
    status: res.status,
    statusText: res.statusText,
    ok: res.ok,
  };
};

export const githubUrlParser = (urlStr) => {
  const re = /^https?:\/\/(github.com\/([^\/]+)\/([^\/#?]+)|([^\/]+).github.io\/([^\/#?]+))/; // i dont want #, ?
  const resultArr = urlStr.match(re);
  if (resultArr && resultArr[4]) {  // [4].github.io/[5]
    return {
      owner: resultArr[4],
      repo: resultArr[5],
    };
  } else if (resultArr && resultArr[2]) { // github.com/[2]/[3]
    return {
      owner: resultArr[2],
      repo: resultArr[3],
    };
  }

  return false;
};

// the fetch methods _only_ throw when there's a network error.
// it returns the error info when 403/404 happens
export const fetchGithubRepoInfo = ({ owner, repo }) => fetch(
  TOKEN ?
    `https://api.github.com/repos/${owner}/${repo}?access_token=${TOKEN}` :
    `https://api.github.com/repos/${owner}/${repo}`
).then(resToJson);

export const fetchGithubRepoLangInfo = ({ owner, repo }) => fetch(
  TOKEN ?
    `https://api.github.com/repos/${owner}/${repo}/languages?access_token=${TOKEN}` :
    `https://api.github.com/repos/${owner}/${repo}/languages`
).then((res) => res.json());
