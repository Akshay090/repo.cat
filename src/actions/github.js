import 'isomorphic-fetch';

const TOKEN = false;

const checkStatusCode = (res) => {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }
  const err = new Error(res.statusText);
  err.response = res;
  throw err;
};

const resToJson = (res) => res.json();

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

export const fetchGithubRepoInfo = ({ owner, repo }) => fetch(
  TOKEN ?
    `https://api.github.com/repos/${owner}/${repo}?access_token=${TOKEN}` :
    `https://api.github.com/repos/${owner}/${repo}`
).then(checkStatusCode).then(resToJson).catch(() => ({}));

export const fetchGithubRepoLangInfo = ({ owner, repo }) => fetch(
  TOKEN ?
    `https://api.github.com/repos/${owner}/${repo}/languages?access_token=${TOKEN}` :
    `https://api.github.com/repos/${owner}/${repo}/languages`
).then(checkStatusCode).then((res) => res.json()).catch(() => ({}));
