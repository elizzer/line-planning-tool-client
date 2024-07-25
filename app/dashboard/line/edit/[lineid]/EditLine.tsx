'use client'
import { getFactories } from '@/app/actions/factory'
import React, { useState } from 'react'
import LineForm from '../../LineForm'
import { updateLine } from '@/app/actions/line'

export default  function EditLine({factoryList,lineData}) {
    lineData["factoryid"]=lineData.factoryID
    const [formError,setFormError]=useState("")
    console.log('[+]Line data',lineData)
    const submitHandler=async(formData)=>{
        
        setFormError("")
        const res = await updateLine(lineData._id,formData)
        setFormError(res)
    }
  return (
    <div className=" w-full mt-3 flex flex-col justify-center items-center">
        <div >
            Edit line
        </div>
        <div className="text-red-500 text-center">{formError}</div>
        <div>
            <LineForm data={lineData} submit={submitHandler} factoryList={factoryList}></LineForm>
        </div>
    </div>
  )
}
