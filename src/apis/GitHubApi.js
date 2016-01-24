/* eslint-disable max-len */
const TOKEN = 'da69989e2f47cb87758d6a3b352aa67992f3d0ec';
// @TODO replace this guy with proper OAuth

// contains the error info when an error occurs
const resToJson = (res) => res.ok ? res.json() : {
  url: res.url,
  status: res.status,
  statusText: res.statusText,
  notOk: true,
};

export const gitHubUrlParser = (urlStr) => {
  const re = /^https?:\/\/(github.com\/([^\/]+)\/([^\/#?]+)|([^\/]+).github.io\/([^\/#?]+))/; // i dont want #, ?
  const resultArr = urlStr.match(re);
  if (resultArr && resultArr[4]) {  // [4].github.io/[5]
    return {
      by: resultArr[4],
      name: resultArr[5],
    };
  } else if (resultArr && resultArr[2]) { // github.com/[2]/[3]
    return {
      by: resultArr[2],
      name: resultArr[3],
    };
  }

  return false;
};

// the fetch methods _only_ throw when there's a network error.
// it returns the error info when 403/404 happens
export const fetchGitHubRepoInfo = ({ by, name }) => fetch(
  TOKEN ?
    `https://api.github.com/repos/${by}/${name}?access_token=${TOKEN}` :
    `https://api.github.com/repos/${by}/${name}`
).then(resToJson);

export const fetchGitHubRepoLangs = ({ by, name }) => fetch(
  TOKEN ?
    `https://api.github.com/repos/${by}/${name}/languages?access_token=${TOKEN}` :
    `https://api.github.com/repos/${by}/${name}/languages`
).then(resToJson);

export const fetchGitHubRepoReadme = ({ by, name }) => fetch(
  TOKEN ?
    `https://api.github.com/repos/${by}/${name}/readme?access_token=${TOKEN}` :
    `https://api.github.com/repos/${by}/${name}/readme`
).then(resToJson);
