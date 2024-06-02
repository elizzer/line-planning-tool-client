import DropDown from '@/app/components/DropDown'
import React, { useState } from 'react'

export default function LineForm({data,factoryList,submit}) {

    
    const [formData,setFormData]=useState({
        name:data?data.name:"",
        metadata:data?data.metadata:"",
        factoryid:data?data.factoryid:""
    })

    const factoryChangeHandler=(value)=>{
      console.log("factory change handler ",value)
      setFormData(prev=>{
        prev.factoryid=value
        return {...prev}
      })
    }
    const formChangeHandler=(e)=>{
      setFormData((prev)=>{
        prev[e.target.name]=e.target.value
        return {...prev};
      })
    }
    const formSubmitHandler=(e)=>{
        e.preventDefault()
        submit(formData)
    }
  return (
    <div>
      <form className='form-container flex flex-col gap-2' onSubmit={formSubmitHandler}>
        <div>
          <input className="text-field" placeholder='Line name' name="name" onChange={formChangeHandler} value={formData.name} type=''></input>
        </div>
        <div>
          <DropDown list={factoryList} onChange={factoryChangeHandler} name={"factory"} selected={formData.factoryid}></DropDown>
        </div>
        <div>
          <textarea className="text-field" placeholder='meta data' name="metadata" onChange={formChangeHandler} value={formData.metadata}></textarea>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  )
}
