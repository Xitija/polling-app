import { ACTIONS } from "./pollReducer";
const HOST_URL = process.env.REACT_APP_API_URL;
const API_SECRET = process.env.REACT_APP_API_KEY;

const createPoll = (poll) => async (dispatch) => {
  try {
    const response = await fetch(`${HOST_URL}/createpoll`, {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": API_SECRET,
      },
      body: JSON.stringify(poll),
    });
    const data = await response.json();

    if (data.insert_polling_data.affected_rows) {
      dispatch({
        type: ACTIONS.CREATE_POLL_SUCCESS,
        payload: data.insert_polling_data.returning[0],
      });
    }
  } catch (error) {
    dispatch({ type: ACTIONS.CREATE_POLL_FAILURE, error });
  }
};

const vote = (pollId, options) => async (dispatch) => {
    try {
        const response = await fetch(`${HOST_URL}/updatepoll/${pollId}`, {
            method: "PUT",
            headers: {
                "x-hasura-admin-secret": API_SECRET,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ options }),
        });
        const data = await response.json();

        if (data.update_polling_data.affected_rows) {
            dispatch({
                type: ACTIONS.VOTE_POLL_SUCCESS,
                payload: data.update_polling_data.returning[0],
            });
        }
    } catch (error) {
        dispatch({ type: ACTIONS.VOTE_POLL_FAILURE, error });
    }
}

const getPolls = () => async (dispatch) => {
    try {
        dispatch({ type: ACTIONS.GET_POLLS_LOADING });
        const response = await fetch(`${HOST_URL}/getpolldata`, {
            method: "GET",
            headers: {
                "x-hasura-admin-secret": API_SECRET,
            },
        });
        const data = await response.json();

        dispatch({ type: ACTIONS.GET_POLLS_SUCCESS, payload: data.polling_data });
    } catch (error) {
        dispatch({ type: ACTIONS.GET_POLLS_FAILURE , error})
    }
}

export { createPoll , getPolls, vote };
