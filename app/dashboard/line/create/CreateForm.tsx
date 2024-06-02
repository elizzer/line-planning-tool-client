'use client'
import React, { useState } from 'react'

import LineForm from '../LineForm';
import { createLine } from '@/app/actions/line';

export default function CreateForm({factoryList,factoryId}) {
    const [formError,setFormError]=useState("")

    async function submitHandler(formdata){
      setFormError("")
      console.log("New line form data ",formdata)
      const res = await createLine(formdata)
      console.log('[+]Form submit response ',res)
      if(res){

        setFormError(res)
      }
    }
    console.log('[+]Factory id',factoryId)

    const factoryData={
      name:"",
      metadata:"",
      factoryid:factoryId
    }

  return (
    <div className=" w-full mt-3 flex flex-col justify-center items-center">
        <div >
            Create line
        </div>
        <div className="text-red-500 text-center">{formError}</div>
        <div>
            <LineForm data={factoryData} submit={submitHandler} factoryList={factoryList}></LineForm>
        </div>
    </div>
  )
}
