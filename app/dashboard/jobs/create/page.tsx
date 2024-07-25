'use client'

import { getAllClient } from '@/app/actions/clients'
import React, { useEffect, useState } from 'react'
import CreateJobsForm from '../CreateJobsForm'
import { createJob } from '@/app/actions/jobs'

export default function Page() {

    const [formError,setFormError]=useState("")

    async function submitHandler(formdata){
        setFormError("")
        console.log("[+]Form submitted ",formdata)
        const res =await createJob(formdata)

        if(res){
            setFormError(res.message)
        }

    }


  return (
    <div className=' w-full mt-3 flex flex-col justify-center items-center'>
        <div>
            Create Jobs
        </div>
        <div className="text-red-500 text-center">
          {formError}
        </div>
        <div>
            <CreateJobsForm submit={submitHandler} ></CreateJobsForm>
        </div>
    </div>
  )
}
