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
<div className='justify-content-center align-items-center d-flex' style={{height: '100px',position: 'relative',width: '100%',overflow: 'hidden'}}>
    <img src="https://s3-alpha-sig.figma.com/img/e12a/201f/1ff5d23251e9bbcb40e0dbc3a92d94b8?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=abm~dupQEsoC-zbjjRBn-SRXk3ugthXQjEWV~nX8mnPvbD3WWtt6cuEpjgS08sQ3szx62ppCkRhoJN59g7pJd7T-54uA~t2DDfecerEtKFbh2bpgm-Ue4dTtRn0tXT-z20DcJw0dCJ22KB7teON-V1Ykc57-khKfLSIov5Kerg3IXPAccZsX~S6bKYn-tCVGgPeYPrXe-7TCdqST6~m1odcOThLnDmwE670xYJHIo58DnK6QyO6ww-2jVXDd4jM7pwrL788gbyPl5OgGCiB0KpUu~pYEPIvdjJrodzmMWBxD1UbJVrCsFi9Dcy9IUlw4YjespI8QxncHEV16rz-A1w__" alt=""  style={{position: 'absolute',width: '157%',left: '-34px'}} className='parentdiv'/>
    <img src="https://s3-alpha-sig.figma.com/img/cbaa/86c1/0bd516a2c261529503cc52ead310f66c?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NGg-LUUprl6urnuCI-QCseNR941sE1CbdDaVwKKqXY7llM3KZQx-JzHAjDxxIL7Qn9rh5yGUDotXUObCCb5qSCDoWKvcrjKd76OvV1jxYHCYTr0a8rLakmeE5G29XLX4lTAovHJ5tchcxH6lt3erN-kOKyUjY6-r47JlQm0GJP0qXQHnyfCtb1c~MmBKEhCTzRlf0n5TNvg4O7nGI1VXsGtu90nIjK7-0zPqY6D0djbMutfB9NfZWQaEi0ohRxefgxgEfMxglgTG76mRP6J8A0uFypuKinEwKxfqMf-Xr2suEVNKfP65Z7AXfUolSzkT4MeREyic-GwdVpWanJq~Xw__" alt="" width={'100px'} style={{zIndex: '10'}} />
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
