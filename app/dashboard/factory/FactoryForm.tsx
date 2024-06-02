'use client'

import React, { useState } from "react";
import "./styles.css"; // Import CSS file

export default function FactoryForm({ data, submit }) {
  const [formData, setFormData] = useState({
    name: data ? data.name : "",
    metadata: data ? data.metadata : "",
  });

  const formSubmitHandler = (e) => {
    e.preventDefault()
    submit(formData);
  };
  const formChangeHandler = (e) => {
    setFormData((prev) => {
      prev[e.target.name] = e.target.value;
      return { ...prev };
    });
  };

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={formChangeHandler}
            placeholder="Client name"
            className="text-field"
          ></input>
        </div>
        <div>
          <textarea
            name="metadata"
            onChange={formChangeHandler}
            value={formData.metadata}
            placeholder="Client metadata"
            className="text-field"
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}
