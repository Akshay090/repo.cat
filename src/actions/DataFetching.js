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

    dispatch(await fetchAndGenRepoLangAction(type, id, rawHNData.github));
    dispatch(await fetchAndGenRepoReadmeAction(type, id, rawHNData.github));
  })));
};
//
// // type is one of [ 'top', 'new', 'show' ]
// const asyncGetRepoInfo = async (type) => {
//   const topStoryIds = await fetchHNItems(typeToHNTypeMap[type]); // [ 9127232, 9128437, ... ]
//
//   for (const id of topStoryIds) {
//     const rawHNData = await fetchHNItemById('item', id); // @TODO keep this length
//     if (rawHNData && rawHNData.url && gitHubUrlParser(rawHNData.url)) {
//       rawHNData.github = gitHubUrlParser(rawHNData.url);
//       dispatch({
//         type: POSSIBLE_REPO,
//         payload: {
//           category: type,
//           rawHNData,
//         },
//       });
//
//       const repoData = await asyncGetSingleRepoInfo(item.github, item);
//
//       dispatch({
//         type: REPO_INFO,
//         payload: {
//           category: type,
//           id,
//           repoData,
//         }
//       });
//
//       if (repoData) {
//         // @TODO
//         const lang = await asyncGetSingleRepoLangs(item.github, { id: item.id });
//
//         dispatch({
//           type: REPO_LANG,
//           payload: {
//             category: type,
//             id,
//             lang,
//           },
//         });
//
//         const readme = await asyncGetSingleRepoReadme(item.github, { id: item.id });
//
//         dispatch({
//           type: REPO_README,
//           payload: {
//             category: type,
//             id,
//             readme,
//           },
//         });
//       }
//     }
//   }
//
//
//
//   const rawHNItems = await Promise.all(topStoryIds.map((id) => fetchHNItemById('item', id)));
//   const rawItemCount = rawHNItems.length;
//
//   const possibleGitHubItems = rawHNItems
//     .filter((item) => item && item.url) // has a url
//     .map((item) => ({
//       ...item,
//       github: gitHubUrlParser(item.url),
//     }))
//     .filter((obj) => obj.github); // has a url that links to a github repo
//
//
//
//   const repoData = (await Promise.all(
//     possibleGitHubItems.map((item) => asyncGetSingleRepoInfo(item.github, item))
//   )).filter(idFn); // remove falsy ones
//
//   return {
//     repoData,
//     rawItemCount,
//   };
// };
//
// // we thunk it for the app to call it easily on first mount
// // relies on `redux-thunk` middleware
// // type is one of [ 'top', 'new', 'show' ]
// export const loadAllForType = (type) => () => async (dispatch) => {
//   const { repoData, rawItemCount } = await asyncGetRepoInfo(type);
//   dispatch({
//     type: HN_ITEMS_DATA,
//     payload: {
//       category: type,
//       repoData,
//       rawItemCount,
//     },
//   });
//
//   const langs = await Promise.all(
//     repoData.map(({ github, id }) => asyncGetSingleRepoLangs(github, { id })),
//   );
//
//   dispatch({
//     type: REPO_LANGS,
//     payload: {
//       category: type,
//       langs,
//     },
//   });
//
//   const readmes = (await Promise.all(
//     repoData.map(({ github, id }) => asyncGetSingleRepoReadme(github, { id })),
//   )); // don't filter here. instead, let the reducer mark them as false
//
//   dispatch({
//     type: REPO_READMES,
//     payload: {
//       category: type,
//       readmes,
//     },
//   });
// };
