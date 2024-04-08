import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton'

function Displaynews() {
    const [url,seturl]=useState(localStorage.getItem("volunteerurl"))
    const navigate=useNavigate()
    const[news,setnews]=useState([])
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
    const handlenews=async()=>
    {
        const token=localStorage.getItem("volunteertoken")
        const res=await axios.get(`${url}/api/admin/daily-news`,{headers:{"x-access-token":token}})
        if(res.status===200)
        {
           setnews(res.data.dailyNews);
        }
        else
        {
          console.log(res.response.data);
        }
    }
    console.log(news);

    const deletenews=async(e,id)=>
    {
        e.preventDefault()
        const token=localStorage.getItem("volunteertoken")
        const res=await axios.delete(`${url}/api/admin/daily-news/${id}`,{headers:{"x-access-token":token}})
        if(res.status===200)
        {
            toast.success('News deleted successfully')
            handlenews()
        }
        else
        {
            toast.error(res.response.data)
        }
    }
    useEffect(()=>
    {
        handlenews()
    },[])
  return (
    <div className='container'>
    <Homebutton/>
   <div className=' justify-content-center align-items-center d-flex flex-column'>
        <div className='justify-content-center align-items-center d-flex' style={{height: '100px',position: 'relative',width: '100%',overflow: 'hidden'}}>
          <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt=""  style={{position: 'absolute',width: '157%',left: '-34px'}} className='parentdiv'/>
          <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{zIndex: '10'}} />
           </div>
           <h4 className='fw-bold mt-2 '>News</h4>
      <Table striped bordered hover  className='mt-3'>
      <thead className='text-center'>
        <tr>
          <th>#</th>
          <th>News title</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className='text-center'>
       {news?.length>0? 
       news.map((item,index)=>(  <tr>
        <td>{index+1}</td>
        <td>{item.title}</td>
        <td><img src={item.image} alt="" width={'100px'} style={{zIndex: '10'}}/></td>
        <td><button className='btn text-danger' type='button' onClick={(e)=>deletenews(e,item._id)}><i class="fa-regular fa-trash-can"></i></button></td>
      </tr>))
     :<p>No data available</p>}
      </tbody>
    </Table>
    <Link to={'/addnews'}><button className='btn mt-2 text-light' style={{backgroundColor:`${bgcolor}`}}><i class="fa-solid fa-plus me-2" type='button'></i>Add news</button></Link>
   </div>
   <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

</div>
  )
}

export default Displaynews
