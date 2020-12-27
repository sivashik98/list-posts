import React, { useState } from "react";
import { useDispatch } from "react-redux";
import uniqueId from "lodash/uniqueId";

import "./topicsForm.scss";

import { addTopic } from "../../store/actions/topic";
import { showWarning } from "../../store/actions/app";

const TopicsForm = ({ topics }) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    const topic = { id: uniqueId(), title: value.trim() };
    const isRepeated = topics.some(
      (el) => el.title.toLowerCase() === topic.title.toLowerCase()
    );

    if (isRepeated) {
      const warning = "Такой топик уже есть!";

      dispatch(showWarning(warning));
    }

    if (value.trim() && !isRepeated) {
      dispatch(addTopic(topic));

      setValue("");
    }
  };

  return (
    <div className="topicsForm">
      <div className="button" onClick={handleClick}>
        Добавить новый топик
      </div>

      <div className="topicsFormField">
        <input
          type="text"
          className="topicsFormInput"
          onChange={handleChange}
          value={value}
        />
      </div>
    </div>
  );
};

export default TopicsForm;
