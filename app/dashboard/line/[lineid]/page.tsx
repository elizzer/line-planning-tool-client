import React from 'react'
import Link from "next/link";
import { MdEdit } from "react-icons/md";
import { getLine } from '@/app/actions/line';

export default async function page({params}) {
  const lineData=await getLine(params.lineid)
  console.log(lineData)
  return (
    <div>
       <div className="flex p-2 justify-between items-center">
          <div className="text-2xl font-bold">{lineData.name}</div>
          <Link
            href={`/dashboard/line/edit/${params.lineid}`}
            className="button p-2 rounded-lg cursor-pointer text-2xl"
          >
            <MdEdit />
          </Link>
        </div>
    </div>
  )
}
