import React, { useRef } from "react";
import { Button, Form, Input, Rating } from "semantic-ui-react";
import _ from "lodash";

import { useForm } from "../utils/hooks";
import ReviewsAPI from "../api/reviews";

export default function AddReview({ state, setState, username }) {
  const inputContentRef = useRef(null);
  const { selectedRestaurant } = state;
  const { id: restaurant_id, name } = selectedRestaurant;
  const initState = {
    content: "",
    rating: 1,
  };
  const { onChange, onSubmit, inputs, setInputs } = useForm(
    () => add(),
    _.cloneDeep(initState)
  );

  function add() {
    createReview();
  }

  const createReview = async () => {
    const { content, rating } = inputs;
    try {
      const { restaurant } = (
        await ReviewsAPI.post(`/${restaurant_id}`, {
          name: username,
          content,
          rating,
        })
      ).data;
      (inputContentRef.current as any).blur();
      setInputs(initState);
      setState({ ...state, selectedRestaurant: restaurant, displayAdd: false });
    } catch (err) {
      console.error(err);
    }
  };

  const onRate = (e) => setInputs({ ...inputs, rating: e.target.ariaPosInSet });

  return (
    <Form onSubmit={onSubmit} className="review-form">
      <Form.Group>
        <input
          ref={inputContentRef}
          name="content"
          required
          value={inputs.content}
          type="text"
          placeholder={`How was it?`}
          onChange={onChange}
          className="form-container" // error={!!error}
        />

        <Rating
          style={{ marginLeft: "20px", marginTop: "10px" }}
          size="large"
          icon="star"
          name="rating"
          maxRating={5}
          rating={inputs.rating}
          onRate={onRate}
        />
      </Form.Group>
      <div style={{ textAlign: "center" }}>
        <Button
          size="medium"
          type="submit"
          color="purple"
          content="Post"
          icon="check"
        />
      </div>
    </Form>
  );
}
