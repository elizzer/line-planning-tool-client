import React from 'react'
import RegisterForm from './RegisterForm'
import "./styles.css"
export default function page() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className='form-container flex flex-col items-center'>
            <div className='p-1 text-2xl font-bold'>
                Register
            </div>
            <div className='mt-2'>
                <RegisterForm></RegisterForm>
            </div>
        </div>
    </div>
  )
}
