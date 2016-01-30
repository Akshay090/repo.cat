import expect from 'expect';

import { gitHubUrlParser } from '../../src/apis/GitHubApi';

describe('gitHubUrlParser', () => {
  it('should parse a trivial one', () => {
    expect(gitHubUrlParser('https://github.com/keyanzhang/repo.cat')).toEqual({
      by: 'keyanzhang',
      name: 'repo.cat',
    });
  });

  it('should remove a .git postfix', () => {
    expect(gitHubUrlParser('https://github.com/waruqi/tbox.git')).toEqual({
      by: 'waruqi',
      name: 'tbox',
    });
  });

  it('should remove query strings', () => {
    expect(gitHubUrlParser('https://github.com/keyanzhang/repo.cat?query=foobar')).toEqual({
      by: 'keyanzhang',
      name: 'repo.cat',
    });
  });

  it('should remove url anchors', () => {
    expect(gitHubUrlParser('https://github.com/keyanzhang/repo.cat#dont-read-me')).toEqual({
      by: 'keyanzhang',
      name: 'repo.cat',
    });
  });
});
