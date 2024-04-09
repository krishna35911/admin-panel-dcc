import React, { useEffect } from 'react'
import './AddCandidates.css'
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Collapse from 'react-bootstrap/Collapse';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton';
function AddCandidates() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [open, setOpen] = useState(false);
  const[category,setcategory]=useState({
    categoryname:""
  })
  const[allcategory,setallcategory]=useState([])
  const [preview,setpreview]=useState("")
  const[social,setsocial]=useState({
    name:"",
    position:"",
    image:"",
    categoryselect:"",
    facebook:"",
    instagram:"",
    youtube:""
  })
  console.log(social);

  const [url,seturl]=useState(localStorage.getItem("commonurl"))
  const bgcolor=localStorage.getItem("bgcolor")
  const navigate=useNavigate()

  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    setsocial({ ...social, image: selectedImage });
    setpreview(URL.createObjectURL(selectedImage));
};
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

  
const handlesubmit=async(e)=>
{
  e.preventDefault()
  const {categoryname}=category
  if(categoryname=="")
  {
    alert("Please fill the form completely")
  }
  else
  {
    const token=localStorage.getItem("token")
    axios.post(
      `${url}/api/admin/add-social-category`,
      { category: categoryname },
      { headers: { "x-access-token": token } }
    )
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          toast.success("Added successfully");
          setcategory({ categoryname: "" });
        } else {
          toast.error(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    
  }
  
}

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
const handleButtonClick = () => {
  setOpen(!open);
  handlecategory();
};

const handledelete=async(e,category)=>
{
  const token=localStorage.getItem("token")
  e.preventDefault()
  console.log(category);
    const res=await axios.delete(`${url}/api/admin/delete-social-category/${category}`,{headers:{"x-access-token":token}})
    if(res.status===200)
    {
      toast.success("Deleted successfully")
      handlecategory()
    }
    else
    {
      toast.error(res.response.data)
    }
}

const handledetails=async(e)=>
{
  e.preventDefault()
  const {name,position,image,categoryselect,facebook,instagram,youtube}=social
  if(!name || !position || !image || !categoryselect || !facebook || !instagram || !youtube)
  {
    toast.info("Please fill the form completely")
  }
  else
  {
   const token=localStorage.getItem("token")
   const formdata=new FormData()
   formdata.append("name",name)
   formdata.append("position",position)
   formdata.append("image",image)
   formdata.append("category",categoryselect)
   formdata.append("facebook",facebook)
   formdata.append("instagram",instagram)
   formdata.append("youtube",youtube)
   try {
    const header={
      "Content-Type":"multipart/form-data",
      "x-access-token":token
    }
    const res=await axios.post(`${url}/api/admin/add-social-media-details`,formdata,{headers:header})
    if(res.status===200 || res.status===201)
    {
      toast.success("Added successfully")
      setsocial({
        name:"",
        position:"",
        image:"",
        categoryselect:"",
        facebook:"",
        instagram:"",
        youtube:""
      })
      setpreview("")
      document.getElementById("fileInput").value ='';
    }
    else
    {
      toast.error(res.response.data)
    }
   } catch (error) {
    console.log(error);
   }
  }
}

useEffect(()=>
{
  handlecategory()
},[])

  return (
   <div className='container'>
    <Homebutton/>
      <div className=' justify-content-center align-items-center d-flex flex-column'>
      <div className='justify-content-center align-items-center d-flex' style={{ height: '100px', position: 'relative', width: '100%', overflow: 'hidden' }}>
          <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt="" style={{ position: 'absolute', width:'130%',rotate:'-7deg',objectFit:'contain', objectPosition:'center',left: '-34px' }} className='parentdiv' />
          <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{ zIndex: '10' }} />
      </div>
           <h4 className='fw-bold mt-2 mb-4'>Social media Links</h4>
          <form style={{backgroundColor:'rgba(227, 227, 227, 1)'}} className='mb-5 p-3 w-100  justify-content-center align-items-center d-flex flex-column rounded'>
            <div className=' mt-3 w-100 p-5 rounded text-center' style={{backgroundColor:'white'}}>
            {preview ? (
                            <label className='btn text-light btn-success' htmlFor='fileInput'>
                                Image uploaded
                                <input type='file' id='fileInput' style={{ display: 'none' }} className='form-control w-25' />
                            </label>
                        ) : (
                            <label className='btn text-light' htmlFor='fileInput' style={{ backgroundColor: `${bgcolor}` }}>
                                Upload Image
                                <input type='file' id='fileInput' style={{ display: 'none' }} className='form-control w-25' onChange={handleFileChange} />
                            </label>
                        )}
            </div>
            <input type="text" className='form-control mt-2' placeholder='Name' onChange={(e)=>setsocial({...social,name:e.target.value})} value={social.name}/>
            <Form.Select aria-label="Default select example" className='mt-3' onChange={(e)=>setsocial({...social, categoryselect:e.target.value})} value={social.categoryselect}>
              <option>Select Category</option>
             {allcategory?.length>0? 
             allcategory.map((item)=>(<option value={item}>{item}</option>))
             :<p>No category</p>}
            </Form.Select>
            <input type="text" className='form-control mt-2' placeholder='Designation/Place' onChange={(e)=>setsocial({...social, position:e.target.value})} value={social.position}/>
            <div className='w-100'>
              <p className='fw-bold mt-3'>Social media links</p>
            <input type="text" className='form-control' placeholder='Instagram' onChange={(e)=>setsocial({...social, instagram:e.target.value})} value={social.instagram}/>
            <input type="text" className='form-control mt-2' placeholder='Facebook' onChange={(e)=>setsocial({...social, facebook:e.target.value})} value={social.facebook}/>
            <input type="text" className='form-control mt-2' placeholder='Youtube' onChange={(e)=>setsocial({...social, youtube:e.target.value})} value={social.youtube}/>
            </div>
            <div className='d-flex'>
              <button className='btn mt-4 text-light' style={{backgroundColor:`${bgcolor}`}} onClick={handleShow} type='button'><i class="fa-solid fa-plus me-2" ></i>Add new category</button>
              <button className='btn mt-4 ms-5 text-light' style={{backgroundColor:`${bgcolor}`}} type='button' onClick={(e)=>handledetails(e)}>Submit</button>
            </div>
          </form>
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className='d-flex'>
                <input type="text" className='form-control' placeholder='Enter category name' value={category.categoryname} onChange={(e)=>setcategory({...category,categoryname:e.target.value})}/>
                <button className='btn text-light'  onClick={(e)=>handlesubmit(e)} type='button' style={{backgroundColor:`${bgcolor}`}}>
                Submit
              </button>
              </form>
            </Modal.Body>
            <Modal.Footer className='mx-auto'>
            <button className='btn btn-warning'  type='button' onClick={handleButtonClick}
              aria-controls="example-collapse-text"
              aria-expanded={open}>
                View all categories
              </button>
            </Modal.Footer>
            <Collapse in={open}>
        <div id="example-collapse-text">
        <Table striped bordered hover style={{width:'100%'}} className='mt-5'>
      <thead className='text-center'>
        <tr>
          <th>#</th>
          <th>Category name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className='text-center'>
       {allcategory?.length>0? 
       allcategory.map((item,index)=>(  <tr>
        <td>{index+1}</td>
        <td>{item}</td>
        <td><button className='btn text-danger' type='button' onClick={(e)=>handledelete(e,item)}><i class="fa-regular fa-trash-can"></i></button></td>
      </tr>))
     :<p>No data available</p>}
      </tbody>
    </Table>
        </div>
      </Collapse>
      </Modal>
      
    </div>
    <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

   </div>
  )
}

export default AddCandidates
