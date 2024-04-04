import React, { useEffect } from 'react'
import './Calender1.css'
import { useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton';

function Calender1() {
    const [date, setDate] = useState(new Date());
    const [preview,setpreview]=useState("")
    const[data,setdata]=useState({
      "title":'',
      "description":"",
      "image":""
    })

  const navigate=useNavigate()
  const [url,seturl]=useState(localStorage.getItem("commonurl"))

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
    console.log(date);
    console.log(data);

  useEffect(()=>
    {
      if(data.image)
      {
        setpreview(URL.createObjectURL(data.image))
      }
    },[data.image])

    const handlesubmit=async(e)=> {
       e.preventDefault() 
       const {title,description,image}=data
       const datestring=date.toISOString().split('T')[0] 
       console.log(datestring);
        if(!title || !description || !datestring ||!image)
         { 
          toast.info('Please fill the form completely')
         } 
         else
          {
             const token=localStorage.getItem("token")
            const formdata=new FormData()
             formdata.append("title",title)
            formdata.append("description",description) 
            formdata.append("image",image) 
            formdata.append("date",datestring) 
            const header={
               "content-type":"multipart/form-data", 
               "x-access-token":token } 
               try { 
                const res=await axios.post(`${url}/api/admin/calendar-event`,formdata,{headers:header}) 
                if(res.status===200 || res.status===201) 
                {
                  toast.success('Event added successfully');
                }
                 else
                  {
                     toast.error('Something went wrong'); 
                  }
                 }catch (error) 
                 { 
                  console.log(error); 
                } } }
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
                <Calendar onChange={setDate} value={date}/>
                </div>
                <input type="text" placeholder='Title' className='form-control mt-3' style={{backgroundColor:'rgba(227, 227, 227, 1)'}} value={data.title} onChange={(e)=>setdata({...data,title:e.target.value})}/>

                <div className=' mt-3 w-100 p-5 rounded text-center' style={{backgroundColor:'rgba(227, 227, 227, 1)'}}>
                {preview?<label className="btn text-light btn-success " htmlFor="fileInput">
                Image uploaded
                <input type="file" id="fileInput" style={{ display: 'none' }} className="form-control w-25 "/>
                </label>:<label className="btn text-light " htmlFor="fileInput" style={{backgroundColor:'rgba(63, 0, 126, 1)'}}>
                Upload Image
                <input type="file" id="fileInput" style={{ display: 'none' }} className="form-control w-25 " onChange={(e)=>setdata({...data,image:e.target.files[0]})}/>
                </label> }
              </div>

                  <textarea cols="10" rows="4" placeholder='Description' className='form-control mt-3' style={{backgroundColor:'rgba(227, 227, 227, 1)'}} value={data.description} onChange={(e)=>setdata({...data,description:e.target.value})}></textarea>
                  <button className='btn w-50 text-light mt-3' style={{backgroundColor:'rgba(63, 0, 126, 1)'}}onClick={(e)=>handlesubmit(e)}>Create Event</button>
          </div>
          <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

   </div>
  )
}

export default Calender1
