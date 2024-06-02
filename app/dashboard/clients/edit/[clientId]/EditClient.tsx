"use client";

import React, { useState } from "react";

import ClientForm from "../../ClientForm";
import { editClient } from "@/app/actions/clients";


export default function EditClient({ data, clientId }: any) {
  const [formError, setFormError] = useState<String>("");

  const submitHandler = async (formData: any, deleted: any) => {
    setFormError("");
    console.log("Form submitting");
    let res = await editClient(deleted, formData, clientId);
    if (res) {
      console.log(res);
      setFormError(res);
    }
  };
  return (
    <div>
      <div className="text-red-500 text-center">{formError}</div>
      <div>
        {data && (
          <div>
            <ClientForm
              submit={submitHandler}
              formError={formError}
              data={data}
            ></ClientForm>
          </div>
        )}
      </div>
    </div>
  );
}
