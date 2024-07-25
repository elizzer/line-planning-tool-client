'use client'
import React, { useState } from 'react'
import CreateJobsForm from '../../CreateJobsForm'
import { updateJob } from '@/app/actions/jobs'

export default function EditPage({data}) {
    const [formError,setFormError]=useState("")
    console.log(data._id)
    async function submitHandler(formdata){
        console.log('[+]Updated form data ',formdata)
        setFormError("")
        const res = await updateJob(data._id,formdata)
        if(res){
            setFormError(res.message)
        }
    }
  return (
    <div>
        <div className="text-red-500 text-center">
          {formError}
        </div>
        <div>
            <CreateJobsForm submit={submitHandler} data={data} ></CreateJobsForm>
        </div>
    </div>
  )
}
