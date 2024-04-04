import React, { useEffect, useState } from 'react'
import './Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
  const [data, setdata] = useState({
    email: "",
    password: ""
  })
  const [url, seturl] = useState(localStorage.getItem("baseurl"))

  const navigate = useNavigate()

useEffect(() => {
  seturl(localStorage.getItem("baseurl"))
},[])

  const { email, password } = data
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.info('Please fill the form completely')
    }
    else {
      axios
        .post(`${url}/api/admin/login`, { email: email, password: password })
        .then((res) => {
          console.log(res.data);
          if (res.status === 200 || res.status === 201) {
            toast.success('Login Successful')
            localStorage.setItem("basetoken", res.data.token);
            localStorage.setItem("volunteertoken", res.data.volunteerToken);
            setTimeout(() => {
              navigate('/panel')
            }, 1000);

          } else {
            toast.error(res.response.data)
          }
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }

  return (
    <div className='firstdiv'>
      <div style={{ position: 'absolute', color: 'white' }} className='secondiv' >
        <h3 style={{ fontFamily: 'koho', fontWeight: '700', fontSize: '28px' }} className='heading'>Login</h3>
        <p style={{ fontFamily: 'koho', fontWeight: '500', fontSize: '13px' }}>Welcome!! Enter your details</p>
        <form className='d-flex flex-column justify-content-center align-items-center ms-5 p-4 rounded' style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)' }}>
          <input type="email" placeholder='Email' className='form-control rounded w-100' value={data.email} onChange={(e) => setdata({ ...data, email: e.target.value })} />
          <input type='password' placeholder='Password' className='form-control mt-5 rounded' value={data.password} onChange={(e) => setdata({ ...data, password: e.target.value })} />
          <button type='button' className='form-control mt-5 btn btn-primary rounded w-50' onClick={(e) => handleSubmit(e)}>Login</button>
        </form>
      </div>
      <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

    </div>
  )
}

export default Login
