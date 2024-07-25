import React from 'react'
import LoginForm from './LoginForm'

import "./styles.css"

export default function page() {

    

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center '>
        <div className='form-container flex flex-col justify-center items-center'>
            <div className='p-1 text-2xl font-bold'>
                Login
            </div>
            <div className='mt-2'>
                <LoginForm></LoginForm>
            </div>
        </div>
    </div>
  )
}
