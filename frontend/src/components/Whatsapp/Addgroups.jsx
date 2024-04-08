import React, { useEffect, useState } from 'react'
import './Addgroups.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton';
function Addgroups() {
  const[data,setdata]=useState({
    power:"",
    optional:"",
    link:""
})
const [url,seturl]=useState(localStorage.getItem("volunteerurl"))
const bgcolor=localStorage.getItem("bgcolor")
const navigate=useNavigate()
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


const handlesubmit=async(e)=>
{
  const{optional,link,power}=data
    e.preventDefault()
    if(!data.optional || !data.link || !data.power)
    {
        toast.info("Please fill the form completely")
    }
    else
    {
        const token=localStorage.getItem("volunteertoken")
        try {
            const header={
                "x-access-token":token
            }
            const res=await axios.post(`${url}/api/admin/whatsapp`,{power,link,optional},{headers:header})
            if(res.status===200 || res.status===201)
            {
                toast.success("Whatsapp added successfully")
                setdata({
                    power:"",
                    optional:"",
                    link:""
                })
            }
            else
            {
                toast.error("Something went wrong")
            }
        } catch (error) {
            console.log(error)
        }
    }
}
  return (
    <div className='container'>
      <Homebutton/>
      <div className='justify-content-center align-items-center d-flex flex-column'>
      <div className='justify-content-center align-items-center d-flex ' style={{height: '100px',position: 'relative',width: '100%',overflow: 'hidden'}}>
          <img src="https://s3-alpha-sig.figma.com/img/e12a/201f/1ff5d23251e9bbcb40e0dbc3a92d94b8?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=abm~dupQEsoC-zbjjRBn-SRXk3ugthXQjEWV~nX8mnPvbD3WWtt6cuEpjgS08sQ3szx62ppCkRhoJN59g7pJd7T-54uA~t2DDfecerEtKFbh2bpgm-Ue4dTtRn0tXT-z20DcJw0dCJ22KB7teON-V1Ykc57-khKfLSIov5Kerg3IXPAccZsX~S6bKYn-tCVGgPeYPrXe-7TCdqST6~m1odcOThLnDmwE670xYJHIo58DnK6QyO6ww-2jVXDd4jM7pwrL788gbyPl5OgGCiB0KpUu~pYEPIvdjJrodzmMWBxD1UbJVrCsFi9Dcy9IUlw4YjespI8QxncHEV16rz-A1w__" alt=""  style={{position: 'absolute',width: '157%',left: '-34px'}} className='parentdiv'/>
          <img src="https://s3-alpha-sig.figma.com/img/cbaa/86c1/0bd516a2c261529503cc52ead310f66c?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NGg-LUUprl6urnuCI-QCseNR941sE1CbdDaVwKKqXY7llM3KZQx-JzHAjDxxIL7Qn9rh5yGUDotXUObCCb5qSCDoWKvcrjKd76OvV1jxYHCYTr0a8rLakmeE5G29XLX4lTAovHJ5tchcxH6lt3erN-kOKyUjY6-r47JlQm0GJP0qXQHnyfCtb1c~MmBKEhCTzRlf0n5TNvg4O7nGI1VXsGtu90nIjK7-0zPqY6D0djbMutfB9NfZWQaEi0ohRxefgxgEfMxglgTG76mRP6J8A0uFypuKinEwKxfqMf-Xr2suEVNKfP65Z7AXfUolSzkT4MeREyic-GwdVpWanJq~Xw__" alt="" width={'100px'} style={{zIndex: '10'}} />
           </div>
           <h4 className='fw-bold mt-2 mb-3'>Whatsapp Groups</h4>
          <form style={{backgroundColor:'rgba(227, 227, 227, 1)'}} className='mb-5 p-4 w-100  justify-content-center align-items-center d-flex flex-column rounded'>
            <input type="text" className='form-control mt-2' placeholder='Name' value={data.power} onChange={(e)=>{setdata({...data,power:e.target.value})}}/>
            <input type="text" className='form-control mt-2' placeholder='Optional' value={data.optional} onChange={(e)=>{setdata({...data,optional:e.target.value})}}/>
            <input type="text" className='form-control mt-2' placeholder='URL' value={data.link} onChange={(e)=>{setdata({...data,link:e.target.value})}}/>
            <button className='btn mt-4 text-light' style={{backgroundColor:`${bgcolor}`}} type='button' onClick={(e)=>handlesubmit(e)}>Submit</button>
          </form>
    </div>
    <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

    </div>
  )
}

export default Addgroups
