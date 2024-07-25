import { getJobById } from "@/app/actions/jobs";
import React from "react";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";
import { getJobAssignmentsByJobID } from "@/app/actions/jobAssignments";
import JobAssignmetList from "./JobAssignmetList";

export default async function page({ params }) {
  const jobData = await getJobById(params.jobid);
  console.log("[+]Job data", jobData);

  return (
    <div>
      <div className="flex p-2 justify-between items-center">
        <div className="text-2xl font-bold">{jobData.jobs.name}</div>
        <Link
          href={`/dashboard/jobs/edit/${params.jobid}`}
          className="button p-2 rounded-lg cursor-pointer text-2xl"
        >
          <MdEdit />
        </Link>
      </div>
      <div>
        <div className="flex p-2 justify-between items-center">
          <div className="text-2xl font-bold">Sub-jobs</div>
          <Link
            href={`/dashboard/jobAssignment/create?jobId=${params.jobid}`}
            className="button p-2 rounded-lg cursor-pointer text-2xl"
          >
            <FaPlus />
          </Link>
        </div>
        <JobAssignmetList data={jobData.jobAssignment}></JobAssignmetList>
      </div>
    </div>
  );
}
