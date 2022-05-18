const LOAD = 'follows/LOAD';
const FOLLOW = 'follows/FOLLOW';
const UNFOLLOW = 'follows/UNFOLLOW';

const load = user => ({
  type: LOAD,
  user
});

const follow = user => ({
  type: FOLLOW,
  user
});

const unfollow = id => ({
  type: UNFOLLOW,
  id
});
