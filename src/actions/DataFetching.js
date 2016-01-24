import {
  fetchHNItems,
  fetchHNItemById,
  gitHubUrlParser,
  fetchGitHubRepoLangs,
  fetchGitHubRepoInfo,
  fetchGitHubRepoReadme,
} from '../apis';

import {
  typeToActionMap,
  typeToHNTypeMap,
  REPO_LANGS,
  REPO_READMES,
} from '../constants';

import { idFn } from '../lib';

// slugObj === { by, name }
const asyncGetSingleRepoInfo = async (slugObj, mergeObj) => {
  const repoInfo = await fetchGitHubRepoInfo(slugObj);
  return repoInfo.notOk ? false : {
    ...mergeObj,
    ...repoInfo,
  };
};

const asyncGetSingleRepoLangs = async (slugObj, mergeObj) => {
  const langs = await fetchGitHubRepoLangs(slugObj);
  return {
    ...mergeObj,
    langs: langs.notOk ? false : langs,
  };
};

const asyncGetSingleRepoReadme = async (slugObj, mergeObj) => {
  const readme = await fetchGitHubRepoReadme(slugObj);
  // readme is kinda special
  // instead of returning false we should mark them as not having a readme
  return {
    ...mergeObj,
    readme: readme.notOk ? false : readme,
  };
};

// type is one of [ 'top', 'new', 'show' ]
const asyncGetRepoInfo = async (type) => {
  const topStoryIds = await fetchHNItems(typeToHNTypeMap[type]); // [ 9127232, 9128437, ... ]
  const rawHNItems = await Promise.all(topStoryIds.map((id) => fetchHNItemById('item', id)));
  const rawItemCount = rawHNItems.length;

  const possibleGitHubItems = rawHNItems
    .filter((item) => item && item.url) // has a url
    .map((item) => ({
      ...item,
      github: gitHubUrlParser(item.url),
    }))
    .filter((obj) => obj.github); // has a url that links to a github repo

  const repoData = (await Promise.all(
    possibleGitHubItems.map((item) => asyncGetSingleRepoInfo(item.github, item))
  )).filter(idFn); // remove falsy ones

  return {
    repoData,
    rawItemCount,
  };
};

// we thunk it for the app to call it easily on first mount
// relies on `redux-thunk` middleware
// type is one of [ 'top', 'new', 'show' ]
export const loadAllForType = (type) => () => async (dispatch) => {
  const { repoData, rawItemCount } = await asyncGetRepoInfo(type);
  dispatch({
    type: typeToActionMap[type],
    payload: {
      repoData,
      rawItemCount,
    },
  });

  const langs = await Promise.all(
    repoData.map(({ github, id }) => asyncGetSingleRepoLangs(github, { id })),
  );

  dispatch({
    type: REPO_LANGS,
    payload: {
      category: type,
      langs,
    },
  });

  const readmes = (await Promise.all(
    repoData.map(({ github, id }) => asyncGetSingleRepoReadme(github, { id })),
  )); // don't filter here. instead, let the reducer mark them as false

  dispatch({
    type: REPO_READMES,
    payload: {
      category: type,
      readmes,
    },
  });
};
