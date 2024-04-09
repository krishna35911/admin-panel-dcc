import React, { useEffect, useState } from 'react'
import './AddLeadership.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton';
function AddLeadership() {
    const[data,setdata]=useState({
        name:"",
        address:"",
        image:"",
        position:"",
        phone:[""],
        email:[""],
        categoryselect:"",
        link:""
    })
    const[category,setcategory]=useState({
        categoryname:""
      })
    const[allcategory,setallcategory]=useState([])
    const [url,seturl]=useState(localStorage.getItem("commonurl"))
    const bgcolor=localStorage.getItem("bgcolor")
    const navigate=useNavigate()
    const[preview,setpreview]=useState("")
  
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
    useEffect(()=>
    {
        handlecategory()
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
  
console.log(data);
const handleleadership = async (e) => {
  const { name, position, address, categoryselect, link, phone, email, image } = data;
  console.log(email);
  console.log(phone);
  e.preventDefault();
  if (!name || !position || !address || !categoryselect || !link || !phone || !email || !image) {
      toast.info('Please fill the form completely');
  } else {
      const token = localStorage.getItem("token");
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("position", position);
      formdata.append("category", categoryselect);
      formdata.append("link", link);
      formdata.append("image", image);
      formdata.append("phone",phone); // Convert phone array to JSON string
      formdata.append("email",email); // Convert email array to JSON string
      formdata.append("address", address);
      const headers = {
          "Content-Type": "multipart/form-data",
          "x-access-token": token
      };
      try {
          const res = await axios.post(`${url}/api/admin/add-leadership`, formdata, { headers: headers });
          if (res.status === 200 || res.status === 201) {
              toast.success('Leadership added successfully');
              setdata({
                  name: "",
                  address: "",
                  image: "",
                  position: "",
                  phone: [],
                  email: [],
                  categoryselect: "",
                  link: ""
              })
              setpreview('');
              document.getElementById('fileInput').value = '';
          } else {
              toast.error('Something went wrong');
          }
      } catch (error) {
          console.log(error);
      }
  }
};


  return (
    <div className='container'>
      <Homebutton/>
    <div className=' justify-content-center align-items-center d-flex flex-column'>
    <div className='justify-content-center align-items-center d-flex' style={{ height: '100px', position: 'relative', width: '100%', overflow: 'hidden' }}>
          <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt="" style={{ position: 'absolute', width:'130%',rotate:'-7deg',objectFit:'contain', objectPosition:'center',left: '-34px' }} className='parentdiv' />
          <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{ zIndex: '10' }} />
      </div>
        <h4 className='fw-bold mt-2 mb-3'>Leadership</h4>
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
            <Form.Select aria-label="Default select example" className='mt-3' name="categoryselect" value={data.categoryselect} onChange={handleChange}>
                <option>Select Category</option>
                {allcategory?.length > 0 ?
                    allcategory.map((item, index) => (<option key={index} value={item}>{item}</option>))
                    : <p>No category</p>}
            </Form.Select>
            <textarea name="address" className='form-control mt-3' placeholder="Address" value={data.address} onChange={handleChange}></textarea>
            <input type="text" className='form-control mt-3' placeholder='Position' name="position" value={data.position} onChange={handleChange} />

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

            <input type="text" className='form-control mt-3' placeholder='Link' name="link" value={data.link} onChange={handleChange} />

            <button className='btn mt-4 text-light ' style={{ backgroundColor: `${bgcolor}` }} type='button' onClick={(e) => handleleadership(e)}>Submit</button>

        </form>

    </div>
    <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

</div>
  )
}

export default AddLeadership
