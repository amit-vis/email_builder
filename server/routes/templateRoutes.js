const express = require("express")
const router = express.Router()
const multer = require("multer")
const templateController = require("../controllers/templateController")

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})

const upload = multer({ storage })

router.get("/getEmailLayout", templateController.getEmailLayout)
router.post("/uploadImage", upload.single("image"), templateController.uploadImage)
router.post("/uploadEmailConfig", templateController.uploadEmailConfig)
router.get("/renderAndDownloadTemplate/:id", templateController.renderAndDownloadTemplate)
router.get("/templates", templateController.getTemplates)

module.exports = router

