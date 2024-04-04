import React, { useEffect, useState } from 'react'
import './Welcome.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Sidebar from '../Sidebar';

function Welcome() {

  const[url,seturl]=useState(localStorage.getItem("baseurl"))
  const navigate=useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("basetoken");
    if (!token) {
      navigate("/");
    }
    axios
      .get(`${url}/api/admin/protected`, {
        headers: { "x-access-token": token },
      })
      .then((res) => {
        if (res.status !== 200) {
          localStorage.removeItem("basetoken");
          navigate("/");
        }
      })
      .catch(() => {
        localStorage.removeItem("basetoken");
        navigate("/");
      });
  }, []);

  useEffect(()=>
  {
    seturl(localStorage.getItem("baseurl"))
  },[])

  const district = async (e, districtName) => {
    console.log(districtName);
    const token = localStorage.getItem("basetoken");
    e.preventDefault();
    const res = await axios.get(`https://dcc-global-backend.plusitpark.com/api/admin/get-backend-url/${districtName}`, { headers: { "x-access-token": token } });
    if (res.status === 200 || res.status === 201) {
      console.log(res.data);
      localStorage.setItem("token",res.data.token)
      localStorage.setItem("commonurl",res.data.url)
      navigate("/district")
    } else {
      alert(res.response.data);
    }
  }
  return (
    <div className='container'>
      <Sidebar/>
      <div className="justify-content-center align-items-center d-flex flex-column">
          <div className='justify-content-center align-items-center d-flex' style={{height: '100px',position: 'relative',width: '100%',overflow: 'hidden'}}>
          <img src="https://s3-alpha-sig.figma.com/img/e12a/201f/1ff5d23251e9bbcb40e0dbc3a92d94b8?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=abm~dupQEsoC-zbjjRBn-SRXk3ugthXQjEWV~nX8mnPvbD3WWtt6cuEpjgS08sQ3szx62ppCkRhoJN59g7pJd7T-54uA~t2DDfecerEtKFbh2bpgm-Ue4dTtRn0tXT-z20DcJw0dCJ22KB7teON-V1Ykc57-khKfLSIov5Kerg3IXPAccZsX~S6bKYn-tCVGgPeYPrXe-7TCdqST6~m1odcOThLnDmwE670xYJHIo58DnK6QyO6ww-2jVXDd4jM7pwrL788gbyPl5OgGCiB0KpUu~pYEPIvdjJrodzmMWBxD1UbJVrCsFi9Dcy9IUlw4YjespI8QxncHEV16rz-A1w__" alt=""  style={{position: 'absolute',width: '157%',left: '-34px'}} className='parentdiv'/>
          <img src="https://s3-alpha-sig.figma.com/img/cbaa/86c1/0bd516a2c261529503cc52ead310f66c?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NGg-LUUprl6urnuCI-QCseNR941sE1CbdDaVwKKqXY7llM3KZQx-JzHAjDxxIL7Qn9rh5yGUDotXUObCCb5qSCDoWKvcrjKd76OvV1jxYHCYTr0a8rLakmeE5G29XLX4lTAovHJ5tchcxH6lt3erN-kOKyUjY6-r47JlQm0GJP0qXQHnyfCtb1c~MmBKEhCTzRlf0n5TNvg4O7nGI1VXsGtu90nIjK7-0zPqY6D0djbMutfB9NfZWQaEi0ohRxefgxgEfMxglgTG76mRP6J8A0uFypuKinEwKxfqMf-Xr2suEVNKfP65Z7AXfUolSzkT4MeREyic-GwdVpWanJq~Xw__" alt="" width={'100px'} style={{zIndex: '10'}} />
           </div>
           <div className='d-flex justify-content-start flex-column content' >
          <p style={{fontSize: '20px', marginBottom: '0'}}>Welcome</p>
           <p style={{ fontSize: '25px', marginTop: '0',marginBottom: '0',fontWeight:'bold' }}>Jovin C Varghese</p>  
           <p style={{ fontSize: '15px', marginTop: '0' }}>Let’s Assign Task Across kerala</p>                
        </div>
        <div className='d-flex justify-content-center align-item-center flex-column rowdiv'>
             <Row>
             <Col xs={4} md={4} onClick={(e)=>district(e,'Thrissur')}>
            <div className='box ' style={{ backgroundColor: 'rgba(63, 0, 126, 1)' }}>
              
              <div className='box-content ms-2'>
              <div className="text-end mb-3"> <i class="fa-solid fa-square-arrow-up-right"></i></div>
               <p style={{ fontSize: '13px', marginBottom: '0',fontWeight:'bold' }}>Thrissur</p>
               <p style={{ fontSize: '11px', marginTop: '0', opacity: '0.8' }}>Sadhbhavana</p>         
             </div>
            </div>
          </Col>
          <Col xs={4} md={4}>
            <div className='box' style={{ backgroundColor: 'rgba(5, 162, 255, 1)' }}>
              <div className='box-content ms-2'>
              <p className='text-end '> <i class="fa-solid fa-square-arrow-up-right"></i></p>
              <p style={{ fontSize: '13px', marginBottom: '0',fontWeight:'bold' }}>Kozhikkode</p>
              <p style={{ fontSize: '11px', marginTop: '0', opacity: '0.8' }}>Mahatma</p>
              </div>
            </div>
          </Col>
          <Col xs={4} md={4}>
            <div className='box' style={{ backgroundColor: 'rgba(145, 0, 233, 1)' }}>
              <div className='box-content ms-2'>
              <p className='text-end '> <i class="fa-solid fa-square-arrow-up-right"></i></p>
              <p style={{ fontSize: '13px', marginBottom: '0' ,fontWeight:'bold'}}>Kasaragode</p>
              <p style={{ fontSize: '11px', marginTop: '0', opacity: '0.8' }}>Saravarsh</p>
              </div>
            </div>
          </Col>
          </Row>
          <Row className='mt-2'>
             <Col xs={4} md={4}>
            <div className='box ' style={{ backgroundColor: 'rgba(250, 219, 60, 1)' }}>
              <div className='box-content  text-dark ms-2'>
              <p className='text-end ms-5'> <i class="fa-solid fa-square-arrow-up-right"></i></p>
              <p style={{ fontSize: '13px', marginBottom: '0',fontWeight:'bold' }}>Kannur</p>
              <p style={{ fontSize: '11px', marginTop: '0', opacity: '0.8' }}>Leader</p>
              </div>
            </div>
          </Col>
          <Col xs={4} md={4}>
            <div className='box' style={{ backgroundColor: 'rgba(146, 228, 152, 1)' }}>
              <div className='box-content text-dark ms-2'>
              <p className='text-end ms-2'> <i class="fa-solid fa-square-arrow-up-right"></i></p>
              <p style={{ fontSize: '13px', marginBottom: '0',fontWeight:'bold' }}>Palakkad</p>
              <p style={{ fontSize: '11px', marginTop: '0', opacity: '0.8' }}>Netaji</p>
              </div>
            </div>
          </Col>
          <Col xs={4} md={4}>
            <div className='box' style={{ backgroundColor: 'rgba(255, 0, 168, 1)' }}>
              <div className='box-content  text-dark ms-3'>
              <p className='text-end ms-5'> <i class="fa-solid fa-square-arrow-up-right"></i></p>
              <p style={{ fontSize: '13px', marginBottom: '0',fontWeight:'bold' }}>Idukki</p>
              <p style={{ fontSize: '11px', marginTop: '0', opacity: '0.8' }}>Samragni</p>
              </div>
            </div>
          </Col>
          </Row>
          <Row className='mt-2'>
             <Col xs={4} md={4} >
            <div className='box ' style={{ backgroundColor: 'rgba(22, 166, 122, 1)' }}>
              <div className='box-content'>
              <p className='text-end '> <i class="fa-solid fa-square-arrow-up-right"></i></p>
              <p style={{ fontSize: '13px', marginBottom: '0',fontWeight:'bold' }}>Kollam</p>
              <p style={{ fontSize: '11px', marginTop: '0', opacity: '0.8' }}>Chakra</p>
              </div>
            </div>
          </Col>
          <Col xs={4} md={4}>
            <div className='box' style={{ backgroundColor: 'rgba(99, 77, 233, 1)' }}>
              <div className='box-content'>
              <p className='text-end '> <i class="fa-solid fa-square-arrow-up-right"></i></p>
              <p style={{ fontSize: '13px', marginBottom: '0',fontWeight:'bold' }}>Alappuzha</p>
              <p style={{ fontSize: '11px', marginTop: '0', opacity: '0.8' }}>Indira Ji</p>
              </div>
            </div>
          </Col>
          <Col xs={4} md={4}>
            <div className='box' style={{ backgroundColor: 'rgba(74, 108, 197, 1)' }}>
              <div className='box-content '>
              <p className='text-end me-2'> <i className="fa-solid fa-square-arrow-up-right"></i></p>
              <p style={{ fontSize: '13px', marginBottom: '0',fontWeight:'bold' }}>Wayanad</p>
              <p style={{ fontSize: '10px', marginTop: '0', opacity: '0.8' }}>Chandrashekhar
             Azad</p>
              </div>
            </div>
          </Col>
          </Row>
          <Row className='mt-2'>
             <Col xs={4} md={4}>
            <div className='box ' style={{ backgroundColor: 'rgba(58, 255, 137, 1)' }}>
              <div className='box-content text-dark'>
              <p className='text-end me-2'> <i class="fa-solid fa-square-arrow-up-right"></i></p>
              <p style={{ fontSize: '13px', marginBottom: '0',fontWeight:'bold' }}>Pathanamthitta</p>
              <p style={{ fontSize: '11px', marginTop: '0', opacity: '0.8' }}>1947</p>
              </div>
            </div>
          </Col>
          <Col xs={4} md={4}>
            <div className='box' style={{ backgroundColor: 'rgba(148, 146, 228, 1)' }}>
              <div className='box-content text-dark'>
              <p className='text-end '> <i class="fa-solid fa-square-arrow-up-right"></i></p>
              <p style={{ fontSize: '13px', marginBottom: '0',fontWeight:'bold' }}>Ernakulam</p>
              <p style={{ fontSize: '11px', marginTop: '0', opacity: '0.8' }}>Swadeshi</p>
              </div>
            </div>
          </Col>
          <Col xs={4} md={4}>
            <div className='box' style={{ backgroundColor: 'rgba(252, 82, 255, 1)' }}>
              <div className='box-content text-dark'>
              <p className='text-end '> <i class="fa-solid fa-square-arrow-up-right"></i></p>
              <p style={{ fontSize: '13px', marginBottom: '0',fontWeight:'bold' }}>Malappuram</p>
              <p style={{ fontSize: '11px', marginTop: '0', opacity: '0.8' }}>Quit India</p>
              </div>
            </div>
          </Col>
          </Row>
          <Row className='mt-2'>
             <Col xs={4} md={4} >
            <div className='box ' style={{ backgroundColor: 'rgba(32, 74, 138, 1)' }}>
              <div className='box-content'>
              <p className='text-end '> <i class="fa-solid fa-square-arrow-up-right"></i></p>
              <p style={{ fontSize: '13px', marginBottom: '0',fontWeight:'bold' }}>Kottayam</p>
              <p style={{ fontSize: '11px', marginTop: '0', opacity: '0.8' }}>Sabarmati</p>
              </div>
            </div>
          </Col>
          <Col xs={4} md={4}>
            <div className='box' style={{ backgroundColor: 'rgba(19, 142, 255, 1)' }}>
              <div className='box-content'>
              <p className='text-end '> <i class="fa-solid fa-square-arrow-up-right"></i></p>
              <p style={{ fontSize: '13px', marginBottom: '0',fontWeight:'bold' }}>Ernakulam</p>
              <p style={{ fontSize: '11px', marginTop: '0', opacity: '0.8' }}>Vandemataram</p>
              </div>
            </div>
          </Col>
          <Col xs={4} md={4}>
            <div className='box' style={{ backgroundColor: 'rgba(16, 0, 113, 1)' }}>
              <div className='box-content ms-4'>
              <p className='text-end ms-5 me-2'> <i class="fa-solid fa-square-arrow-up-right"></i></p>
              <p style={{ fontSize: '13px', marginBottom: '0' ,fontWeight:'bold'}}>To Do </p>
              <p style={{ fontSize: '11px', marginTop: '0', opacity: '0.8' }}>List</p>
              </div>
            </div>
          </Col>
          </Row>
        </div>
      </div>
    </div>

  )
}

export default Welcome
