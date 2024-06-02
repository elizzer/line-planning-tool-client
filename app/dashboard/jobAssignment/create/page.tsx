"use client"

import React, { useState } from 'react'
import CreateJobAssignment from '../CreateJobAssignmentForm'
import { createJobAssignment } from '@/app/actions/jobAssignments'

export default function Page({searchParams}) {

    const [formError,setFormError]=useState("")
    async function submitHandler(formdata){
        console.log("form submitting!!",formdata)
        const res = await createJobAssignment(formdata)
        setFormError(res)
    }
    console.log("Search params",searchParams)
    const jobAssignmentData={
      jobID:searchParams.jobId,
      lineID:"",
      piecesPerDay:0,
      startDate:"",
      endDate:"",
      noOfDays:0,
      factoryID:""
    }
  return (
    <div className=' w-full mt-3 flex flex-col justify-center items-center' >
        <div>Assign Jobs</div>
        <div className="text-red-500 text-center">
          {formError}
        </div>
        <div>
            <CreateJobAssignment data={jobAssignmentData} submit={submitHandler}></CreateJobAssignment>
        </div>
    </div>
  )
}
