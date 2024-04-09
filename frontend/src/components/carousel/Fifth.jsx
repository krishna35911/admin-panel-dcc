import React, { useEffect, useState } from 'react'
import './Fifth.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Collapse from 'react-bootstrap/Collapse';
import { Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton';
function Fifth() {
  const [carousel,setcarousel]=useState({
    image:"",
    href:"",
    name:""
  })
  const[img,setimg]=useState()
  const navigate=useNavigate()
  const [url,seturl]=useState(localStorage.getItem("commonurl"))
  const bgcolor=localStorage.getItem("bgcolor")
  const [open, setOpen] = useState(false);
  const[allcarousel,setallcarousel]=useState([])
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

  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    setcarousel({ ...carousel, image: selectedImage });
    setimg(URL.createObjectURL(selectedImage));
};
  const handlesubmit=async(e)=>
  {
    e.preventDefault()
    const {image,href,name}=carousel
    if(!image || !href || !name)
    {
      alert("Please fill the form completely")
    }
    else
    {
      const token=localStorage.getItem("token")
      const formdata=new FormData()
      formdata.append("image",image)
      formdata.append("href",href)
      formdata.append("name",name)
      try {
        const header={
          "Content-Type":"multipart/form-data",
          "x-access-token":token
        }
        const res=await axios.post(`${url}/api/admin/carousel`,{image,href,name},{headers:header})
        if(res.status===200 || res.status===201)
        {
            toast.success('Carousel added successfully')
            setcarousel({
            href:"",
            name:"",
            image:""})
            setimg('');
            document.getElementById('fileInput').value = '';
        }
        else
        {
          toast.error('Something went wrong');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  const handlecarousel=async()=>
  {
      const token=localStorage.getItem("token")
      const res=await axios.get(`${url}/api/admin/carousel`,{headers:{"x-access-token":token}})
      if(res.status===200)
      {
         setallcarousel(res.data);
      }
      else
      {
        console.log(res.response.data);
      }
  }

  const deletecarousel=async(e,id)=>
  {
      e.preventDefault()
      const token=localStorage.getItem("token")
      const res=await axios.delete(`${url}/api/admin/carousel/${id}`,{headers:{"x-access-token":token}})
      if(res.status===200)
      {
        toast.success('carousel deleted successfully')
          handlecarousel()
      }
      else
      {
      toast.error('something went wrong')
      }
  }
  const handleButtonClick = () => {
    setOpen(!open);
    handlecarousel()
  };
  return (
   <div className='container'>
    <Homebutton/>
      <div className=' justify-content-center align-items-center d-flex flex-column'>
      <div className='justify-content-center align-items-center d-flex' style={{ height: '100px', position: 'relative', width: '100%', overflow: 'hidden' }}>
          <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt="" style={{ position: 'absolute', width:'130%',rotate:'-7deg',objectFit:'contain', objectPosition:'center',left: '-34px' }} className='parentdiv' />
          <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{ zIndex: '10' }} />
      </div>
           <h3 className='fw-bold mt-2 mb-3'>Carousels</h3>
            <form style={{backgroundColor:'rgba(227, 227, 227, 1)'}} className='mb-5 p-3 w-100  justify-content-center align-items-center d-flex flex-column rounded'>
            <div className=' mt-3 w-100 p-5 rounded text-center' style={{backgroundColor:'white'}}>
            {img ? (
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
              <input type="text" className='form-control mt-3' placeholder='URL' value={carousel.href} onChange={(e)=>setcarousel({...carousel,href:e.target.value})}/>
              <input type="text" className='form-control mt-3' placeholder='Name' value={carousel.name} onChange={(e)=>setcarousel({...carousel,name:e.target.value})}/>
              <div className='d-flex'>
                <button className='btn mt-4 text-light' style={{backgroundColor:`${bgcolor}`}} type='buttom' onClick={(e)=>handlesubmit(e)}>Submit</button>
                <button className='btn  text-light mt-4'  type='button' onClick={handleButtonClick}
                aria-controls="example-collapse-text"  style={{backgroundColor:`${bgcolor}`}}
                aria-expanded={open}>
                  View all carousels
                </button>
              </div>
              <Collapse in={open}>
        <div id="example-collapse-text">
        <Table striped bordered hover style={{width:'100%'}} className='mt-5'>
      <thead className='text-center'>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className='text-center'>
       {allcarousel?.length>0? 
       allcarousel.map((item,index)=>(  <tr>
        <td>{index+1}</td>
        <td>{item.name}</td>
        <td><img src={item.image} alt="" width={'100px'} style={{zIndex: '10'}}/></td>
        <td><button className='btn text-danger' type='button' onClick={(e)=>deletecarousel(e,item._id)}><i class="fa-regular fa-trash-can"></i></button></td>
      </tr>))
     :<p>No data available</p>}
      </tbody>
    </Table>
        </div>
      </Collapse>
            </form>
      </div>
      <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

   </div>
  )
}

export default Fifth
