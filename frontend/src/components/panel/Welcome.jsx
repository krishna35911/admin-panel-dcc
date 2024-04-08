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

  const district = async (e, districtName,subname,bgcolor) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("basetoken");
      const res = await axios.get(`https://dcc-global-backend.plusitpark.com/api/admin/get-backend-url/${districtName}`, { headers: { "x-access-token": token } });
      if (res.status === 200 || res.status === 201) {
        console.log(res.data);
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("commonurl",res.data.url)
        localStorage.setItem("districtname",res.data.district)
        localStorage.setItem("subname",subname)
        localStorage.setItem("bgcolor",bgcolor)
        navigate("/district")
      } else {
        alert(res.response.data);
      }
    } catch (error) {
      console.log(error);
    }
   
  }
  useEffect(()=>
  {
    localStorage.setItem("volunteerurl","https://volunteer-backend.dmckpcc.in")
    // localStorage.setItem("commonurl","https://dcctcr-backend.plusitpark.com")
  },[])
  return (
    <div className='container'>
      <Sidebar/>
      <div className="justify-content-center align-items-center d-flex flex-column">
          <div className='justify-content-center align-items-center d-flex' style={{height: '100px',position: 'relative',width: '100%',overflow: 'hidden'}}>
          <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt=""  style={{position: 'absolute',width: '157%',left: '-34px'}} className='parentdiv'/>
          <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{zIndex: '10'}} />
           </div>
           <div className='d-flex justify-content-start flex-column content' >
          <p style={{fontSize: '20px', marginBottom: '0'}}>Welcome</p>
           <p style={{ fontSize: '25px', marginTop: '0',marginBottom: '0',fontWeight:'bold' }}>Jovin C Varghese</p>  
           <p style={{ fontSize: '15px', marginTop: '0' }}>Let’s Assign Task Across kerala</p>                
        </div>
        <div className='d-flex justify-content-center align-item-center flex-column rowdiv'>
             <Row>
             <Col xs={4} md={4} onClick={(e)=>district(e,'Thrissur','Sadhbhavana','rgba(63, 0, 126, 1)')}>
            <div className='box ' style={{ backgroundColor: 'rgba(63, 0, 126, 1)' }}>
              
              <div className='box-content ms-2'>
              <div className="text-end mb-3"> <i class="fa-solid fa-square-arrow-up-right"></i></div>
               <p style={{ fontSize: '13px', marginBottom: '0',fontWeight:'bold' }}>Thrissur</p>
               <p style={{ fontSize: '11px', marginTop: '0', opacity: '0.8' }}>Sadhbhavana</p>         
             </div>
            </div>
          </Col>
          <Col xs={4} md={4} onClick={(e)=>district(e,'Kozhikkode','Mahatma','rgba(5, 162, 255, 1)')}>
            <div className='box' style={{ backgroundColor: 'rgba(5, 162, 255, 1)' }}>
              <div className='box-content ms-2'>
              <p className='text-end '> <i class="fa-solid fa-square-arrow-up-right"></i></p>
              <p style={{ fontSize: '13px', marginBottom: '0',fontWeight:'bold' }}>Kozhikkode</p>
              <p style={{ fontSize: '11px', marginTop: '0', opacity: '0.8' }}>Mahatma</p>
              </div>
            </div>
          </Col>
          <Col xs={4} md={4} onClick={(e)=>district(e,'Kasaragode','Saravarsh','rgba(145, 0, 233, 1)')}>
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
             <Col xs={4} md={4} onClick={(e)=>district(e,'Kannur','Leader','rgba(250, 219, 60, 1)')}>
            <div className='box ' style={{ backgroundColor: 'rgba(250, 219, 60, 1)' }}>
              <div className='box-content  text-dark ms-2'>
              <p className='text-end ms-5'> <i class="fa-solid fa-square-arrow-up-right"></i></p>
              <p style={{ fontSize: '13px', marginBottom: '0',fontWeight:'bold' }}>Kannur</p>
              <p style={{ fontSize: '11px', marginTop: '0', opacity: '0.8' }}>Leader</p>
              </div>
            </div>
          </Col>
          <Col xs={4} md={4}  onClick={(e)=>district(e,'Palakkad','Netaji','rgba(146, 228, 152, 1)')}>
            <div className='box' style={{ backgroundColor: 'rgba(146, 228, 152, 1)' }}>
              <div className='box-content text-dark ms-2'>
              <p className='text-end ms-2'> <i class="fa-solid fa-square-arrow-up-right"></i></p>
              <p style={{ fontSize: '13px', marginBottom: '0',fontWeight:'bold' }}>Palakkad</p>
              <p style={{ fontSize: '11px', marginTop: '0', opacity: '0.8' }}>Netaji</p>
              </div>
            </div>
          </Col>
          <Col xs={4} md={4} onClick={(e)=>district(e,'Idukki','Samragni','rgba(255, 0, 168, 1)')}>
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
             <Col xs={4} md={4} onClick={(e)=>district(e,'Kollam','Charkha','rgba(22, 166, 122, 1)')}>
            <div className='box ' style={{ backgroundColor: 'rgba(22, 166, 122, 1)' }}>
              <div className='box-content'>
              <p className='text-end '> <i class="fa-solid fa-square-arrow-up-right"></i></p>
              <p style={{ fontSize: '13px', marginBottom: '0',fontWeight:'bold' }}>Kollam</p>
              <p style={{ fontSize: '11px', marginTop: '0', opacity: '0.8' }}>Charkha</p>
              </div>
            </div>
          </Col>
          <Col xs={4} md={4} onClick={(e)=>district(e,'Alappuzha','Indira Ji','rgba(99, 77, 233, 1)')}>
            <div className='box' style={{ backgroundColor: 'rgba(99, 77, 233, 1)' }}>
              <div className='box-content'>
              <p className='text-end '> <i class="fa-solid fa-square-arrow-up-right"></i></p>
              <p style={{ fontSize: '13px', marginBottom: '0',fontWeight:'bold' }}>Alappuzha</p>
              <p style={{ fontSize: '11px', marginTop: '0', opacity: '0.8' }}>Indira Ji</p>
              </div>
            </div>
          </Col>
          <Col xs={4} md={4} onClick={(e)=>district(e,'Wayanad','ChandraShekhar Azad','rgba(74, 108, 197, 1)')}>
            <div className='box' style={{ backgroundColor: 'rgba(74, 108, 197, 1)' }}>
              <div className='box-content '>
              <p className='text-end me-2'> <i className="fa-solid fa-square-arrow-up-right"></i></p>
              <p style={{ fontSize: '13px', marginBottom: '0',fontWeight:'bold' }}>Wayanad</p>
              <p style={{ fontSize: '10px', marginTop: '0', opacity: '0.8' }}>ChandraShekhar
             Azad</p>
              </div>
            </div>
          </Col>
          </Row>
          <Row className='mt-2'>
             <Col xs={4} md={4}  onClick={(e)=>district(e,'Pathanamthitta','1947','rgba(58, 255, 137, 1)')}>
            <div className='box ' style={{ backgroundColor: 'rgba(58, 255, 137, 1)' }}>
              <div className='box-content text-dark'>
              <p className='text-end me-2'> <i class="fa-solid fa-square-arrow-up-right"></i></p>
              <p style={{ fontSize: '13px', marginBottom: '0',fontWeight:'bold' }}>Pathanamthitta</p>
              <p style={{ fontSize: '11px', marginTop: '0', opacity: '0.8' }}>1947</p>
              </div>
            </div>
          </Col>
          <Col xs={4} md={4} onClick={(e)=>district(e,'Ernakulam','Swadeshi','rgba(148, 146, 228, 1)')}>
            <div className='box' style={{ backgroundColor: 'rgba(148, 146, 228, 1)' }}>
              <div className='box-content text-dark'>
              <p className='text-end '> <i class="fa-solid fa-square-arrow-up-right"></i></p>
              <p style={{ fontSize: '13px', marginBottom: '0',fontWeight:'bold' }}>Ernakulam</p>
              <p style={{ fontSize: '11px', marginTop: '0', opacity: '0.8' }}>Swadeshi</p>
              </div>
            </div>
          </Col>
          <Col xs={4} md={4} onClick={(e)=>district(e,'Malappuram','Quit India','rgba(252, 82, 255, 1)')}>
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
             <Col xs={4} md={4}  onClick={(e)=>district(e,'Kottayam','Sabarmati','rgba(32, 74, 138, 1)')}>
            <div className='box ' style={{ backgroundColor: 'rgba(32, 74, 138, 1)' }}>
              <div className='box-content'>
              <p className='text-end '> <i class="fa-solid fa-square-arrow-up-right"></i></p>
              <p style={{ fontSize: '13px', marginBottom: '0',fontWeight:'bold' }}>Kottayam</p>
              <p style={{ fontSize: '11px', marginTop: '0', opacity: '0.8' }}>Sabarmati</p>
              </div>
            </div>
          </Col>
          <Col xs={4} md={4} onClick={(e)=>district(e,'Thiruvananthapuram','Vandemataram','rgba(19, 142, 255, 1)')}>
            <div className='box' style={{ backgroundColor: 'rgba(19, 142, 255, 1)' }}>
              <div className='box-content'>
              <p className='text-end '> <i class="fa-solid fa-square-arrow-up-right"></i></p>
              <p style={{ fontSize: '13px', marginBottom: '0',fontWeight:'bold' }}>Trivandrum</p>
              <p style={{ fontSize: '11px', marginTop: '0', opacity: '0.8' }}>Vandemataram</p>
              </div>
            </div>
          </Col>
          <Col xs={4} md={4} >
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
