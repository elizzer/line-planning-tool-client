import { getMerchant } from '@/app/actions/merchant'
import React from 'react'
import EditMerchant from './EditMerchant'

export default async function page({params}) {
    const data = await getMerchant(params.merchantid)
  return (
    <div className=" w-full mt-3 flex flex-col justify-center items-center">
      <div className="text-3xl capitalize font-bold">Edit client</div>
      <EditMerchant data={data.data} merchantId={params.merchantid}></EditMerchant>
    </div>
  )
}
