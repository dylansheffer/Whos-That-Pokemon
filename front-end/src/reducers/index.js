import { actionTypes } from '../constants/actionTypes';

const initialState = {
  questions: null,
}

function rootReducer(state = initialState, action) {
  switch(action.type) {
    default:
      return state;
  }
};

export default rootReducer;
