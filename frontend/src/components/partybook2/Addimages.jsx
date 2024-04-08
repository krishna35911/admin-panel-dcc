import React, { useEffect, useState } from 'react';
import './Addimages.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton';

function Addimages({ images, videos, reels, memes }) {
  const [activeButton, setActiveButton] = useState('images');
  const [preview,setpreview]=useState("")
  const [videopreview,setvideopreview]=useState("")
  const [reelspreview,setreelspreview]=useState("")
  const [memepreview,setmemepreview]=useState("")
  const[imagevalue,setimagevalue]=useState({
    uploadedimg:"",
    imgname:"",
    imgdescription:""
  }) 
  const[videovalue,setvideovalue]=useState({
    uploadedvideo:"",
    videoname:"",
    videourl:""
  }) 
  const[reelsvalue,setreelsvalue]=useState({
    uploadedreels:"",
    reelsname:"",
    reelsdescription:"",
    reelslink:""
  }) 
  const[memevalue,setmemevalue]=useState({
    uploadedmeme:"",
    memename:"",
    memedescription:""
  }) 
  const [url,seturl]=useState(localStorage.getItem("commonurl"))
  const bgcolor=localStorage.getItem("bgcolor")
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
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  const img=images?true:false
  const vd=videos?true:false
  const rl=reels?true:false
  const mem=memes?true:false

  const handleimageChange = (e) => {
    const selectedImage = e.target.files[0];
    setimagevalue({ ...imagevalue, uploadedimg: selectedImage });
    setpreview(URL.createObjectURL(selectedImage));
};
const handlevideoChange = (e) => {
  const selectedvideo = e.target.files[0];
  setvideovalue({ ...videovalue, uploadedvideo: selectedvideo });
  setvideopreview(URL.createObjectURL(selectedvideo));
};

const handlereelschange = (e) => {
  const selectedreel = e.target.files[0];
  setreelsvalue({ ...reelsvalue, uploadedreels: selectedreel });
  setreelspreview(URL.createObjectURL(selectedreel));
};

const handlememechange = (e) => {
  const selectedmeme = e.target.files[0];
  setmemevalue({ ...memevalue, uploadedmeme: selectedmeme });
  setmemepreview(URL.createObjectURL(selectedmeme));
};

  // useEffect(()=>
  // {
  //   if(imagevalue.uploadedimg)
  //   {
  //     setpreview(URL.createObjectURL(imagevalue.uploadedimg))
  //   }
  //   if(videovalue.uploadedvideo)
  //   {
  //     setvideopreview(URL.createObjectURL(videovalue.uploadedvideo))
  //   }
  //   if(reelsvalue.uploadedreels)
  //   {
  //     setreelspreview(URL.createObjectURL(reelsvalue.uploadedreels))
  //   }
  //   if(memevalue.uploadedmeme)
  //   {
  //     setmemepreview(URL.createObjectURL(memevalue.uploadedmeme))
  //   }
  // },[imagevalue.uploadedimg,videovalue.uploadedvideo,reelsvalue.uploadedreels,memevalue.uploadedmeme])

  const submitimage=async(e)=>
  {
    e.preventDefault()
    const {uploadedimg,imgname,imgdescription}=imagevalue
    if(!uploadedimg || !imgname || !imgdescription)
    {
      toast.info("please fill the form completely")
    }
    else
    {
      const token=localStorage.getItem("token")
      const formdata=new FormData()
      formdata.append("uploadedimg",uploadedimg)
      formdata.append("imgname",imgname)
      formdata.append("imgdescription",imgdescription)
      try {
        const header={
          "Content-Type":"multipart/form-data",
          "x-access-token":token
        }
        const res=await axios.post(`${url}/api/admin/gallery`,{name:imgname,description:imgdescription,image:uploadedimg},{headers:header})
        console.log(res);
        if(res.status===200|| res.status===201)
        {
          toast.success("Added successfully")
          setimagevalue({
            imgname:"",
            imgdescription:""
          })
          setpreview("")
          document.getElementById('fileInput').value = '';
          
        }
        else
        {
          toast.error('Failed to add image');
        }
      } 
      catch (error) {
        console.log(error);
      }   
    }
  }

  const submitvideo=async(e)=>
  {
    e.preventDefault()
    const {uploadedvideo,videoname,videourl}=videovalue
    console.log(videovalue);
    if(!uploadedvideo || !videoname || !videourl)
    {
      toast.info("please fill the form completely")
    }
    else
    {
      const token=localStorage.getItem("token")
      const formdata=new FormData()
      formdata.append("uploadedvideo",uploadedvideo)
      formdata.append("videoname",videoname)
      formdata.append("videourl",videourl)
      try {
        const header={
          "Content-Type":"multipart/form-data",
          "x-access-token":token
        }
        const res=await axios.post(`${url}/api/admin/add-videogallery`,{title:videoname,url:videourl,video:uploadedvideo},{headers:header})
        if(res.status===200|| res.status===201)
        {
          toast.success("video added successfully")
          setvideovalue({
            videoname:"",
            videourl:""
          })
          setvideopreview("")
          document.getElementById('fileInput').value = '';
        }
        else
        {
          toast.error('Failed to add video');
        }
      }
      catch (error) {
        
        console.log(error);
      }

    }
  }

  const submitreels=async(e)=>
  {
    e.preventDefault()
    const {uploadedreels,reelsname,reelsdescription,reelslink}=reelsvalue
    if(!uploadedreels || !reelsname || !reelsdescription || !reelslink)
    {
      toast.info("please fill the form completely")
    }
    else
    {
      const token=localStorage.getItem("token")
      const formdata=new FormData()
      formdata.append("uploadedreels",uploadedreels)
      formdata.append("reelsname",reelsname)
      formdata.append("reelsdescription",reelsdescription)
      formdata.append("reelslink",reelslink)
      try {
        const header={
          "Content-Type":"multipart/form-data",
          "x-access-token":token
        }
        const res=await axios.post(`${url}/api/admin/add-reels`,{name:reelsname,description:reelsdescription,link:reelslink,image:uploadedreels},{headers:header})
        if(res.status===200|| res.status===201)
        {
          toast.success("reels added successfully")
          setreelsvalue({
            reelsname:"",
            reelsdescription:"",
            reelslink:""
          })
          setreelspreview("")
          document.getElementById('fileInput').value = '';
        }
        else
        {
          toast.error('Failed to add reels');
        }
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  const submitmeme=async(e)=>
  {
    e.preventDefault()
    const {memedescription,memename,uploadedmeme}=memevalue
    if(!memedescription || !memename || !uploadedmeme)
    {
      toast.info("please fill the form completely")
    }
    else
    {
      const token=localStorage.getItem("token")
      const formdata=new FormData()
      formdata.append("memedescription",memedescription)
      formdata.append("memename",memename)
      formdata.append("uploadedmeme",uploadedmeme)
      try {
        const header={
          "Content-Type":"multipart/form-data",
          "x-access-token":token
        }
        const res=await axios.post(`${url}/api/admin/add-meme`,{image:uploadedmeme,name:memename,description:memedescription},{headers:header})
        if(res.status===200|| res.status===201)
        {
          toast.success("meme added successfully")
          setmemevalue({
            memedescription:"",
            memename:""
          })
          setmemepreview("")
          document.getElementById('fileInput').value = '';
        }
        else
        {
          toast.error('Failed to add meme');
        }
      }
      catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div className='container'>
      <Homebutton/>
      <div className='justify-content-center align-items-center d-flex flex-column'>
        <div className='justify-content-center align-items-center d-flex' style={{ height: '100px', position: 'relative', width: '100%', overflow: 'hidden' }}>
          <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt="" style={{ position: 'absolute', width: '157%', left: '-34px' }} className='parentdiv' />
          <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{ zIndex: '10' }} />
        </div>

        <div className='row row-cols-4 row-cols-md-4 justify-content-center align-items-center d-flex mb-2 w-100 mt-2'>
          <div className="col">
            <Link to={'/partybook2/images'}>
              <button className={`btn text-light rounded-5 ${activeButton === 'images' ? 'active' : ''}`} style={{ backgroundColor: `${bgcolor}` }} onClick={() => handleButtonClick('images')}>
                Images
              </button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/partybook2/videos'}>
              <button className={`btn text-light rounded-5 ${activeButton === 'videos' ? 'active' : ''}`} style={{ backgroundColor:`${bgcolor}`}} onClick={() => handleButtonClick('videos')}>
                Videos
              </button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/partybook2/reels'}>
              <button className={`btn text-light rounded-5 ${activeButton === 'reels' ? 'active' : ''}`} style={{ backgroundColor: `${bgcolor}` }} onClick={() => handleButtonClick('reels')}>
                Reels
              </button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/partybook2/memes'}>
              <button className={`btn text-light rounded-5 ${activeButton === 'memes' ? 'active' : ''}`} style={{ backgroundColor:`${bgcolor}`}} onClick={() => handleButtonClick('memes')}>
                Trolls
              </button>
            </Link>
          </div>
        </div>

        {img&&<form style={{ backgroundColor: 'rgba(227, 227, 227, 1)' }} className='mb-5 p-3 w-100 justify-content-center align-items-center d-flex flex-column rounded'>
          <div className=' mt-3 w-100 p-5 rounded text-center' style={{ backgroundColor: 'white' }}>
          {preview ? (
             <label className='btn text-light btn-success' htmlFor='fileInput'>
                Image uploaded
                                <input type='file' id='fileInput' style={{ display: 'none' }} className='form-control w-25' />
                            </label>
                        ) : (
                            <label className='btn text-light' htmlFor='fileInput' style={{ backgroundColor: `${bgcolor}` }}>
                                Upload Image
                                <input type='file' id='fileInput' style={{ display: 'none' }} className='form-control w-25' onChange={handleimageChange} />
                            </label>
                        )}
          </div>
          <input type="text" className='form-control mt-2' placeholder='Name' value={imagevalue.imgname} onChange={(e)=>setimagevalue({...imagevalue,imgname:e.target.value})}/>
          <textarea name="" id="" cols="30" rows="7" className='form-control mt-2' placeholder='Description' value={imagevalue.imgdescription} onChange={(e)=>setimagevalue({...imagevalue,imgdescription:e.target.value})}></textarea>
          <button className='btn mt-4 text-light' style={{ backgroundColor: `${bgcolor}`}} type='button' onClick={(e)=>submitimage(e)}>Submit</button>
        </form>}


        {vd&&<form style={{ backgroundColor: 'rgba(227, 227, 227, 1)' }} className='mb-5 p-3 w-100 justify-content-center align-items-center d-flex flex-column rounded'>
          <div className=' mt-3 w-100 p-5 rounded text-center' style={{ backgroundColor: 'white' }}>
          {videopreview ? (
                            <label className='btn text-light btn-success' htmlFor='fileInput'>
                                Video uploaded
                                <input type='file' id='fileInput' style={{ display: 'none' }} className='form-control w-25' />
                            </label>
                        ) : (
                            <label className='btn text-light' htmlFor='fileInput' style={{ backgroundColor: `${bgcolor}`}}>
                                Upload Video
                                <input type='file' id='fileInput' style={{ display: 'none' }} className='form-control w-25' onChange={handlevideoChange} />
                            </label>
                        )}
          </div>
          <input type="text" className='form-control mt-2' placeholder='Name' value={videovalue.videoname} onChange={(e)=>setvideovalue({...videovalue,videoname:e.target.value})} />
          <input type="text" className='form-control mt-2' placeholder='Link' value={videovalue.videourl} onChange={(e)=>setvideovalue({...videovalue,videourl:e.target.value})}/>
          <button className='btn mt-4 text-light' style={{ backgroundColor: `${bgcolor}` }} onClick={(e)=>submitvideo(e)}>Submit</button>
        </form>}


        {rl&&<form style={{ backgroundColor: 'rgba(227, 227, 227, 1)' }} className='mb-5 p-3 w-100 justify-content-center align-items-center d-flex flex-column rounded'>
          <div className=' mt-3 w-100 p-5 rounded text-center' style={{ backgroundColor: 'white' }}>
          {reelspreview ? (
                            <label className='btn text-light btn-success' htmlFor='fileInput'>
                                Reels uploaded
                                <input type='file' id='fileInput' style={{ display: 'none' }} className='form-control w-25' />
                            </label>
                        ) : (
                            <label className='btn text-light' htmlFor='fileInput' style={{ backgroundColor: `${bgcolor}` }}>
                                Upload Reels
                                <input type='file' id='fileInput' style={{ display: 'none' }} className='form-control w-25' onChange={handlereelschange} />
                            </label>
                        )}
          </div>
          <input type="text" className='form-control mt-2' placeholder='Name' value={reelsvalue.reelsname} onChange={(e)=>setreelsvalue({...reelsvalue,reelsname:e.target.value})}/>
          <input type="text" className='form-control mt-2' placeholder='Link' value={reelsvalue.reelslink} onChange={(e)=>setreelsvalue({...reelsvalue,reelslink:e.target.value})}/>
          <textarea name="" id="" cols="30" rows="7" className='form-control mt-2' value={reelsvalue.reelsdescription} placeholder='Description' onChange={(e)=>setreelsvalue({...reelsvalue,reelsdescription:e.target.value})}></textarea>
          <button className='btn mt-4 text-light' style={{ backgroundColor: `${bgcolor}`}} onClick={(e)=>submitreels(e)}>Submit</button>
        </form>}


        {mem&&<form style={{ backgroundColor: 'rgba(227, 227, 227, 1)' }} className='mb-5 p-3 w-100 justify-content-center align-items-center d-flex flex-column rounded'>
          <div className=' mt-3 w-100 p-5 rounded text-center' style={{ backgroundColor: 'white' }}>
          {memepreview ? (
                            <label className='btn text-light btn-success' htmlFor='fileInput'>
                                Meme uploaded
                                <input type='file' id='fileInput' style={{ display: 'none' }} className='form-control w-25' />
                            </label>
                        ) : (
                            <label className='btn text-light' htmlFor='fileInput' style={{ backgroundColor: `${bgcolor}`}}>
                                Upload Meme
                                <input type='file' id='fileInput' style={{ display: 'none' }} className='form-control w-25' onChange={handlememechange} />
                            </label>
                        )}
          </div>
          <input type="text" className='form-control mt-2' placeholder='Name' value={memevalue.memename} onChange={(e)=>setmemevalue({...memevalue,memename:e.target.value})}/>
          <textarea name="" id="" cols="30" rows="7" className='form-control mt-2' placeholder='Description' value={memevalue.memedescription} onChange={(e)=>setmemevalue({...memevalue,memedescription:e.target.value})}></textarea>
          <button className='btn mt-4 text-light' style={{ backgroundColor: `${bgcolor}` }} onClick={(e)=>submitmeme(e)}>Submit</button>
        </form>}


      </div>
      <ToastContainer autoclose={2000} theme='colored' position='top-center'/>
    </div>
  );
}

export default Addimages;
