const LOAD = 'images/LOAD';
const LOAD_USER_IMAGES = 'images/LOAD_USER_IMAGE'

const load = images => ({
  type: LOAD,
  images
});

const loadUserImages = image => ({
  type: LOAD_USER_IMAGES,
  image
});

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

const initalState = {}

const imagesReducer = (state = initalState, action) => {
  switch(action.type) {
    case LOAD:
      const allImages = {};
      action.images.images.forEach(image => {
        allImages[image.id] = image
      });
      return {
        ...state,
        ...allImages
      };
    case LOAD_USER_IMAGES:
      console.log('THUNKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK', action)
      const newState = {}
      action.image.images.forEach(image => {
        newState[image.id] = image;
      });
      return {
        ...state,
        ...newState
      };
      default:
        return state
  }
}

export default imagesReducer
