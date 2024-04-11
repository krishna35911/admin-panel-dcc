import React, { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar({ name,insideDistrict, ...props}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate=useNavigate()
    const logout=()=>
    {
        localStorage.removeItem("basetoken")
        localStorage.removeItem("volunteertoken")
        localStorage.removeItem("volunteerurl")
        localStorage.removeItem("districturl")
        localStorage.removeItem("commonurl")
        localStorage.removeItem("baseurl")
        localStorage.removeItem("token")
        localStorage.removeItem("districtname")
        localStorage.removeItem("bgcolor")
        localStorage.removeItem("subname")
        navigate('/')
    }
    const handlearrow=()=>
    {
      localStorage.removeItem("commonurl")
      localStorage.removeItem("token")
      localStorage.removeItem("districtname")
      localStorage.removeItem("bgcolor")
      localStorage.removeItem("subname")
    }
  return (
    <div className='d-flex align-items-center justify-content-between '>
        <button className='btn'  onClick={handleShow} type='button'><i class="fa-solid fa-bars-staggered mt-3 ms-3 bg-dark text-light p-2" style={{borderRadius:'30px'}}></i></button>
        <Offcanvas show={show} onHide={handleClose} {...props} style={{ maxWidth: '40%' }} >
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <h3 className='text-center'>Welcome {name}</h3>
          <hr />
         <div className='text-center d-flex flex-column'>
              <button className='btn mx-auto' type='button'><i class="fa-solid fa-chart-simple me-3"></i>Statistics</button>
              <button className='btn mx-auto' type='button' onClick={logout}><i class="fa-solid fa-right-from-bracket me-3"></i>Logout</button>
         </div>
        </Offcanvas.Body>
      </Offcanvas>
     {insideDistrict&& <div className='mt-3 me-3 p-2 ' onClick={handlearrow}>
     <Link to={'/panel'} style={{textDecoration:'none'}}> <i class="fa-solid fa-circle-arrow-left fs-3 text-black"></i></Link>
      </div>}
    </div>
  )
}

export default Sidebar