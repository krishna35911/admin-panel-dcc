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
          <div className='justify-content-center align-items-center d-flex' style={{height: '100px',position: 'relative',width: '100%',overflow: 'hidden'}}>
          <img src="https://s3-alpha-sig.figma.com/img/e12a/201f/1ff5d23251e9bbcb40e0dbc3a92d94b8?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=abm~dupQEsoC-zbjjRBn-SRXk3ugthXQjEWV~nX8mnPvbD3WWtt6cuEpjgS08sQ3szx62ppCkRhoJN59g7pJd7T-54uA~t2DDfecerEtKFbh2bpgm-Ue4dTtRn0tXT-z20DcJw0dCJ22KB7teON-V1Ykc57-khKfLSIov5Kerg3IXPAccZsX~S6bKYn-tCVGgPeYPrXe-7TCdqST6~m1odcOThLnDmwE670xYJHIo58DnK6QyO6ww-2jVXDd4jM7pwrL788gbyPl5OgGCiB0KpUu~pYEPIvdjJrodzmMWBxD1UbJVrCsFi9Dcy9IUlw4YjespI8QxncHEV16rz-A1w__" alt=""  style={{position: 'absolute',width: '157%',left: '-34px'}} className='parentdiv'/>
          <img src="https://s3-alpha-sig.figma.com/img/cbaa/86c1/0bd516a2c261529503cc52ead310f66c?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NGg-LUUprl6urnuCI-QCseNR941sE1CbdDaVwKKqXY7llM3KZQx-JzHAjDxxIL7Qn9rh5yGUDotXUObCCb5qSCDoWKvcrjKd76OvV1jxYHCYTr0a8rLakmeE5G29XLX4lTAovHJ5tchcxH6lt3erN-kOKyUjY6-r47JlQm0GJP0qXQHnyfCtb1c~MmBKEhCTzRlf0n5TNvg4O7nGI1VXsGtu90nIjK7-0zPqY6D0djbMutfB9NfZWQaEi0ohRxefgxgEfMxglgTG76mRP6J8A0uFypuKinEwKxfqMf-Xr2suEVNKfP65Z7AXfUolSzkT4MeREyic-GwdVpWanJq~Xw__" alt="" width={'100px'} style={{zIndex: '10'}} />
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
                    <button className='btn mt-4 text-light' style={{backgroundColor:'rgba(63, 0, 126, 1)'}} type='button' onClick={addoption}><i class="fa-solid fa-plus me-2"></i>Add Option</button>
                    <button className='btn mt-4 text-light ms-5' style={{backgroundColor:'rgba(63, 0, 126, 1)'}} type='button' onClick={handlepoll}>Submit</button>
                 </div>
                </form>
          </div>
          <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

       </div>
  )
}

export default Polling
