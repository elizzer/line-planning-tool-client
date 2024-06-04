"use client"

import { deleteLine } from '@/app/actions/line';
import React from 'react'
import { MdDelete } from "react-icons/md";


export default function DeleteLine({id,factoryId}) {
    // console.log("factory id ",factoryID)
    async function deleteHandler(){
        await deleteLine(id,factoryId)
    }
  return (
    <div
    onClick={deleteHandler}
    className="red-button p-2  rounded-lg cursor-pointer text-2xl"
  >
    <MdDelete />
  </div>
  )
}
