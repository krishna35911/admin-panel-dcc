import React, { useEffect, useState } from 'react'
import Homebutton from '../Homebutton'
import { useNavigate } from 'react-router-dom'
import './Addarticle.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Addarticle() {
    const [data, setData] = useState({
        image: null,
        href: '',
        name: '',
        description: ''
    });

    const [url,seturl]=useState(localStorage.getItem("commonurl"))
    const bgcolor=localStorage.getItem("bgcolor")
    const navigate=useNavigate()
    const[preview,setpreview]=useState("")
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
    const handleFileChange = (e) => {
        const selectedImage = e.target.files[0];
        setData({ ...data, image: selectedImage });
        setpreview(URL.createObjectURL(selectedImage));
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('image', data.image);
        formData.append('href', data.href);
        formData.append('description', data.description);

        try {
            const headers = {
                'Content-Type': 'multipart/form-data',
                'x-access-token': token
            };
            const res = await axios.post(`${url}/api/admin/article`, formData, { headers });
            if (res.status === 200 || res.status === 201) {
                toast.success('Article added successfully');
                setData({
                    ...data,
                    name: '',
                    href: '',
                    description: ''
                });
                setpreview("")
                document.getElementById('fileInput').value = '';
            } else {
                toast.error('Something went wrong');
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to add article');
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
     <div className='justify-content-center align-items-center d-flex flex-column w-100'>
                <h4 className='fw-bold mt-2 mb-3'>Articles</h4>
                <form style={{backgroundColor:'rgba(227, 227, 227, 1)'}} className='mb-5 p-3 w-100  justify-content-center align-items-center d-flex flex-column rounded'>
                    <input
                        type='text'
                        className='form-control mt-3'
                        value={data.name}
                        placeholder='Name'
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                    />
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
                    <input
                        type='text'
                        className='form-control mt-3'
                        placeholder='URL'
                        value={data.href}
                        onChange={(e) => setData({ ...data, href: e.target.value })}
                    />
                    <textarea
                        name=''
                        id=''
                        cols='30'
                        rows='6'
                        value={data.description}
                        className='form-control mt-3'
                        placeholder='Description'
                        onChange={(e) => setData({ ...data, description: e.target.value })}
                    ></textarea>
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
            <ToastContainer autoclose={2000} theme='colored' position='top-center' />
        </div>
        </div>
  )
}

export default Addarticle
