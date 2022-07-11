const LOAD = 'search/LOAD';

const load = results => ({
  type: LOAD,
  results
});

export const loadSearchThunk = () => async dispatch => {
  const response = await fetch('/api/search/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if(response.ok) {
    const searchResults = await response.json()
    dispatch(load(searchResults));
  }
}

const initialState = []

const searchReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD:
      // const allResults = {}
      // action.results.forEach(result => {
      //   allResults[result.id] = result
      // });
      return [
        ...state,
        ...action.results
      ]
      default:
        return state;
  }
}

export default searchReducer;
