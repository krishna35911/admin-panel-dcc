import React, { useEffect, useState } from 'react'
import './Displaycandidates.css'
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton';

function Displaycandidates() {
  const [activeButton, setActiveButton] = useState('');
  const[social,setsocial]=useState("")
  const[preview,setpreview]=useState("")
  const [candidates, setCandidates] = useState([]);
  const [details, setdetails] = useState({
    "name": '',
    "position": '',
    "facebook": '',
    "instagram": '',
    "youtube": '',
    "image":''
  })
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
 
  const getcategory = async (categoryName) => {
    setActiveButton(categoryName);
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`${url}/api/admin/get-social-media?category=${categoryName}`, {
        headers: { 'x-access-token': token },
      });
      if (res.status === 200 || res.status === 201) {
        setsocial(res.data)
        setCandidates(res.data.socialMediaSchema);
      } else {
        console.log(res.response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(social);
  const updatemedia=async(e,candidate)=>
  {
    e.preventDefault()
    setdetails({
    itemid:candidate._id,
    name: candidate.name,
    position: candidate.position,
    facebook: candidate.facebook,
    instagram: candidate.instagram,
    youtube: candidate.youtube,
    image:candidate.image
    })
  }

  const savechanges=async(e)=>
  {
    e.preventDefault()
    const token=localStorage.getItem("token")
    const itemId=details.itemid
    const socialId=social._id
    const formdata=new FormData()
    formdata.append("name",details.name)
    formdata.append("position",details.position)
    formdata.append("facebook",details.facebook)
    formdata.append("instagram",details.instagram)
    formdata.append("youtube",details.youtube)
    formdata.append("image",details.image)
    const header={
      "Content-Type":"multipart/form-data",
      "x-access-token":token
    }
    const res=await axios.post(`${url}/api/admin/update-social-media-details/${socialId}/${itemId}`,formdata,{headers:header})
    if(res.status===200 || res.status===201)
    {
      toast.success("Candidate Updated Successfully")
      setdetails((
        {
          name: '',
          position: '',
          facebook: '',
          instagram: '',
          youtube: '',
          image:''
        }
      ))
      setpreview("")
    }
    else
    {
      toast.error(res.response.data);
    }
  }

  const handledelete = async (e, candidate) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const socialId = social._id;
    const itemId = candidate._id;
  console.log(socialId,itemId);
    try {
      const res = await axios.delete(
        `${url}/api/admin/delete-social-media-details/${socialId}/${itemId}`,
        { headers: { "x-access-token": token } }
      );
  
      if (res.status === 200 || res.status === 201) {
        // Remove the deleted candidate from the candidates array
        toast.success('Deleted successfully');
        setCandidates(prevCandidates =>
          prevCandidates.filter(c => c._id !== itemId)
        );
      } else {
        toast.error(res.response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleclick=(e,candidate)=>
  {
    e.preventDefault()
    updatemedia(e,candidate)
    handleShow(e)
  }

  useEffect(()=>
  {
    handlecategory()
  },[])


  useEffect(() => {
    if (allcategory.length > 0) {
      const firstCategory = allcategory[0]; 
      getcategory(firstCategory); 
    }
  }, [allcategory]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setdetails({ ...details, image: file });
      setpreview(URL.createObjectURL(file)); // Create URL for preview
    }
  };
  return (
   <div className='container'>
    <Homebutton/>
      <div className='justify-content-center align-items-center d-flex flex-column'>
      <div className='justify-content-center align-items-center d-flex' style={{ height: '100px', position: 'relative', width: '100%', overflow: 'hidden' }}>
          <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt="" style={{ position: 'absolute', width:'130%',rotate:'-7deg',objectFit:'contain', objectPosition:'center',left: '-34px' }} className='parentdiv' />
          <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{ zIndex: '10' }} />
      </div>

      <div className='mb-2 mt-3 justify-content-center align-items-center d-flex w-100' >
      {allcategory?.length > 0 && allcategory.map((item, index) => (
        <div key={index} >
          <button
            className={`btn text-light rounded-5  ${activeButton === item ? 'active' : ''}`}
            style={{ backgroundColor: `${bgcolor}`, marginBottom: '10px' }}
            onClick={() => getcategory(item)}
          >
            {item}
          </button>
        </div>
      ))}
      </div>
      {candidates?.length > 0 ? (
  <ListGroup as="ol" numbered className="mb-2 p-2 w-100">
    {candidates.map((candidate, index) => (
      <ListGroup.Item
        key={index}
        style={{ backgroundColor: 'rgba(227, 227, 227, 1)', borderBottom: '2px solid rgb(133, 129, 129, 0.553)' }}
        as="li"
        className="d-flex justify-content-between align-items-center"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{candidate.name}</div>
        </div>
        <button type='button' className='btn' onClick={(e)=>handleclick(e,candidate)}> <i class="fa-solid fa-pen" style={{ color: 'rgba(106, 106, 106, 1)' }}></i></button>
        <button type='button' className='btn'onClick={(e)=>handledelete(e,candidate)}><i class="fa-solid fa-trash"  style={{ color: 'rgba(106, 106, 106, 1)' }}></i></button>
      </ListGroup.Item>
    ))}
  </ListGroup>
) : (
  <p>No candidates available.</p>
)}


        <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className=' p-3 w-100  justify-content-center align-items-center d-flex flex-column rounded'>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
                          Image
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="image"
                          placeholder="image"
                          name="image"
                          onChange={handleFileChange}
                        />
                      </div>
            <input type="text" placeholder='Name' className='form-control mt-3' value={details.name} onChange={(e)=>setdetails({...details,name:e.target.value})}/>
            <input type="text" placeholder='Position' className='form-control mt-3' value={details.position} onChange={(e)=>setdetails({...details,position:e.target.value})}/>
            <input type="text" className='form-control mt-3' placeholder='Instagram' value={details.instagram} onChange={(e)=>setdetails({...details,instagram:e.target.value})}/>
            <input type="text" className='form-control mt-3' placeholder='Facebook' value={details.facebook} onChange={(e)=>setdetails({...details,facebook:e.target.value})}/>
            <input type="text" className='form-control mt-3' placeholder='Youtube' value={details.youtube} onChange={(e)=>setdetails({...details,youtube:e.target.value})}/>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e)=>savechanges(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Link to={'/socialmedia2'}><button className='btn mt-2 text-light' style={{backgroundColor:`${bgcolor}`}}><i class="fa-solid fa-plus me-2"></i>Add New member</button></Link>
  
    </div>
    <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

   </div>
  )
}

export default Displaycandidates
