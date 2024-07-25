"use client"
import { deleteFactory } from '@/app/actions/factory';
import React from 'react'
import { MdDelete } from "react-icons/md";


export default function DeleteFactory({id}) {
    async function deleteHandler(){
        console.log("delete",id)
        await deleteFactory(id)
    }
    return (
        <div
          onClick={deleteHandler}
          className="red-button p-2  rounded-lg cursor-pointer text-2xl"
        >
          <MdDelete />
        </div>
      );
}
