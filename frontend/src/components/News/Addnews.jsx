import React, { useEffect, useState } from 'react'
import './Addnews.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton';

function Addnews() {
    const [data,setdata]=useState({
        title:"",
        image:"",
        optional:"",
        link:"",
        news:"",
        date:""
    })
    const [url,seturl]=useState(localStorage.getItem("volunteerurl"))
    const navigate=useNavigate()
    const[preview,setpreview]=useState("")
    const bgcolor=localStorage.getItem("bgcolor")
  
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
    const handleFileChange = (e) => {
      const selectedImage = e.target.files[0];
      setdata({ ...data, image: selectedImage });
      setpreview(URL.createObjectURL(selectedImage));
  };

    const handlesubmit=async(e)=>
    {
        e.preventDefault()
            const token=localStorage.getItem("volunteertoken")
            const formdata=new FormData()
            formdata.append("title",data.title)
            formdata.append("image",data.image)
            formdata.append("optional",data.optional)
            formdata.append("link",data.link)
            formdata.append("news",data.news)
            formdata.append("date",data.date)
            console.log(data)
            try {
                const header={
                    "Content-Type":"multipart/form-data",
                    "x-access-token":token
                }
                const res=await axios.post(`${url}/api/admin/daily-news`,formdata,{headers:header})
                if(res.status===200 || res.status===201)
                {
                    toast.success("News added successfully")
                    setdata({
                        title:"",
                        image:"",
                        optional:"",
                        link:"",
                        news:"",
                        date:""
                    })
                    setpreview("")
                    document.getElementById('fileInput').value = null
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
<div className='justify-content-center align-items-center d-flex' style={{height: '100px',position: 'relative',width: '100%',overflow: 'hidden'}}>
    <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt=""  style={{position: 'absolute',width: '157%',left: '-34px'}} className='parentdiv'/>
    <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{zIndex: '10'}} />
     </div>
     <h4 className='fw-bold mt-2 mb-3'>News</h4>
      <form style={{backgroundColor:'rgba(227, 227, 227, 1)'}} className='mb-5 p-3 w-100  justify-content-center align-items-center d-flex flex-column rounded'>
        <textarea name="" id="" cols="30" rows="5"  className='form-control mt-3' placeholder='News' value={data.news} onChange={(e)=>{setdata({...data,news:e.target.value})}}></textarea>
        <div className=' mt-3 w-100 p-5 rounded text-center' style={{backgroundColor:'white'}}>
        {preview ? (
                            <label className='btn text-light btn-success' htmlFor='fileInput'>
                                Image uploaded
                                <input type='file' id='fileInput' style={{ display: 'none' }} className='form-control w-25' />
                            </label>
                        ) : (
                            <label className='btn text-light' htmlFor='fileInput' style={{ backgroundColor:`${bgcolor}` }}>
                                Upload Image
                                <input type='file' id='fileInput' style={{ display: 'none' }} className='form-control w-25' onChange={handleFileChange} />
                            </label>
                        )}
      </div> 
      <input type="text" className='form-control mt-3' placeholder='Title' value={data.title} onChange={(e)=>{setdata({...data,title:e.target.value})}} />
      <input type="date" className='form-control mt-3' placeholder='Date' value={data.date} onChange={(e)=>{setdata({...data,date:e.target.value})}} />
      <input type="text" className='form-control mt-3' placeholder='Link' value={data.link} onChange={(e)=>{setdata({...data,link:e.target.value})}} />
      <input type="text" className='form-control mt-3' placeholder='Optional' value={data.optional} onChange={(e)=>{setdata({...data,optional:e.target.value})}} />
            <button className='btn mt-4 text-light ' style={{backgroundColor:`${bgcolor}`}} type='button' onClick={(e)=>handlesubmit(e)}>Submit</button>
                       
      </form>
  
</div>
<ToastContainer autoclose={2000} theme='colored' position='top-center'/>

</div>
  )
}

export default Addnews
