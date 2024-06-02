import { getAllJobs } from '@/app/actions/jobs'
import React from 'react'
import Link from 'next/link';
import { FaPlus } from "react-icons/fa6";
import JobList from './JobList';


export default async function page() {
    const jobs = await getAllJobs()
    console.log(jobs)
  return (
    <div>
        <div className='flex p-2 justify-between items-center'>
            <div className='text-2xl font-bold'>
                Jobs
            </div>
            <Link href={"/dashboard/jobs/create"} className='button p-2 rounded-lg cursor-pointer text-2xl'>
                <FaPlus />
            </Link>
        </div>
        { jobs && <JobList jobList={jobs.data}></JobList>}
    </div>
  )
}
