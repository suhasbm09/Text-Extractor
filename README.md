# Text-Extractor

**Text-Extractor** is a web application that enables users to upload images (JPG, PNG) or PDFs, extract text via **OCR**, and return the results as **structured JSON**. It leverages a React + Vite frontend and a Node.js + Express backend powered by Tesseract.js for robust and accurate text recognition.

[📂 Repository](https://github.com/suhasbm09/Text-Extractor) · [🌐 Live Demo](https://text-extractor.vercel.app)

---

## 🚀 Features

* **Image & PDF Upload**
  Supports JPG, PNG; converts the first page of a PDF to PNG before OCR.
* **Multilingual OCR**
  Extracts text in English, Hindi, and Kannada using high-quality `tessdata_best` models.
* **Clean JSON Output**
  Returns:

  ```json
  { "raw_text": "…" }
  ```

  for seamless integration.
* **Downloadable JSON**
  One-click download of OCR results as `.json`.
* **Elegant UI**
  React, Vite, TailwindCSS; responsive layout with smooth loading indicators.

---

## 🛠 Tech Stack

| Layer      | Technology                                             |
| ---------- | ------------------------------------------------------ |
| Frontend   | React · Vite · TailwindCSS · React Router · file-saver |
| Backend    | Node.js · Express · Multer · Tesseract.js · pdf2pic    |
| OCR Models | Tesseract `tessdata_best` for `eng`, `hin`, `kan`      |
| Hosting    | Vercel (frontend) · Render (backend)                   |

---

## 📥 Getting Started

### Prerequisites

* Node.js ≥ v14
* npm or yarn
* **graphicsmagick** for PDF→PNG conversion

  ```bash
  sudo apt update
  sudo apt install graphicsmagick
  ```

### 1. Clone the Repo

```bash
git clone https://github.com/suhasbm09/Text-Extractor.git
cd Text-Extractor
```

### 2. Backend Setup

```bash
cd backend
npm install
```

1. Download OCR models into `tessdata/`:

   ```bash
   mkdir -p tessdata && cd tessdata
   wget https://github.com/tesseract-ocr/tessdata_best/raw/main/eng.traineddata.gz
   wget https://github.com/tesseract-ocr/tessdata_best/raw/main/hin.traineddata.gz
   wget https://github.com/tesseract-ocr/tessdata_best/raw/main/kan.traineddata.gz
   cd ..
   ```
2. Start the server:

   ```bash
   node app.js
   ```

   Backend listens at `http://localhost:5000/ocr`.

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Open: `http://localhost:5173/`

---

## 🔧 Configuration

* **Frontend**: In `src/Pages/Home.jsx`, set the OCR endpoint to your deployed backend.
* **Backend**: Ensure `graphicsmagick` and `tessdata/` are present on the host.

---

## 🌐 Deployment

### Frontend (Vercel)

1. Push to GitHub.
2. Import in Vercel.
3. Set Framework to **Vite**, Root Directory `frontend/`. Deploy.

### Backend (Render)

1. Push `backend/` to GitHub.
2. Create a Web Service on Render:

   * Build: `npm install`
   * Start: `node app.js`
3. Deploy and note service URL (e.g. `https://ocr-backend.onrender.com/ocr`).

---

## 🖥 Usage

1. Visit the live frontend.
2. Upload a supported file.
3. Submit for extraction.
4. View text line-by-line.
5. Download JSON or process another file.

---

## 🙋‍♂️ Author

**Suhas BM** · [@suhasbm09](https://github.com/suhasbm09)

Feel free to reach out with any feedback!
