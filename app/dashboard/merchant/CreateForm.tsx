'use client'

import React, { useState } from 'react'

export default function CreateForm({data,submit}) {
    const [formData,setFormData]= useState({
        name:data?data.name:""
    })
    const formChangeHandler = (e) => {
        setFormData((prev) => {
          prev[e.target.name] = e.target.value;
          return { ...prev };
        });
      };
      const formSubmitHandler = (e) => {
        e.preventDefault()
        submit(formData);
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
        <button type="submit" className="submit-button">
          Submit
        </button>
        </form>
    </div>
  )
}
