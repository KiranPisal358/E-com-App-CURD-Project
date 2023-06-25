import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useParams} from 'react-router-dom'


const Update = () => {
    // const [getBookData, setBookData] = useState([]);
    // console.log(getBookData);

    const navigate = useNavigate("");

    const [inpval, setInp] = useState({
        bname:"",
        bauthor:"",
        publisher:"",
        publishedYear:"",
        price:"",
        category:"",
        latestEdition:""
    })
    
    const setData = (e) =>{
        console.log(e.target.value)
        const {name,value} = e.target;
        setInp((preval)=>{
            return {
                ...preval,
                [name]:value
            }
        })
    }

    const {id} = useParams("");
    console.log(id);
  
    const getData = async () =>{
  
      const res = await fetch(`/getdata/${id}`, {
          method:"GET",
          headers:{
              "Content-Type":"application/json"
          }
      });
  
      const data = await res.json();
      // console.log(data);
  
      if(res.status === 422 || !data){
          console.log("error");
      }else{
        setInp(data);
          // alert("Data Fetching successful!!");
      }
      
  }
  useEffect(()=>{
    getData();
  }, [])

  const updateBook = async(e) =>{
    e.preventDefault();
    const {bname,bauthor,publisher,publishedYear,price,category,latestEdition} = inpval;
    const res2 = await fetch(`/updatebook/${id}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            bname,bauthor,publisher,publishedYear,price,category,latestEdition
        })
    });
    const data2 = await res2.json();
    console.log(data2);

    if(res2.status === 422 || !data2){
        alert("fill the data");
    }else{
        alert("data updated");
        navigate("/");
    }
  }
  return (
    <div className='container'>
            <NavLink to='/'>Home</NavLink>
            <form className='add-book'>
                <h1 className='mb-4'>Update Book Details</h1>
                <div className="mb-3">
                    <label htmlFor="bname" className="form-label fw-bold">Book Name</label>
                    <input type="txt" name="bname" onChange={setData} value={inpval.bname} className="form-control w-50" id="bname" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="bauthor" className="form-label fw-bold">Book Author</label>
                    <input type="txt" name="bauthor" onChange={setData} value={inpval.bauthor} className="form-control w-50" id="bauthor" />
                </div>
                <div className="mb-3">
                    <label htmlFor="publisher" className="form-label fw-bold">Publisher</label>
                    <input type="txt" name="publisher" onChange={setData} value={inpval.publisher} className="form-control w-50" id="publisher" />
                </div>
                <div className="mb-3">
                    <label htmlFor="publishedYear" className="form-label fw-bold">Published Year</label>
                    <input type="number" name="publishedYear" onChange={setData} value={inpval.publishedYear} className="form-control w-50" id="publishedYear" />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label fw-bold">Book Price</label>
                    <input type="number" name="price" onChange={setData} value={inpval.price} className="form-control w-50" id="price" />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label fw-bold">Book Category</label>
                    <input type="txt" name="category" onChange={setData} value={inpval.category} className="form-control w-50" id="category" />
                </div>
                <div className="mb-3">
                    <label htmlFor="latestEdition" className="form-label fw-bold">Latest Edition</label>
                    <input type="txt" name="latestEdition" onChange={setData} value={inpval.latestEdition} className="form-control w-50" id="latestEdition" />
                </div> 

                <button type="submit" onClick={updateBook} className="btn btn-primary btn-submit mb-5">Submit</button>
            </form>

        </div>
  )
}

export default Update