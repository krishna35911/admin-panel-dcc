import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton';
import { getColorForDistrict } from '../Districtcolor';
function DisplaySlogans() {
    const [url,seturl]=useState(localStorage.getItem("commonurl"))
    const bgcolor=localStorage.getItem("bgcolor")
    const textcolor=getColorForDistrict()
    const navigate=useNavigate()
    const[slogan,setslogan]=useState([])
  
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
    const handleslogan=async()=>
    {
        const token=localStorage.getItem("token")
        const res=await axios.get(`${url}/api/admin/slogan`,{headers:{"x-access-token":token}})
        if(res.status===200)
        {
           setslogan(res.data);
        }
        else
        {
          console.log(res.response.data);
        }
    }

    const deleteslogan=async(e,id)=>
    {
        e.preventDefault()
        const token=localStorage.getItem("token")
        const res=await axios.delete(`${url}/api/admin/slogan/${id}`,{headers:{"x-access-token":token}})
        if(res.status===200)
        {
            toast.success('Slogan deleted successfully')
            handleslogan()
        }
        else
        {
            toast.error(res.response.data)
        }
    }
    useEffect(()=>
    {
        handleslogan()
    },[])
  return (
    <div className='container'>
        <Homebutton/>
       <div className=' justify-content-center align-items-center d-flex flex-column'>
       <div className='justify-content-center align-items-center d-flex' style={{ height: '100px', position: 'relative', width: '100%', overflow: 'hidden' }}>
          <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt="" style={{ position: 'absolute', width:'130%',rotate:'-7deg',objectFit:'contain', objectPosition:'center',left: '-34px' }} className='parentdiv' />
          <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{ zIndex: '10' }} />
      </div>
               <h4 className='fw-bold mt-2 '>Slogans</h4>
          <Table striped bordered hover  className='mt-3'>
          <thead className='text-center'>
            <tr>
              <th>#</th>
              <th>Slogan name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='text-center'>
           {slogan?.length>0? 
           slogan.map((item,index)=>(  <tr>
            <td>{index+1}</td>
            <td>{item.slogan.slice(0,25)}</td>
            <td><img src={item.image} alt="" width={'100px'} style={{zIndex: '10'}}/></td>
            <td><button className='btn text-danger' type='button' onClick={(e)=>deleteslogan(e,item._id)}><i class="fa-regular fa-trash-can"></i></button></td>
          </tr>))
         :<p>No data available</p>}
          </tbody>
        </Table>
        <Link to={'/slogan'}><button className='btn mt-2 ' style={{backgroundColor:`${bgcolor}`,color:`${textcolor}`}}><i class="fa-solid fa-plus me-2" type='button'></i>Add new slogan</button></Link>
       </div>
       <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

    </div>
  )
}

export default DisplaySlogans
