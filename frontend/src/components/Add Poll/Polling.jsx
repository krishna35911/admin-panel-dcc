import React, { useEffect, useState } from 'react'
import './POlling.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Homebutton from '../Homebutton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Polling() {
  const[poll,setpoll]=useState(
    {title:"",
    options:[{
      option:""
    }]}
  )
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

  const handleOptionChange = (index, field, value) => {
    const updatedoption = [...poll.options];
    updatedoption[index][field] = value;
    setpoll({...poll,
      options:updatedoption});
  };

  const addoption=()=>
  {
    setpoll({
      ...poll,
      options: [...poll.options, { option: "" }],
    });
  }
  const removeoption=(index)=>
  {
    const updatedOptions = [...poll.options];
    updatedOptions.splice(index, 1);
    setpoll({...poll,
      options:updatedOptions});
  };
 
  const handlepoll=async(e)=>
  {
    const{title,options}=poll
    e.preventDefault()
    if(!poll.title || !poll.options)
    {
      alert('Please fill the form completely')
    }
    else
    {
      const token=localStorage.getItem("token")
      try {
        const res=await axios.post(`${url}/api/admin/poll`,{title,options},{headers:{"x-access-token":token}})
        if(res.status===200 || res.status===201)
        {
            toast.success('Poll added successfully')
            setpoll({title:"",
            options:[{
              option:""
            }]})
        }
        else
        {
          toast.error('Failed to add');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
 

  
  console.log(poll);
  return (
       <div className='container'>
        <Homebutton/>
          <div className=' justify-content-center align-items-center d-flex flex-column'>
          <div className='justify-content-center align-items-center d-flex' style={{ height: '100px', position: 'relative', width: '100%', overflow: 'hidden' }}>
          <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt="" style={{ position: 'absolute', width:'130%',rotate:'-7deg',objectFit:'contain', objectPosition:'center',left: '-34px' }} className='parentdiv' />
          <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{ zIndex: '10' }} />
      </div>
                <form style={{backgroundColor:'rgba(227, 227, 227, 1)'}} className='mb-5 p-3 w-100  justify-content-center align-items-center d-flex flex-column rounded' >
                      <h5 className='fw-bold' style={{fontFamily:'poppins'}}>Polling</h5>
                  <textarea cols="30" rows="6" className='form-control mt-3' placeholder='Question 1' value={poll.title} onChange={(e)=>setpoll({...poll,title:e.target.value})}>
                  </textarea>

                {poll.options.map((optionvalue,index)=>(
                <div key={index} className='mt-3 w-100 d-flex justify-content-between align-items-center bg-light'>  
                <input type="text" className='form-control' placeholder={`Option ${index+1}`}  value={optionvalue.option}
                onChange={(e) => handleOptionChange(index, 'option', e.target.value)}/>
                 <button className='btn mb-2 ' onClick={() => removeoption(index)}><i className="fa-solid fa-trash text-secondary"></i></button>
                </div>))}

                 <div className='d-flex'>
                    <button className='btn mt-4 text-light' style={{backgroundColor:`${bgcolor}`}} type='button' onClick={addoption}><i class="fa-solid fa-plus me-2"></i>Add Option</button>
                    <button className='btn mt-4 text-light ms-5' style={{backgroundColor:`${bgcolor}`}} type='button' onClick={handlepoll}>Submit</button>
                 </div>
                </form>
          </div>
          <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

       </div>
  )
}

export default Polling
