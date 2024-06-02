"use server";

import getToken from "./getToken";
import { redirect } from "next/navigation";

interface Client {
  _id: string;
  name: string;
  metadata: string;
}

interface SPLID {
  _id: string;
  name: string;
}

interface CategoryID {
  _id: string;
  name: string;
  metadata: string;
}

interface MerchantID {
  _id: string;
  userid: string;
  name: string;
  __v: number;
}

export interface Job {
  _id: string;
  userID: string;
  clientID: Client;
  SPLID: SPLID;
  categoryID: CategoryID;
  merchantID: MerchantID;
  IMAN: number;
  model: number;
  totalPieces: number;
  assignedPieces: number;
  startDate: string;
  endDate: string;
  name: string;
  metaData: string;
  __v: number;
}

export async function getAllJobs() {
  const jobResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URI}/jobs`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${await getToken()}`,
      },
      cache: "no-cache",
    }
  );

  if (jobResponse.status === 401) {
    redirect("/user/login");
  }

  const jobResponseJson = await jobResponse.json();
  return jobResponseJson;
}

export async function createJob(formData:Job) {
  console.log("[+]Creating new job", formData);
  const jobResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URI}/jobs`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${await getToken()}`,
      },
      cache: "no-cache",
      body: JSON.stringify(formData),
    }
  );

  if (jobResponse.status === 401) {
    redirect("/user/login");
  }

  const jobResponseJson = await jobResponse.json();
  console.log("Job response ", jobResponseJson);
  if (jobResponseJson.error) {
    return jobResponseJson;
  } else {
    redirect("/dashboard/jobs");
  }
}

export async function getJobById(id:string) {
  const jobResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URI}/jobs/${id}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${await getToken()}`,
      },
      cache: "no-cache",
    }
  );

  if (jobResponse.status === 401) {
    redirect("/user/login");
  }
  const jobResponseJson = await jobResponse.json();
  return jobResponseJson.data;
}

export async function updateJob(id:String, formData:Job) {
    console.log('[+]',id,formData)
  const jobResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URI}/jobs/${id}`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${await getToken()}`,
      },
      cache: "no-cache",
      body: JSON.stringify(formData),
    }
  );

  if (jobResponse.status === 401) {
    redirect("/user/login");
  }

  const jobResponseJson = await jobResponse.json();
  console.log("Job response ", jobResponseJson);
  if (jobResponseJson.error) {
    return jobResponseJson;
  } else {
    redirect("/dashboard/jobs");
  }
}
