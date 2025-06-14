const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { recognize } = require("tesseract.js");
const path = require("path");
const fs = require("fs");
const { fromPath } = require("pdf2pic");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 }, 
});

app.post("/ocr", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded." });

  const mimeType = req.file.mimetype;
  const originalPath = path.join(__dirname, req.file.path);
  let filePath = originalPath;

  // 1. Validate file type
  if (!["image/png", "image/jpeg", "application/pdf"].includes(mimeType)) {
    fs.unlink(originalPath, () => {});
    return res.status(400).json({ error: "Unsupported file type" });
  }

  // 2. If PDF, convert first page to PNG
  if (mimeType === "application/pdf") {
    try {
      const convert = fromPath(filePath, {
        density: 300,
        saveFilename: `${Date.now()}`,
        savePath: path.dirname(filePath),
        format: "png",
        width: 1000,
        height: 1200,
      });
      const page = await convert(1);
      filePath = page.path;
    } catch (err) {
      fs.unlink(originalPath, () => {});
      return res.status(500).json({ error: "PDF conversion failed: " + err.message });
    }
  }

  // 3. Determine language(s)

  const language = "eng+hin+kan";

  try {
    
    const { data: { text } } = await recognize(filePath, language, {
      langPath: path.join(__dirname, "tessdata"),
      
    });

    return res.status(200).json({ raw_text: text });
  } catch (err) {
    return res.status(500).json({ error: "OCR failed: " + err.message });
  } finally {
    // 4. Clean up all temp files
    fs.unlink(originalPath, () => {});
    if (filePath !== originalPath) fs.unlink(filePath, () => {});
  }
});

app.listen(PORT, () => {
  console.log(`✅ OCR backend running on http://localhost:${PORT}`);
});
