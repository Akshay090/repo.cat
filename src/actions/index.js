import { fetchHNData, fetchHNDataById } from './hn';
import {
  githubUrlParser,
  fetchGithubRepoLangInfo,
  fetchGithubRepoInfo,
} from './github';

import {
  HN_TOP_DATA,
  HN_NEW_DATA,
  HN_SHOW_DATA,
  actionTypeMapping,
} from '../constants';

const asyncGetData = async (type) => {
  const topStoryIds = await fetchHNData(type);
  const rawHNData = await* topStoryIds.map((id) => fetchHNDataById('item', id));
  const rawItemCount = rawHNData.length;
  const topGithubItems = rawHNData.filter((item) => item && item.url)
    .map((item) => ({
      ...item,
      github: githubUrlParser(item.url),
    }))
    .filter((obj) => obj.github);

  const repoList = (await* topGithubItems.map(async (data) => {
    const githubData = await fetchGithubRepoInfo(data.github);
    if (githubData.hasOwnProperty('ok') && !githubData.ok) {
      return githubData; // passes the error info through
    }

    if (!Object.keys(githubData).length) {
      return false; // not a repo. will be filtered out later
    }

    return {
      ...data,
      github: {
        ...data.github,
        ...githubData,
        langs: await fetchGithubRepoLangInfo(data.github),
      },
    };
  })).filter((x) => x); // we need a better filterMap

  return [
    repoList,
    rawItemCount,
  ];
};

const fireDataActionByType = (TYPE_CONST) => () => async (dispatch, getState) => {
  // UGH TOO MUCH CURRYING
  if (getState() && getState().data &&
      Object.keys(getState().data[actionTypeMapping[TYPE_CONST][0]]).length) {
    // stop fetching when there's already data
    return;
  }

  const [ data, hnCount ] = await asyncGetData(actionTypeMapping[TYPE_CONST][1]);

  if (data.some((obj) => obj.hasOwnProperty('ok') && !obj.ok)) {
    dispatch({
      type: TYPE_CONST,
      error: true, // the FSA way
      payload: {
        data,
      },
    });
  } else {
    dispatch({
      type: TYPE_CONST,
      payload: {
        data,
        hnCount,
      },
    });
  }
};

export { filterSwitch } from './UI';
export const fetchTopData = fireDataActionByType(HN_TOP_DATA);
export const fetchNewData = fireDataActionByType(HN_NEW_DATA);
export const fetchShowData = fireDataActionByType(HN_SHOW_DATA);
