import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import {  useNavigate } from 'react-router-dom'
import Homebutton from '../Homebutton'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Table from 'react-bootstrap/Table';
import Collapse from 'react-bootstrap/Collapse';
import Modal from 'react-bootstrap/Modal';
function Addrep() {
  const[data,setdata]=useState({
    name:"",
    address:"",
    image:"",
    position:"",
    phone:[""],
    email:[""],
    categoryfield:"",
    link:""
})
const[categoryselect,setcategoryselect]=useState([])
const [url,seturl]=useState(localStorage.getItem("commonurl"))
    const bgcolor=localStorage.getItem("bgcolor")
    const navigate=useNavigate()
    const[preview,setpreview]=useState("")
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [open, setOpen] = useState(false);
  const[category,setcategory]=useState({
    categoryname:""
  })
  
    const handleFileChange = (e) => {
      const selectedImage = e.target.files[0];
      setdata({ ...data, image: selectedImage });
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

    const removephone=(index)=>
    {
      const updatedphone = [...data.phone];
      updatedphone.splice(index, 1);
      setdata({...data,
        phone:updatedphone});
    };
    const removeemail=(index)=>
    {
      const updatedemail=[...data.email];
      updatedemail.splice(index, 1);
      setdata({...data,
        email:updatedemail});
    }
    const handleChange = (e) => {
      const { name, value } = e.target;
      setdata(prevState => ({
          ...prevState,
          [name]: value
      }));
  };

  const handleAddPhone = () => {
      setdata(prevState => ({
          ...prevState,
          phone: [...prevState.phone, ""]
      }));
  };

  const handlePhoneChange = (index, value) => {
      const updatedPhone = [...data.phone];
      updatedPhone[index] = value;
      setdata(prevState => ({
          ...prevState,
          phone: updatedPhone
      }));
  };

  const handleAddEmail = () => {
      setdata(prevState => ({
          ...prevState,
          email: [...prevState.email, ""]
      }));
  };

  const handleEmailChange = (index, value) => {
      const updatedEmail = [...data.email];
      updatedEmail[index] = value;
      setdata(prevState => ({
          ...prevState,
          email: updatedEmail
      }));
  };

  const categoryget=async()=>
  {
    const res=await axios.get(`${url}/api/admin/category-representative`,{headers:{"x-access-token":localStorage.getItem("token")}})
    if(res.status===200)
    {
      setcategoryselect(res.data)
    }
    else
    {
      console.log(res.response.data);
    }
  }
console.log(categoryselect);
  useEffect(()=>
{
  categoryget()
},[category])
  const handlerep=async()=>
  {
    const token=localStorage.getItem("token")
    const formdata=new FormData()
    formdata.append("name",data.name)
    formdata.append("address",data.address)
    formdata.append("image",data.image)
    formdata.append("position",data.position)
    formdata.append("phone",data.phone)
    formdata.append("email",data.email)
    formdata.append("category",data.categoryfield)
    formdata.append("link",data.link)
    const header={
      "Content-Type":"multipart/form-data",
      "x-access-token":token
    }
    const res=await axios.post(`${url}/api/admin/add-representatives`,formdata,{headers:header})
    if(res.status===200)
      {
        toast.success("Added successfully")
        setdata({
          name:"",
          address:"",
          image:"",
          position:"",
          phone:[],
          email:[],
          categoryfield:"",
          link:""
        })
        setpreview("")
        document.getElementById('fileInput').value = '';
        
      }
      else
      {
        console.log(res.response.data);
      }
   
  }

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
      `${url}/api/admin/add-category-representative`,
      { category: categoryname },
      { headers: { "x-access-token": token } }
    )
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          toast.success("Added successfully");
          setcategory({ categoryname: "" });
          handleClose()
        } else {
          toast.error(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    
  }
  
}
const handleButtonClick = () => {
  setOpen(!open);
};


  console.log(data);
  return (
    <div className='container'>
    <Homebutton/>
  <div className=' justify-content-center align-items-center d-flex flex-column'>
      <div className='justify-content-center align-items-center d-flex' style={{ height: '100px', position: 'relative', width: '100%', overflow: 'hidden' }}>
          <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt="" style={{ position: 'absolute', width:'130%',rotate:'-7deg',objectFit:'contain', objectPosition:'center',left: '-34px' }} className='parentdiv' />
          <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{ zIndex: '10' }} />
      </div>
      <h4 className='fw-bold mt-2 mb-3'>People Representatives</h4>
      <form style={{ backgroundColor: 'rgba(227, 227, 227, 1)' }} className='mb-5 p-3 w-100  justify-content-center align-items-center d-flex flex-column rounded'>
          <input type="text" className='form-control mt-3' placeholder='Name' name="name" value={data.name} onChange={handleChange} />
          <div className=' mt-3 w-100 p-5 rounded text-center' style={{ backgroundColor: 'white' }}>
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
          <textarea name="address" className='form-control mt-3' placeholder="Address" value={data.address} onChange={handleChange}></textarea>
          <input type="text" className='form-control mt-3' placeholder='Position' name="position" value={data.position} onChange={handleChange} />        
          <input type="text" className='form-control mt-3' placeholder='Link' name="link" value={data.link} onChange={handleChange} />
          {data.phone.map((number, index) => (
                <div key={index} className='d-flex justify-content-between w-100 align-items-center mt-3'>
                    <input type="number" className='form-control' placeholder={`Phone ${index + 1}`} value={number} onChange={(e) => handlePhoneChange(index, e.target.value)} />
                    <button className='btn mb-2 ' onClick={() => removephone('phone', index)}><i className="fa-solid fa-trash text-secondary"></i></button>
                </div>
            ))}
            <div className='bg-light rounded'>
                <button className='btn' type='button' onClick={() => handleAddPhone('phone')}><i className="fa-solid fa-plus" style={{ color: `${bgcolor}` }}></i></button>
            </div>

            {data.email.map((email, index) => (
                <div key={index} className='d-flex justify-content-between w-100 align-items-center mt-3'>
                    <input type="email" className='form-control' placeholder={`Email Id ${index + 1}`} value={email} onChange={(e) => handleEmailChange(index, e.target.value)} />
                    <button className='btn mb-2 ' onClick={() => removeemail('email', index)}><i className="fa-solid fa-trash text-secondary"></i></button>
                </div>
            ))}
            <div className='bg-light rounded'>
                <button className='btn' type='button' onClick={() => handleAddEmail('email')}><i className="fa-solid fa-plus" style={{ color:`${bgcolor}` }}></i></button>
            </div>
            <Form.Select aria-label="Default select example" className='mt-3' onChange={(e)=>setdata({...data,categoryfield:e.target.value})} value={data.categoryfield}>
              <option>Select Category</option>
              {categoryselect?.length>0?
              categoryselect.map((item)=>(<option value={item.category}>{item.category}</option>))
              :<p>Nothing</p>}
            </Form.Select>
            <div className='d-flex'>
              <button className='btn mt-4 text-light' style={{backgroundColor:`${bgcolor}`}} onClick={handleShow} type='button'><i class="fa-solid fa-plus me-2" ></i>Add new category</button>
              <button className='btn mt-4 ms-5 text-light' style={{backgroundColor:`${bgcolor}`}} type='button' onClick={(e)=>handlerep(e)}>Submit</button>
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
        </tr>
      </thead>
      <tbody className='text-center'>
       {categoryselect?.length>0? 
       categoryselect.map((item,index)=>(  <tr>
        <td>{index+1}</td>
        <td>{item.category}</td>
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

export default Addrep
