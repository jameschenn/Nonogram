const LOAD = 'images/LOAD';
const LOAD_USER_IMAGES = 'images/LOAD_USER_IMAGE';
const LOAD_ONE_IMAGE = 'images/LOAD_ONE_IMAGE';
const ADD_IMAGE = 'images/ADD_IMAGE';
const EDIT_IMAGE = 'images/EDIT_IMAGE';
const DELETE_IMAGE = 'images/DELETE_IMAGE';

const load = images => ({
  type: LOAD,
  images
});

const loadUserImages = image => ({
  type: LOAD_USER_IMAGES,
  image
});

const loadOneImage = image => ({
  type:LOAD_ONE_IMAGE,
  image
})

const addImage = image => ({
  type: ADD_IMAGE,
  image
})

const editImage = image => ({
  type: EDIT_IMAGE,
  image
})

const deleteImage = image => ({
  type: DELETE_IMAGE,
  image
})

export const loadAllImagesThunk = () => async dispatch => {
  const result = await fetch('/api/images/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (result.ok) {
    const images = await result.json();
    dispatch(load(images))
  }
}

export const loadUserImagesThunk = id => async dispatch => {
  const result = await fetch(`/api/images/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if(result.ok) {
    const data = await result.json();
    dispatch(loadUserImages(data));
  }
}

export const loadOneImageThunk = id => async dispatch => {
  const result = await fetch(`/api/images/${id}/image`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if(result.ok) {
    const data = await result.json();
    dispatch(loadOneImage(data));
  }
}

export const createImageThunk = image => async dispatch => {
  const result = await fetch('/api/images/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(image)
  });
  if(result.ok) {
    const data = await result.json();
    dispatch(addImage(data))
  }
}

export const editImageThunk = (id, payload) => async dispatch => {
  const response = await fetch(`/api/images/${id}/edit`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if(response.ok) {
    const editedImage = await response.json();
    return dispatch(editImage(editedImage))
  }
}

export const deleteImageThunk = id => async dispatch => {
  const response = await fetch(`/api/images/${id}`, {
    method: 'DELETE',
  });
  if(response.ok) {
    dispatch(deleteImage(id))
  }
}

const initalState = {}

const imagesReducer = (state = initalState, action) => {
  switch(action.type) {
    case LOAD_ONE_IMAGE:
      const newSingleState = {}
      newSingleState[action.image.image.id] = action.image.image;
      return {
        ...state,
        ...newSingleState
      };
    case LOAD:
      const allImages = {};
      console.log('action', action.images)
      action.images.images.forEach(image => {
        allImages[image.id] = image
      });
      return {
        ...state,
        ...allImages
      };
    case LOAD_USER_IMAGES:
      const newState = {}
      action.image.images.forEach(image => {
        newState[image.id] = image;
      });
      return {
        ...state,
        ...newState
      };
    case ADD_IMAGE:
      const newImage = {};
      console.log('ACTION FROM THE THUNK', action)
      newImage[action.image.image.id] = action.image.image;
      return {
        ...state,
        ...newImage
      };
    case EDIT_IMAGE:
      return {
        ...state,
        [action.image.id]: action.image
      };
    case DELETE_IMAGE:
      const deletedState = {
        ...state
      };
      delete deletedState[action.image];
      return deletedState
      default:
        return state
  }
}

export default imagesReducer
