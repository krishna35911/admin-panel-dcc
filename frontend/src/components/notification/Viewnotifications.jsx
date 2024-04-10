import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Homebutton from '../Homebutton'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Viewnotifications() {
    const[notify,setnotify]=useState([])
    const [url,seturl]=useState(localStorage.getItem("commonurl"))
    const bgcolor=localStorage.getItem("bgcolor")
    const navigate=useNavigate()
  
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
  const handlenotification=async()=>
  {
    const token=localStorage.getItem("token")
    const res=await axios.get(`${url}/api/admin/notifications`,{headers:{"x-access-token":token}})
    if(res.status===200)
    {
      setnotify(res.data);
    }
    else
    {
      console.log(res.response.data);
    }
  }
  const handledelete=async(e,id)=>
  {
    e.preventDefault()
    const token=localStorage.getItem("token")
    const res=await axios.delete(`${url}/api/admin/delete-notification/${id}`,{headers:{"x-access-token":token}})
    if(res.status===200)
    {
      toast.success('Notification deleted successfully')
      handlenotification()
    }
    else
    {
        toast.error('failed to delete ')
    }
  }
useEffect(()=>
{
  handlenotification()
},[])
  return (
    <div className='container'>
        <Homebutton/>
       <div className=' justify-content-center align-items-center d-flex flex-column'>
            <div className='justify-content-center align-items-center d-flex' style={{ height: '100px', position: 'relative', width: '100%', overflow: 'hidden' }}>
              <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt="" style={{ position: 'absolute', width:'130%',rotate:'-7deg',objectFit:'contain', objectPosition:'center',left: '-34px' }} className='parentdiv' />
              <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{ zIndex: '10' }} />
          </div>
          <h4>Notifications</h4>
           <Table striped bordered hover style={{width:'100%'}} className='mt-2'>
          <thead className='text-center'>
            <tr>
              <th>#</th>
              <th>Name</th>
              {/* <th>Image</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='text-center'>
           {notify?.length>0? 
           notify.map((item,index)=>(  <tr>
            <td>{index+1}</td>
            <td>{item.title.slice(0,25)}....</td>
            {/* <td><img src={item.image} alt="" width={'100px'} style={{zIndex: '10'}}/></td> */}
            <td><button className='btn text-danger' type='button' onClick={(e)=>handledelete(e,item._id)}><i class="fa-regular fa-trash-can"></i></button></td>
          </tr>))
         :<p>No data available</p>}
          </tbody>
        </Table>
       </div>
       <ToastContainer autoclose={2000} theme='colored' position='top-center'/>
    </div>
  )
}

export default Viewnotifications
