"use server"
import getToken from "./getToken";
import { redirect } from 'next/navigation';

export interface JobAssignment{
    jobID: string;
    lineID: string;
    piecesPerDay: number;
    startDate: string;
    endDate: string;
}

export async function getJobAssignmentsByJobID(jobID:String){
    console.log("Fetching ",jobID)
    const res=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/jobAssignment?jobID=${jobID}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${await getToken()}`
        },
        cache:"no-cache"
    })

    if(res.status===401){
        redirect("/user/login");
    }
    console.log("response received")

    const json_res=await res.json()

    console.log("JA",json_res)

    return json_res.data
}

export async function createJobAssignment(formdata:JobAssignment){
    console.log("[+]create assignment form data",formdata)
    const res=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/jobAssignment`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${await getToken()}`
        },
        body:JSON.stringify(formdata),
        cache:"no-cache"
    })

    if(res.status===401){
        redirect("/user/login");
    }
    console.log("response received")

    const json_res=await res.json()

    // console.log("JA",json_res)

    // return json_res.data
    if(json_res.error){
        return json_res.message
    }else{
        redirect(`/dashboard/jobs/${formdata.jobID}`);
    }

}