import React, { useEffect, useState } from 'react'
import  './Newgrp.css'
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton';
function Newgrp() {
  const[whatsapp,setwhatsapp]=useState([])
  const navigate=useNavigate()
  const [selectedPower, setSelectedPower] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState(null);
    const [url,seturl]=useState(localStorage.getItem("volunteerurl"))
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
      <div className='justify-content-center align-items-center d-flex ' style={{height: '100px',position: 'relative',width: '100%',overflow: 'hidden'}}>
          <img src="https://s3-alpha-sig.figma.com/img/e12a/201f/1ff5d23251e9bbcb40e0dbc3a92d94b8?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=abm~dupQEsoC-zbjjRBn-SRXk3ugthXQjEWV~nX8mnPvbD3WWtt6cuEpjgS08sQ3szx62ppCkRhoJN59g7pJd7T-54uA~t2DDfecerEtKFbh2bpgm-Ue4dTtRn0tXT-z20DcJw0dCJ22KB7teON-V1Ykc57-khKfLSIov5Kerg3IXPAccZsX~S6bKYn-tCVGgPeYPrXe-7TCdqST6~m1odcOThLnDmwE670xYJHIo58DnK6QyO6ww-2jVXDd4jM7pwrL788gbyPl5OgGCiB0KpUu~pYEPIvdjJrodzmMWBxD1UbJVrCsFi9Dcy9IUlw4YjespI8QxncHEV16rz-A1w__" alt=""  style={{position: 'absolute',width: '157%',left: '-34px'}} className='parentdiv'/>
          <img src="https://s3-alpha-sig.figma.com/img/cbaa/86c1/0bd516a2c261529503cc52ead310f66c?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NGg-LUUprl6urnuCI-QCseNR941sE1CbdDaVwKKqXY7llM3KZQx-JzHAjDxxIL7Qn9rh5yGUDotXUObCCb5qSCDoWKvcrjKd76OvV1jxYHCYTr0a8rLakmeE5G29XLX4lTAovHJ5tchcxH6lt3erN-kOKyUjY6-r47JlQm0GJP0qXQHnyfCtb1c~MmBKEhCTzRlf0n5TNvg4O7nGI1VXsGtu90nIjK7-0zPqY6D0djbMutfB9NfZWQaEi0ohRxefgxgEfMxglgTG76mRP6J8A0uFypuKinEwKxfqMf-Xr2suEVNKfP65Z7AXfUolSzkT4MeREyic-GwdVpWanJq~Xw__" alt="" width={'100px'} style={{zIndex: '10'}} />
           </div>
      <div className='row row-cols-4 row-cols-md-4  justify-content-center align-items-center d-flex w-100'>
        {whatsapp?.length>0?
        whatsapp.map((item)=>( <div className="col" key={item._id}>   
        <button className={`btn text-light rounded-5 ${selectedPower === item.power ? 'selected' : ''}`} style={{backgroundColor:'rgba(63, 0, 126, 1)'}} onClick={() => handlePowerClick(item.power, item.details)}>{item.power}</button>
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
         <Link to={'/whatsapp'}> <button className='btn mt-2 text-light' style={{backgroundColor:'rgba(63, 0, 126, 1)'}}><i class="fa-solid fa-plus me-2"></i>Add New Group</button></Link>
  
    </div>
    <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

   </div>
  )
}

export default Newgrp
