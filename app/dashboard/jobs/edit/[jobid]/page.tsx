import React, { useState } from "react";
import CreateJobsForm from "../../CreateJobsForm";
import { getJobById } from "@/app/actions/jobs";
import EditPage from "./EditPage";

export default async function page({ params }) {
  let jobData = await getJobById(params.jobid);
  jobData = jobData.jobs;
  console.log("[+]Job data ", jobData);
  jobData.clientID = jobData.clientID._id;
  jobData.SPLID = jobData.SPLID._id;
  jobData.merchantID = jobData.merchantID._id;
  jobData.categoryID = jobData.categoryID._id;
  jobData.startDate = jobData.startDate.split("T")[0];
  if (jobData.endDate) {
    jobData.endDate = jobData.endDate.split("T")[0];
  }
  console.log("[+]Updated j data ", jobData);
  return (
    <div className=" w-full mt-3 flex flex-col justify-center items-center">
      <div>Edit Jobs</div>
      <div>
        <EditPage data={jobData}></EditPage>
      </div>
    </div>
  );
}
