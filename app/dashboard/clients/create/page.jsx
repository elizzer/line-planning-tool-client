'use client'

import React, { useState } from 'react'
import ClientForm from '../ClientForm'

import { createClient } from '@/app/actions/clients'


export default function Page() {

  const [formError,setFormError]=useState("")

  async function formSubmit(formData){
      setFormError("")
      const res=await createClient(formData)
      console.log(res)
      if(res){
        setFormError(res)
      }
  }
    
  return (
    <div className=' w-full mt-3 flex flex-col justify-center items-center'>
        <div>
            Create client
        </div>
        <div className="text-red-500 text-center">
          {formError}
        </div>
        <div>
            <ClientForm submit={formSubmit} ></ClientForm>
        </div>
    </div>
  )
}
