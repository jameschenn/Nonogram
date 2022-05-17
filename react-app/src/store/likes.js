const LOAD = 'likes/LOAD';

const load = likes => ({
  type: LOAD,
  likes
});

export const loadLikesthunk = id => async dispatch => {
  console.log('THUNK')
  const result = await fetch('/api/likes/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if(result.ok) {
    const likes = await result.json();
    dispatch(load(likes))
  }
}

const initialState = {}

const likesReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD:
      console.log('REDUCER')
      const newState = {}
      action.likes.likes.forEach(like => {
        newState[like.id] = like
      });
      return {
        ...state,
        ...newState
      }
      default:
        return state
  }
}

export default likesReducer
