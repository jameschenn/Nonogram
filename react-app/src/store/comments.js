const LOAD = 'comments/LOAD';

const load = comments => ({
  type: LOAD,
  comments
})

export const loadCommentsThunk = id => async dispatch => {
  console.log('we are in the thunk')
  const result = await fetch(`/api/comments/${id}/comments`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if(result.ok) {
    console.log('res was ok')
    const data = await result.json();
    dispatch(load(data));
  }
}

const initialState = {}

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      console.log('reducer', action)
      const newState = {}
      action.comments.comments.forEach(comment => {
        newState[comment.id] = comment
      })
      return {
        ...state,
        ...newState
      };
      default:
        return state;
  }
}

export default commentsReducer
