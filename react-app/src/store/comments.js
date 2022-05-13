const LOAD = 'comments/LOAD';
const ADD_COMMENT = 'comments/ADD_COMMENT';
const EDIT_COMMENT = 'comments/EDIT_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';

const load = comments => ({
  type: LOAD,
  comments
})

const addComment = comment => ({
  type: ADD_COMMENT,
  comment
});

const editComment = comment => ({
  type: EDIT_COMMENT,
  comment
})

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

export const addCommentThunk = (payload, id) => async dispatch => {
  console.log('THUNK', id )
  const result = await fetch(`/api/comments/${id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  })
  if(result.ok) {
    const data = await result.json()
    dispatch(addComment(data))
  }
}

export const editCommentThunk = (id, payload) => async dispatch => {
  const response = await fetch(`/api/comments/${id}/edit`, {
    method: 'POST',
    headers: {
      'Content-Type': ' application/json'
    },
    body: JSON.stringify(payload)
  });
  if(response.ok) {
    const editedComment = await response.json();
    return dispatch(editComment(editedComment))
  }
}

export const deleteCommentThunk = id => async dispatch => {
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
    case ADD_COMMENT:
      console.log('REDUCER', action)
      const newComment = {};
      newComment[action.comment.comment.id] = action.comment.comment
      return {
        ...state,
        ...newComment
      };
    case EDIT_COMMENT:
      return {
        ...state,
        [action.comment.id]: action.comment
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
