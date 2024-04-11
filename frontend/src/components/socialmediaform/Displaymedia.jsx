import React, { useEffect, useState } from 'react'
import './Displaymedia.css'
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton';
import { getColorForDistrict } from '../Districtcolor';

function Displaymedia() {
    const [media,setmedia]=useState([])
    const navigate=useNavigate()
    const [url,seturl]=useState(localStorage.getItem("commonurl"))
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
    const getmedia=async()=>
    {
      const token=localStorage.getItem("token")
        const res=await axios.get(`${url}/api/admin/social-media-form`,{headers:{"x-access-token":token}})
        if(res.status===200)
        {
            setmedia(res.data)
        }
        else
        {
          console.log(res.response.data);
        }
    }
    console.log(media);
    const removemedia=async(e,id)=>
    {
      const token=localStorage.getItem("token")
      e.preventDefault()
      console.log(id);
        const res=await axios.delete(`${url}/api/admin/social-media-form/${id}`,{headers:{"x-access-token":token}})
        if(res.status===200)
        {
          toast.success('Deleted successfully')
          getmedia()
        }
        else
        {
          toast.error('Failed to delete ')
        }
    }
    useEffect(()=>
    {
        getmedia()
    },[])
  return (
    <div className='container'>
    <Homebutton/>
    <div className='justify-content-center align-items-center d-flex flex-column'>
    <div className='justify-content-center align-items-center d-flex' style={{ height: '100px', position: 'relative', width: '100%', overflow: 'hidden' }}>
        <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt="" style={{ position: 'absolute', width:'130%',rotate:'-7deg',objectFit:'contain', objectPosition:'center',left: '-34px' }} className='parentdiv' />
        <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{ zIndex: '10' }} />
    </div>
         <h4 className='fw-bold mt-2'>District Social Media</h4>

         <ListGroup className='mb-2 p-2 w-100' >
        {media?.length>0?
        media.map((item)=>(<ListGroup.Item  style={{backgroundColor:'rgba(227, 227, 227, 1)',borderBottom:'2px solid rgb(133, 129, 129, 0.553)'}}
        as="li"
        className="d-flex justify-content-between align-items-center"
      >
        <div className="ms-2 me-auto" style={{overflow:'hidden'}}>
          <div className="fw-bold mb-2">{item.contact}</div>
          <div className="fw-bold mb-2">{item.facebook}</div>
          <div className="fw-bold mb-2">{item.instagram}</div>
          <div className="fw-bold mb-2">{item.youtube}</div>
          <div className="fw-bold mb-2">{item.whatsapp}</div>
        </div>
        <button className='btn' type='button' onClick={(e) => removemedia(e,item._id)}><i class="fa-solid fa-trash" style={{color:'rgba(106, 106, 106, 1)'}}></i></button>
      </ListGroup.Item>)):<p>Nothing</p>}

      </ListGroup>
   <Link to={'/addmedia'}> <button className='btn mt-2' style={{backgroundColor:`${bgcolor}`,color:`${textcolor}`}}><i class="fa-solid fa-plus me-2"></i>Add media</button></Link>

  </div>
  <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

 </div>
  )
}

export default Displaymedia
