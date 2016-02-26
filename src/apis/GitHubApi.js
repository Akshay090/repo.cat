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
  const re = /^https?:\/\/(github\.com\/([^\/]+)|([^\/]+)\.github\.io)\/([^\/#?\s]+)/; // remove #, ?, .git suffix
  const resultArr = urlStr.match(re);

  if (!resultArr) {
    return false;
  }

  //    [0,1,     2,    3,    4 ] oh this destructuring is actually not that readable
  const [ , , byCom, byIo, name ] = resultArr;

  if (resultArr && byIo && name) {  // ${byIo}.github.io/${name}
    return {
      by: byIo,
      name,
    };
  } else if (resultArr && byCom && name) { // github.com/${byCom}/${name}
    return {
      by: byCom,
      name: name.endsWith('.git') ? name.substring(0, name.length - 4) : name,
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
