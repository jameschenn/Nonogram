// const LOAD = 'follows/LOAD';
// const LOAD_FOLLOWERS = 'follows/LOAD_FOLLOWERS';
const LOAD_FOLLOWING = 'follows/LOAD_FOLLOWING';
const FOLLOW = 'follows/FOLLOW';
const UNFOLLOW = 'follows/UNFOLLOW';

// const load = user => ({
//   type: LOAD,
//   user
// });


const loadFollowing = user => ({
  type: LOAD_FOLLOWING,
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

// export const loadFollowsThunk = id => async dispatch => {
//   const response = await fetch(`/api/follows/${id}`, {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
//   if (response.ok) {
//     const data = await response.json()
//     dispatch(load(data))
//   }
// }

// export const loadFollowersThunk = id => async dispatch => {
//   const response = await fetch(`/api/follows/${id}`, {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
//   if (response.ok) {
//     const data = await response.json()
//     dispatch(loadFollowers(data))
//   }
// }

export const loadFollowingThunk = id => async dispatch => {
  const response = await fetch(`/api/follows/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json()
    dispatch(loadFollowing(data))
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
    //   const newState = {}
    //   console.log('REDUCER', action.user)
    //   action.user.followers.forEach(follow => {
    //     newState[follow.id] = follow
    //   });
    //   action.user.following.forEach(follow => {
    //     newState[follow.id] = follow
    //   })
    //   return {
    //     ...state,
    //     ...newState
    //   }
    // case LOAD_FOLLOWERS:
    //   const followers = {}
    //   action.user.followers.forEach(follow => {
    //     followers[follow.id] = follow
    //   });
    //   return {
    //     ...state,
    //     ...followers
    //   };
    case LOAD_FOLLOWING:
      const following = {}
      action.user.following.forEach(follow => {
        following[follow.id] = follow
      });
      return {
        ...state,
        ...following
      }
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
      delete unfollowUser[action.id];
      return unfollowUser
      default:
        return state
    }
}

export default followsReducer
