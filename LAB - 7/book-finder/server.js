const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let db;

async function start(){
    await client.connect();
    db = client.db("booksDB");
    console.log("Database Connected");
}

start();


// SEARCH BOOK BY TITLE
app.get("/books/search", async (req,res)=>{

const title = req.query.title;

const books = await db.collection("books").find({
title:{$regex:title,$options:"i"}
}).toArray();

res.send(books);

});


// FILTER BOOKS BY CATEGORY
app.get("/books/category/:category", async (req,res)=>{

const category = req.params.category;

const books = await db.collection("books").find({
category:category
}).toArray();

res.send(books);

});


// SORT BOOKS BY PRICE
app.get("/books/sort/price", async (req,res)=>{

const books = await db.collection("books").find()
.sort({price:1})
.toArray();

res.send(books);

});


// SORT BOOKS BY RATING
app.get("/books/sort/rating", async (req,res)=>{

const books = await db.collection("books").find()
.sort({rating:-1})
.toArray();

res.send(books);

});


// TOP RATED BOOKS
app.get("/books/top", async (req,res)=>{

const books = await db.collection("books").find({
rating:{$gte:4}
}).limit(5).toArray();

res.send(books);

});


// PAGINATION
app.get("/books", async (req,res)=>{

const page = parseInt(req.query.page) || 1;
const limit = 2;

const books = await db.collection("books").find()
.skip((page-1)*limit)
.limit(limit)
.toArray();

res.send(books);

});


app.listen(3001, ()=>{
console.log("Server running on port 3001");
});