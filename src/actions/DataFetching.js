import {
  fetchHNItems,
  fetchHNItemById,
  gitHubUrlParser,
  fetchGitHubRepoLangs,
  fetchGitHubRepoInfo,
  fetchGitHubRepoReadme,
} from '../apis';

import {
  // HN_TOP_DATA,
  // HN_NEW_DATA,
  // HN_SHOW_DATA,
} from '../constants';

const asyncGetSingleRepoInfo = async (slugObj, mergeObj = {}) => { // slugObj === { owner, repo }
  const repoInfo = await fetchGitHubRepoInfo(slugObj);
  if (repoInfo.notOk) { // mostly 404 here
    return false;
  }

  const langs = await fetchGitHubRepoLangs(slugObj);
  const readme = await fetchGitHubRepoReadme(slugObj);

  repoInfo.langs = langs;

  if (typeof readme.notOk === 'undefined') {
    repoInfo.readme = readme;
  }

  return {
    ...mergeObj,
    ...repoInfo,
  };
};

export const asyncGetData = async (type) => {
  const topStoryIds = await fetchHNItems(type); // [ 9127232, 9128437, ... ]
  const rawHNItems = await Promise.all(topStoryIds.map((id) => fetchHNItemById('item', id)));
  const rawItemCount = rawHNItems.length;

  const itemsOnGitHub = rawHNItems.filter((item) => item && item.url).map((item) => ({
    ...item,
    github: gitHubUrlParser(item.url),
  })).filter((obj) => obj.github);

  const repoData = (await Promise.all(
    itemsOnGitHub.map((item) => asyncGetSingleRepoInfo(item.github, item))
  )).filter((obj) => obj); // remove falsy ones

  return {
    repoData,
    rawItemCount,
  };
};
