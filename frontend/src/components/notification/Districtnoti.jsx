import React, { useEffect, useState } from 'react'
import './Fourth.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Districtnoti() {
    const[data,setdata]=useState({
        disname:'',
        notificationurl:"",
        image:null,
        title:""
      })
      const[url,seturl]=useState(localStorage.getItem("baseurl"))
      const bgcolor=localStorage.getItem("bgcolor")
      const[alldata,setalldata]=useState({})
      const alldistrict=[{
        districtname:"Thrissur"},
        {districtname:"Thiruvananthapuram"},
        {districtname:"Wayanad"},
        {districtname:"Alappuzha"},
        {districtname:"Pathanamthitta"},
        {districtname:"Idukki"},
        {districtname:"Ernakulam"},
        {districtname:"Palakkad"},
        {districtname:"Kollam"},
        {districtname:"Kasargod"},
        {districtname:"Kottayam"},
        {districtname:"Kannur"},
        {districtname:"Kozhikkode"},
       { districtname:"Malappuuram"}
      ]
      const navigate=useNavigate()
    
      const[preview,setpreview]=useState("")
      
      const handleFileChange = (e) => {
        const selectedImage = e.target.files[0];
        setdata({ ...data, image: selectedImage });
        setpreview(URL.createObjectURL(selectedImage));
    };
      useEffect(()=>
      {
        seturl(localStorage.getItem("baseurl"))
      },[])
    
      useEffect(() => {
        const token = localStorage.getItem("basetoken");
        if (!token) {
          navigate("/");
        }
        axios
          .get(`${url}/api/admin/protected`, {
            headers: { "x-access-token": token },
          })
          .then((res) => {
            if (res.status !== 200) {
              localStorage.removeItem("token");
              navigate("/");
            }
          })
          .catch((error) => {
           console.log(error);
          });
      }, []);
    
     const handlealldistrict=async()=>
     {
      const token = localStorage.getItem("basetoken");
      let i=0;
      while(i<alldistrict.length)
      {
        await axios.get(`https://dcc-global-backend.plusitpark.com/api/admin/get-backend-url/${alldistrict[i].districtname}`, { headers: { "x-access-token": token } }).then((res) => {
          if (res.status === 200 || res.status === 201) {
            const{notificationurl,image,title}=data
            const token=res.data.token
            const disname=res.data.district
            const pathurl=res.data.url
            const formdata=new FormData()
            formdata.append("district",disname)
            formdata.append("url",notificationurl)
            formdata.append("image",image)
            formdata.append("title",title);
        
        axios.post(`${pathurl}/api/admin/district-notification`,formdata,{
          headers:{
            "Content-Type":"multipart/form-data",
            "x-access-token":token
          }
        })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            toast.success('Notification added successfully')
            setdata({
              disname:'',
              notificationurl:"",
              image:null,
              title:""
            })
            setpreview('')
            document.getElementById('fileInput').value = "";
          } else {
            alert(res.response.data);
          }
        })
        } else {
            alert(res.response.data);
          }
        })
        i++;
      }
     }
      const handlesubmit=async(e)=>
      {
        e.preventDefault()
        const token = localStorage.getItem("basetoken");
        const {disname}=data
       if(disname==="")
       {
        handlealldistrict()
       }
       else
       {
        console.log(disname);
        await axios.get(`https://dcc-global-backend.plusitpark.com/api/admin/get-backend-url/${disname}`, { headers: { "x-access-token": token } }).then((res) => {
          if (res.status === 200 || res.status === 201) {
            const{notificationurl,image,title}=data
            const token=res.data.token
            const pathurl=res.data.url
            const formdata=new FormData()
            formdata.append("district",disname)
            formdata.append("url",notificationurl)
            formdata.append("image",image)
            formdata.append("title",title);
        
        axios.post(`${pathurl}/api/admin/district-notification`,formdata,{
          headers:{
            "Content-Type":"multipart/form-data",
            "x-access-token":token
          }
        })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            toast.success('Notification added successfully')
            setdata({
              disname:'',
              notificationurl:"",
              image:null,
              title:""
            })
          } else {
            alert(res.response.data);
          }
        })
        } else {
            alert(res.response.data);
          }
        })
       }
      }

  
  return (
    <div className='container'>
     <div>
       <Link to={'/panel'}><button className='btn' type='button'><i class="fa-solid fa-house mt-3 ms-3 bg-dark text-light p-2" style={{borderRadius:'30px'}}></i></button></Link>
    </div>
      <div className=' justify-content-center align-items-center d-flex flex-column'>
      <div className='justify-content-center align-items-center d-flex' style={{ height: '100px', position: 'relative', width: '100%', overflow: 'hidden' }}>
          <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt="" style={{ position: 'absolute', width:'130%',rotate:'-7deg',objectFit:'contain', objectPosition:'center',left: '-34px' }} className='parentdiv' />
          <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{ zIndex: '10' }} />
      </div>
           <h4 className='fw-bold mt-3 mb-3'>Notification</h4>
            <form style={{backgroundColor:'rgba(227, 227, 227, 1)'}} className='mb-5 p-3 w-100  justify-content-center align-items-center d-flex flex-column rounded'>

            <select class="form-select" aria-label="Default select example" value={data.disname} onChange={(e)=>{setdata({...data,disname:e.target.value})}} >
              <option selected value="" >Select all district</option>
              {alldistrict?.length>0?alldistrict.map((item)=>(<option value={item.districtname}>{item.districtname}</option>)):<option value="no data">no data</option>}
              </select>

              <input type="text" className='form-control mt-3' value={data.title} placeholder='Title' onChange={(e)=>{setdata({...data,title:e.target.value})}}/>
              <input type="text" className='form-control mt-3' value={data.notificationurl} placeholder='URL' onChange={(e)=>{setdata({...data,notificationurl:e.target.value})}}/>
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
              <div className='d-flex'>
                <button className='btn  text-light mt-4' onClick={(e)=>handlesubmit(e)}  style={{ backgroundColor: 'rgba(16, 0, 113, 1)'}}>Submit</button>
              </div>
              
            </form>
      </div>
      <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

   </div>
  )
}

export default Districtnoti
