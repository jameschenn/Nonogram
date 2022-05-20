const LOAD = 'follows/LOAD';
const FOLLOW = 'follows/FOLLOW';
const UNFOLLOW = 'follows/UNFOLLOW';

// const load = user => ({
//   type: LOAD,
//   user
// });

const follow = user => ({
  type: FOLLOW,
  user
});

const unfollow = id => ({
  type: UNFOLLOW,
  id
});

// export const loadFollowsThunk = () => async dispatch => {
//   const response = await fetch(`/api/follows/`, {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
//   if(response.ok) {
//     const data = await response.json()
//     dispatch(load(data))
//   }
// }

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
  if(response.ok) {
    const data = await response.json();
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
  if(response.ok) {
    dispatch(unfollow(id))
  }
}

const initialState = {}

const followsReducer = (state = initialState, action) => {
  switch(action.type) {
    // case LOAD:
    //   const newState = {
    //     ...state
    //   }
    //   newState['following'] = {}
    //   action.user.following.forEach(user => {
    //     newState.following[user.id] = user
    //   })
    //   newState['followers'] = {}
    //   action.user.followers.forEach(user => {
    //     newState.followers[user.id] = user
    //   });
      // return newState;
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
      console.log('REDUCER', action)
      delete unfollowUser[action.id];
      return unfollowUser
      default:
        return state
    }
}

export default followsReducer
