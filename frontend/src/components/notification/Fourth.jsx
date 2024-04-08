import React, { useEffect, useState } from 'react'
import './Fourth.css'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton';
function Fourth() {
  const[data,setdata]=useState({
    loksabhaname:'',
    assemblyname:"",
    notificationurl:"",
    image:null,
    title:""
  })
  const[url,seturl]=useState(localStorage.getItem("commonurl"))
  const bgcolor=localStorage.getItem("bgcolor")
  const[allloksabha,setallloksabha]=useState({})
  const[allassembly,setallassembly]=useState({})
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

  
  useEffect(()=>
  {
    loksabha()
  },[])
  const loksabha=async()=>
  {
    const districtname=localStorage.getItem("districtname")
    console.log(districtname);
    console.log(url)
    try {
      const res=await axios.get(`${url}/api/admin/districtV4?district=${districtname}`)
      if(res.status===200)
    {
      setallloksabha(res.data);
    }
    else
    {
      console.log(res.response.data);
    }
    } catch (error) {
      console.log(error);
    }
    
  }

  const assembly=async()=>
  {
    const{loksabhaname}=data
    const districtname=localStorage.getItem("districtname")
    try {
      const res=await axios.get(`${url}/api/admin/districtV4?district=${districtname}&constituency=${loksabhaname}`)
      if(res.status===200)
    {
      setallassembly(res.data);
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
  const{loksabhaname,notificationurl,assemblyname,image,title}=data
  e.preventDefault()
    const token=localStorage.getItem("token")
    const districtname=localStorage.getItem("districtname")
    const formdata=new FormData()
    formdata.append("district",districtname)
    formdata.append("constituency",loksabhaname)
    formdata.append("assembly",assemblyname)
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
          loksabhaname:'',
          assemblyname:"",
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
  if(data.loksabhaname)
  {
    assembly()
  }
},[data.loksabhaname])
  return (
   <div className='container'>
    <Homebutton/>
      <div className=' justify-content-center align-items-center d-flex flex-column'>
      <div className='justify-content-center align-items-center d-flex' style={{height: '100px',position: 'relative',width: '100%',overflow: 'hidden'}}>
          <img src="https://s3-alpha-sig.figma.com/img/e12a/201f/1ff5d23251e9bbcb40e0dbc3a92d94b8?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=abm~dupQEsoC-zbjjRBn-SRXk3ugthXQjEWV~nX8mnPvbD3WWtt6cuEpjgS08sQ3szx62ppCkRhoJN59g7pJd7T-54uA~t2DDfecerEtKFbh2bpgm-Ue4dTtRn0tXT-z20DcJw0dCJ22KB7teON-V1Ykc57-khKfLSIov5Kerg3IXPAccZsX~S6bKYn-tCVGgPeYPrXe-7TCdqST6~m1odcOThLnDmwE670xYJHIo58DnK6QyO6ww-2jVXDd4jM7pwrL788gbyPl5OgGCiB0KpUu~pYEPIvdjJrodzmMWBxD1UbJVrCsFi9Dcy9IUlw4YjespI8QxncHEV16rz-A1w__" alt=""  style={{position: 'absolute',width: '157%',left: '-34px'}} className='parentdiv'/>
          <img src="https://s3-alpha-sig.figma.com/img/cbaa/86c1/0bd516a2c261529503cc52ead310f66c?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NGg-LUUprl6urnuCI-QCseNR941sE1CbdDaVwKKqXY7llM3KZQx-JzHAjDxxIL7Qn9rh5yGUDotXUObCCb5qSCDoWKvcrjKd76OvV1jxYHCYTr0a8rLakmeE5G29XLX4lTAovHJ5tchcxH6lt3erN-kOKyUjY6-r47JlQm0GJP0qXQHnyfCtb1c~MmBKEhCTzRlf0n5TNvg4O7nGI1VXsGtu90nIjK7-0zPqY6D0djbMutfB9NfZWQaEi0ohRxefgxgEfMxglgTG76mRP6J8A0uFypuKinEwKxfqMf-Xr2suEVNKfP65Z7AXfUolSzkT4MeREyic-GwdVpWanJq~Xw__" alt="" width={'100px'} style={{zIndex: '10'}} />
           </div>
           <h4 className='fw-bold mt-3 mb-3'>Notification</h4>
            <form style={{backgroundColor:'rgba(227, 227, 227, 1)'}} className='mb-5 p-3 w-100  justify-content-center align-items-center d-flex flex-column rounded'>
            <select class="form-select" aria-label="Default select example" value={data.loksabhaname} onChange={(e)=>{setdata({...data,loksabhaname:e.target.value})}} >
              <option selected value="">Select Your loksabha</option>
              {allloksabha?.length>0?allloksabha.map((item)=>(<option value={item}>{item}</option>)):<option value="no data">no data</option>}
              </select>

              {data.loksabhaname && <select class="form-select mt-3" value={data.assemblyname} aria-label="Default select example" onChange={(e)=>{setdata({...data,assemblyname:e.target.value})}}>
              <option selected value="">Select Your assembly</option>
              {allassembly?.length>0?allassembly.map((item)=>(<option value={item}>{item}</option>)):<option></option>}
              </select>}

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
              <button className='btn mt-4 text-light' style={{backgroundColor:`${bgcolor}`}} type='button' onClick={(e)=>handlesubmit(e)}>Submit</button>
            </form>
      </div>
      <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

   </div>
  )
}

export default Fourth
