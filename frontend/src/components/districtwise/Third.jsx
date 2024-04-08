import React, { useEffect, useState } from 'react'
import './Third.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Third() {
   
  const[url,seturl]=useState(localStorage.getItem("commonurl"))
  const navigate=useNavigate()
  const subname=localStorage.getItem("subname")
  const bgcolor=localStorage.getItem("bgcolor")
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
    axios
      .get(`${url}/api/admin/protected`, {
        headers: { "x-access-token": token },
      })
      .then((res) => {
        if (res.status !== 200) {
          localStorage.removeItem("token");
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(()=>
  {
    seturl(localStorage.getItem("commonurl"))
  },[])
  return (
   
   <div className='container'>
    <Sidebar/>
      <div className="justify-content-center align-items-center d-flex flex-column">
      <div className='justify-content-center align-items-center d-flex' style={{height: '100px',position: 'relative',width: '100%',overflow: 'hidden'}}>
          <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt=""  style={{position: 'absolute',width: '157%',left: '-34px'}} className='parentdiv'/>
          <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{zIndex: '10'}} />
           </div>
           <div className='d-flex justify-content-end flex-column content'>
          <p style={{fontSize: '20px', marginBottom: '0'}}>Welcome To Our E-Organizer Admin</p>  
           <p style={{ fontSize: '15px', marginTop: '0',fontWeight:'bold' }}>{subname}</p>         
        </div>
           <div className='d-flex justify-content-center align-item-center flex-column rowdiv'>
             <Row>
             <Col xs={4} md={4} lg={4}>
              <Link to={'/notification'} style={{ textDecoration: 'none' }}>
                <div className='box ' style={{ backgroundColor: `${bgcolor}`, position: 'relative' }}>
                  <div className='box-content p-4'>
                    <div style={{ position: 'absolute', top: '0', right: '0' }} className='me-3'>
                      <i className="fa-solid fa-square-arrow-up-right"></i>
                    </div>
                    <p style={{ fontSize: '13px', marginBottom: '0', fontWeight: 'bold' }}>Notification</p>
                  </div>
                </div>
              </Link>
            </Col>
            <Col xs={4} md={4} lg={4}>
              <Link to={'/approval'} style={{ textDecoration: 'none' }}>
                <div className='box ' style={{ backgroundColor: `${bgcolor}`, position: 'relative' }}>
                  <div className='box-content p-4'>
                    <div style={{ position: 'absolute', top: '0', right: '0' }} className='me-3'>
                      <i className="fa-solid fa-square-arrow-up-right"></i>                      
                    </div>
                    <p style={{ fontSize: '13px', marginBottom: '0', fontWeight: 'bold' }}>Approval</p>
                  </div>
                </div>
              </Link>
            </Col>
            <Col xs={4} md={4} lg={4}>
              <Link to={'/partybook/images'} style={{ textDecoration: 'none' }}>
                <div className='box ' style={{ backgroundColor: `${bgcolor}`, position: 'relative' }}>
                  <div className='box-content p-4'>
                    <div style={{ position: 'absolute', top: '0', right: '0' }} className='me-3'>
                      <i className="fa-solid fa-square-arrow-up-right"></i>
                    </div>
                    <p style={{ fontSize: '13px', marginBottom: '0', fontWeight: 'bold' }}>Party Book</p>
                  </div>
                </div>
              </Link>
            </Col>
          </Row>
          <Row className='mt-2'>
          <Col xs={4} md={4} lg={4}>
              <Link to={''} style={{ textDecoration: 'none' }}>
                <div className='box ' style={{ backgroundColor: `${bgcolor}`, position: 'relative' }}>
                  <div className='box-content p-4'>
                    <div style={{ position: 'absolute', top: '0', right: '0' }} className='me-3'>
                      <i className="fa-solid fa-square-arrow-up-right"></i>
                    </div>
                    <p style={{ fontSize: '12px', marginBottom: '0', fontWeight: 'bold' }}>People's Representatives</p>
                  </div>
                </div>
              </Link>
            </Col>
            <Col xs={4} md={4} lg={4}>
              <Link to={'/socialmedia'} style={{ textDecoration: 'none' }}>
                <div className='box ' style={{ backgroundColor: `${bgcolor}`, position: 'relative' }}>
                  <div className='box-content p-4'>
                    <div style={{ position: 'absolute', top: '0', right: '0' }} className='me-3'>
                      <i className="fa-solid fa-square-arrow-up-right"></i>
                    </div>
                    <p style={{ fontSize: '13px', marginBottom: '0', fontWeight: 'bold' }}>Social Media</p>
                  </div>
                </div>
              </Link>
            </Col>
            <Col xs={4} md={4} lg={4}>
              <Link to={'/whatsapplinks'} style={{ textDecoration: 'none' }}>
                <div className='box ' style={{ backgroundColor: `${bgcolor}`, position: 'relative' }}>
                  <div className='box-content p-4'>
                    <div style={{ position: 'absolute', top: '0', right: '0' }} className='me-3'>
                      <i className="fa-solid fa-square-arrow-up-right"></i>
                    </div>
                    <p style={{ fontSize: '13px', marginBottom: '0', fontWeight: 'bold' }}>Whatsapp Group</p>
                  </div>
                </div>
              </Link>
            </Col>
          </Row>
          <Row className='mt-2'>
          <Col xs={4} md={4} lg={4}>
              <Link to={'/displaypoll'} style={{ textDecoration: 'none' }}>
                <div className='box ' style={{ backgroundColor: `${bgcolor}`, position: 'relative' }}>
                  <div className='box-content p-4'>
                    <div style={{ position: 'absolute', top: '0', right: '0' }} className='me-3'>
                      <i className="fa-solid fa-square-arrow-up-right"></i>
                    </div>
                    <p style={{ fontSize: '13px', marginBottom: '0', fontWeight: 'bold' }}>Polling</p>
                  </div>
                </div>
              </Link>
            </Col>
            <Col xs={4} md={4} lg={4}>
              <Link to={'/displayassign'} style={{ textDecoration: 'none' }}>
                <div className='box ' style={{ backgroundColor: `${bgcolor}`, position: 'relative' }}>
                  <div className='box-content p-4'>
                    <div style={{ position: 'absolute', top: '0', right: '0' }} className='me-3'>
                      <i className="fa-solid fa-square-arrow-up-right"></i>
                    </div>
                    <p style={{ fontSize: '13px', marginBottom: '0', fontWeight: 'bold' }}>Assignments</p>
                  </div>
                </div>
              </Link>
            </Col>
            <Col xs={4} md={4} lg={4}>
              <Link to={''} style={{ textDecoration: 'none' }}>
                <div className='box ' style={{ backgroundColor: `${bgcolor}`, position: 'relative' }}>
                  <div className='box-content p-4'>
                    <div style={{ position: 'absolute', top: '0', right: '0' }} className='me-3'>
                      <i className="fa-solid fa-square-arrow-up-right"></i>
                    </div>
                    <p style={{ fontSize: '13px', marginBottom: '0', fontWeight: 'bold' }}>Reports</p>
                  </div>
                </div>
              </Link>
            </Col>
          </Row>
          <Row className='mt-2'>
          <Col xs={4} md={4} lg={4}>
              <Link to={'/displayslogan'} style={{ textDecoration: 'none' }}>
                <div className='box ' style={{ backgroundColor: `${bgcolor}`, position: 'relative' }}>
                  <div className='box-content p-4'>
                    <div style={{ position: 'absolute', top: '0', right: '0' }} className='me-3'>
                      <i className="fa-solid fa-square-arrow-up-right"></i>
                    </div>
                    <p style={{ fontSize: '13px', marginBottom: '0', fontWeight: 'bold' }}>Slogans</p>
                  </div>
                </div>
              </Link>
            </Col>
            <Col xs={4} md={4} lg={4}>
              <Link to={'/displaynews'} style={{ textDecoration: 'none' }}>
                <div className='box ' style={{ backgroundColor: `${bgcolor}`, position: 'relative' }}>
                  <div className='box-content p-4'>
                    <div style={{ position: 'absolute', top: '0', right: '0' }} className='me-3'>
                      <i className="fa-solid fa-square-arrow-up-right"></i>
                    </div>
                    <p style={{ fontSize: '13px', marginBottom: '0', fontWeight: 'bold' }}>News</p>
                  </div>
                </div>
              </Link>
            </Col>
            <Col xs={4} md={4} lg={4}>
              <Link to={'/displayleadership'} style={{ textDecoration: 'none' }}>
                <div className='box ' style={{ backgroundColor: `${bgcolor}`, position: 'relative' }}>
                  <div className='box-content p-4'>
                    <div style={{ position: 'absolute', top: '0', right: '0' }} className='me-3'>
                      <i className="fa-solid fa-square-arrow-up-right"></i>
                    </div>
                    <p style={{ fontSize: '13px', marginBottom: '0', fontWeight: 'bold' }}>Leadership</p>
                  </div>
                </div>
              </Link>
            </Col>
          </Row>
          <Row className='mt-3'>
          <Col xs={4} md={4} lg={4}>
              <Link to={'/displayarticle'} style={{ textDecoration: 'none' }}>
                <div className='box ' style={{ backgroundColor: `${bgcolor}`, position: 'relative' }}>
                  <div className='box-content p-4'>
                    <div style={{ position: 'absolute', top: '0', right: '0' }} className='me-3'>
                      <i className="fa-solid fa-square-arrow-up-right"></i>
                    </div>
                    <p style={{ fontSize: '13px', marginBottom: '0', fontWeight: 'bold' }}>Articles</p>
                  </div>
                </div>
              </Link>
            </Col>
            <Col xs={4} md={4} lg={4}>
              <Link to={'/displaycalender'} style={{ textDecoration: 'none' }}>
                <div className='box ' style={{ backgroundColor: `${bgcolor}`, position: 'relative' }}>
                  <div className='box-content p-4'>
                    <div style={{ position: 'absolute', top: '0', right: '0' }} className='me-3'>
                      <i className="fa-solid fa-square-arrow-up-right"></i>
                    </div>
                    <p style={{ fontSize: '13px', marginBottom: '0', fontWeight: 'bold' }}>Calender</p>
                  </div>
                </div>
              </Link>
            </Col>
            <Col xs={4} md={4} lg={4}>
              <Link to={'/displayad'} style={{ textDecoration: 'none' }}>
                <div className='box ' style={{ backgroundColor: `${bgcolor}`, position: 'relative' }}>
                  <div className='box-content p-4'>
                    <div style={{ position: 'absolute', top: '0', right: '0' }} className='me-3'>
                      <i className="fa-solid fa-square-arrow-up-right"></i>
                    </div>
                    <p style={{ fontSize: '13px', marginBottom: '0', fontWeight: 'bold' }}>ADs</p>
                  </div>
                </div>
              </Link>
            </Col>
          </Row>
          <Row className='mt-3'>
          <Col xs={4} md={4} lg={4}>
              <Link to={'/carousel'} style={{ textDecoration: 'none' }}>
                <div className='box ' style={{ backgroundColor: `${bgcolor}`, position: 'relative' }}>
                  <div className='box-content p-4'>
                    <div style={{ position: 'absolute', top: '0', right: '0' }} className='me-3'>
                      <i className="fa-solid fa-square-arrow-up-right"></i>
                    </div>
                    <p style={{ fontSize: '13px', marginBottom: '0', fontWeight: 'bold' }}>Carousel</p>
                  </div>
                </div>
              </Link>
            </Col>
            <Col xs={4} md={4} lg={4}>
              <Link to={'/'} style={{ textDecoration: 'none' }}>
                <div className='box ' style={{ backgroundColor: `${bgcolor}`, position: 'relative' }}>
                  <div className='box-content p-4'>
                    <div style={{ position: 'absolute', top: '0', right: '0' }} className='me-3'>
                      <i className="fa-solid fa-square-arrow-up-right"></i>
                    </div>
                    <p style={{ fontSize: '13px', marginBottom: '0', fontWeight: 'bold' }}>History</p>
                  </div>
                </div>
              </Link>
            </Col>
          </Row>
           </div>
      </div>
   </div>
  )
}

export default Third
