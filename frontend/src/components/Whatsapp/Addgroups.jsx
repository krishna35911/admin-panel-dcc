import React, { useEffect, useState } from 'react'
import './Addgroups.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton';
function Addgroups() {
  const[data,setdata]=useState({
    power:"",
    optional:"",
    link:""
})
const [url,seturl]=useState(localStorage.getItem("volunteerurl"))
const bgcolor=localStorage.getItem("bgcolor")
const navigate=useNavigate()
useEffect(()=>
{
  seturl(localStorage.getItem("volunteerurl"))
},[])
useEffect(()=>
{
  const token=localStorage.getItem("volunteertoken")
  if(!token)
  {
    navigate("/")
  }
  else
  {
    axios.get(`${url}/api/admin/protected`,{headers:{"x-access-token":token}}).then((res)=>
    {
      if(res.status!==200)
      {
        localStorage.removeItem("token")
        navigate('/')
      }
    }).catch((err)=>{
      console.log(err);
    })
  }
},[])


const handlesubmit=async(e)=>
{
  const{optional,link,power}=data
    e.preventDefault()
    if(!data.optional || !data.link || !data.power)
    {
        toast.info("Please fill the form completely")
    }
    else
    {
        const token=localStorage.getItem("volunteertoken")
        try {
            const header={
                "x-access-token":token
            }
            const res=await axios.post(`${url}/api/admin/whatsapp`,{power,link,optional},{headers:header})
            if(res.status===200 || res.status===201)
            {
                toast.success("Whatsapp added successfully")
                setdata({
                    power:"",
                    optional:"",
                    link:""
                })
            }
            else
            {
                toast.error("Something went wrong")
            }
        } catch (error) {
            console.log(error)
        }
    }
}
  return (
    <div className='container'>
      <Homebutton/>
      <div className='justify-content-center align-items-center d-flex flex-column'>
      <div className='justify-content-center align-items-center d-flex ' style={{height: '100px',position: 'relative',width: '100%',overflow: 'hidden'}}>
          <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt=""  style={{position: 'absolute',width: '157%',left: '-34px'}} className='parentdiv'/>
          <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{zIndex: '10'}} />
           </div>
           <h4 className='fw-bold mt-2 mb-3'>Whatsapp Groups</h4>
          <form style={{backgroundColor:'rgba(227, 227, 227, 1)'}} className='mb-5 p-4 w-100  justify-content-center align-items-center d-flex flex-column rounded'>
            <input type="text" className='form-control mt-2' placeholder='Name' value={data.power} onChange={(e)=>{setdata({...data,power:e.target.value})}}/>
            <input type="text" className='form-control mt-2' placeholder='Optional' value={data.optional} onChange={(e)=>{setdata({...data,optional:e.target.value})}}/>
            <input type="text" className='form-control mt-2' placeholder='URL' value={data.link} onChange={(e)=>{setdata({...data,link:e.target.value})}}/>
            <button className='btn mt-4 text-light' style={{backgroundColor:`${bgcolor}`}} type='button' onClick={(e)=>handlesubmit(e)}>Submit</button>
          </form>
    </div>
    <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

    </div>
  )
}

export default Addgroups
