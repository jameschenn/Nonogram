//Store to get other users who are following the session user

const LOAD_FOLLOWERS = 'follows/LOAD_FOLLOWERS';

const FOLLOW = 'follows/FOLLOW';
const UNFOLLOW = 'follows/UNFOLLOW';

const loadFollowers = user => ({
  type: LOAD_FOLLOWERS,
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

export const loadFollowersThunk = id => async dispatch => {
  const response = await fetch(`/api/follows/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json()
    dispatch(loadFollowers(data))
  }
}

export const followUserThunk = userId => async dispatch => {
  const response = await fetch(`/api/follows/`, {
    method: 'POST',
    headers: {
      'CONTENT-TYPE': 'application/json'
    },
    body: JSON.stringify({
      userId: userId,
    })
  });
  if (response.ok) {
    const data = await response.json();
    console.log('data', data)
    dispatch(follow(data))
  }
}

export const unfollowUserThunk = id => async dispatch => {
  const response = await fetch(`/api/follows/`, {
    method: "DELETE",
    headers: {
      'CONTENT-TYPE': 'application/json'
    },
    body: JSON.stringify({
      userId: id
    })
  });
  const data = await response.json()
  if (response.ok) {
    dispatch(unfollow(data))
  }
}

const initialState = {}

const followersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FOLLOWERS:
      const followers = {}
      action.user.followers.forEach(follow => {
        followers[follow.id] = follow
      });
      return {
        ...state,
        ...followers
      };
    case FOLLOW:
      const followUser = {}
      followUser[action.user.following.id] = action.user.following
      return {
        ...state,
        ...followUser
      };
    case UNFOLLOW:
      const unfollowUser = {
        ...state
      };
      console.log('action', action)
      delete unfollowUser[action.id.unfollowed.id];
      return unfollowUser
    default:
      return state
  }
}

export default followersReducer
