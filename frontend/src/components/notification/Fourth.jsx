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
    district:'',
    url:"",
    image:null,
    title:""
  })
  const[url,seturl]=useState(localStorage.getItem("commonurl"))
  const[alldistrict,setalldistrict]=useState({})
  const navigate=useNavigate()

  const[preview,setpreview]=useState("")
  
  useEffect(()=>
  {
    if(data.image)
    {
      setpreview(URL.createObjectURL(data.image))
    }
  },[data.image])
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
    districts()
  },[])

  const districts=async()=>
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
console.log(data);

const handlesubmit=async(e)=>
{
  const{district,url,image,title}=data
  e.preventDefault()
    const token=localStorage.getItem("token")
    const formdata=new FormData()
    formdata.append("district",district)
    formdata.append("url",url)
    formdata.append("image",image)
    formdata.append("title",title)
    try {
      const header={
        "Content-Type":"multipart/form-data",
        "x-access-token":token
      }
      const res=await axios.post(`${url}/api/admin/send-notification-with-district`,formdata,{header:header})
      if(res.status===200)
      {
        toast.success('Notification added successfully')
        setdata({
          district:'',
          url:"",
          image:null,
          title:""
        })
      }
      else
      {
        toast.error(res.response.data);
      }
    } catch (error) {
      console.log(error);
    }
   
  }

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
            <select class="form-select" aria-label="Default select example" onChange={(e)=>{setdata({...data,district:e.target.value})}}>
              <option selected>Select Your Regions</option>
              {alldistrict?.length>0?alldistrict.map((item)=>(<option value={item}>{item}</option>)):<option value="no data">no data</option>}
              </select>
              <input type="text" className='form-control mt-3' placeholder='Title' onChange={(e)=>{setdata({...data,title:e.target.value})}}/>
              <input type="text" className='form-control mt-3' placeholder='URL' onChange={(e)=>{setdata({...data,url:e.target.value})}}/>
              <div className=' mt-3 w-100 p-5 rounded text-center' style={{backgroundColor:'white'}}>
              {preview?<label className="btn text-light btn-success " htmlFor="fileInput">
                Image uploaded
                <input type="file" id="fileInput" style={{ display: 'none' }} className="form-control w-25 "/>
                </label>:<label className="btn text-light " htmlFor="fileInput" style={{backgroundColor:'rgba(63, 0, 126, 1)'}}>
                Upload Image
                <input type="file" id="fileInput" style={{ display: 'none' }} className="form-control w-25 " onChange={(e)=>setdata({...data,image:e.target.files[0]})}/>
                </label> }
            </div> 
              <button className='btn mt-4 text-light' style={{backgroundColor:'rgba(63, 0, 126, 1)'}} type='button' onClick={(e)=>handlesubmit(e)}>Submit</button>
            </form>
      </div>
      <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

   </div>
  )
}

export default Fourth
