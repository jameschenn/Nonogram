//Seperate store because it was getting overwritten in the followsReducer

const LOAD_FOLLOWERS = 'follows/LOAD_FOLLOWERS';

const loadFollowers = user => ({
  type: LOAD_FOLLOWERS,
  user
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

    default:
      return state
  }
}

export default followersReducer
