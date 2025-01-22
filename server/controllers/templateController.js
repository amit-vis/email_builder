const Template = require("../models/Template")
const fs = require("fs")
const path = require("path")

exports.getEmailLayout = (req, res) => {
  try {
    const layoutPath = path.join(__dirname, "../templates/layout.html")
    const layout = fs.readFileSync(layoutPath, "utf8")
    res.send(layout)
  } catch (error) {
    res.status(500).json({ error: "Error reading layout file" })
  }
}

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" })
    }

    // In a real application, you would upload to a cloud storage service
    const imageUrl = `/uploads/${req.file.filename}`
    res.json({ imageUrl })
  } catch (error) {
    res.status(500).json({ error: "Error uploading image" })
  }
}

exports.uploadEmailConfig = async (req, res) => {
  try {
    const template = new Template(req.body)
    await template.save()
    res.json(template)
  } catch (error) {
    res.status(500).json({ error: "Error saving template", error: error.message })
  }
}

exports.renderAndDownloadTemplate = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id)
    console.log(template)
    if (!template) {
      return res.status(404).json({ error: "Template not found" })
    }

    const layoutPath = path.join(__dirname, "../templates/layout.html")
    let html = fs.readFileSync(layoutPath, "utf8")

    // Replace placeholders with template data
    html = html
    .replace(/{{title}}/g, template.title)
    .replace(/{{content}}/g, template.content)
    .replace(/{{imageUrl}}/g, template.imageUrl ? `http://localhost:5000${template.imageUrl}` : "");

    res.send(html)
  } catch (error) {
    res.status(500).json({ error: "Error rendering template" })
  }
}

exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.find().sort({ createdAt: -1 })
    res.json(templates)
  } catch (error) {
    res.status(500).json({ error: "Error fetching templates" })
  }
}

