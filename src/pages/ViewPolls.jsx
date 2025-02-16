import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPolls, vote } from "../reducer/actions";

export const ViewPolls = () => {
  const dispatch = useDispatch();

  const polls = useSelector((state) => state.polls);
  const isLoading = useSelector((state) => state.isLoading);

  const voteHandler = (poll, option, i) => {
    console.log(poll, option, "b4");
    poll.options[i].count += 1;
    console.log(poll);
    dispatch(vote(poll.poll_id, poll.options));
  };

  console.log(polls, "polllss");
  //   useEffect(() => {
  //     dispatch(getPolls());
  //   }, [dispatch]);

  useEffect(() => {
    dispatch(getPolls());

    const interval = setInterval(() => {
      dispatch(getPolls());
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div>
      <h3>View Polls</h3>
      <div key="polls-list">
        {polls && polls.length > 0 ? (
          <>
            {polls.map((poll, idx) => (
              <div
                style={{
                  border: "1px solid white",
                  margin: "1rem",
                  padding: "1rem",
                }}
                key={poll.poll_id}
              >
                <p key={poll.poll_id + idx}>{poll.question}</p>
                <>
                  {poll.options.map((option, index) => (
                    <p key={`${poll.poll_id}-option-${index}`}>
                      <span key={index}>
                        {option.value}: {option.count}
                      </span>
                      &nbsp;
                      <button onClick={() => voteHandler(poll, option, index)}>
                        Vote
                      </button>
                    </p>
                  ))}
                </>
              </div>
            ))}
          </>
        ) : isLoading ? (
          <p key="loading">Loading...</p>
        ) : (
          <p key="no-polls">No polls available yet !!</p>
        )}
      </div>
    </div>
  );
};
