import { Reducer } from "redux";

export const ACTIONS = {
  GET_POLLS_LOADING: "GET_POLLS_LOADING",
  GET_POLLS_FAILURE: "GET_POLLS_FAILURE",
  GET_POLLS_SUCCESS: "GET_POLLS_SUCCESS",
  CREATE_POLL_SUCCESS: "CREATE_POLL_SUCCESS",
  CREATE_POLL_FAILURE: "CREATE_POLL_FAILURE",
};

const initialState = {
  isLoading: false,
  error: null,
  polls: [],
};

const pollsReducer = (state = initialState, action) => {
  console.log(action, "accctt");
  switch (action.type) {
    case ACTIONS.GET_POLLS_LOADING:
      return { ...state, isLoading: true };
    case ACTIONS.CREATE_POLL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        polls: [...state.polls, action.payload],
      };
    case ACTIONS.CREATE_POLL_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    case ACTIONS.GET_POLLS_SUCCESS:
        console.log(action.payload , "succe")
      return {
        ...state,
        isLoading: false,
        polls: action.payload,
      };
    case ACTIONS.GET_POLLS_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};

export default pollsReducer;
