import React, { useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './DisplayLeadership.css'
import { Col, Row } from 'react-bootstrap';
import Homebutton from '../Homebutton';
function DispplayLeadership() {
  const [activeCategory, setActiveCategory] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [details, setdetails] = useState({
    "name": '',
    "position": '',
    "facebook": '',
    "instagram": '',
    "youtube": '',
    "image":''
  })
  const[allcategory,setallcategory]=useState([])
  const [url,seturl]=useState(localStorage.getItem("commonurl"))
  const bgcolor=localStorage.getItem("bgcolor")
  const navigate=useNavigate()
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

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };
  const handlecategory=async()=>
  {
          const token=localStorage.getItem("token")
          const res=await axios.get(`${url}/api/admin/get-social-category`,{headers:{"x-access-token":token}})
          if(res.status===200)
          {
             setallcategory(res.data);
          }
          else
          {
            console.log(res.response.data);
          }
  }
 
  const getleadership=async()=>
  {
    const token=localStorage.getItem("token")
    const res=await axios.get(`${url}/api/admin/leadership`,{headers:{"x-access-token":token}})
    if(res.status===200)
    {
       setCandidates(res.data);
       console.log(res.data);
       if (res.data.length > 0) {
        setActiveCategory(res.data[0].category); 
      }
    }
    else
    {
      console.log(res.response.data);
    }
  }


  const handledelete = async (e, candidate) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const itemId = candidate._id;
    try {
      const res = await axios.delete(
        `${url}/api/admin/delete-leadership/${itemId}`,
        { headers: { "x-access-token": token } }
      );
  
      if (res.status === 200 || res.status === 201) {
        toast.success('Deleted successfully');
        // Remove the deleted candidate from the candidates array
        setCandidates(prevCandidates =>
          prevCandidates.filter(c => c._id !== itemId)
        );
      } else {
        toast.error('Failed to delete');
      }
    } catch (error) {
      console.log(error);
    }
  };
  


  useEffect(()=>
  {
    handlecategory()
    getleadership()
  },[])



  return (
    <div className='container'>
      <Homebutton/>
      <div className='justify-content-center align-items-center d-flex flex-column'>
      <div className='justify-content-center align-items-center d-flex' style={{height: '100px',position: 'relative',width: '100%',overflow: 'hidden'}}>
          <img src="https://s3-alpha-sig.figma.com/img/e12a/201f/1ff5d23251e9bbcb40e0dbc3a92d94b8?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=abm~dupQEsoC-zbjjRBn-SRXk3ugthXQjEWV~nX8mnPvbD3WWtt6cuEpjgS08sQ3szx62ppCkRhoJN59g7pJd7T-54uA~t2DDfecerEtKFbh2bpgm-Ue4dTtRn0tXT-z20DcJw0dCJ22KB7teON-V1Ykc57-khKfLSIov5Kerg3IXPAccZsX~S6bKYn-tCVGgPeYPrXe-7TCdqST6~m1odcOThLnDmwE670xYJHIo58DnK6QyO6ww-2jVXDd4jM7pwrL788gbyPl5OgGCiB0KpUu~pYEPIvdjJrodzmMWBxD1UbJVrCsFi9Dcy9IUlw4YjespI8QxncHEV16rz-A1w__" alt=""  style={{position: 'absolute',width: '157%',left: '-34px'}} className='parentdiv'/>
          <img src="https://s3-alpha-sig.figma.com/img/cbaa/86c1/0bd516a2c261529503cc52ead310f66c?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NGg-LUUprl6urnuCI-QCseNR941sE1CbdDaVwKKqXY7llM3KZQx-JzHAjDxxIL7Qn9rh5yGUDotXUObCCb5qSCDoWKvcrjKd76OvV1jxYHCYTr0a8rLakmeE5G29XLX4lTAovHJ5tchcxH6lt3erN-kOKyUjY6-r47JlQm0GJP0qXQHnyfCtb1c~MmBKEhCTzRlf0n5TNvg4O7nGI1VXsGtu90nIjK7-0zPqY6D0djbMutfB9NfZWQaEi0ohRxefgxgEfMxglgTG76mRP6J8A0uFypuKinEwKxfqMf-Xr2suEVNKfP65Z7AXfUolSzkT4MeREyic-GwdVpWanJq~Xw__" alt="" width={'100px'} style={{zIndex: '10'}} />
           </div>
      <div className='row justify-content-center align-items-center d-flex mb-2 mt-3'>
        <h4 className='fw-bold'>Leadership</h4>
      </div>
      <div className='mb-2 mt-3'>
      <Row className='justify-content-center align-items-center d-flex w-100'>
            {[...new Set(candidates.map(candidate => candidate.category))].map(category => (
              <Col key={category} xs={4} md={3} className='me-auto'>
                <button
                  className={`btn text-light rounded-5 ${activeCategory === category ? 'active' : ''}`}
                  style={{ backgroundColor: `${bgcolor}`, width: '100%', marginBottom: '10px' }}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              </Col>
            ))}
          </Row>
      </div>
      {candidates.length > 0 ? (
          <ListGroup as="ol" numbered className="mb-2 p-2 w-100">
            {candidates.filter(candidate => candidate.category === activeCategory).map((candidate, index) => (
              <ListGroup.Item
                key={index}
                style={{ backgroundColor: 'rgba(227, 227, 227, 1)', borderBottom: '2px solid rgb(133, 129, 129, 0.553)' }}
                as="li"
                className="d-flex justify-content-between align-items-center"
              >
                <div className="ms-2">
                  <div className="fw-bold">{candidate.name}</div>
                </div>
                <button type='button' className='btn ms-3' onClick={(e) => handledelete(e, candidate)}>
                  <i className="fa-solid fa-trash" style={{ color: 'rgba(106, 106, 106, 1)' }}></i>
                </button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No candidates available.</p>
        )}

      <Link to={'/leadership'}><button className='btn mt-2 text-light' style={{backgroundColor:`${bgcolor}`}}><i class="fa-solid fa-plus me-2"></i>Add New member</button></Link>
  
    </div>
    <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

   </div>
  )
}

export default DispplayLeadership
