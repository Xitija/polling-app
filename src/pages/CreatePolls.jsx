import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPoll } from "../reducer/actions";

export const CreatePolls = () => {
  const dispatch = useDispatch();
  const initialOptions = [
    { value: "", count: 0 },
    { value: "", count: 0 },
  ];
  const [poll, setPoll] = useState({
    question: "",
    options: initialOptions,
  });

  const addOption = (e) => {
    setPoll({
      ...poll,
      options: [...poll.options, { value: "", count: 0 }],
    });
  };

  const removeOption = (e) => {
    const index = parseInt(e.target.value);
    if (poll.options.length === 2) return;
    setPoll({ ...poll, options: poll.options.filter((_, i) => i !== index) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!poll.question.trim() || poll.options.some((o) => !o.value.trim)) {
      alert("Please fill all fields");
      return;
    }
    dispatch(createPoll(poll));
    setPoll({ question: "", options: initialOptions });
  };

  return (
    <div>
      <h3>Create Poll</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Question:
          <input
            type="text"
            value={poll.question}
            onChange={(e) => setPoll({ ...poll, question: e.target.value })}
          />
        </label>

        {poll.options.map((option, index) => (
          <div key={index}>
            <label>
              Option {index + 1}:
              <input
                type="text"
                value={option.value}
                onChange={(e) =>
                  setPoll({
                    ...poll,
                    options: poll.options.map((o, i) =>
                      i === index ? { ...o, value: e.target.value } : o
                    ),
                  })
                }
              />
              {index > 1 && (
                <button
                  type="button"
                  onClick={(e) => removeOption(e)}
                  value={index}
                >
                  -
                </button>
              )}
            </label>
          </div>
        ))}
        <button type="button" onClick={(e) => addOption(e)}>
          Add Option
        </button>
        <button type="submit">Create Poll</button>
      </form>
    </div>
  );
};
