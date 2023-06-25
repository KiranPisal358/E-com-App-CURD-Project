require('dotenv').config();
const express = require('express')
const app = express();
const mongoose = require('mongoose')
require('./db/conn');
const books = require('./models/bookSchema')
const cors = require('cors');
// const router = require('./routes/router');

const port = 8003;

app.use(cors());
app.use(express.json());

//  app.use(router, (req,res)=>{

//  });

// Add books i.e post
app.post("/addbook", async (req,resp)=>{
    const {bname,bauthor,publisher,publishedYear,price,category,latestEdition} = req.body;

    if(!bname || !bauthor || !publisher || !publishedYear || !price || !category || !latestEdition){
        resp.status(422).send(`{ "error": "Plzz fill the data" }`);
    }
    try {

        const prebook = await books.findOne({bname:bname});
        console.log(prebook);

        if(prebook){
            resp.status(422).send(`{"error":"This book is already stored"}`);
        }else{
            const data = new books({
                bname, bauthor, publisher, publishedYear, price, category, latestEdition
            });

            await data.save();
            resp.status(201).json(data);
            console.log(data);
        }
    } catch (error){
        resp.status(422).send(error)
    }
    // let data = new books(req.body);
    // let results = await data.save();  
    // resp.send(results)
    // console.log("created")
    // Request Type:POST
})
//  app.post('./addbook',(req,res)=>{
//     console.log(req.body);
// })


// app.listen(port, ()=>{
//     console.log(`server is started at ${port}`)
// })

// Get Book Data.....
app.get("/getdata", async(req,res)=>{
    try {
        const bookData = await books.find();
        res.status(201).json(bookData)
        console.log(bookData);

    } catch (error) {
        res.status(4).json(error);
    }
});

// View Book Details

app.get("/getdata/:id", async(req,res)=>{
    try {
        console.log(req.params);
       const {id} = req.params;

       const indivisualBook = await books.findById({_id:id});
       console.log(indivisualBook);
       res.status(201).json(indivisualBook);
    } catch (error) {
        res.status(422).json(error);
    }
});

// Update Books

app.patch("/updatebook/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const updateBook = await books.findByIdAndUpdate(id,req.body, {
            new:true
        });
        console.log(updateBook);
        res.status(201).json(updateBook);

    } catch (error) {
res.status(422).json(error);
    }
});


// Delete Book-

app.delete("/deletebook/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteBook = await books.findByIdAndDelete({_id:id});
        console.log(deleteBook);
        res.status(201).json(deleteBook);

    } catch (error) {
        res.status(422).json(error);
    }
})
app.listen(port);