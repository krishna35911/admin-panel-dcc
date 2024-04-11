import React, { useEffect } from 'react'
import './Displayevent.css'
import { useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton';
import { ListGroup } from 'react-bootstrap'
import Collapse from 'react-bootstrap/Collapse';
import { getColorForDistrict } from '../Districtcolor';

function Displayevent() {
    const [date, setDate] = useState(new Date());
    const [preview,setpreview]=useState([])
    const [selectedDate, setSelectedDate] = useState(null);
    const [open, setOpen] = useState(false);

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



    const handlesubmit=async(e)=> {
       e.preventDefault() 
       const datestring=date.toISOString().split('T')[0] 
       console.log(datestring);
             const token=localStorage.getItem("token")
           
               try { 
                const res=await axios.get(`${url}/api/admin/calendar-events/${datestring}`,{header:{"x-access-token":token}}) 
                if(res.status===200 || res.status===201) 
                {
                 setpreview(res.data);
                 console.log(res.data);
                }
                 else
                  {
                     toast.error('Something went wrong'); 
                  }
                 }catch (error) 
                 { 
                  console.log(error); 
                } } 

  
    const removeevent=async(e,id)=>
    {
      const token=localStorage.getItem("token")
      e.preventDefault()
      console.log(id);
        const res=await axios.delete(`${url}/api/admin/calendar-event/${id}`,{headers:{"x-access-token":token}})
        if(res.status===200)
        {
          toast.success('deleted successfully')
          handlesubmit()
        }
        else
        {
          toast.error('Failed to delete')
        }
    }
    const handleclick=async(e)=>
    {
        handlesubmit(e)
        setOpen(!open)
    }
    
  return (
    <div className='container'>
    <Homebutton/>
      <div className=' justify-content-center align-items-center d-flex flex-column '>
      <div className='justify-content-center align-items-center d-flex' style={{ height: '100px', position: 'relative', width: '100%', overflow: 'hidden' }}>
          <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt="" style={{ position: 'absolute', width:'130%',rotate:'-7deg',objectFit:'contain', objectPosition:'center',left: '-34px' }} className='parentdiv' />
          <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{ zIndex: '10' }} />
      </div>
           <div className='d-flex justify-content-start '>
            <p className='fw-bold'>Update your calender</p>
           </div>
                <div style={{backgroundColor:'rgba(227, 227, 227, 1)'}} className='p-3 rounded calendercontainer'>
                <Calendar
                    onChange={(newDate) => {
                        setDate(newDate);
                        setSelectedDate(newDate); 
                    }}
                    value={date}
                    tileClassName={({ date }) =>
                        selectedDate && date.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0] 
                            ? 'selected-date' 
                            : null
                    }
                />
                </div>
               <div className='d-flex'>
                  <button className='btn mt-3 ' style={{backgroundColor:`${bgcolor}`,color:`${textcolor}`}} onClick={(e)=>handleclick(e)}>View Event</button>
                 <Link to={'/calender'}> <button className='btn mt-3' style={{backgroundColor:`${bgcolor}`,color:`${textcolor}`}} >Add new event</button></Link>
               </div>

                <Collapse in={open}>
        <div id="example-collapse-text">
        <ListGroup className='w-100' >
  {preview?.length>0?
  preview.map((item,index)=>(<ListGroup.Item  style={{backgroundColor:'rgba(227, 227, 227, 1)',borderBottom:'2px solid rgb(133, 129, 129, 0.553)'}}
  as="li"
>
    <div className='d-flex justify-content-start gap-5 align-items-center'>
      <p>{index+1}</p>
      <div >
        <p className="fw-bold ">{item.title}</p>
        <p className="fw-bold ">{item.date}</p>
      </div>
  
    <button className='btn ms-auto' type='button' onClick={(e) => removeevent(e,item._id)}><i class="fa-solid fa-trash" style={{color:'rgba(106, 106, 106, 1)'}}></i></button>
    </div>
</ListGroup.Item>)):<p>Nothing</p>}
</ListGroup>
        </div>
      </Collapse>
          </div>
          <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

   </div>
  )
}

export default Displayevent
