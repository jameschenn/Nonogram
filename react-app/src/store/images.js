const LOAD = 'images/LOAD';

const load = images => ({
  type: LOAD,
  images
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

const initalState = {}

const imagesReducer = (state = initalState, action) => {
  switch(action.type) {
    case LOAD:
      const allImages = {};
      console.log('TESTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT', action)
      action.images.images.forEach(image => {
        allImages[image.id] = image
      });
      return {
        ...state,
        ...allImages
      }
      default:
        return state
  }
}

export default imagesReducer
