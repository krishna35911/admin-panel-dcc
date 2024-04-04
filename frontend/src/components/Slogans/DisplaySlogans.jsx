import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton';
function DisplaySlogans() {
    const [url,seturl]=useState(localStorage.getItem("commonurl"))
    const navigate=useNavigate()
    const[slogan,setslogan]=useState([])
  
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
    const handleslogan=async()=>
    {
        const token=localStorage.getItem("token")
        const res=await axios.get(`${url}/api/admin/slogan`,{headers:{"x-access-token":token}})
        if(res.status===200)
        {
           setslogan(res.data);
        }
        else
        {
          console.log(res.response.data);
        }
    }

    const deleteslogan=async(e,id)=>
    {
        e.preventDefault()
        const token=localStorage.getItem("token")
        const res=await axios.delete(`${url}/api/admin/slogan/${id}`,{headers:{"x-access-token":token}})
        if(res.status===200)
        {
            toast.success('Slogan deleted successfully')
            handleslogan()
        }
        else
        {
            toast.error(res.response.data)
        }
    }
    useEffect(()=>
    {
        handleslogan()
    },[])
  return (
    <div className='container'>
        <Homebutton/>
       <div className=' justify-content-center align-items-center d-flex flex-column'>
            <div className='justify-content-center align-items-center d-flex' style={{height: '100px',position: 'relative',width: '100%',overflow: 'hidden'}}>
              <img src="https://s3-alpha-sig.figma.com/img/e12a/201f/1ff5d23251e9bbcb40e0dbc3a92d94b8?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=abm~dupQEsoC-zbjjRBn-SRXk3ugthXQjEWV~nX8mnPvbD3WWtt6cuEpjgS08sQ3szx62ppCkRhoJN59g7pJd7T-54uA~t2DDfecerEtKFbh2bpgm-Ue4dTtRn0tXT-z20DcJw0dCJ22KB7teON-V1Ykc57-khKfLSIov5Kerg3IXPAccZsX~S6bKYn-tCVGgPeYPrXe-7TCdqST6~m1odcOThLnDmwE670xYJHIo58DnK6QyO6ww-2jVXDd4jM7pwrL788gbyPl5OgGCiB0KpUu~pYEPIvdjJrodzmMWBxD1UbJVrCsFi9Dcy9IUlw4YjespI8QxncHEV16rz-A1w__" alt=""  style={{position: 'absolute',width: '157%',left: '-34px'}} className='parentdiv'/>
              <img src="https://s3-alpha-sig.figma.com/img/cbaa/86c1/0bd516a2c261529503cc52ead310f66c?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NGg-LUUprl6urnuCI-QCseNR941sE1CbdDaVwKKqXY7llM3KZQx-JzHAjDxxIL7Qn9rh5yGUDotXUObCCb5qSCDoWKvcrjKd76OvV1jxYHCYTr0a8rLakmeE5G29XLX4lTAovHJ5tchcxH6lt3erN-kOKyUjY6-r47JlQm0GJP0qXQHnyfCtb1c~MmBKEhCTzRlf0n5TNvg4O7nGI1VXsGtu90nIjK7-0zPqY6D0djbMutfB9NfZWQaEi0ohRxefgxgEfMxglgTG76mRP6J8A0uFypuKinEwKxfqMf-Xr2suEVNKfP65Z7AXfUolSzkT4MeREyic-GwdVpWanJq~Xw__" alt="" width={'100px'} style={{zIndex: '10'}} />
               </div>
               <h4 className='fw-bold mt-2 '>Slogans</h4>
          <Table striped bordered hover  className='mt-3'>
          <thead className='text-center'>
            <tr>
              <th>#</th>
              <th>Slogan name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='text-center'>
           {slogan?.length>0? 
           slogan.map((item,index)=>(  <tr>
            <td>{index+1}</td>
            <td>{item.slogan.slice(0,25)}</td>
            <td><img src={item.image} alt="" width={'100px'} style={{zIndex: '10'}}/></td>
            <td><button className='btn text-danger' type='button' onClick={(e)=>deleteslogan(e,item._id)}><i class="fa-regular fa-trash-can"></i></button></td>
          </tr>))
         :<p>No data available</p>}
          </tbody>
        </Table>
        <Link to={'/slogan'}><button className='btn mt-2 text-light' style={{backgroundColor:'rgba(63, 0, 126, 1)'}}><i class="fa-solid fa-plus me-2" type='button'></i>Add new slogan</button></Link>
       </div>
       <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

    </div>
  )
}

export default DisplaySlogans
