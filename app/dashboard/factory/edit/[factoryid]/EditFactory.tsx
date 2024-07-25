'use client'

import React, { useState } from "react";
import FactoryForm from "../../FactoryForm";
import { updateFactory } from "@/app/actions/factory";

export default function EditFactory({ data }) {
  const [formError, setFormError] = useState("");
  async function formSubmitHandler(formdata) {
    setFormError("");
    const res=await updateFactory(formdata,data._id)
    setFormError(res)
  }
  console.log(data)
  return (
    <div>
      <div>Create factory</div>
      <div className="text-red-500 text-center">{formError}</div>
      <div>
        <FactoryForm data={data} submit={formSubmitHandler}></FactoryForm>
      </div>
    </div>
  );
}
