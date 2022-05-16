// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const UPDATE_USER = 'session/UPDATE_USER';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const initialState = { user: null };

const updateUser = user => ({
  type: UPDATE_USER,
  user
})

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


// export const signUp = (username, email, password) => async (dispatch) => {
//   const response = await fetch('/api/auth/signup', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       username,
//       email,
//       password,
//     }),
//   });

//   if (response.ok) {
//     const data = await response.json();
//     dispatch(setUser(data))
//     return null;
//   } else if (response.status < 500) {
//     const data = await response.json();
//     if (data.errors) {
//       return data.errors;
//     }
//   } else {
//     return ['An error occurred. Please try again.']
//   }
// }


export const signUp = (new_user) => async dispatch => {

  const { username, firstName, lastName, email, password, bio, image } = new_user

  const formData = new FormData();

  formData.append('username', username)
  formData.append('firstName', firstName)
  formData.append('lastName', lastName)
  formData.append('email', email)
  formData.append('password', password)
  formData.append('bio', bio)

  if(image) {
    formData.append('image', image)
  }

  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: formData
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const editUserThunk = user => async dispatch => {

  const { userId, firstName, lastName, password, bio, image} = user
  console.log('FROM THE THUNK', userId, firstName, lastName)
  const formData = new FormData();

  formData.append('firstName', firstName)
  formData.append('lastName', lastName)
  formData.append('password', password)
  formData.append('bio', bio)

  if(image) {
    formData.append('image', image)
  }
  const response = await fetch(`/api/users/${userId}`, {
    method: 'PUT',
    body: formData
  });

  if (response.ok) {
    const editedUser = await response.json();
    return dispatch(setUser(editedUser));
  }

}



export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case UPDATE_USER:
      return {
        ...state,
        [action.user.id] : action.user
      }
    default:
      return state;
  }
}
