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

    console.log(data);
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

export { createPoll };
