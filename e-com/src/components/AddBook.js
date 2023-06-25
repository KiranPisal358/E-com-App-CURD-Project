import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const AddBook = () => {

    const navigate = useNavigate();
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

    const addInpData = async(e)=>{
        e.preventDefault();

        const {bname,bauthor,publisher,publishedYear,price,category,latestEdition} = inpval;

        const res = await fetch("/addbook", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                bname,bauthor,publisher,publishedYear,price,category,latestEdition
            })
        });

        const data = await res.json();
        console.log(data);

        if(res.status === 422 || !data){
            alert("error"); 
            console.log("error");
        }else{
            navigate("/")
            alert("Data Added");
        }
        
    }
    return (
        <div className='container'>
            <NavLink to='/'>Home</NavLink>
            <form className='add-book'>
                <h1 className='mb-4'>Add Book Details</h1>
                <div className="mb-3">
                    <label htmlFor="bname" className="form-label fw-bold">Book Name</label>
                    <input type="txt" name="bname" onChange={setData} value={inpval.bname} className="form-control w-50" id="bname1" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="bauthor" className="form-label fw-bold">Book Author</label>
                    <input type="txt" name="bauthor" onChange={setData} value={inpval.bauthor} className="form-control w-50" id="bauthor1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="publisher" className="form-label fw-bold">Publisher</label>
                    <input type="txt" name="publisher" onChange={setData} value={inpval.publisher} className="form-control w-50" id="publisher1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="publishedYear" className="form-label fw-bold">Published Year</label>
                    <input type="number" name="publishedYear" onChange={setData} value={inpval.publishedYear} className="form-control w-50" id="publishedYear1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label fw-bold">Book Price</label>
                    <input type="number" name="price" onChange={setData} value={inpval.price} className="form-control w-50" id="price1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label fw-bold">Book Category</label>
                    <input type="txt" name="category" onChange={setData} value={inpval.category} className="form-control w-50" id="category1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="latestEdition" className="form-label fw-bold">Latest Edition</label>
                    <input type="txt" name="latestEdition" onChange={setData} value={inpval.latestEdition} className="form-control w-50" id="latestEdition1" />
                </div> 

                <button type="submit" onClick={addInpData} className="btn btn-primary btn-submit mb-5">Submit</button>
            </form>

        </div>
    )
}

export default AddBook;