const express = require("express");
require("dotenv").config()
const { MongoClient } = require("mongodb");
const app = express();
const port = 2000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running!");
});

// mongodb connection
const uri = process.env.MONGO_URI
const client = new MongoClient(uri)
const database = client.db("Blog")
const collection = database.collection("blogs")

async function run() {
    try {
        await client.connect();
        console.log(`Mongodb is connected..`)
        await client.db("admin").command({ ping: 1 });
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}
run().catch(console.dir);


app.post("/api/createPost", async (req, res) => {
    const blogData = req.body;
    try {
        const result = await collection.insertOne(blogData);
        res.status(200).send({ blog: result });
    } catch (error) {
        res.status(400).send({ message: "Data is not inserted" });
    }
});

app.get("/api/allBlogs", async (req, res) => {
    try {
        const blogs = await collection.find().toArray()
        res.status(200).send({ blogs: blogs })
    } catch (error) {
        res.status(400).send({ message: "Something error in server." });
    }

})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
