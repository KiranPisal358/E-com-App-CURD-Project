import React, { useEffect, useState } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from 'react-router-dom';



const Home = () => {

    const [getBookData, setBookData] = useState([]);
    console.log(getBookData)

    const getData = async(e)=>{

        const res = await fetch("/getdata", {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
        });

        const data = await res.json();
        console.log(data);

        if(res.status === 422 || !data){
            console.log("error");
        }else{
            setBookData(data);
            // alert("Data Fetching successful!!");
        }
        
    }

    useEffect(()=>{
        getData();
    },[])

    const deletebook = async (id) =>{
        const res2 = await fetch(`/deletebook/${id}`, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
            
        });
        const deletedata = await res2.json();
        console.log(deletedata);

        if(res2.status == 422 || !deletedata){
            console.log("error");
        }else{
            console.log("book deleted");
            getData();
            alert("Book Deleted")
        }
    }

    return (
        <div className='mt-5'>
            <div className='container'>
                {/* <div className='add_btn mt-2'>
                    <NavLink to="/addbook" className='btn btn-primary'>+ Add Books</NavLink>
                </div> */}
                <table className="table mt-2">
                    <thead>
                        <tr className='table-dark'>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Author</th>
                            <th scope="col">Publisher</th>
                            <th scope="col">Published Year</th>
                            <th scope="col">Price</th>
                            <th scope="col">Category</th>
                            <th scope="col">Edition</th>
                            <th scope="col">
                                <div className='add_btn mt-2'>
                                     <NavLink to="/addbook" className='btn btn-primary'>+ Add Books</NavLink>
                                </div>    
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getBookData.map((element,id)=>{
                                return(
                                    <>
                                     <tr>
                            <th scope="row">{id+1}</th>
                            <td>{element.bname}</td>
                            <td>{element.bauthor}</td>
                            <td>{element.publisher}</td>
                            <td>{element.publishedYear}</td>
                            <td>{element.price}</td>
                            <td>{element.category}</td>
                            <td>{element.latestEdition}</td>
                            <td className='d-flex justify-content-between'>
                                <NavLink to={`/view/${element._id}`}><button className='btn btn-success mt-5' style={{marginRight:'1rem'}}><RemoveRedEyeIcon /></button></NavLink>
                               <NavLink to={`update/${element._id}`}><button className='btn btn-primary mt-5'style={{marginRight:'1rem'}}><CreateIcon /></button></NavLink>
                                <button className='btn btn-danger mt-5' onClick={()=>deletebook(element._id)}><DeleteIcon /></button>

                            </td>
                        </tr>
                                    </>
                                )
                            })
                        }

                       
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home;