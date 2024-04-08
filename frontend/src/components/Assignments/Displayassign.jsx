import React, { useEffect, useState } from 'react'
import './Displayassign.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ListGroup } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton'
function Displayassign() {
    const[assign,setassign]=useState([])
    const navigate=useNavigate()
      const [url,seturl]=useState(localStorage.getItem("volunteerurl"))
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
  
      const handleassign=async()=>
      {
          const token=localStorage.getItem("volunteertoken")
          const res=await axios.get(`${url}/api/admin/assignments`,{headers:{"x-access-token":token}})
          if(res.status===200)
          {
            setassign(res.data.assignment);
            console.log(res.data.assignment)
          }
          else
          {
            console.log(res.response.data);
          }
      }
      const removeassign=async(e,id)=>
      {
        const token=localStorage.getItem("volunteertoken")
        e.preventDefault()
        console.log(id);
          const res=await axios.delete(`${url}/api/admin/assignment/${id}`,{headers:{"x-access-token":token}})
          if(res.status===200)
          {
            toast.success('Assigment removed successfully')
            handleassign()
          }
          else
          {
            toast.error('Something went wrong')
          }
      }
  
      useEffect(()=>
      {
        handleassign()
      },[])
  return (
    <div className='container'>
    <Homebutton/>
      <div className=' justify-content-center align-items-center d-flex flex-column'>
      <div className='justify-content-center align-items-center d-flex ' style={{height: '100px',position: 'relative',width: '100%',overflow: 'hidden'}}>
          <img src="https://s3-alpha-sig.figma.com/img/e12a/201f/1ff5d23251e9bbcb40e0dbc3a92d94b8?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=abm~dupQEsoC-zbjjRBn-SRXk3ugthXQjEWV~nX8mnPvbD3WWtt6cuEpjgS08sQ3szx62ppCkRhoJN59g7pJd7T-54uA~t2DDfecerEtKFbh2bpgm-Ue4dTtRn0tXT-z20DcJw0dCJ22KB7teON-V1Ykc57-khKfLSIov5Kerg3IXPAccZsX~S6bKYn-tCVGgPeYPrXe-7TCdqST6~m1odcOThLnDmwE670xYJHIo58DnK6QyO6ww-2jVXDd4jM7pwrL788gbyPl5OgGCiB0KpUu~pYEPIvdjJrodzmMWBxD1UbJVrCsFi9Dcy9IUlw4YjespI8QxncHEV16rz-A1w__" alt=""  style={{position: 'absolute',width: '157%',left: '-34px'}} className='parentdiv'/>
          <img src="https://s3-alpha-sig.figma.com/img/cbaa/86c1/0bd516a2c261529503cc52ead310f66c?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NGg-LUUprl6urnuCI-QCseNR941sE1CbdDaVwKKqXY7llM3KZQx-JzHAjDxxIL7Qn9rh5yGUDotXUObCCb5qSCDoWKvcrjKd76OvV1jxYHCYTr0a8rLakmeE5G29XLX4lTAovHJ5tchcxH6lt3erN-kOKyUjY6-r47JlQm0GJP0qXQHnyfCtb1c~MmBKEhCTzRlf0n5TNvg4O7nGI1VXsGtu90nIjK7-0zPqY6D0djbMutfB9NfZWQaEi0ohRxefgxgEfMxglgTG76mRP6J8A0uFypuKinEwKxfqMf-Xr2suEVNKfP65Z7AXfUolSzkT4MeREyic-GwdVpWanJq~Xw__" alt="" width={'100px'} style={{zIndex: '10'}} />
           </div>
           <h4 className='fw-bold mt-3'>Assignments</h4>
          <ListGroup as="ol" numbered className='mb-2 p-2 w-100' style={{}} >
          {assign?.length>0?
        assign.map((item)=>(<ListGroup.Item  style={{backgroundColor:'rgba(227, 227, 227, 1)',borderBottom:'2px solid rgb(133, 129, 129, 0.553)'}}
        as="li"
        className="d-flex justify-content-between align-items-center"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{item.title}</div>
        </div>
        <button className='btn' type='button' onClick={(e) => removeassign(e,item._id)}><i class="fa-solid fa-trash" style={{color:'rgba(106, 106, 106, 1)'}}></i></button>
      </ListGroup.Item>)):<p>Nothing</p>}
       
      </ListGroup>
         <Link to={'/addassign'}> <button className='btn mt-2 text-light' style={{backgroundColor:`${bgcolor}`}}><i class="fa-solid fa-plus me-2"></i>Add New Assignment</button></Link>
  
    </div>
    <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

   </div>
  )
}

export default Displayassign
