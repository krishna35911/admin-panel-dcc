import React, { useEffect, useState } from 'react'
import  './Getvolunteers.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Collapse from 'react-bootstrap/Collapse';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton';
import { ListGroup } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Pagination from 'react-bootstrap/Pagination';

function Getvolunteers() {
    const[alldetails,setalldetails]=useState({})
    const [activeButton, setActiveButton] = useState('request'); 
    const [approveddetails,setapprovedetails]=useState([])
    const [searchdetails, setSearchdetails] = useState([]);
    const navigate=useNavigate()
    const location = useLocation();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [url,seturl]=useState(localStorage.getItem("volunteerurl"))
    const bgcolor=localStorage.getItem("bgcolor")
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
    useEffect(() => {
        if (location.state && location.state.searchdetails) {
          setSearchdetails(location.state.searchdetails);
        }
      }, [location.state]);

      useEffect(() => {
        if (location.state && location.state.approveddetails) {
          setapprovedetails(location.state.approveddetails);
        }
      }, [location.state]);
    
const getdetails=async(e,id)=>
{
  e.preventDefault()
  const res=await axios.get(`${url}/api/admin/volunteer/${id}`,{headers:{"x-access-token":localStorage.getItem("volunteertoken")}})
  if(res.status===200)
  {
    setalldetails(res.data)
  }
  else
  {
    console.log(res.response.data)
  }
}


    const accept = async (e, id) => {
        e.preventDefault();
        const token = localStorage.getItem("volunteertoken");
        try {
          const headers = {
            "x-access-token": token
          };
          const res = await axios.put(`${url}/api/admin/verify-volunteer/${id}`, null, { headers });
          if (res.status === 200) {
            toast.success('Verified successfully');
            handleClose();
          } else {
            toast.error('Failed to verify');
          }
        } catch (error) {
          console.error('Error verifying volunteer:', error);
          toast.error('Failed to verify volunteer');
        }
      };
      
    const decline=async(e,id)=>
    {
      const token=localStorage.getItem("volunteertoken")
      e.preventDefault()
        const res=await axios.delete(`${url}/api/admin/delete-volunteer/${id}`,{headers:{"x-access-token":token}})
        if(res.status===200)
        {
          toast.success('Deleted successfully')
          handleClose()
        }
        else
        {
          toast.error('Failed to delete')
        }
    }
    const deleteapproved=async(e,id)=>
    {
      const token=localStorage.getItem("volunteertoken")
      e.preventDefault()
        const res=await axios.delete(`${url}/api/admin/delete-volunteer/${id}`,{headers:{"x-access-token":token}})
        if(res.status===200)
        {
          toast.success('Deleted successfully')
          handleClose()
        }
        else
        {
          toast.error('Failed to delete')
        }
    }
    const handledetails = (e,id) => {
        handleShow()
        getdetails(e,id)
      };
      const handleButtonClick = (buttonType) => {
        setActiveButton(buttonType);
      };
  return (
    <div className='container'>
        <Homebutton/>
        <div className=' justify-content-center align-items-center d-flex flex-column'>
              <div className='justify-content-center align-items-center d-flex' style={{ height: '100px', position: 'relative', width: '100%', overflow: 'hidden' }}>
              <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt="" style={{ position: 'absolute', width:'130%',rotate:'-7deg',objectFit:'contain', objectPosition:'center',left: '-34px' }} className='parentdiv' />
              <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{ zIndex: '10' }} />
          </div>
          <div className='mb-2 mt-3 justify-content-between d-flex'>
          <div>
            <button
              className={`btn text-light rounded-5 ${activeButton === 'request' ? 'active' : ''}`}
              style={{ backgroundColor: `${bgcolor}`, marginBottom: '10px' }}
              onClick={() => handleButtonClick('request')}
            >
              Request
            </button>
            <button
              className={`btn text-light rounded-5 ms-5 ${activeButton === 'approved' ? 'active' : ''}`}
              style={{ backgroundColor: `${bgcolor}`, marginBottom: '10px' }}
              onClick={() => handleButtonClick('approved')}
            >
              Approved
            </button>
          </div>
        </div>
        <ListGroup className='w-100'>
          {(activeButton === 'request' && searchdetails.length > 0) ||
          (activeButton === 'approved' && approveddetails.length > 0) ? (
            (activeButton === 'request' ? searchdetails : approveddetails).map((item, index) => (
              <ListGroup.Item
                key={index}
                style={{ backgroundColor: 'rgba(227, 227, 227, 1)', borderBottom: '2px solid rgb(133, 129, 129, 0.553)' }}
                as='li'
              >
                <div className='d-flex justify-content-start gap-5 align-items-center w-100'>
                  <p>{index + 1}</p>
                  <div>
                    <button className='btn fw-bold' type='button' onClick={(e) => handledetails(e, item._id)}>
                      {item.name}
                    </button>
                  </div>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <p>No volunteer details found</p>
          )}
        </ListGroup>
            <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton style={{border:'none'}}>
            </Modal.Header>
            <Modal.Body>
            <div className="details-container">
                <p><strong>Name:</strong> {alldetails.name}</p>
                <p><strong>Mobile:</strong> {alldetails.phone}</p>
                <p><strong>Email:</strong> {alldetails.email}</p>
                <p><strong>District:</strong> {alldetails.district}</p>
                <p><strong>Loksabha:</strong> {alldetails.loksabha}</p>
                <p><strong>Assembly:</strong> {alldetails.constituency}</p>
                <p><strong>Mandalam:</strong> {alldetails.assembly}</p>
                <p><strong>Booth:</strong> {alldetails.booth}</p>
            </div>
            </Modal.Body>
           { activeButton==='request' ? <Modal.Footer style={{border:'none'}}>
              <Button variant="success" onClick={(e)=>accept(e,alldetails._id)}>
                Accept
              </Button>
              <Button variant="danger" onClick={(e)=>decline(e,alldetails._id)}>
                Decline
              </Button>
            </Modal.Footer>:<Modal.Footer style={{border:'none'}}>
              <Button variant="danger" onClick={(e)=>deleteapproved(e,alldetails._id)}>
                Delete
              </Button>
            </Modal.Footer>}
          </Modal>
        </div>
    </div>
  )
}

export default Getvolunteers
