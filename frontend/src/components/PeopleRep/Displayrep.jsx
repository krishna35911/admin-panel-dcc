import React, { useEffect, useState } from 'react'
import Homebutton from '../Homebutton'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Displayrep.css'
import { getColorForDistrict } from '../Districtcolor';
function Displayrep() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [rep, setrep] = useState([]);
  const[repdata,setrepdata]=useState([])

  const[allcategory,setallcategory]=useState([])
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
  const handlecategory=async()=>
  {
          const token=localStorage.getItem("token")
          const res=await axios.get(`${url}/api/admin/representatives`,{headers:{"x-access-token":token}})
          if(res.status===200)
          {
            setallcategory(res.data);
          }
          else
          {
            console.log(res.response.data);
          }
  }
  useEffect(()=>
{
    handlecategory()
},[])
 
const handleclick = async (category) => {
  try {
    const res = await axios.get(`${url}/api/admin/representatives?category=${category}`, {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    });

    if (res.status === 200 || res.status === 201) {
      setrepdata( res.data[0]);

      if (Array.isArray(res.data) && res.data.length > 0) {
        const categoryObject = res.data.find(obj => obj.category === category);

        if (categoryObject) {
          const representativesArray = categoryObject.representatives;

          console.log('Representatives Array:', representativesArray);

          setSelectedCategory(category);

          setrep(representativesArray);
        } else {
          console.log(`Category '${category}' not found in the API response`);
        }
      } else {
        console.log('Invalid or empty API response data');
      }
    } else {
      console.log(`Request failed with status: ${res.status}`);
      console.log('Error response data:', res.data);
    }
  } catch (error) {
    console.error('Error fetching representatives:', error);
  }
};

console.log(repdata);

useEffect(() => {
  if (allcategory.length > 0) {
    const firstCategory = allcategory[0].category;
    handleclick(firstCategory);
  }
}, [allcategory]);
const handledelete=async(representativeId )=>
{
  const token=localStorage.getItem("token")
  const categoryId=repdata._id
  console.log(representativeId );
    const res=await axios.delete(`${url}/api/admin/representatives/${categoryId}/${representativeId}`,{headers:{"x-access-token":token}})
    if(res.status===200 || res.status===201)
    {
      toast.success('Deleted successfully')
      setrep(prevCandidates =>
        prevCandidates.filter(c => c._id !== representativeId)
      );
    }
    else
    {
      toast.error('Failed to delete')
      console.log(res.response.data);
    }
}
useEffect(()=>
{
  handleclick()
},[])


  return (
    <div className='container'>
    <Homebutton/>
      <div className='justify-content-center align-items-center d-flex flex-column'>
      <div className='justify-content-center align-items-center d-flex' style={{ height: '100px', position: 'relative', width: '100%', overflow: 'hidden' }}>
          <img src="https://i.postimg.cc/RF3SkJz8/wave.png" alt="" style={{ position: 'absolute', width:'130%',rotate:'-7deg',objectFit:'contain', objectPosition:'center',left: '-34px' }} className='parentdiv' />
          <img src="https://i.postimg.cc/3R3VsdDh/download-1-3-1.png" alt="" width={'100px'} style={{ zIndex: '10' }} />
      </div>
           <div className="d-flex justify-content-start" style={{ 
  overflowX: 'auto', 
  maxWidth: '100%', 
  WebkitOverflowScrolling: 'touch', 
  scrollbarWidth: 'thin',
  scrollbarColor: `${bgcolor} white`,
}}>
          {allcategory?.length > 0 ? (
            allcategory.map((item,index) => (
              <div key={index} className="">
                <button className={`btn rounded-5 mb-2 ${selectedCategory === item.category ? 'active' : ''}`} style={{ backgroundColor: `${bgcolor}`, color:`${textcolor}`,whiteSpace: 'nowrap' }} onClick={()=>handleclick(item.category)}>
                  {item.category}
                </button>
              </div>
            ))
          ) : (
            <p>No categories found</p>
          )}
        </div>

{rep?.length > 0 ? (
  <ListGroup as="ol" numbered className="mb-2 p-2 w-100">
    {rep.map((item, index) => (
      <ListGroup.Item
        key={index}
        style={{ backgroundColor: 'rgba(227, 227, 227, 1)', borderBottom: '2px solid rgb(133, 129, 129, 0.553)' }}
        as="li"
        className="d-flex justify-content-between align-items-center"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{item.name}</div>
        </div>
        <button type='button' className='btn' onClick={()=>handledelete(item._id)}><i class="fa-solid fa-trash"  style={{ color: 'rgba(106, 106, 106, 1)' }}></i></button>
      </ListGroup.Item>
    ))}
  </ListGroup>
) : (
  <p>No candidates available.</p>
)}
      <Link to={'/addrep'}><button className='btn mt-2 ' style={{backgroundColor:`${bgcolor}`,color:`${textcolor}`}}><i class="fa-solid fa-plus me-2"></i>Add New representative</button></Link>
  
    </div>
    <ToastContainer autoclose={2000} theme='colored' position='top-center'/>

   </div>
  )
}

export default Displayrep
