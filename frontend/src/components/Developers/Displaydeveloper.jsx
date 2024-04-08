import React, { useEffect, useState } from 'react'
import './Displaydeveloper.css'
import { Link, useNavigate } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton'
function Displaydeveloper() {
    const[developer,setdeveloper]=useState([])
    const navigate=useNavigate()
      const [url,seturl]=useState(localStorage.getItem("commonurl"))
      const bgcolor=localStorage.getItem("bgcolor")
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
  
      const handledeveloper=async()=>
      {
          const token=localStorage.getItem("token")
          const res=await axios.get(`${url}/api/admin/developers`,{headers:{"x-access-token":token}})
          if(res.status===200)
          {
              setdeveloper(res.data)
          }
          else
          {
            console.log(res.response.data);
          }
      }
      const removedeveloper=async(e,id)=>
    {
      const token=localStorage.getItem("token")
      e.preventDefault()
      console.log(id);
        const res=await axios.delete(`${url}/api/admin/delete-developer/${id}`,{headers:{"x-access-token":token}})
        if(res.status===200)
        {
          toast.success('Developer deleted successfully')
          handledeveloper()
          console.log(res);
        }
        else
        {
          toast.error('Failed to delete developer')
        }
    }

      useEffect(()=>
      {
        handledeveloper()
      },[])
  
  return (
    <div className='container'>
      <Homebutton/>
<div className='justify-content-center align-items-center d-flex flex-column'>
<div className='justify-content-center align-items-center d-flex' style={{height: '100px',position: 'relative',width: '100%',overflow: 'hidden'}}>
    <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt=""  style={{position: 'absolute',width: '157%',left: '-34px'}} className='parentdiv'/>
    <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{zIndex: '10'}} />
     </div>
     <h4 className='fw-bold mt-2'>All Developers</h4>
  <ListGroup className='w-100' >
  {developer?.length>0?
  developer.map((item,index)=>(<ListGroup.Item  style={{backgroundColor:'rgba(227, 227, 227, 1)',borderBottom:'2px solid rgb(133, 129, 129, 0.553)'}}
  as="li"
>
    <div className='d-flex justify-content-start gap-5 align-items-center'>
      <p>{index+1}</p>
      <div >
        <p className="fw-bold ">{item.name}</p>
      <p className="fw-bold">{item.position}</p>
      </div>
  
    <button className='btn ms-auto' type='button' onClick={(e) => removedeveloper(e,item._id)}><i class="fa-solid fa-trash" style={{color:'rgba(106, 106, 106, 1)'}}></i></button>
    </div>
</ListGroup.Item>)):<p>Nothing</p>}
</ListGroup>
<Link to={'/developer'}> <button className='btn mt-2 text-light' style={{backgroundColor:`${bgcolor}`}}><i class="fa-solid fa-plus me-2"></i>Add New Developer</button></Link>

</div>
<ToastContainer autoclose={2000} theme='colored' position='top-center'/>

</div>
  )
}

export default Displaydeveloper
