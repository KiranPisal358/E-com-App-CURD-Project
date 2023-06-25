import React, { useEffect, useState} from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { CardContent } from '@mui/material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { NavLink, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const BookDetail = () => {
  const [getBookData, setBookData] = useState([]);
  console.log(getBookData);

  const navigate = useNavigate("");

  const {id} = useParams("");
  console.log(id);

  const getData = async()=>{

    const res = await fetch(`/getdata/${id}`, {
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        },
    });

    const data = await res.json();
    // console.log(data);

    if(res.status === 422 || !data){
        console.log("error");
    }else{
        setBookData(data);
        // alert("Data Fetching successful!!");
    }
    
}
useEffect(()=>{
  getData();
});

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
      // alert("Book Deleted")
      navigate("/");
  }
}

  return (
    <div className='container mt-3'>
      <NavLink to="/">Home</NavLink>
        <h1 style={{fontWeight:400}} >{getBookData.bname}</h1>
        <Card sx={{ maxWidth:800, marginLeft:'14rem' }}>
      <CardContent>
      <div className="add_btn">
                        <NavLink to={`/update/${getBookData._id}`}>  <button className="btn btn-primary mx-2"><CreateIcon /></button></NavLink>
                        <button className="btn btn-danger" onClick={()=>deletebook(getBookData._id)} ><DeleteIcon /></button>
                    </div>
        <ImportContactsIcon style={{width:50, height:100}}/>
        <h4 className="mt-3">Book Name: <span style={{fontWeight:350, color:'green'}}>{getBookData.bname}</span></h4>
        <h4 className="mt-3">Author: <span style={{fontWeight:350, color:'green'}}>{getBookData.bauthor}</span></h4>
        <h4 className="mt-3">Publisher: <span style={{fontWeight:350, color:'green'}}>{getBookData.publisher}</span></h4>
        <h4 className="mt-3">Published Year: <span style={{fontWeight:350, color:'green'}}>{getBookData.publishedYear}</span></h4>
        <h4 className="mt-3">Price: <span style={{fontWeight:350, color:'green'}}>{getBookData.price}</span></h4>
        <h4 className="mt-3">Category: <span style={{fontWeight:350, color:'green'}}>{getBookData.category}</span></h4>
        <h4 className="mt-3">Latest Edition: <span style={{fontWeight:350, color:'green'}}>{getBookData.latestEdition}</span></h4>

      </CardContent>
      </Card>

    </div>
  )
}

export default BookDetail