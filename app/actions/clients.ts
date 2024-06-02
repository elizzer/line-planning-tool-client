'use server'


import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
// import getToken from './getToken';

interface FormData {
    name: string;
    metadata: string;
    categories: Object[];
    SPLs: Object[];
  }

  interface DeletedMembers{
    categories:string[],
    SPLs:string[]
  }


function getToken(){
    const token = cookies().get("line-planner-jwt-token")?.value;

    if (!token) {
        console.error("JWT token not found in cookies.");
        redirect("/user/login");
    }
    return token
}

export async function getAllClient(){
    const clientsResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/clients`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${await getToken()}`
        },
        cache:"no-cache"
    });
    const clientsData = await clientsResponse.json();

    if (clientsResponse.status === 401) {
        console.error("User unauthorized",clientsData.message);
        redirect("/user/login");
    }

    return clientsData;


}

export async function getClient(id:string){
    const clientResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/clients/${id}`,{
        method:"GET",
        headers:{
            "content-type":"application/json",
            "authorization":`Bearer ${await getToken()}`
        },
        cache:"no-cache"
    })

    if(clientResponse.status===401){
        redirect("/user/login")
    }

    const clientResponseJson=await clientResponse.json()
    return clientResponseJson
}


export async function createClient(clientData:FormData){
    console.log('[+]New client data',clientData)
    // clientData.SPLs=clientData.spl
    const createClientResponse =await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/clients`,{
        method:"POST",
        headers:{
            "content-type":"application/json",
            "authorization":`Bearer ${await getToken()}`
        },
        body:JSON.stringify(clientData),
        cache:"no-cache"
    })

    if(createClientResponse.status===401){
        redirect("/user/login")
    }

    const clientResponseJson=await createClientResponse.json()
    console.log(clientResponseJson)
    if(!clientResponseJson.error){
        redirect("/dashboard/clients")
    }else{
        return clientResponseJson.message
    }
}



export async function editClient(deleted:DeletedMembers,clientData:FormData,clientId:string){
    console.log("Edit client data  action ",clientData,deleted)

    deleted.categories.map((e)=>{
        clientData.categories.push({
            "_id":e,
            "delete":true
        })
    })

    deleted.SPLs.map((e)=>{
        clientData.SPLs.push({
            "_id":e,
            delete:true
        })
    })

    const updatedClientResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/clients/${clientId}`,{
        method:"PATCH",
        headers:{
            "content-type":"application/json",
            "Authorization":`Bearer ${await getToken()}`
        },
        body:JSON.stringify(clientData),
        cache:"no-cache"
    })

    const updatedClientResponseJson=await updatedClientResponse.json()

    if(updatedClientResponse.status===401){
        redirect("/user/login")
    }
    if(!updatedClientResponseJson.error){
        redirect(`/dashboard/clients/${clientId}`)
        
    }else{
        return updatedClientResponseJson.message
    }

}