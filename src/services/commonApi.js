/* axios has the capacity to convert into json when transferrring to backend */

import axios from "axios"


export const commonAPi = async(httpRequest,url,reqBody,reqHeader)=>{
    const reqConfig = {
        method:httpRequest,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader:{"Content-Type":"application/json"}

    }
    return await axios(reqConfig).then((result)=>{
        return result
    }).catch(err =>{
        return err
    
    })

}