const LOAD = 'comments/LOAD';
const ADD_COMMENT = 'comments/ADD_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';

const load = comments => ({
  type: LOAD,
  comments
})

const addComment = comment => ({
  type: ADD_COMMENT,
  comment
});

const deleteComment = comment => ({
  type: DELETE_COMMENT,
  comment
});

export const loadCommentsThunk = id => async dispatch => {
  const result = await fetch(`/api/comments/${id}/comments`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if(result.ok) {
    const data = await result.json();
    dispatch(load(data));
  }
}

export const addCommentThunk = id => async dispatch => {
  const result = await fetch(`/api/comments/${id}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(id)
  })
  if(result.ok) {
    const data = await result.json()
    dispatch(addComment(data))
  }
}

export const deleteCommentThunk = id => async dispatch => {
  console.log('THUNK')
  const response = await fetch(`/api/comments/${id}`, {
    method: 'DELETE',
  });
  if(response.ok) {
    dispatch(deleteComment(id))
  }
}

const initialState = {}

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const newState = {}
      action.comments.comments.forEach(comment => {
        newState[comment.id] = comment
      })
      return {
        ...state,
        ...newState
      };
    case DELETE_COMMENT:
      const deletedState = {
        ...state
      };
      delete deletedState[action.comment];
      return deletedState
      default:
        return state;
  }
}

export default commentsReducer
