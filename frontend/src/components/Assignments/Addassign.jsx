import React, { useEffect, useState } from 'react'
import './Addassign.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homebutton from '../Homebutton';

function Addassign() {
  const [data, setData] = useState({
    title: '',
    image: null,
    description: '',
    districtrule: '',
    link: '',
    optional: '',
    taskforce: '',
    date: ''
});
    const [url,seturl]=useState(localStorage.getItem("volunteerurl"))
    const bgcolor=localStorage.getItem("bgcolor")
    const navigate=useNavigate()
    const[preview,setpreview]=useState("")
    useEffect(()=>
    {
      seturl(localStorage.getItem("volunteerurl"))
    },[])
    useEffect(()=>
    {
      const token=localStorage.getItem("volunteertoken")
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
      setData({ ...data, image: selectedImage });
      setpreview(URL.createObjectURL(selectedImage));
  };

    const handleSubmit=async(e)=>
    {
      e.preventDefault();
      const token = localStorage.getItem('volunteertoken');
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('image', data.image);
      formData.append('description', data.description);
      formData.append('districtrule', data.districtrule);
      formData.append('link', data.link);
      formData.append('optional', data.optional);
      formData.append('taskforce', data.taskforce);
      formData.append('date', data.date);

      try {
          const headers = {
              'Content-Type': 'multipart/form-data',
              'x-access-token': token
          };
          const res = await axios.post(`${url}/api/admin/assignment`, formData, { headers });
          if (res.status === 200 || res.status === 201) {
              toast.success('Assignment added successfully');
              setData({
                  title: '',
                  image: null,
                  description: '',
                  districtrule: '',
                  link: '',
                  optional: '',
                  taskforce: '',
                  date: ''
              });
              setpreview('');
              document.getElementById('fileInput').value = '';
          } else {
              toast.error('Something went wrong');
          }
      } catch (error) {
          console.log(error);
          toast.error('Failed to add assignment');
      }
        }
    
  return (
    <div className='container'>
      <Homebutton/>
<div className=' justify-content-center align-items-center d-flex flex-column'>
<div className='justify-content-center align-items-center d-flex' style={{height: '100px',position: 'relative',width: '100%',overflow: 'hidden'}}>
    <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt=""  style={{position: 'absolute',width: '157%',left: '-34px'}} className='parentdiv'/>
    <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{zIndex: '10'}} />
     </div>
     <h4 className='fw-bold mt-2 mb-3'>Assignment</h4>
     <form
                    style={{ backgroundColor: 'rgba(227, 227, 227, 1)' }}
                    className='mb-5 p-3 w-100 justify-content-center align-items-center d-flex flex-column rounded'
                >
                    <input
                        type='text'
                        className='form-control mt-3'
                        placeholder='Title'
                        onChange={(e) => setData({ ...data, title: e.target.value })}
                        value={data.title}
                    />
                    <div className='mt-3 w-100 p-5 rounded text-center' style={{ backgroundColor: 'white' }}>
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
                    <textarea
                        name=''
                        id=''
                        cols='30'
                        rows='6'
                        placeholder='Description'
                        className='form-control mt-3'
                        onChange={(e) => setData({ ...data, description: e.target.value })}
                        value={data.description}
                    ></textarea>
                    <input
                        type='date'
                        className='form-control mt-3'
                        onChange={(e) => setData({ ...data, date: e.target.value })}
                        value={data.date}
                    />
                    <input
                        type='text'
                        className='form-control mt-3'
                        placeholder='Districtrule'
                        onChange={(e) => setData({ ...data, districtrule: e.target.value })}
                        value={data.districtrule}
                    />
                    <input
                        type='text'
                        className='form-control mt-3'
                        placeholder='Taskforce'
                        onChange={(e) => setData({ ...data, taskforce: e.target.value })}
                        value={data.taskforce}
                    />
                    <input
                        type='text'
                        className='form-control mt-3'
                        placeholder='Optional'
                        onChange={(e) => setData({ ...data, optional: e.target.value })}
                        value={data.optional}
                    />
                    <input
                        type='text'
                        className='form-control mt-3'
                        placeholder='Link'
                        onChange={(e) => setData({ ...data, link: e.target.value })}
                        value={data.link}
                    />
                    <button
                        className='btn mt-4 text-light'
                        style={{ backgroundColor: `${bgcolor}` }}
                        type='button'
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </form>
  
</div>
<ToastContainer autoclose={2000} theme='colored' position='top-center'/>

</div>
  )
}

export default Addassign
