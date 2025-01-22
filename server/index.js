const express = require("express")
const cors = require("cors")
const path = require("path")
const fs = require("fs")
const templateRoutes = require("./routes/templateRoutes")
require("./config/database")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"))



// Routes
app.use("/api", templateRoutes)

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads")
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir)
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

