import React from 'react'

import CreateForm from './CreateForm'
import { getFactories } from '@/app/actions/factory'

export default async function page({searchParams}) {

  const factoryList= await getFactories()
  console.log("[+]Factory id ",searchParams)
  return (
    <CreateForm factoryList={factoryList} factoryId={searchParams.factoryId}></CreateForm>
  )
}
