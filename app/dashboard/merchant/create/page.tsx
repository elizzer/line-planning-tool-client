'use client'
import { createMerchant } from '@/app/actions/merchant'
import React, { useState } from 'react'
import CreateForm from '../CreateForm'

export default function Page() {
    const [formError,setFormError]=useState("")
    async function formSubmitHandler(formdata){
        console.log("formsubmitted")
        setFormError("")
        const res = await createMerchant(formdata)
        if(res){
            setFormError(res)
        }
    }
  return (
    <div className=" w-full mt-3 flex flex-col justify-center items-center">
      <div>Create Merchant</div>
      <div className="text-red-500 text-center">{formError}</div>
      <div>
        <CreateForm submit={formSubmitHandler}></CreateForm>
      </div>
    </div>
  )
}
