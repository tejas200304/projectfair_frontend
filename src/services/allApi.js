import { commonAPi } from "./commonApi"
import { serverUrl } from "./serverUrl"




 //register
export const registerApi = async(reqBody)=>{
    return await commonAPi('POST',`${serverUrl}/register`,reqBody,"")
}

//login
export const loginApi = async(reqBody)=>{
    return await commonAPi('POST',`${serverUrl}/login`,reqBody,"")
}

//add project
export const addProjectApi = async(reqBody, reqHeader)=>{
    return await commonAPi('POST',`${serverUrl}/add-project`,reqBody,reqHeader)
}

//get home project
export const homeProjectApi = async()=>{
    return await commonAPi('GET',`${serverUrl}/home-project`)
}

//get all projects
//query parameter = baseurl?key=value
//path parameter = baseurl/id => baseurl/:id
export const allProjectApi = async(searchKey,reqHeader)=>{
    return await commonAPi('GET',`${serverUrl}/all-project?search=${searchKey}`,"",reqHeader)
}

//get user project
export const userProjectApi = async(reqHeader)=>{
    return await commonAPi('GET',`${serverUrl}/user-project`,"",reqHeader)
}

//remove user project
export const removeUserProjectApi = async(id, reqHeader)=>{
    return await commonAPi('DELETE',`${serverUrl}/remove-userproject/${id}`,{},reqHeader)
}

//api to update project
export const updateUserProjectApi = async(id, reqBody, reqHeader)=>{
    return await commonAPi('PUT',`${serverUrl}/update-userProject/${id}`,reqBody,reqHeader)
}

//api to update profile
export const updateUserProfileApi = async(reqBody, reqHeader)=>{
    return await commonAPi('PUT',`${serverUrl}/update-userProfile`,reqBody,reqHeader)
}