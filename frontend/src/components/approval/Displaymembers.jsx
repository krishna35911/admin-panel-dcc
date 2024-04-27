import React, { useEffect, useState } from 'react'
import  './Displaymembers.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton';
import { ListGroup } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getColorForDistrict } from '../Districtcolor';

function Displaymembers() {
    const[assembly,setassembly]=useState([])
    const[assembly1,setassembly1]=useState([])
    const[loksabha,setloksabha]=useState([])
    const [open, setOpen] = useState(false);
    const[searchdetails,setsearchdetails]=useState([])
    const [showButtons, setShowButtons] = useState(false)
    const[approveddetails,setapproveddetails]=useState([])
    const [activeButton, setActiveButton] = useState('request'); 
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
    const[mandalam,setmandalam]=useState([])
    const[mandalam1,setmandalam1]=useState([])
    const[booth,setbooth]=useState([])
    const[booth1,setbooth1]=useState([])
    const[data,setdata]=useState({
      assemblyname:"",
      mandalamname:"",
      boothname:"",
      taskforce:""
    })
    const[alldetails,setalldetails]=useState({})
    const[udetails,setudetails]=useState({
      name:"",
      email:"",
      phone:"",
      constituency:"",
      loksabha:"",
      assembly:"",
      mandalam:"",
      booth:"",
      gender:"",
      address:"",
      boothRule: [],
      district:"",
      mandalamMember:"",
      mandalamPresident:"",
      password:"",
      gender:"",
      address:""
    })
    const navigate=useNavigate()
    const [url,seturl]=useState(localStorage.getItem("volunteerurl"))
    const [url1,seturl1]=useState(localStorage.getItem("commonurl"))
    const bgcolor=localStorage.getItem("bgcolor")
    const textcolor=getColorForDistrict()
    useEffect(()=>
    {
      seturl(localStorage.getItem("volunteerurl"))
      seturl1(localStorage.getItem("commonurl"))
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

    const handleassembly=async()=>
    {
      const token=localStorage.getItem("volnteertoken")
      const districtname=localStorage.getItem("districtname")
      const res=await axios.get(`${url}/api/admin/state-districtV1?district=${districtname}`,{headers:{"x-access-token":token}})
      if(res.status===200)
      {
        setassembly(res.data)
      }
      else
      {
        console.log(res.response.data)
      }
    }

    const handleloksabha=async()=>
    {
      const token1=localStorage.getItem("token")
      const {district}=udetails
      const res=await axios.get(`${url1}/api/admin/districtV4?district=${district}`,{headers:{"x-access-token":token1}})
      if(res.status===200)
      {
        setloksabha(res.data)
      }
      else
      {
        console.log(res.response.data)
      }
    }

    const handleassemblyedit=async()=>
    {
      const token1=localStorage.getItem("token")
      const {district,loksabha}=udetails
      const res=await axios.get(`${url1}/api/admin/districtV4?district=${district}&constituency=${loksabha}`,{headers:{"x-access-token":token1}})
      if(res.status===200)
      {
        setassembly1(res.data)
        console.log(res.data);
      }
      else
      {
        console.log(res.response.data)
      }
    }
    
    const handlemandalam=async()=>
    {
      const token=localStorage.getItem("volnteertoken")
      const districtname=localStorage.getItem("districtname")
      const{assemblyname}=data
      const res=await axios.get(`${url}/api/admin/state-districtV1?district=${districtname}&constituency=${assemblyname}`,{headers:{"x-access-token":token}})
      if(res.status===200)
      {
        setmandalam(res.data)
      }
      else
      {
        console.log(res.response.data)
      }
    }

    const handlemandalamedit=async()=>
    {
      const token=localStorage.getItem("volnteertoken")
      const districtname=localStorage.getItem("districtname")
      const{constituency}=udetails
      const res=await axios.get(`${url}/api/admin/state-districtV1?district=${districtname}&constituency=${constituency}`,{headers:{"x-access-token":token}})
      if(res.status===200)
      {
        setmandalam1(res.data)
      }
      else
      {
        console.log(res.response.data)
      }
    }

    const handlebooth=async()=>
    {
      const token=localStorage.getItem("volunteertoken")
      const districtname=localStorage.getItem("districtname")
      const{assemblyname,mandalamname}=data
      const res=await axios.get(`${url}/api/admin/state-districtV1?district=${districtname}&constituency=${assemblyname}&assembly=${mandalamname}`,{headers:{"x-access-token":token}})
      if(res.status===200)
      {
        setbooth(res.data)
      }
      else
      {
        console.log(res.response.data)
      }
    }

    const handleboothedit=async()=>
    {
      const token=localStorage.getItem("volunteertoken")
      const districtname=localStorage.getItem("districtname")
      const{assembly,constituency}=udetails
      const res=await axios.get(`${url}/api/admin/state-districtV1?district=${districtname}&constituency=${constituency}&assembly=${assembly}`,{headers:{"x-access-token":token}})
      if(res.status===200)
      {
        setbooth1(res.data)
      }
      else
      {
        console.log(res.response.data)
      }
    }

    const handleclick=async()=>
    {
      const token = localStorage.getItem('volunteertoken');
      const districtname = localStorage.getItem('districtname');
      const { assemblyname, mandalamname, boothname, taskforce } = data;
      let query = '';
      if (districtname) {
        query += `district=${districtname}`;
      }
      if (assemblyname) {
        query += `&constituency=${assemblyname}`;
      }
      if (mandalamname) {
        query += `&assembly=${mandalamname}`;
      }
      if (boothname) {
        query += `&booth=${boothname}`;
      }
      if (taskforce) {
        query += `&power=${taskforce}`;
      }
      try {
        const res = await axios.get(`${url}/api/admin/volunteers-not-verified?page=1&perPage=10&${query}`, {
          headers: { 'x-access-token': token },
        });
        if(res.status===200 || res.status===201)
        {
          setsearchdetails(res.data.data);
          setShowButtons(true);
          // navigate('/approved', { state: { searchdetails: res.data.data } });
          setdata({
            assemblyname: "",
            mandalamname: "",
            boothname: "",
            taskforce: "",
          })
        }
        else
        {
          console.log(res.response.data);
        }
      } catch (error) {
        console.error('Error fetching volunteer data:', error);
        toast.error('Failed to fetch volunteer data');
      }
    };

    const handleapproved=async()=>
    {
      const token = localStorage.getItem('volunteertoken');
      const districtname = localStorage.getItem('districtname');
      const { assemblyname, mandalamname, boothname, taskforce } = data;
      let query = '';
      if (districtname) {
        query += `district=${districtname}`;
      }
      if (assemblyname) {
        query += `&constituency=${assemblyname}`;
      }
      if (mandalamname) {
        query += `&assembly=${mandalamname}`;
      }
      if (boothname) {
        query += `&booth=${boothname}`;
      }
      if (taskforce) {
        query += `&power=${taskforce}`;
      }
      try {
        // console.log(assemblyname);
        // console.log(mandalamname);
        const res = await axios.get(`${url}/api/admin/volunteers?${query}`, {
          headers: { 'x-access-token': token },
        });
        if(res.status===200 || res.status===201)
        {
          setapproveddetails(res.data.data);
          setShowButtons(true);
          // navigate('/approved', { state: { approveddetails: res.data.data } });
          setdata({
            assemblyname: "",
            mandalamname: "",
            boothname: "",
            taskforce: "",
          })
        }
        else
        {
          console.log(res.response.data);
        }
      } catch (error) {
        console.error('Error fetching volunteer data:', error);
        toast.error('Failed to fetch volunteer data');
      }
    };


 useEffect(()=>
 {
  handleassembly()
 },[])

 useEffect(()=>
{
  if(data.assemblyname)
  {
    handlemandalam()
  }
},[data.assemblyname])

useEffect(()=>
{
  if(data.mandalamname)
  {
    handlebooth()
  }
},[data.mandalamname])


useEffect(()=>
{
  if(udetails.district)
  {
    handleloksabha()
  }
},[udetails.district])

useEffect(()=>
{
  if(udetails.loksabha)
  {
    handleassemblyedit()
  }
},[udetails.loksabha])


useEffect(()=>
{
  if(udetails.constituency)
  {
    handlemandalamedit()
  }
},[udetails.constituency])

useEffect(()=>
{
  if(udetails.assembly)
  {
    handleboothedit()
  }
},[udetails.assembly])





const handleButtonClick = () => {
  setOpen(!open);
  handleclick()
  handleapproved()
};
  
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
          setsearchdetails(prevDetails => prevDetails.filter(item => item._id !== id));
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
           setapproveddetails(prevDetails => prevDetails.filter(item => item._id !== id));
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
const handlebuttonClick = (buttonType) => {
  setActiveButton(buttonType);
};

const handleedit = (e,userdetails) => {
  handleClose()
   handleShow1()
  editapproved(e,userdetails)
};

const editapproved=async(e,userdetails)=>
{
  e.preventDefault()

  setudetails({
    volunteerId:userdetails._id,
    name:userdetails.name,
    email:userdetails.email,
    phone:userdetails.phone,
    gender:userdetails.gender,
    address:userdetails.address,
    district:userdetails.district,
    constituency:"",
    loksabha:"",
    assembly:"",
    booth:"",
    password:userdetails.password,
    mandalamMember:userdetails.mandalamMember,
    mandalamPresident:userdetails.mandalamPresident
  })
}

useEffect(() => {
  const boothValue = udetails.booth;
  const boothRuleArray = boothValue ? [`"${boothValue}"`] : [];
  
  setudetails(prevState => ({
    ...prevState,
    boothRule: boothRuleArray
  }));
}, [udetails.booth]); 

const handleeditdetails=async()=>
{
  const token=localStorage.getItem("volunteertoken")
  const res=await axios.post(`${url}/api/admin/update-volunteer`,{...udetails},{headers:{"x-access-token":token}})
  if(res.status===200)
  {
    toast.success('Updated successfully')
    handleClose1()
    handleapproved()
  }
  else
  {
    toast.error('Failed to update')
  }
}

  return (
    <div className='container'>
    <Homebutton/>
      <div className=' justify-content-center align-items-center d-flex flex-column'>
      <div className='justify-content-center align-items-center d-flex' style={{ height: '100px', position: 'relative', width: '100%', overflow: 'hidden' }}>
          <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt="" style={{ position: 'absolute', width:'130%',rotate:'-7deg',objectFit:'contain', objectPosition:'center',left: '-34px' }} className='parentdiv' />
          <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{ zIndex: '10' }} />
      </div>
      {showButtons === true ? 
      (
        <>
        <div className='mb-2 mt-3 justify-content-between d-flex'>
        <div>
          <button
            className={`btn rounded-5 ${activeButton === 'request' ? 'active' : ''}`}
            style={{ backgroundColor: `${bgcolor}`, marginBottom: '10px',color:`${textcolor}` }}
            onClick={() => handlebuttonClick('request')}
          >
            Request
          </button>
          <button
            className={`btn rounded-5 ms-5 ${activeButton === 'approved' ? 'active' : ''}`}
            style={{ backgroundColor: `${bgcolor}`, marginBottom: '10px' ,color:`${textcolor}`}}
            onClick={() => handlebuttonClick('approved')}
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
            <Button variant="warning" onClick={(e)=>handleedit(e,alldetails)}>
              Edit
            </Button>
          </Modal.Footer>}
        </Modal>

        <Modal show={show1} onHide={handleClose1} centered>
        <Modal.Header closeButton style={{border:'none'}}>
          <Modal.Title>Edit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
          <input type="text" value={udetails.name} onChange={(e)=>{setudetails({...udetails,name:e.target.value})}} className='form-control mb-3'/>

          <input type="tel" value={udetails.phone} onChange={(e)=>{setudetails({...udetails,phone:e.target.value})}} className='form-control mb-3' />

          <input type="email" value={udetails.email} onChange={(e)=>{setudetails({...udetails,email:e.target.value})}} className='form-control mb-3' />

          <select class="form-select" aria-label="Default select example" value={udetails.loksabha} onChange={(e)=>{setudetails({...udetails,loksabha:e.target.value})}} >
          <option selected value="">Select loksabha</option>
          {loksabha?.length>0?loksabha.map((item,index)=>(<option key={index} value={item}>{item}</option>)):<option value="no data">no data</option>}
        </select>

          <select class="form-select mt-3" aria-label="Default select example" value={udetails.constituency} onChange={(e)=>{setudetails({...udetails,constituency:e.target.value})}} >
          <option selected value="">Select assembly</option>
          {assembly1?.length>0?assembly1.map((item,index)=>(<option key={index} value={item}>{item}</option>)):<option value="no data">no data</option>}
        </select>

        <select class="form-select mt-3" aria-label="Default select example" value={udetails.assembly} onChange={(e)=>{setudetails({...udetails,assembly:e.target.value})}} >
        <option selected value="">Select mandalam</option>
        {mandalam1?.length>0?mandalam1.map((item,index)=>(<option key={index} value={item}>{item}</option>)):<option value=""></option>}
      </select>

        <select class="form-select mt-3" aria-label="Default select example" value={udetails.booth} onChange={(e)=>{setudetails({...udetails,booth:e.target.value})}} >
        <option selected value="">Select booth</option>
        {booth1?.length>0?booth1.map((item,index)=>(<option key={index} value={item.number}>{item.number}</option>)):<option value=""></option>}
      </select>

        </form>
        </Modal.Body>
        <Modal.Footer style={{border:'none'}}>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={handleeditdetails}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </>
      )  :
      <form style={{backgroundColor:'rgba(227, 227, 227, 1)'}} className='mb-5 p-3 w-100  justify-content-center align-items-center d-flex flex-column rounded'>
      <select class="form-select" aria-label="Default select example" value={data.assemblyname} onChange={(e)=>{setdata({...data,assemblyname:e.target.value})}} >
        <option selected value="">Select assembly</option>
        {assembly?.length>0?assembly.map((item,index)=>(<option key={index} value={item}>{item}</option>)):<option value="no data">no data</option>}
      </select>
      <select class="form-select mt-3" aria-label="Default select example" value={data.mandalamname} onChange={(e)=>{setdata({...data,mandalamname:e.target.value})}} >
        <option selected value="">Select mandalam</option>
        {mandalam?.length>0?mandalam.map((item,index)=>(<option key={index} value={item}>{item}</option>)):<option value=""></option>}
      </select>
      <select class="form-select mt-3" aria-label="Default select example" value={data.boothname} onChange={(e)=>{setdata({...data,boothname:e.target.value})}} >
        <option selected value="">Select booth</option>
        {booth?.length>0?booth.map((item,index)=>(<option key={index} value={item.number}>{item.number}</option>)):<option value=""></option>}
      </select>
      {data.boothname && <select class="form-select mt-3" aria-label="Default select example" value={data.taskforce} onChange={(e)=>{setdata({...data,taskforce:e.target.value})}} >
        <option selected value="">Select Taskforce</option>
        <option value="DTF">DTF</option>
        <option value="ATF">ATF</option>
        <option value="MTF">MTF</option>
        <option value="BTF">BTF</option>
      </select>}
      <button
        type='button'
        className='btn mt-4 w-50'
        onClick={handleButtonClick}
        style={{ backgroundColor: `${bgcolor}` ,color:`${textcolor}`}}
      >
        Search
      </button>
      </form>
      }
      {/* <Collapse in={open} className='w-100'>
        <div id="example-collapse-text">
        <ListGroup className='w-100' >
          {searchdetails?.length>0?
          searchdetails.map((item,index)=>(<ListGroup.Item key={index}  style={{backgroundColor:'rgba(227, 227, 227, 1)',borderBottom:'2px solid rgb(133, 129, 129, 0.553)'}}
          as="li"
        >
            <div className='d-flex justify-content-start gap-5 align-items-center w-100'>
              <p>{index+1}</p>
              <div >
                <button className="btn fw-bold " type='button'  onClick={(e)=>handledetails(e,item._id)}>{item.name}</button>
              </div>
            </div>
        </ListGroup.Item>
        )):<p>Nothing</p>
        }
        </ListGroup>
        </div>
        
      </Collapse> */}
     
    </div>
    {/* <Modal show={show} onHide={handleClose} centered>
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
        <Modal.Footer style={{border:'none'}}>
          <Button variant="success" onClick={(e)=>accept(e,alldetails._id)}>
            Accept
          </Button>
          <Button variant="danger" onClick={(e)=>decline(e,alldetails._id)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal> */}
    <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

   </div>
  )
}

export default Displaymembers
