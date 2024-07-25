'use client'
import { updateMerchant } from '@/app/actions/merchant';
import React, { useState } from 'react'
import CreateForm from '../../CreateForm';

export default function EditMerchant({data,merchantId}) {
    
  const [formError, setFormError] = useState("");
  const submitHandler = async (formData: FormData) => {
    setFormError("");
    console.log("Form submitting");
    let res = await updateMerchant( merchantId,formData);
    if (res) {
      console.log(res);
      setFormError(res);
    }
  }
  return (
    <div>
    <div className="text-red-500 text-center">{formError}</div>
    <div>
      {data && (
        <div>
          <CreateForm
            submit={submitHandler}
            formError={formError}
            data={data}
          ></CreateForm>
        </div>
      )}
    </div>
  </div>
  )
}
