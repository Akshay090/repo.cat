export const HN_RAW_COUNT = '@@server/HN_RAW_COUNT';

export const POSSIBLE_REPO = '@@server/POSSIBLE_REPO';
export const REPO_INFO = '@@server/REPO_INFO';
export const REPO_LANG = '@@server/REPO_LANG';
export const REPO_README = '@@server/REPO_README';

export const dataTypes = [ 'top', 'new', 'show' ];

export const typeToHNTypeMap = {
  top: 'topstories',
  new: 'newstories',
  show: 'showstories',
};
