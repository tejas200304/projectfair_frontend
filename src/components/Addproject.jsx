import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { addProjectApi } from '../services/allApi';
import { addResponseContext } from '../context/Contextshare';

function Addproject() {
    const [show, setShow] = useState(false);
    const {setAddResponse} = useContext(addResponseContext)
    const [projectDetails , setProjectDetails] =useState({
    title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    projectImage:""
    })
    const [preview , setPreview] = useState("")
    const [token , setToken] = useState("")
    const [key , setKey] = useState(1)
    /* console.log(projectDetails);
    console.log(preview);
    console.log(token); */
    
    

    
    
  const handleFile = (e)=>{
    /* console.log(e.target.files[0]); */
    
    setProjectDetails({...projectDetails, projectImage:e.target.files[0]})
  }
  
  const handleClose = () => {setShow(false);
    handleCancel()
  }
  const handleShow = () => setShow(true);

  const handleCancel = ()=>{
    setProjectDetails({
      title:"",
      language:"",
      github:"",
      website:"",
      overview:"",
      projectImage:""
    })
      setPreview('')
      if(key==1){
        setKey(0)
      }
      else{
        setKey(1)
      }
    
  }

  const handleAdd = async()=>{
    const {title,language,github,website,overview,projectImage} =projectDetails
    if(!title || !language || !github || !website || !overview || !projectImage){
      toast.info('Please fill the form completely')
    }
    else{
      //append() - if the request body contains uploaded content then the request body should be created with the help of append method in form data  the  data class.In short request body should be a form data.
      const  reqBody = new FormData()

      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",projectImage)

      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`

        }
        const result = await addProjectApi(reqBody,reqHeader)
/*         console.log(result);
 */        if (result.status==200){
          toast.success('Project added successfully')
          setTimeout(()=>{handleClose()            
          },2003)
          setAddResponse(result)
          
        }
        else if(result.status==406){
          toast.warning(result.response.data)
          handleCancel()
        }
        else{
          toast.error('Something went wrong')
          handleClose()
        }        
      }
      else{
        toast.warning('Please login')
      }

    }
  }

  useEffect(()=>{
    if(projectDetails.projectImage){
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  },[projectDetails.projectImage])

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])
  return (
    <>
    <button className='btn btn-success' onClick={handleShow}>Add Project</button>

    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="projectImage">
                            <input id='projectImage' type="file" style={{display:'none'}} key={key} onChange={(e)=>handleFile(e)}/>
                            <img src={preview?preview:"https://cdn3.iconfinder.com/data/icons/basic-icons-5/64/GALLERY-1024.png"} alt="np image" className='w-100'/>
                        </label>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3 mt-2">
                            <input type="text" placeholder='Title' value={projectDetails.title} className='form-control' onChange={(e)=>setProjectDetails({...projectDetails , title:e.target.value})}/>
                        </div>
                        <div className="mb-3">
                        <input type="text" placeholder='Language' value={projectDetails.language} className='form-control' onChange={(e)=>setProjectDetails({...projectDetails , language:e.target.value})}/>

                        </div>
                        <div className="mb-3">
                        <input type="text" placeholder='Github' className='form-control' value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails , github:e.target.value})}/>

                        </div>
                        <div className="mb-3">
                        <input type="text" placeholder='Website' className='form-control' value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails , website:e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <textarea rows={5} className='form-control'onChange={(e)=>setProjectDetails({...projectDetails , overview:e.target.value})} value={projectDetails.overview} placeholder='Overview'></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
        <ToastContainer theme='colored' position='top-center' autoClose={2000}/>      

      </Modal>
    </>
  )
}

export default Addproject