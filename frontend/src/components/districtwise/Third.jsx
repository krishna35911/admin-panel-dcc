import React from 'react'
import './Third.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';

function Third() {
  return (
   
   <div className='container'>
    <Sidebar/>
      <div className="justify-content-center align-items-center d-flex flex-column">
      <div className='justify-content-center align-items-center d-flex' style={{height: '100px',position: 'relative',width: '100%',overflow: 'hidden'}}>
          <img src="https://s3-alpha-sig.figma.com/img/e12a/201f/1ff5d23251e9bbcb40e0dbc3a92d94b8?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=abm~dupQEsoC-zbjjRBn-SRXk3ugthXQjEWV~nX8mnPvbD3WWtt6cuEpjgS08sQ3szx62ppCkRhoJN59g7pJd7T-54uA~t2DDfecerEtKFbh2bpgm-Ue4dTtRn0tXT-z20DcJw0dCJ22KB7teON-V1Ykc57-khKfLSIov5Kerg3IXPAccZsX~S6bKYn-tCVGgPeYPrXe-7TCdqST6~m1odcOThLnDmwE670xYJHIo58DnK6QyO6ww-2jVXDd4jM7pwrL788gbyPl5OgGCiB0KpUu~pYEPIvdjJrodzmMWBxD1UbJVrCsFi9Dcy9IUlw4YjespI8QxncHEV16rz-A1w__" alt=""  style={{position: 'absolute',width: '157%',left: '-34px'}} className='parentdiv'/>
          <img src="https://s3-alpha-sig.figma.com/img/cbaa/86c1/0bd516a2c261529503cc52ead310f66c?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NGg-LUUprl6urnuCI-QCseNR941sE1CbdDaVwKKqXY7llM3KZQx-JzHAjDxxIL7Qn9rh5yGUDotXUObCCb5qSCDoWKvcrjKd76OvV1jxYHCYTr0a8rLakmeE5G29XLX4lTAovHJ5tchcxH6lt3erN-kOKyUjY6-r47JlQm0GJP0qXQHnyfCtb1c~MmBKEhCTzRlf0n5TNvg4O7nGI1VXsGtu90nIjK7-0zPqY6D0djbMutfB9NfZWQaEi0ohRxefgxgEfMxglgTG76mRP6J8A0uFypuKinEwKxfqMf-Xr2suEVNKfP65Z7AXfUolSzkT4MeREyic-GwdVpWanJq~Xw__" alt="" width={'100px'} style={{zIndex: '10'}} />
           </div>
           <div className='d-flex justify-content-end flex-column content'>
          <p style={{fontSize: '20px', marginBottom: '0'}}>Welcome To Our E-Organizer Admin</p>  
           <p style={{ fontSize: '15px', marginTop: '0',fontWeight:'bold' }}>Sadhbhavana</p>         
        </div>
           <div className='d-flex justify-content-center align-item-center flex-column rowdiv'>
             <Row>
             <Col xs={4} md={4} lg={4}>
              <Link to={'/notification'} style={{ textDecoration: 'none' }}>
                <div className='box ' style={{ backgroundColor: 'rgba(63, 0, 126, 1)', position: 'relative' }}>
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
                <div className='box ' style={{ backgroundColor: 'rgba(63, 0, 126, 1)', position: 'relative' }}>
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
                <div className='box ' style={{ backgroundColor: 'rgba(63, 0, 126, 1)', position: 'relative' }}>
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
              <Link to={'/carousel'} style={{ textDecoration: 'none' }}>
                <div className='box ' style={{ backgroundColor: 'rgba(63, 0, 126, 1)', position: 'relative' }}>
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
              <Link to={'/socialmedia'} style={{ textDecoration: 'none' }}>
                <div className='box ' style={{ backgroundColor: 'rgba(63, 0, 126, 1)', position: 'relative' }}>
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
                <div className='box ' style={{ backgroundColor: 'rgba(63, 0, 126, 1)', position: 'relative' }}>
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
                <div className='box ' style={{ backgroundColor: 'rgba(63, 0, 126, 1)', position: 'relative' }}>
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
                <div className='box ' style={{ backgroundColor: 'rgba(63, 0, 126, 1)', position: 'relative' }}>
                  <div className='box-content p-4'>
                    <div style={{ position: 'absolute', top: '0', right: '0' }} className='me-3'>
                      <i className="fa-solid fa-square-arrow-up-right"></i>
                    </div>
                    <p style={{ fontSize: '13px', marginBottom: '0', fontWeight: 'bold' }}>Assignments</p>
                  </div>
                </div>
              </Link>
            </Col>
          <Col xs={4} md={4}>
            <div className='box' style={{ backgroundColor: 'rgba(63, 0, 126, 1)' }}>
              <div className='box-content p-4'>
              <p className='text-end '> <i class="fa-solid fa-square-arrow-up-right"></i></p>
              <p style={{ fontSize: '13px', marginBottom: '0',fontWeight:'bold' }}>Reports</p>
              </div>
            </div>
          </Col>
          </Row>
          <Row className='mt-2'>
          <Col xs={4} md={4} lg={4}>
              <Link to={'/displayslogan'} style={{ textDecoration: 'none' }}>
                <div className='box ' style={{ backgroundColor: 'rgba(63, 0, 126, 1)', position: 'relative' }}>
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
                <div className='box ' style={{ backgroundColor: 'rgba(63, 0, 126, 1)', position: 'relative' }}>
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
                <div className='box ' style={{ backgroundColor: 'rgba(63, 0, 126, 1)', position: 'relative' }}>
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
           </div>
      </div>
   </div>
  )
}

export default Third
