import React, { useEffect, useState } from 'react'
import './Addslogan.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton';
import { getColorForDistrict } from '../Districtcolor';
function Addslogan() {
    const [data,setdata]=useState({
        slogan:"",
        image:"",
        title:"",
        author:"",
        event:""
    })
    const [url,seturl]=useState(localStorage.getItem("commonurl"))
    const bgcolor=localStorage.getItem("bgcolor")
    const textcolor=getColorForDistrict()
    const navigate=useNavigate()
    const[preview,setpreview]=useState("")
  
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
    const handleFileChange = (e) => {
      const selectedImage = e.target.files[0];
      setdata({ ...data, image: selectedImage });
      setpreview(URL.createObjectURL(selectedImage));
  };

    const handlesubmit=async(e)=>
    {
        e.preventDefault()
        if(!data.slogan || !data.image || !data.title || !data.author || !data.event)
        {
            toast.info("Please fill the form completely")
        }
        else
        {
            const token=localStorage.getItem("token")
            const formdata=new FormData()
            formdata.append("slogan",data.slogan)
            formdata.append("image",data.image)
            formdata.append("title",data.title)
            formdata.append("author",data.author)
            formdata.append("event",data.event)
            try {
                const header={
                    "Content-Type":"multipart/form-data",
                    "x-access-token":token
                }
                const res=await axios.post(`${url}/api/admin/slogan`,formdata,{headers:header})
                if(res.status===200 || res.status===201)
                {
                    toast.success("Slogan added successfully")
                    setdata({
                        slogan:"",
                        image:"",
                        title:"",
                        author:"",
                        event:""
                    })
                    setpreview("")
                    document.getElementById("fileInput").value ='';
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
      <div className=' justify-content-center align-items-center d-flex flex-column'>
      <div className='justify-content-center align-items-center d-flex' style={{ height: '100px', position: 'relative', width: '100%', overflow: 'hidden' }}>
          <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt="" style={{ position: 'absolute', width:'130%',rotate:'-7deg',objectFit:'contain', objectPosition:'center',left: '-34px' }} className='parentdiv' />
          <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{ zIndex: '10' }} />
      </div>
           <h4 className='fw-bold mt-2 mb-3'>Slogan</h4>
            <form style={{backgroundColor:'rgba(227, 227, 227, 1)'}} className='mb-5 p-3 w-100  justify-content-center align-items-center d-flex flex-column rounded'>
              <textarea name="" id="" cols="30" rows="5"  className='form-control mt-3' placeholder='Slogan' onChange={(e)=>{setdata({...data,slogan:e.target.value})}}></textarea>
              <div className=' mt-3 w-100 p-5 rounded text-center' style={{backgroundColor:'white'}}>
              {preview ? (
                            <label className='btn btn-success' style={{color:`${textcolor}`}} htmlFor='fileInput'>
                                Image uploaded
                                <input type='file' id='fileInput' style={{ display: 'none' }} className='form-control w-25' />
                            </label>
                        ) : (
                            <label className='btn ' htmlFor='fileInput' style={{ backgroundColor: `${bgcolor}`,color:`${textcolor}` }}>
                                Upload Image
                                <input type='file' id='fileInput' style={{ display: 'none' }} className='form-control w-25' onChange={handleFileChange} />
                            </label>
                        )}
            </div> 
            <input type="text" placeholder='Title' className='form-control mt-3' onChange={(e)=>{setdata({...data,title:e.target.value})}} />
            <input type="text" placeholder='Author' className='form-control mt-3' onChange={(e)=>{setdata({...data,author:e.target.value})}} />
            <input type="text" placeholder='Event' className='form-control mt-3' onChange={(e)=>{setdata({...data,event:e.target.value})}} />
                  <button className='btn mt-4  ' style={{backgroundColor:`${bgcolor}`,color:`${textcolor}`}} type='button' onClick={(e)=>handlesubmit(e)}>Submit</button>
                             
            </form>
        
      </div>
      <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

   </div>
  )
}

export default Addslogan
