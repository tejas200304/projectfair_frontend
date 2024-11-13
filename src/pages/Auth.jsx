import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { loginResponseContext } from '../context/Contextshare'

function Auth({register}) {
  const {setLoginResponse} = useContext(loginResponseContext)
  const navigate = useNavigate()
  const [userDetails , setUserDetails] = useState({
    username:"",
    email:"",
    password:""
  })

  console.log(userDetails);

  const handleRegister = async() => {
    const {username , email, password} = userDetails
    if( !username || !email || !password){
      toast.info('please fill the form')
    }else{
      const result = await registerApi(userDetails)
      console.log(result);
      if(result.status==200){
        toast.success('registration successfull')
        setUserDetails({
          username:"",
          email:"",
          password:""
        })
        navigate('/login')
        
      }
      else if(result.status==406){
        toast.warning(result.response.data)
      }else{
        toast.error('something went wrong')
      }
      
    }
  }

  const handleLogin = async() =>{
    const {email, password} = userDetails
    console.log(email , password);
    
    if(!email || !password) {
      toast.info('Please fill the form completely')
    }
    else{
      console.log('inside else');
      
      const result = await loginApi({email ,password})
      console.log(result);
      if(result.status==200){
        toast.success('Login successfull')
        setLoginResponse(true)
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)

        setUserDetails({
          username:"",
          email:"",
          password:""
        })
        setTimeout(()=>{
        navigate('/')
        },2000) 
      }
      else if(result.data==406){
        toast.warning(result.response.data)
        setUserDetails({
          username:"",
          email:"",
          password:""
        })
      }
      else{
        toast.error('Something went wrong')
        setUserDetails({
          username:"",
          email:"",
          password:""
        })
      }
      
    }
  }
  
  
  return (
    <>
     <div className='container my-5'>
        <h5 className='text-warning'> <FontAwesomeIcon icon={faBackward} /> Back to Home</h5>
        <div className='row bg-success  ' style={{ height: '100vh' }} >
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="" />
          </div>
          <div className="col-md-6  d-flex flex-column align-items-center justify-content-center text-white">
            <div className='d-flex fs-5 '>
            <h1 > <FontAwesomeIcon icon={faStackOverflow} className='me-2' />
              Project Fair</h1>
            </div>
            {!register?<h5 className='my-3'>Sign In to Your Account </h5>:
            <h5 className='my-3'>Sign Up to Your Account </h5>}
            
{register&& 
          <input type="text" className='form-control w-75 mt-3' onChange={(e)=>setUserDetails({...userDetails , username:e.target.value})} placeholder='Username' style={{height:'3rem'}} value={userDetails.username} />
          }
            
            <input type="text" className='form-control w-75 mt-3' onChange={(e)=>setUserDetails({...userDetails , email:e.target.value})}  placeholder='E-mail ID' style={{height:'3rem'}} value={userDetails.email}/>
            <input type="text" className='form-control w-75 mt-3' onChange={(e)=>setUserDetails({...userDetails , password:e.target.value})} placeholder='Password' style={{height:'3rem'}} value={userDetails.password}/>
{ !register?          <div>
              <button className='btn btn-warning w-75 mt-4' style={{height:'3rem'}} onClick={handleLogin}>Login</button>
              <h5 className='mt-3'>New User? click Here to <Link to={'/register'} className='text-danger' >Register</Link></h5>
            </div>
            :
            <div>
              <button className='btn btn-warning w-75 mt-4'  onClick={handleRegister} style={{height:'3rem'}}>Register</button>
              <h5 className='mt-3'>Already a User? click Here to <Link to={'/login'} className='text-danger' >Login</Link></h5>
            </div>}
          </div>
          </div>

        </div>

    <ToastContainer theme='colored' position='top-center' autoClose={2000}/>      
    </>
  )
}

export default Auth