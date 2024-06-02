"use client";
import React, { useState } from "react";
import FactoryForm from "../FactoryForm";

import { createFactory } from "@/app/actions/factory";

export default function Page() {
  const [formError, setFormError] = useState("");
  async function formSubmitHandler(formdata) {
    console.log("posting");
    setFormError("");
    console.log("Submiting form data", formdata);
    const resMessage = await createFactory(formdata);
    if (resMessage) {
      setFormError(resMessage);
    }
  }

  return (
    <div className=" w-full mt-3 flex flex-col justify-center items-center">
      <div>Create factory</div>
      <div className="text-red-500 text-center">{formError}</div>
      <div>
        <FactoryForm submit={formSubmitHandler}></FactoryForm>
      </div>
    </div>
  );
}
