import React, { useEffect, useState } from 'react'
import './Media.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton';
import { getColorForDistrict } from '../Districtcolor';
function Media() {
    const [data,setdata]=useState({
        facebook:"",
        instagram:"",
        youtube:"",
        whatsapp:"",
        contact:""
    })
    const [url,seturl]=useState(localStorage.getItem("commonurl"))
    const navigate=useNavigate()
    const bgcolor=localStorage.getItem("bgcolor")
    const textcolor=getColorForDistrict()
    useEffect(()=>
    {
      seturl(localStorage.getItem("commonurl"))
    },[])
    useEffect(()=>
    {
      const token=localStorage.getItem("token")
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
        e.preventDefault()
        const{facebook,instagram,youtube,whatsapp,contact}=data
            const token=localStorage.getItem("token")
         
            console.log(data)
            try {
                const header={
                    "x-access-token":token
                }
                const res=await axios.post(`${url}/api/admin/social-media-form`,{facebook,instagram,youtube,whatsapp,contact},{headers:header})
                if(res.status===200 || res.status===201)
                {
                    toast.success("News added successfully")
                    setdata({
                        facebook:"",
                        instagram:"",
                        youtube:"",
                        whatsapp:"",
                        contact:""
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
    

  return (
    <div className='container'>
    <Homebutton/>
<div className=' justify-content-center align-items-center d-flex flex-column'>
<div className='justify-content-center align-items-center d-flex' style={{ height: '100px', position: 'relative', width: '100%', overflow: 'hidden' }}>
        <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt="" style={{ position: 'absolute', width:'130%',rotate:'-7deg',objectFit:'contain', objectPosition:'center',left: '-34px' }} className='parentdiv' />
        <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{ zIndex: '10' }} />
    </div>
     <h4 className='fw-bold mt-2 mb-3'>District Social Media</h4>
      <form style={{backgroundColor:'rgba(227, 227, 227, 1)'}} className='mb-5 p-3 w-100  justify-content-center align-items-center d-flex flex-column rounded'>
        
      <input type="text" className='form-control mt-3' placeholder='Facebook' value={data.facebook} onChange={(e)=>{setdata({...data,facebook:e.target.value})}} />
      <input type="text" className='form-control mt-3' placeholder='Instagram' value={data.instagram} onChange={(e)=>{setdata({...data,instagram:e.target.value})}} />
      <input type="text" className='form-control mt-3' placeholder='Youtube' value={data.youtube} onChange={(e)=>{setdata({...data,youtube:e.target.value})}} />
      <input type="text" className='form-control mt-3' placeholder='Whatsapp' value={data.whatsapp} onChange={(e)=>{setdata({...data,whatsapp:e.target.value})}} />
      <input type="text" className='form-control mt-3' placeholder='Contact' value={data.contact} onChange={(e)=>{setdata({...data,contact:e.target.value})}} />
      <button className='btn mt-4  ' style={{backgroundColor:`${bgcolor}`,color:`${textcolor}`}} type='button' onClick={(e)=>handlesubmit(e)}>Submit</button>
                       
      </form>
  
</div>
<ToastContainer autoclose={2000} theme='colored' position='top-center'/>

</div>
  )
}

export default Media
