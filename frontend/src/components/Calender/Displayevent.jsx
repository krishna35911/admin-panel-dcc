import React, { useEffect } from 'react'
import './Displayevent.css'
import { useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton';
import { ListGroup } from 'react-bootstrap'
import Collapse from 'react-bootstrap/Collapse';

function Displayevent() {
    const [date, setDate] = useState(new Date());
    const [preview,setpreview]=useState([])
    const [selectedDate, setSelectedDate] = useState(null);
    const [open, setOpen] = useState(false);

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
      <div className='justify-content-center align-items-center d-flex ' style={{height: '100px',position: 'relative',width: '100%',overflow: 'hidden'}}>
          <img src="https://s3-alpha-sig.figma.com/img/e12a/201f/1ff5d23251e9bbcb40e0dbc3a92d94b8?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=abm~dupQEsoC-zbjjRBn-SRXk3ugthXQjEWV~nX8mnPvbD3WWtt6cuEpjgS08sQ3szx62ppCkRhoJN59g7pJd7T-54uA~t2DDfecerEtKFbh2bpgm-Ue4dTtRn0tXT-z20DcJw0dCJ22KB7teON-V1Ykc57-khKfLSIov5Kerg3IXPAccZsX~S6bKYn-tCVGgPeYPrXe-7TCdqST6~m1odcOThLnDmwE670xYJHIo58DnK6QyO6ww-2jVXDd4jM7pwrL788gbyPl5OgGCiB0KpUu~pYEPIvdjJrodzmMWBxD1UbJVrCsFi9Dcy9IUlw4YjespI8QxncHEV16rz-A1w__" alt=""  style={{position: 'absolute',width: '157%',left: '-34px'}} className='parentdiv'/>
          <img src="https://s3-alpha-sig.figma.com/img/cbaa/86c1/0bd516a2c261529503cc52ead310f66c?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NGg-LUUprl6urnuCI-QCseNR941sE1CbdDaVwKKqXY7llM3KZQx-JzHAjDxxIL7Qn9rh5yGUDotXUObCCb5qSCDoWKvcrjKd76OvV1jxYHCYTr0a8rLakmeE5G29XLX4lTAovHJ5tchcxH6lt3erN-kOKyUjY6-r47JlQm0GJP0qXQHnyfCtb1c~MmBKEhCTzRlf0n5TNvg4O7nGI1VXsGtu90nIjK7-0zPqY6D0djbMutfB9NfZWQaEi0ohRxefgxgEfMxglgTG76mRP6J8A0uFypuKinEwKxfqMf-Xr2suEVNKfP65Z7AXfUolSzkT4MeREyic-GwdVpWanJq~Xw__" alt="" width={'100px'} style={{zIndex: '10'}} />
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
                <button className='btn mt-3 text-light' style={{backgroundColor:`${bgcolor}`}} onClick={(e)=>handleclick(e)}>View Event</button>

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
