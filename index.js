const express = require("express");
require("dotenv").config()
const { MongoClient, ObjectId } = require("mongodb");
const cors = require('cors');
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const port = 2000;

app.use(express.json());
app.use(cors())
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Server is running!");
});

// mongodb connection
const uri = process.env.MONGO_URI
const client = new MongoClient(uri)
const database = client.db("Blog")
const collection = database.collection("blogs")
const comments = database.collection("comments")
const wishlist = database.collection("wishlist")
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

// jwt api
app.post("/api/jwt", (req, res) => {
    try {
        const { email } = req.body;
        console.log(email)
        const user = { email };
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.status(200).send({ token })
    } catch (error) {
        res.status(400).send({ message: "Something went wrong on the server." });
    }
})



app.post("/api/addblog", async (req, res) => {
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
app.get("/api/blog/:id", async (req, res) => {
    try {
        const blog = await collection.findOne({ _id: new ObjectId(req.params.id) })
        res.status(200).send({ blog: blog })
    } catch (error) {
        res.status(400).send({ message: "Something error in server." });
    }

})


app.put("/api/editblog/:id", (req, res) => {
    try {
        const blog = req.body;
        const result = collection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: blog });
        res.status(200).send({ blog: result });
    } catch (error) {
        res.status(400).send({ message: "Something went wrong on the server." });
    }
})

app.post("/api/addToWishlist", async (req, res) => {
    try {
        const wishlistData = req.body;
        const result = await wishlist.insertOne(wishlistData);
        res.status(200).send({ wishlist: result });
    } catch (error) {
        res.status(400).send({ message: "Something went wrong on the server." });
    }
});
app.get("/api/getWishlist", async (req, res) => {
    try {
        const wishlistData = await wishlist.find().toArray();
        res.status(200).send({ wishlist: wishlistData });
    } catch (error) {
        res.status(400).send({ message: "Something went wrong on the server." });

    }
})


app.post("/api/addcomment", async (req, res) => {
    try {
        const comment = req.body;
        const result = await comments.insertOne(comment);
        res.status(200).send({ comment: result });
    } catch (error) {
        res.status(400).send({ message: "Data is not inserted" });
    }
})

app.get("/api/allComments", async (req, res) => {
    try {
        const comment = await comments.find().toArray()
        res.status(200).send({ comment: comment })
    } catch (error) {
        res.status(400).send({ message: "Something error in server." });
    }

})
app.delete("/api/deletecomment/:id", async (req, res) => {
    try {
        const comment = await comments.deleteOne({ _id: new ObjectId(req.params.id) });
        res.status(200).send({ comment: comment });
    } catch (error) {
        res.status(400).send({ message: "Something went wrong on the server." });
    }
});




app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
