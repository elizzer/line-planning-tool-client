import { getMerchant } from '@/app/actions/merchant'
import React from 'react'
import { MdEdit } from "react-icons/md";
import Link from "next/link";



export default async function page({params}) {
    
    console.log('[+]Merchat id ',params.merchantid)

const merchantData = await getMerchant(params.merchantid)
    // let merchantData={
    //     name:"test"
    // }

  return (
    <div className="flex p-2 justify-between items-center">
    <div className="text-2xl font-bold">{merchantData.data.name}</div>
    <Link
      href={`/dashboard/merchant/edit/${params.merchantid}`}
      className="button p-2 rounded-lg cursor-pointer text-2xl"
    >
      <MdEdit />
    </Link>
  </div>
  )
}
