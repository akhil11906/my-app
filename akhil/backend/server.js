import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const app = express();
app.use(express.json());

// Enable CORS (Fixes Upload Issues)
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure "uploads" directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// ✅ Function to create a unique folder if property already exists
const getUniqueFolderName = (propertyName) => {
    let folderPath = path.join(uploadsDir, propertyName);
    let counter = 1;

    while (fs.existsSync(folderPath)) {
        folderPath = path.join(uploadsDir, `${propertyName}_${counter}`);
        counter++;
    }

    return folderPath;
};

// ✅ Custom Multer Storage (Ensures One Folder Per Property)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!req.propertyFolder) {
            let propertyName = req.body.propertyName.trim().replace(/\s+/g, "_"); // Convert spaces to underscores
            if (!propertyName) return cb(new Error("Property name is required"), false);

            let propertyFolder = path.join(uploadsDir, propertyName);
            if (fs.existsSync(propertyFolder)) {
                propertyFolder = getUniqueFolderName(propertyName);
            }
            fs.mkdirSync(propertyFolder, { recursive: true });

            req.propertyFolder = propertyFolder; // Store the folder path once for all images
        }
        cb(null, req.propertyFolder);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = file.fieldname; // houseImage, roomImage, bedroomImage, etc.
        cb(null, `${name}${ext}`); // Saves as houseImage.jpg, roomImage.jpg, etc.
    }
});

const upload = multer({ storage });

// ✅ **Image Upload Route**
app.post("/upload-images", upload.fields([
    { name: "houseImage", maxCount: 1 },   // Required
    { name: "roomImage", maxCount: 1 },
    { name: "bedroomImage", maxCount: 1 },
    { name: "bathroomImage", maxCount: 1 },
    { name: "additionalImages", maxCount: 5 } // Multiple Images
]), (req, res) => {
    if (!req.propertyFolder) {
        return res.status(400).json({ error: "Failed to determine upload path." });
    }

    res.json({
        message: "✅ Images uploaded successfully!",
        folder: req.propertyFolder,
        images: {
            houseImage: req.files.houseImage ? req.files.houseImage[0].filename : null,
            roomImage: req.files.roomImage ? req.files.roomImage[0].filename : null,
            bedroomImage: req.files.bedroomImage ? req.files.bedroomImage[0].filename : null,
            bathroomImage: req.files.bathroomImage ? req.files.bathroomImage[0].filename : null,
            additionalImages: req.files.additionalImages ? req.files.additionalImages.map(img => img.filename) : []
        }
    });
});

// Serve uploaded images
app.use("/uploads", express.static(uploadsDir));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
// ✅ API to Get Uploaded Images for a Property
app.get("/get-images/:propertyName", (req, res) => {
    const propertyName = req.params.propertyName?.trim().replace(/\s+/g, "_");
    const propertyFolder = path.join(uploadsDir, propertyName);

    if (!fs.existsSync(propertyFolder)) {
        return res.status(404).json({ error: "❌ Property not found." });
    }

    // Read all images from the folder
    const images = fs.readdirSync(propertyFolder).map(file => `/uploads/${propertyName}/${file}`);

    res.json({ 
        propertyName: req.params.propertyName.replace(/_/g, " "),  // Convert back to original format
        images 
    });
});

