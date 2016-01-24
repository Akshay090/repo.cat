export const HN_TOP_DATA = 'HN_TOP_DATA';
export const HN_NEW_DATA = 'HN_NEW_DATA';
export const HN_SHOW_DATA = 'HN_SHOW_DATA';

export const REPO_LANGS = 'REPO_LANGS';
export const REPO_READMES = 'REPO_READMES';

export const dataTypes = [ 'top', 'new', 'show' ];

export const typeToActionMap = {
  top: HN_TOP_DATA,
  new: HN_NEW_DATA,
  show: HN_SHOW_DATA,
};

export const actionToTypeMap = {
  [HN_TOP_DATA]: 'top',
  [HN_NEW_DATA]: 'new',
  [HN_SHOW_DATA]: 'show',
};

export const typeToHNTypeMap = {
  top: 'topstories',
  new: 'newstories',
  show: 'showstories',
};
