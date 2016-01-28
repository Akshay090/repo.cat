/*
  HN Item ID
  -> HN Info
    -> Possible GH Repo
      -> show it in the UI
      -> Get Repo Info
        -> Yes
          -> Get README
            -> show it in the UI
          -> Get LANGS
            -> show it in the UI
        -> No
          -> remove it in the UI
*/

import {
  fetchHNItems,
  fetchHNItemById,
  gitHubUrlParser,
  fetchGitHubRepoLangs,
  fetchGitHubRepoInfo,
  fetchGitHubRepoReadme,
} from '../apis';

import {
  typeToHNTypeMap,
  POSSIBLE_REPO,
  REPO_INFO,
  REPO_LANG,
  REPO_README,
} from '../constants';

// slugObj === { by, name }
const fetchAndGenRepoInfoAction = async (type, id, slugObj) => {
  const data = await fetchGitHubRepoInfo(slugObj);

  return {
    type: REPO_INFO,
    payload: {
      category: type,
      id,
      data: data.notOk ? false : data,
    },
  };
};

const fetchAndGenRepoLangAction = async (type, id, slugObj) => {
  const data = await fetchGitHubRepoLangs(slugObj);

  return {
    type: REPO_LANG,
    payload: {
      category: type,
      id,
      data: data.notOk ? false : data,
    },
  };
};

const fetchAndGenRepoReadmeAction = async (type, id, slugObj) => {
  const data = await fetchGitHubRepoReadme(slugObj);

  return {
    type: REPO_README,
    payload: {
      category: type,
      id,
      data: data.notOk ? false : data,
    },
  };
};

export const loadAllForType = (type) => () => async (dispatch) => {
  const topStoryIds = await fetchHNItems(typeToHNTypeMap[type]); // [ 9127232, 9128437, ... ]

  Promise.all(topStoryIds.map((id) => new Promise(async () => {
    const rawHNData = await fetchHNItemById('item', id); // @TODO keep this length
    if (!(rawHNData && rawHNData.url && gitHubUrlParser(rawHNData.url))) {
      return;
    }

    rawHNData.github = gitHubUrlParser(rawHNData.url);

    dispatch({
      type: POSSIBLE_REPO,
      payload: {
        category: type,
        id,
        data: rawHNData,
      },
    });

    const repoPayload = await fetchAndGenRepoInfoAction(type, id, rawHNData.github);
    dispatch(repoPayload);

    if (!repoPayload.payload.data) {
      return;
    }

    fetchAndGenRepoLangAction(type, id, rawHNData.github).then((data) => dispatch(data));
    fetchAndGenRepoReadmeAction(type, id, rawHNData.github).then((data) => dispatch(data));
  })));
};
