import React, { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';

function Sidebar({ name, ...props }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate=useNavigate()
    const logout=()=>
    {
        localStorage.removeItem("basetoken")
        localStorage.removeItem("volunteertoken")
        localStorage.removeItem("token")
        navigate('/')
    }
  return (
    <>
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
    </>
  )
}

export default Sidebar
