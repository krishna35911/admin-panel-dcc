import React, { useEffect, useState } from 'react'
import  './Displaymembers.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Collapse from 'react-bootstrap/Collapse';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton';
import { ListGroup } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Displaymembers() {
    const[assembly,setassembly]=useState([])
    const [open, setOpen] = useState(false);
    const[searchdetails,setsearchdetails]=useState([])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[mandalam,setmandalam]=useState([])
    const[booth,setbooth]=useState([])
    const[data,setdata]=useState({
      assemblyname:"",
      mandalamname:"",
      boothname:"",
      taskforce:""
    })
    const[alldetails,setalldetails]=useState({})
    const navigate=useNavigate()
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

const handleButtonClick = () => {
  setOpen(!open);
  handleclick()
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
  return (
    <div className='container'>
    <Homebutton/>
      <div className=' justify-content-center align-items-center d-flex flex-column'>
      <div className='justify-content-center align-items-center d-flex ' style={{height: '100px',position: 'relative',width: '100%',overflow: 'hidden'}}>
          <img src="https://s3-alpha-sig.figma.com/img/e12a/201f/1ff5d23251e9bbcb40e0dbc3a92d94b8?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=abm~dupQEsoC-zbjjRBn-SRXk3ugthXQjEWV~nX8mnPvbD3WWtt6cuEpjgS08sQ3szx62ppCkRhoJN59g7pJd7T-54uA~t2DDfecerEtKFbh2bpgm-Ue4dTtRn0tXT-z20DcJw0dCJ22KB7teON-V1Ykc57-khKfLSIov5Kerg3IXPAccZsX~S6bKYn-tCVGgPeYPrXe-7TCdqST6~m1odcOThLnDmwE670xYJHIo58DnK6QyO6ww-2jVXDd4jM7pwrL788gbyPl5OgGCiB0KpUu~pYEPIvdjJrodzmMWBxD1UbJVrCsFi9Dcy9IUlw4YjespI8QxncHEV16rz-A1w__" alt=""  style={{position: 'absolute',width: '157%',left: '-34px'}} className='parentdiv'/>
          <img src="https://s3-alpha-sig.figma.com/img/cbaa/86c1/0bd516a2c261529503cc52ead310f66c?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NGg-LUUprl6urnuCI-QCseNR941sE1CbdDaVwKKqXY7llM3KZQx-JzHAjDxxIL7Qn9rh5yGUDotXUObCCb5qSCDoWKvcrjKd76OvV1jxYHCYTr0a8rLakmeE5G29XLX4lTAovHJ5tchcxH6lt3erN-kOKyUjY6-r47JlQm0GJP0qXQHnyfCtb1c~MmBKEhCTzRlf0n5TNvg4O7nGI1VXsGtu90nIjK7-0zPqY6D0djbMutfB9NfZWQaEi0ohRxefgxgEfMxglgTG76mRP6J8A0uFypuKinEwKxfqMf-Xr2suEVNKfP65Z7AXfUolSzkT4MeREyic-GwdVpWanJq~Xw__" alt="" width={'100px'} style={{zIndex: '10'}} />
           </div>
      
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
      <button type='button' className='btn text-light mt-4 w-50' onClick={handleButtonClick} style={{backgroundColor:`${bgcolor}`}}>Search</button>
      </form>
      <Collapse in={open} className='w-100'>
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
        </ListGroup.Item>)):<p>Nothing</p>}
        </ListGroup>
        </div>
        
      </Collapse>
     
    </div>
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
        <Modal.Footer style={{border:'none'}}>
          <Button variant="success" onClick={(e)=>accept(e,alldetails._id)}>
            Accept
          </Button>
          <Button variant="danger" onClick={(e)=>decline(e,alldetails._id)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

   </div>
  )
}

export default Displaymembers
