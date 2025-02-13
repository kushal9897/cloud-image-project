const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // ✅ Import path module

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static frontend files
app.use(express.static(path.join(__dirname, "frontend")));

const MONGO_URI = "mongodb+srv://admin:mypassword@newsdb.gr4fn.mongodb.net/?retryWrites=true&w=majority&appName=newsdb"; // Replace with your actual connection string

mongoose.connect(MONGO_URI, { dbName: "your-database-name" })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Updated Schema to include `image`
const NewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true } // Added image field
});

const News = mongoose.model("News", NewsSchema);

// ✅ Fetch all news
app.get("/news", async (req, res) => {
    try {
        const news = await News.find();
        res.json(news);
    } catch (err) {
        res.status(500).json({ error: "Error fetching news" });
    }
});

// ✅ Add news with image support
app.post("/news", async (req, res) => {
    try {
        const { title, content, image } = req.body;

        if (!title || !content || !image) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const news = new News({ title, content, image });
        await news.save();
        res.status(201).json(news);
    } catch (err) {
        res.status(500).json({ error: "Error adding news" });
    }
});

// ✅ Delete news
app.delete("/news/:id", async (req, res) => {
    try {
        await News.findByIdAndDelete(req.params.id);
        res.json({ message: "News deleted" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting news" });
    }
});

// ✅ Serve frontend for all other routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
