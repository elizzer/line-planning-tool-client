'use server'

import getToken from "./getToken";
import { redirect } from "next/navigation";


export interface Line{
    _id: string;
    factoryID: string;
    name: string;
    metadata: string;
}

export async function getLine(lineId:string){
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/line/${lineId}`,{
        method:"GET",
        headers:{
            "content-type":"application/json",
            "authorization":`Bearer ${await getToken()}`
        },
        cache:"no-cache"
    })
    if(res.status===401){
        redirect("/user/login")
    }
    const body = await res.json()
    if(!body.error){
         return body.data
    }else{
        console.log(body.message)
    }
}

export async function createLine(formData:Line){
    console.log(JSON.stringify(formData))
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/line`,{
        method:"POST",
        headers:{
            "content-type":"application/json",
            "authorization":`Bearer ${await getToken()}`
        },
        body:JSON.stringify(formData),
        cache:"no-cache"
    })
    const body = await res.json()

    if(res.status===401){
        console.log(body.message)
        redirect("/user/login")
    }
    if(body.error){
         return body.message
    }else{
        console.log(body.message)
        redirect(`/dashboard/factory/${formData.factoryID}`)
    }
}

export async function updateLine(lineId:String,formData:Line){
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/line/${lineId}`,{
        method:"PATCH",
        headers:{
            "content-type":"application/json",
            "authorization":`Bearer ${await getToken()}`
        },
        body:JSON.stringify(formData),
        cache:"no-cache"

    })
    const body = await res.json()

    if(res.status===401){
        console.log(body.message)
        redirect("/user/login")
    }
    if(body.error){
         return body.message
    }else{
        console.log("debugpoint",body)
        redirect(`/dashboard/line/${lineId}`)
    }
}