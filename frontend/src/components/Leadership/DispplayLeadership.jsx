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
          <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt=""  style={{position: 'absolute',width: '157%',left: '-34px'}} className='parentdiv'/>
          <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{zIndex: '10'}} />
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
