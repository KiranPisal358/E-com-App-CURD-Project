const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bname:String,
    bauthor:String,
    publisher:String,
    publishedYear:Number,
    price:Number,
    category:String,
    latestEdition:String
});

const books = new mongoose.model('books', bookSchema);

module.exports = books;