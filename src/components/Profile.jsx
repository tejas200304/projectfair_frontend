import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../services/serverUrl'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { updateUserProfileApi } from '../services/allApi';
import { Collapse } from 'react-bootstrap';



function Profile() {
    const [open, setOpen] = useState(false);
    const [userDetails, setUserDetails] = useState({
        username:"",
        email:"",
        password:"",
        profile:"",
        github:"",
        linkedin:""
    })
    const [existingImg, setExistingImg] = useState("")
    const [preview, setPreview] = useState("")
    const [updateStatus, setUpdateStatus] = useState({})
/*     console.log(userDetails);
 */
    const handleFile = (e)=>{
        setUserDetails({...userDetails , profile:e.target.files[0]})
    }

    useEffect(()=>{
        if(userDetails.profile){
            setPreview(URL.createObjectURL(userDetails.profile))
        }
    },[userDetails.profile])

/*     console.log(preview);
 */    
    
    const handleUpdate = async()=>{
        const { username, email, password, profile, github, linkedin} = userDetails
        if(!github || !linkedin){
            toast.info('please add github and linkedin')
        }
        else{
            const reqBody = new FormData()
            reqBody.append("username",username)
            reqBody.append("email",email)
            reqBody.append("password",password)
            reqBody.append("github",github)
            reqBody.append("linkedin",linkedin)
            preview?reqBody.append("profile",profile): reqBody.append("profile",existingImg)

            const token = sessionStorage.getItem("token")

            if(preview){
                const reqHeader = {
                    "Content-Type":"multipart/form-data",
                    "Authorization":`Bearer ${token}`
                }
                const result = await updateUserProfileApi( reqBody, reqHeader)
                console.log(result);
                if(result.status == 200){
                    toast.success("Updated successfully")
                    sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                    setUpdateStatus(result)
                }
                else{
                    toast.error('something went wrong')
                }
                
            }
            else{
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  }
                  const result = await updateUserProfileApi( reqBody, reqHeader)
                  console.log(result);
                  if(result.status == 200){
                    toast.success("Updated successfully")
                    sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                    setUpdateStatus(result)
                }
                else{
                    toast.error('something went wrong')
                }
            }

        }
    }

    useEffect(()=>{
        if (sessionStorage.getItem("existingUser")) {
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
/*             console.log(user);
 */            setUserDetails({...userDetails, username:user.username, email:user.email, password:user.password, github:user.github, linkedin:user.linkedin})
            setExistingImg(user.profile)
            
        } 
    },[updateStatus])

  return (
    <div className='p-4 shadow'>
        <div className='d-flex justify-content-between'>
            <h3>Profile</h3>
            <button onClick={() => setOpen(!open)} className='btn border-1 border-primary px-2 py-1' >{open==true?<FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}</button>
        </div>

        <Collapse in={open}>
            <div>
                <div className="d-flex justify-content-center align-items-center flex-column mt-3">
                    <label htmlFor="profileImage" className='mb-4 d-flex justify-content-center align-items-center'>
                        <input id='profileImage' type="file" style={{display:'none'}} onChange={(e)=>handleFile(e)}/>
        { existingImg==""?    
                     <img src={preview?preview:"https://cdn-icons-png.flaticon.com/128/3177/3177440.png"} alt="" style={{width:'200px', height:'200px', borderRadius:'50%'}}/>
                        :
                        <img src={preview?preview:`${serverUrl}/upload/${existingImg}`} alt=""  style={{width:'200px', height:'200px', borderRadius:'50%'}}/>}
                    </label>
        
                    <div className="w-100">
                        <div className="mb-3">
                            <input type="text" placeholder='github' className='form-control' value={userDetails?.github} onChange={(e)=>setUserDetails({...userDetails, github:e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <input type="text" placeholder='LinkedIn' className='form-control' value={userDetails?.linkedin} onChange={(e)=>setUserDetails({...userDetails, linkedin:e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <button className='btn btn-success w-100' onClick={handleUpdate}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </Collapse>

        <ToastContainer theme='colored' position='top-center' autoClose={2000}/>      

    </div>
  )
}

export default Profile