import React, { useEffect, useState } from 'react'
import  './Newgrp.css'
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton';
import { getColorForDistrict } from '../Districtcolor';
function Newgrp() {
  const[whatsapp,setwhatsapp]=useState([])
  const navigate=useNavigate()
  const [selectedPower, setSelectedPower] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState(null);
    const [url,seturl]=useState(localStorage.getItem("volunteerurl"))
    const bgcolor=localStorage.getItem("bgcolor")
    
const textcolor=getColorForDistrict()


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

    const handlewhatsapp=async()=>
    {
        const token=localStorage.getItem("volunteertoken")
        const res=await axios.get(`${url}/api/admin/whatsapp`,{headers:{"x-access-token":token}})
        if(res.status===200)
        {
          setwhatsapp(res.data.whatsapp)
          if (res.data.whatsapp.length > 0) {
            setSelectedPower(res.data.whatsapp[0].power);
            setSelectedDetails(res.data.whatsapp[0].details);
          }
        }
        else
        {
          console.log(res.response.data);
        }
    }
    const removewhatsapp=async(e,id)=>
    {
      const token=localStorage.getItem("volunteertoken")
      e.preventDefault()
      console.log(id);
        const res=await axios.delete(`${url}/api/admin/whatsapp/${id}`,{headers:{"x-access-token":token}})
        if(res.status===200)
        {
          toast.success('Deleted successfully')
          handlewhatsapp()
        }
        else
        {
          toast.error(res.response.data)
        }
    }

    useEffect(()=>
    {
      handlewhatsapp()
    },[])
    const filteredWhatsapp = selectedPower ? whatsapp.filter((item) => item.power === selectedPower) : whatsapp;
    const handlePowerClick = (power, details) => {
      setSelectedPower(power);
      setSelectedDetails(details);
    };

  return (
   <div className='container'>
    <Homebutton/>
      <div className=' justify-content-center align-items-center d-flex flex-column'>
      <div className='justify-content-center align-items-center d-flex' style={{ height: '100px', position: 'relative', width: '100%', overflow: 'hidden' }}>
          <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt="" style={{ position: 'absolute', width:'130%',rotate:'-7deg',objectFit:'contain', objectPosition:'center',left: '-34px' }} className='parentdiv' />
          <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{ zIndex: '10' }} />
      </div>
      <div className='row row-cols-4 row-cols-md-4  justify-content-center align-items-center d-flex w-100'>
        {whatsapp?.length>0?
        whatsapp.map((item)=>( <div className="col" key={item._id}>   
        <button className={`btn rounded-5 ${selectedPower === item.power ? 'selected' : ''}`} style={{backgroundColor:`${bgcolor}`
,color:`${textcolor}`}} onClick={() => handlePowerClick(item.power, item.details)}>{item.power}</button>
       </div>))
         :<p>Nothing</p>}
      </div>
      <ListGroup as="ol" numbered className="mb-2 p-2 w-100">
          {filteredWhatsapp.length > 0 ? (
            filteredWhatsapp.map((item) => (
              <ListGroup.Item
                key={item._id}
                style={{ backgroundColor: 'rgba(227, 227, 227, 1)', borderBottom: '2px solid rgb(133, 129, 129, 0.553)' }}
                as="li"
                className="d-flex justify-content-between align-items-center"
              >
                <div className="ms-2 me-auto" style={{ maxWidth: '80%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <div className="fw-bold">
                    <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a>
                  </div>
                </div>
                <button className="btn" type="button" onClick={(e) => removewhatsapp(e, item._id)}>
                  <i className="fa-solid fa-trash" style={{ color: 'rgba(106, 106, 106, 1)' }}></i>
                </button>
              </ListGroup.Item>
            ))
          ) : (
            <p>No items found</p>
          )}
        </ListGroup>
         <Link to={'/whatsapp'}> <button className='btn mt-2 ' style={{backgroundColor:`${bgcolor}`
,color:`${textcolor}`}}><i class="fa-solid fa-plus me-2"></i>Add New Group</button></Link>
  
    </div>
    <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

   </div>
  )
}

export default Newgrp
