import React, { useEffect, useState } from 'react'
import './Fourth.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton';

function Districtnoti() {
    const[data,setdata]=useState({
        districtname:'',
        notificationurl:"",
        image:null,
        title:""
      })
      const[url,seturl]=useState(localStorage.getItem("commonurl"))
      const bgcolor=localStorage.getItem("bgcolor")
      const[alldistrict,setalldistrict]=useState({})
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
    
      console.log(url);
      useEffect(() => {
        const token = localStorage.getItem("token");
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
    
      const district=async()=>
      {
        try {
          const res=await axios.get(`${url}/api/admin/districtV4?`)
          if(res.status===200)
        {
          setalldistrict(res.data);
        }
        else
        {
          console.log(res.response.data);
        }
        } catch (error) {
          console.log(error);
        }
        
      }
    
    
    const handlesubmit=async(e)=>
    {
      const{districtname,notificationurl,image,title}=data
      e.preventDefault()
        const token=localStorage.getItem("token")
        const formdata=new FormData()
        formdata.append("district",districtname)
        formdata.append("url",notificationurl)
        formdata.append("image",image)
        formdata.append("title",title);
    console.log(token);
        try {
          
          const res=await axios.post(`${url}/api/admin/district-notification`,formdata,{
            headers:{
              "Content-Type":"multipart/form-data",
              "x-access-token":token
            }
          })
          if(res.status===200)
          {
            toast.success('Notification added successfully')
            setdata({
                districtname:'',
                notificationurl:"",
                image:null,
                title:""
            })
            setpreview('');
            document.getElementById('fileInput').value = '';
          }
          else
          {
            toast.error(res.response.data);
          }
        } catch (error) {
          console.log(error);
        }
       
      }
    
      useEffect(()=>
    {
      district()
    },[])
  return (
    <div className='container'>
    <Homebutton/>
      <div className=' justify-content-center align-items-center d-flex flex-column'>
      <div className='justify-content-center align-items-center d-flex' style={{ height: '100px', position: 'relative', width: '100%', overflow: 'hidden' }}>
          <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt="" style={{ position: 'absolute', width:'130%',rotate:'-7deg',objectFit:'contain', objectPosition:'center',left: '-34px' }} className='parentdiv' />
          <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{ zIndex: '10' }} />
      </div>
           <h4 className='fw-bold mt-3 mb-3'>Notification</h4>
            <form style={{backgroundColor:'rgba(227, 227, 227, 1)'}} className='mb-5 p-3 w-100  justify-content-center align-items-center d-flex flex-column rounded'>

            <select class="form-select" aria-label="Default select example" value={data.loksabhaname} onChange={(e)=>{setdata({...data,loksabhaname:e.target.value})}} >
            <option selected value="">Select all district</option>
              {alldistrict?.length>0?alldistrict.map((item)=>(<option value={item}>{item}</option>)):<option value="no data">no data</option>}
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
                <button className='btn mt-4 text-light' style={{backgroundColor:`${bgcolor}`}} type='button' onClick={(e)=>handlesubmit(e)}>Submit</button>
                <Link to={'/displaynotification'}>
                  <button className='btn  text-light mt-4'  type='button'   style={{backgroundColor:`${bgcolor}`}}>
                      View notifications
                    </button>
               </Link>
              </div>
              
            </form>
      </div>
      <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

   </div>
  )
}

export default Districtnoti
