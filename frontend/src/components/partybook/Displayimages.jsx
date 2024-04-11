import React, { useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import './Displayimages.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton';
import { getColorForDistrict } from '../Districtcolor';
function Displayimages({ images, videos, reels, memes }) {
  const [activeButton, setActiveButton] = useState('images');

  const[imagevalue,setimagevalue]=useState([])
  const[videovalue,setvideovalue]=useState([])
  const[reelsvalue,setreelsvalue]=useState([])
  const[memevalue,setmemevalue]=useState([])

  const [url,seturl]=useState(localStorage.getItem("commonurl"))
  const bgcolor=localStorage.getItem("bgcolor")
  const textcolor=getColorForDistrict()
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
      <div className='justify-content-center align-items-center d-flex' style={{ height: '100px', position: 'relative', width: '100%', overflow: 'hidden' }}>
          <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt="" style={{ position: 'absolute', width:'130%',rotate:'-7deg',objectFit:'contain', objectPosition:'center',left: '-34px' }} className='parentdiv' />
          <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{ zIndex: '10' }} />
      </div>
      <div className='row row-cols-4 row-cols-md-4  justify-content-center align-items-center d-flex w-100 mt-2'>
          <div className="col">   
           <Link to={'/partybook/images'}>
              <button className={`btn rounded-5 ${activeButton === 'images' ? 'active' : ''}`} style={{ backgroundColor: `${bgcolor}`,color:`${textcolor}` }} onClick={() => handleButtonClick('images')}>
                Images
              </button>
            </Link>
          </div>
          <div className="col">   
          <Link to={'/partybook/videos'} >
              <button className={`btn  rounded-5 ${activeButton === 'videos' ? 'active' : ''}`} style={{ backgroundColor: `${bgcolor}`,color:`${textcolor}` }} onClick={() => handleButtonClick('videos')}>
                Videos
              </button>
            </Link>
          </div>
          <div className="col">    
          <Link to={'/partybook/reels'}>
              <button className={`btn  rounded-5 ${activeButton === 'reels' ? 'active' : ''}`} style={{ backgroundColor: `${bgcolor}`,color:`${textcolor}` }} onClick={() => handleButtonClick('reels')}>
                Reels
              </button>
            </Link>
          </div>
          <div className="col">    
          <Link to={'/partybook/memes'}>
              <button className={`btn rounded-5 ${activeButton === 'memes' ? 'active' : ''}`} style={{ backgroundColor: `${bgcolor}`,color:`${textcolor}` }} onClick={() => handleButtonClick('memes')}>
              Trolls
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
        <div className="ms-2 me-auto" style={{overflow:'hidden'}}>
          <div className="fw-bold">{item.name}</div>
        </div>
        <i class="fa-solid fa-trash"  onClick={(e) => removeimage(e,item._id)} style={{color:'rgba(106, 106, 106, 1)'}} ></i>
      </ListGroup.Item>))
        :<p>No data available</p>}
          </ListGroup>
          <Link to={'/partybook2/images'}><button className='btn mt-2' style={{backgroundColor:`${bgcolor}`,color:`${textcolor}`}}><i class="fa-solid fa-plus me-2" type='button'></i>Add new image</button></Link></>}


          {vd&& <><ListGroup as="ol" numbered className='mb-2 p-2 w-100' style={{}} >
        {videovalue?.length>0?
        videovalue.map((item)=>(<ListGroup.Item  style={{backgroundColor:'rgba(227, 227, 227, 1)',borderBottom:'2px solid rgb(133, 129, 129, 0.553)'}}
        as="li"
        className="d-flex justify-content-between align-items-center"
      >
        <div className="ms-2 me-auto" style={{overflow:'hidden'}}>
          <div className="fw-bold">{item.title}</div>
        </div>
        <button className='btn' type='button' onClick={(e) => removevideo(e,item._id)}><i class="fa-solid fa-trash" style={{color:'rgba(106, 106, 106, 1)'}} ></i></button>
      </ListGroup.Item>))
        :<p>No data available</p>}
          </ListGroup><Link to={'/partybook2/videos'}><button className='btn mt-2 ' style={{backgroundColor:`${bgcolor}`,color:`${textcolor}`}}><i class="fa-solid fa-plus me-2" type='button'></i>Add new Video</button></Link></>}


          {rl&& <><ListGroup as="ol" numbered className='mb-2 p-2 w-100' style={{}} >
       {reelsvalue?.length>0?
       reelsvalue.map((item)=>(<ListGroup.Item  style={{backgroundColor:'rgba(227, 227, 227, 1)',borderBottom:'2px solid rgb(133, 129, 129, 0.553)'}}
       as="li"
       className="d-flex justify-content-between align-items-center"
     >
       <div className="ms-2 me-auto" style={{overflow:'hidden'}}>
         <div className="fw-bold">{item.name}</div>
       </div>
       <button className='btn' type='button' onClick={(e) => removereels(e,item._id)}><i class="fa-solid fa-trash" style={{color:'rgba(106, 106, 106, 1)'}}></i></button>
     </ListGroup.Item>))
        :<p>No data available</p>}
          </ListGroup>
          <Link to={'/partybook2/reels'}><button className='btn mt-2' style={{backgroundColor:`${bgcolor}`,color:`${textcolor}`}}><i class="fa-solid fa-plus me-2" type='button'></i>Add new reel</button></Link></>}

          {mem&& <><ListGroup as="ol" numbered className='mb-2 p-2 w-100' style={{}} >
        {memevalue?.length>0?
        memevalue.map((item)=>( <ListGroup.Item  style={{backgroundColor:'rgba(227, 227, 227, 1)',borderBottom:'2px solid rgb(133, 129, 129, 0.553)'}}
        as="li"
        className="d-flex justify-content-between align-items-center"
      >
        <div className="ms-2 me-auto" style={{overflow:'hidden'}}>
          <div className="fw-bold">{item.name}</div>
        </div>
       <button className='btn' type='button' onClick={(e)=>removememes(e,item._id)}> <i class="fa-solid fa-trash" style={{color:'rgba(106, 106, 106, 1)'}}></i></button>
      </ListGroup.Item>))
       :<p>No data available</p>}   
          </ListGroup>
          <Link to={'/partybook2/memes'}><button className='btn mt-2' style={{backgroundColor:`${bgcolor}`,color:`${textcolor}`}}><i class="fa-solid fa-plus me-2" type='button'></i>Add new meme</button></Link></>}
  
    </div>
    <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

   </div>
  )
}

export default Displayimages
