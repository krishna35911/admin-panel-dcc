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
    const [selectedDate, setSelectedDate] = useState(null); 
    const[data,setdata]=useState({
      title:'',
      description:"",
      image:""
    })

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


  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    setdata({ ...data, image: selectedImage });
    setpreview(URL.createObjectURL(selectedImage));
};

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
                  setdata({title:"",description:"",image:"",date:""})
                  setpreview('');
                  document.getElementById('fileInput').value = '';
                  setSelectedDate(null); 
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
          <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt=""  style={{position: 'absolute',width: '157%',left: '-34px'}} className='parentdiv'/>
          <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{zIndex: '10'}} />
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
                <input type="text" placeholder='Title' className='form-control mt-3' style={{backgroundColor:'rgba(227, 227, 227, 1)'}} value={data.title} onChange={(e)=>setdata({...data,title:e.target.value})}/>

                <div className=' mt-3 w-100 p-5 rounded text-center' style={{backgroundColor:'rgba(227, 227, 227, 1)'}}>
                {preview ? (
                            <label className='btn text-light btn-success' htmlFor='fileInput'>
                                Image uploaded
                                <input type='file' id='fileInput' style={{ display: 'none' }} className='form-control w-25' />
                            </label>
                        ) : (
                            <label className='btn text-light' htmlFor='fileInput' style={{ backgroundColor: `${bgcolor}` }}>
                                Upload Image
                                <input type='file' id='fileInput' style={{ display: 'none' }} className='form-control w-25' onChange={handleFileChange} />
                            </label>
                        )}
              </div>

                  <textarea cols="10" rows="4" placeholder='Description' className='form-control mt-3' style={{backgroundColor:'rgba(227, 227, 227, 1)'}} value={data.description} onChange={(e)=>setdata({...data,description:e.target.value})}></textarea>
                  <button className='btn w-50 text-light mt-3' style={{backgroundColor:`${bgcolor}`}}onClick={(e)=>handlesubmit(e)}>Create Event</button>
          </div>
          <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

   </div>
  )
}

export default Calender1
