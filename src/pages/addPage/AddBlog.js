import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./AddBlog.css";

function AddBlog() {
  const url = "http://localhost:1000/blog";
  const initaiState = {
    title: "",
    description: "",
    status: "",
  };
  const [state, setstate] = useState(initaiState);
  const [error, setError] = useState("");
  const history = useHistory();
  const { title, description, status } = state;

  const inputChangeHandler = (e) => {
    let { name, value } = e.target;
    setstate({
      ...state,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submited");

    if (!title || !description || !status) {
      console.log("fill ");
      setError("Please fill all input Feild");
    } else {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });
      history.push("/");
      setError("");
      setstate(initaiState);
    }
  };

  return (
    <div className="add-page">
      <h1>Add Page</h1>
      {error && <h2 style={{ color: "red" }}>{error}</h2>}
      <form onSubmit={submitHandler}>
        <label for="title">Title : </label>
        <input
          className="title"
          type="text"
          placeholder="Enter Title..."
          name="title"
          value={title || ""}
          onChange={inputChangeHandler}
        />
        <br />
        <label for="description">Description : </label>
        <input
          className="description"
          type="textarea"
          placeholder="Enter Description..."
          name="description"
          value={description || ""}
          onChange={inputChangeHandler}
        />
        <br />
        <label for="status">Choose Blog Status : </label>

        <select className="status" name="status" onChange={inputChangeHandler}>
          <option value="">Select Status</option>
          <option value="Comming">Comming</option>
          <option value="Procesing">Procesing</option>
          <option value="Ended">Ended</option>
        </select>
        <br />

        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
}

export default AddBlog;
