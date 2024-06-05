'use client'

import Link from 'next/link';
import React from 'react'
import { FaPlus } from "react-icons/fa6";

function ClientCard({name,metadata,id}){
    return (
        <Link href={`/dashboard/clients/${id}`}>
            <div className='card'>
                {name}
            </div>
        </Link>
    )
}

export default function ClientList({data}) {
  return (
    <div>
        <div className='flex p-2 justify-between items-center'>
            <div className='text-2xl font-bold'>
                Clients
            </div>
            <Link href={"/dashboard/clients/create"} className='button p-2 rounded-lg cursor-pointer text-2xl'>
                <FaPlus />
            </Link>
        </div>
     
            <div className='card-grid'>
                {
                    data.map((e,i)=>{
                        return <ClientCard name={e.name} id={e._id} metadata={e.metadata} key={i}></ClientCard>
                    })
                }
            </div>
       
    </div>
  )
}
