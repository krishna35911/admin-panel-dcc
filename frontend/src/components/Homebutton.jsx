import React from 'react'
import { useNavigate } from 'react-router-dom'

function Homebutton() {
    const navigate=useNavigate()
    const handleclick=()=>
    {
        navigate('/district')
    }
  return (
    <div>
       <button className='btn' onClick={handleclick} type='button'><i class="fa-solid fa-house mt-3 ms-3 bg-dark text-light p-2" style={{borderRadius:'30px'}}></i></button>
    </div>
  )
}

export default Homebutton
