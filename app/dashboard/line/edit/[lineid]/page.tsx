import React from 'react'
import EditLine from './EditLine'
import { getLine } from '@/app/actions/line'
import { getFactories } from '@/app/actions/factory'

export default async function page({params}) {
  const lineid=params.lineid
  const factoryList=await getFactories()
  const lineData=await getLine(lineid)
  return (
    <div><EditLine factoryList={factoryList} lineData={lineData} ></EditLine></div>
  )
}
