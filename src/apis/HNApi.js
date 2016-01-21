import Firebase from 'firebase';
import invariant from 'invariant';

const hnRef = new Firebase('https://hacker-news.firebaseio.com/v0/');

export const fetchHNItems = (refName) => {
  const ref = hnRef.child(refName);
  invariant(ref, `ref ${refName} not provided`);

  return new Promise((resolve) => {
    ref.once(
      'value',
      (snapshot) => resolve(snapshot.val())
    );
  });
};

export const fetchHNItemById = (refName, id) => {
  const ref = hnRef.child(refName);
  invariant(ref, `ref ${refName} not provided`);
  invariant(id, `id ${id} not provided`);

  return new Promise((resolve) => {
    ref.child(id).once(
      'value',
      (snapshot) => resolve(snapshot.val())
    );
  });
};

export const genHNItemUrl = (id) => `https://news.ycombinator.com/item?id=${id}`;
export const genHNUserUrl = (id) => `https://news.ycombinator.com/user?id=${id}`;
