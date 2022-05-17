const LOAD = 'likes/LOAD';
const POST_LIKE = 'likes/POST_LIKE';
const DELETE_LIKE = 'likes/DELETE_LIKE';

const load = likes => ({
  type: LOAD,
  likes
});


const postLike = like => ({
  type:POST_LIKE,
  like
});

const deleteLike = like => ({
  type: DELETE_LIKE,
  like
});

export const loadLikesThunk = () => async dispatch => {
  const response = await fetch(`/api/likes/`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if(response.ok) {
    const likes = await response.json()
    dispatch(load(likes))
  }
}

export const postLikeThunk = id => async dispatch => {
  const response = await fetch(`/api/likes/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
       imageId: id
       })
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(postLike(data))
  }
}

export const deleteLikeThunk = id => async dispatch => {
  const response = await fetch(`/api/likes/${id}`, {
    method: 'DELETE'
  });
  if(response.ok) {
    dispatch(deleteLike(id))
  }
}

const initialState = {}

const likesReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD:
      const newState = {};
      action.likes.likes.forEach(like => {
        newState[like.id] = like
      });
      return {
        ...state,
        ...newState
      }
    // case POST_LIKE:
    //   const newLike = {};
    //   newLike[action.likes.likes.id] = action.likes.likes
    //   return {
    //     ...state,
    //     ...newLike
    //   };
    case DELETE_LIKE:
      console.log('REDUCER', action)
      const deletedState = {
        ...state,
      };
      delete deletedState[action.like];
      return deletedState
      default:
        return state
  }
}

export default likesReducer
