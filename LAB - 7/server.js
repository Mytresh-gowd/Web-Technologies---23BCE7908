const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// This line allows Node to serve your HTML file
app.use(express.static(__dirname));

// MongoDB connection
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let db;

async function start() {
    await client.connect();
    db = client.db("notesDB");
    console.log("Database Connected");
}

start();


// ADD NOTE
app.post("/notes", async (req, res) => {

    const note = {
        title: req.body.title,
        subject: req.body.subject,
        description: req.body.description
    };

    const result = await db.collection("notes").insertOne(note);

    res.send(result);
});


// VIEW NOTES
app.get("/notes", async (req, res) => {

    const notes = await db.collection("notes").find().toArray();

    res.send(notes);
});


// UPDATE NOTE
app.put("/notes/:id", async (req, res) => {

    const id = req.params.id;

    await db.collection("notes").updateOne(
        { _id: new ObjectId(id) },
        { $set: req.body }
    );

    res.send("Note Updated");
});


// DELETE NOTE
app.delete("/notes/:id", async (req, res) => {

    const id = req.params.id;

    await db.collection("notes").deleteOne(
        { _id: new ObjectId(id) }
    );

    res.send("Note Deleted");
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});