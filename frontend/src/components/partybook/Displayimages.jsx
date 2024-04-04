import React, { useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import './Displayimages.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton';

function Displayimages({ images, videos, reels, memes }) {
  const [activeButton, setActiveButton] = useState('images');

  const[imagevalue,setimagevalue]=useState([])
  const[videovalue,setvideovalue]=useState([])
  const[reelsvalue,setreelsvalue]=useState([])
  const[memevalue,setmemevalue]=useState([])

  const [url,seturl]=useState(localStorage.getItem("commonurl"))
  const navigate=useNavigate()

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

  const getimages=async()=>
  {
    const token=localStorage.getItem("token")
      const res=await axios.get(`${url}/api/user/gallery`,{headers:{"x-access-token":token}})
      if(res.status===200)
      {
          setimagevalue(res.data)
      }
      else
      {
        console.log(res.response.data);
      }
  }
  useEffect(()=>
  {
    getimages()
  },[])

  const removeimage=async(e,id)=>
  {
    const token=localStorage.getItem("token")
    e.preventDefault()
    console.log(id);
      const res=await axios.delete(`${url}/api/admin/deleteImage/${id}`,{headers:{"x-access-token":token}})
      if(res.status===200)
      {
        toast.success('Image deleted successfully')
        getimages()
      }
      else
      {
        toast.error(res.response.data)
      }
  }

  const getvideos=async()=>
    {
      const token=localStorage.getItem("token")
        const res=await axios.get(`${url}/api/admin/videogallery`,{headers:{"x-access-token":token}})
        if(res.status===200)
        {
            setvideovalue(res.data)
        }
        else
        {
          console.log(res.response.data);
        }
    }
    const removevideo=async(e,id)=>
    {
      const token=localStorage.getItem("token")
      e.preventDefault()
      console.log(id);
        const res=await axios.delete(`${url}/api/admin/delete-videogallery/${id}`,{headers:{"x-access-token":token}})
        if(res.status===200)
        {
          toast.success('Video deleted successfully')
          getvideos()
        }
        else
        {
          toast.error(res.response.data)
        }
    }
    useEffect(()=>
    {
        getvideos()
    },[])


    const getreels=async()=>
    {
      const token=localStorage.getItem("token")
        const res=await axios.get(`${url}/api/admin/reels`,{headers:{"x-access-token":token}})
        if(res.status===200)
        {
            setreelsvalue(res.data)
        }
        else
        {
          console.log(res.response.data);
        }
    }
    const removereels=async(e,id)=>
    {
      const token=localStorage.getItem("token")
      e.preventDefault()
      console.log(id);
        const res=await axios.delete(`${url}/api/admin/reels/${id}`,{headers:{"x-access-token":token}})
        if(res.status===200)
        {
          toast.success('Reel deleted successfully')
          getreels()
        }
        else
        {
          toast.error(res.response.data)
        }
    }
    useEffect(()=>
    {
        getreels()
    },[])

    const getmemes=async()=>
    {
      const token=localStorage.getItem("token")
        const res=await axios.get(`${url}/api/admin/meme`,{headers:{"x-access-token":token}})
        if(res.status===200)
        {
            setmemevalue(res.data)
        }
        else
        {
          console.log(res.response.data);
        }
    }
    const removememes=async(e,id)=>
    {
      const token=localStorage.getItem("token")
      e.preventDefault()
      console.log(id);
        const res=await axios.delete(`${url}/api/admin/meme/${id}`,{headers:{"x-access-token":token}})
        if(res.status===200)
        {
          toast.success('Meme deleted successfully')
          getmemes()
        }
        else
        {
          toast.error(res.response.data)
        }
    }
    useEffect(()=>
    {
        getmemes()
    },[])

  
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  const img=images?true:false
  const vd=videos?true:false
  const rl=reels?true:false
  const mem=memes?true:false

  return (
   <div className='container'>
    <Homebutton/>
      <div className=' justify-content-center align-items-center d-flex flex-column'>
      <div className='justify-content-center align-items-center d-flex' style={{height: '100px',position: 'relative',width: '100%',overflow: 'hidden'}}>
          <img src="https://s3-alpha-sig.figma.com/img/e12a/201f/1ff5d23251e9bbcb40e0dbc3a92d94b8?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=abm~dupQEsoC-zbjjRBn-SRXk3ugthXQjEWV~nX8mnPvbD3WWtt6cuEpjgS08sQ3szx62ppCkRhoJN59g7pJd7T-54uA~t2DDfecerEtKFbh2bpgm-Ue4dTtRn0tXT-z20DcJw0dCJ22KB7teON-V1Ykc57-khKfLSIov5Kerg3IXPAccZsX~S6bKYn-tCVGgPeYPrXe-7TCdqST6~m1odcOThLnDmwE670xYJHIo58DnK6QyO6ww-2jVXDd4jM7pwrL788gbyPl5OgGCiB0KpUu~pYEPIvdjJrodzmMWBxD1UbJVrCsFi9Dcy9IUlw4YjespI8QxncHEV16rz-A1w__" alt=""  style={{position: 'absolute',width: '157%',left: '-34px'}} className='parentdiv'/>
          <img src="https://s3-alpha-sig.figma.com/img/cbaa/86c1/0bd516a2c261529503cc52ead310f66c?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NGg-LUUprl6urnuCI-QCseNR941sE1CbdDaVwKKqXY7llM3KZQx-JzHAjDxxIL7Qn9rh5yGUDotXUObCCb5qSCDoWKvcrjKd76OvV1jxYHCYTr0a8rLakmeE5G29XLX4lTAovHJ5tchcxH6lt3erN-kOKyUjY6-r47JlQm0GJP0qXQHnyfCtb1c~MmBKEhCTzRlf0n5TNvg4O7nGI1VXsGtu90nIjK7-0zPqY6D0djbMutfB9NfZWQaEi0ohRxefgxgEfMxglgTG76mRP6J8A0uFypuKinEwKxfqMf-Xr2suEVNKfP65Z7AXfUolSzkT4MeREyic-GwdVpWanJq~Xw__" alt="" width={'100px'} style={{zIndex: '10'}} />
           </div>
      <div className='row row-cols-4 row-cols-md-4  justify-content-center align-items-center d-flex w-100 mt-2'>
          <div className="col">   
           <Link to={'/partybook/images'}>
              <button className={`btn text-light rounded-5 ${activeButton === 'images' ? 'active' : ''}`} style={{ backgroundColor: 'rgba(63, 0, 126, 1)' }} onClick={() => handleButtonClick('images')}>
                Images
              </button>
            </Link>
          </div>
          <div className="col">   
          <Link to={'/partybook/videos'} >
              <button className={`btn text-light rounded-5 ${activeButton === 'videos' ? 'active' : ''}`} style={{ backgroundColor: 'rgba(63, 0, 126, 1)' }} onClick={() => handleButtonClick('videos')}>
                Videos
              </button>
            </Link>
          </div>
          <div className="col">    
          <Link to={'/partybook/reels'}>
              <button className={`btn text-light rounded-5 ${activeButton === 'reels' ? 'active' : ''}`} style={{ backgroundColor: 'rgba(63, 0, 126, 1)' }} onClick={() => handleButtonClick('reels')}>
                Reels
              </button>
            </Link>
          </div>
          <div className="col">    
          <Link to={'/partybook/memes'}>
              <button className={`btn text-light rounded-5 ${activeButton === 'memes' ? 'active' : ''}`} style={{ backgroundColor: 'rgba(63, 0, 126, 1)' }} onClick={() => handleButtonClick('memes')}>
              memes
              </button>
            </Link>
          </div>
      </div>

          {img&& <><ListGroup as="ol" numbered className='mb-2 p-2 w-100' style={{}} >
        {imagevalue?.length>0?
        imagevalue.map((item)=>(<ListGroup.Item  style={{backgroundColor:'rgba(227, 227, 227, 1)',borderBottom:'2px solid rgb(133, 129, 129, 0.553)'}}
        as="li"
        className="d-flex justify-content-between align-items-center"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{item.name}</div>
        </div>
        <i class="fa-solid fa-trash"  onClick={(e) => removeimage(e,item._id)} style={{color:'rgba(106, 106, 106, 1)'}} ></i>
      </ListGroup.Item>))
        :<p>No data available</p>}
          </ListGroup>
          <Link to={'/partybook2/images'}><button className='btn mt-2 text-light' style={{backgroundColor:'rgba(63, 0, 126, 1)'}}><i class="fa-solid fa-plus me-2" type='button'></i>Add new image</button></Link></>}


          {vd&& <><ListGroup as="ol" numbered className='mb-2 p-2 w-100' style={{}} >
        {videovalue?.length>0?
        videovalue.map((item)=>(<ListGroup.Item  style={{backgroundColor:'rgba(227, 227, 227, 1)',borderBottom:'2px solid rgb(133, 129, 129, 0.553)'}}
        as="li"
        className="d-flex justify-content-between align-items-center"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{item.title}</div>
        </div>
        <button className='btn' type='button' onClick={(e) => removevideo(e,item._id)}><i class="fa-solid fa-trash" style={{color:'rgba(106, 106, 106, 1)'}} ></i></button>
      </ListGroup.Item>))
        :<p>No data available</p>}
          </ListGroup><Link to={'/partybook2/videos'}><button className='btn mt-2 text-light' style={{backgroundColor:'rgba(63, 0, 126, 1)'}}><i class="fa-solid fa-plus me-2" type='button'></i>Add new Video</button></Link></>}


          {rl&& <><ListGroup as="ol" numbered className='mb-2 p-2 w-100' style={{}} >
       {reelsvalue?.length>0?
       reelsvalue.map((item)=>(<ListGroup.Item  style={{backgroundColor:'rgba(227, 227, 227, 1)',borderBottom:'2px solid rgb(133, 129, 129, 0.553)'}}
       as="li"
       className="d-flex justify-content-between align-items-center"
     >
       <div className="ms-2 me-auto">
         <div className="fw-bold">{item.name}</div>
       </div>
       <button className='btn' type='button' onClick={(e) => removereels(e,item._id)}><i class="fa-solid fa-trash" style={{color:'rgba(106, 106, 106, 1)'}}></i></button>
     </ListGroup.Item>))
        :<p>No data available</p>}
          </ListGroup>
          <Link to={'/partybook2/reels'}><button className='btn mt-2 text-light' style={{backgroundColor:'rgba(63, 0, 126, 1)'}}><i class="fa-solid fa-plus me-2" type='button'></i>Add new reel</button></Link></>}

          {mem&& <><ListGroup as="ol" numbered className='mb-2 p-2 w-100' style={{}} >
        {memevalue?.length>0?
        memevalue.map((item)=>( <ListGroup.Item  style={{backgroundColor:'rgba(227, 227, 227, 1)',borderBottom:'2px solid rgb(133, 129, 129, 0.553)'}}
        as="li"
        className="d-flex justify-content-between align-items-center"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{item.name}</div>
        </div>
       <button className='btn' type='button' onClick={(e)=>removememes(e,item._id)}> <i class="fa-solid fa-trash" style={{color:'rgba(106, 106, 106, 1)'}}></i></button>
      </ListGroup.Item>))
       :<p>No data available</p>}   
          </ListGroup>
          <Link to={'/partybook2/memes'}><button className='btn mt-2 text-light' style={{backgroundColor:'rgba(63, 0, 126, 1)'}}><i class="fa-solid fa-plus me-2" type='button'></i>Add new meme</button></Link></>}
  
    </div>
    <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

   </div>
  )
}

export default Displayimages
