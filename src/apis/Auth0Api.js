import Auth0Lock from 'auth0-lock';

const lock = new Auth0Lock(
  '8hwjpAcyiBw6tdE3QHbqCz8sCieWYLKH',
  'repo-dawg.auth0.com'
);

const lockShowOptions = {
  popup: true,
};

export const getAuth0Token = () => {
  const auth0Token = localStorage.getItem('auth0Token');
  const authHash = lock.parseHash(window.location.hash);
  if (authHash && !auth0Token) {
    const { id_token: newToken, error } = authHash;
    if (error) {
      console.log('* error signing in', authHash); // eslint-disable-line no-console
      return undefined;
    }
    if (newToken) {
      localStorage.setItem('auth0Token', newToken);
      return newToken;
    }
  }
  return auth0Token;
};

export const showAuthAndRetrieveTokens = () => new Promise((resolve, reject) => {
  lock.show(lockShowOptions, (err, profile, auth0Token) => {
    if (err) {
      reject(err);
    }

    resolve({ profile, auth0Token });
  });
}).then(({ profile, auth0Token }) => {
  const { access_token: githubUserToken } = profile.identities.find(
    (obj) => obj.provider === 'github',
  );

  return {
    githubUserToken,
    auth0Token,
  };
}).catch((err) => {
  throw err;
});
