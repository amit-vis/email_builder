import React, { useState, useEffect } from "react"
import TextEditor from "./TextEditor"
import ImageUploader from "./ImageUploader"
import { saveTemplate, getLayout } from "../services/api"
import { useNavigate } from "react-router-dom"

const EmailEditor = () => {
  const navigate = useNavigate();
  const [template, setTemplate] = useState({
    title: "",
    content: "",
    imageUrl: "",
    layout: "",
    styles: {
      titleFont: "Arial",
      contentFont: "Arial",
      titleSize: "md",
      contentSize: "sm",
      titleColor: "#000000",
      contentColor: "#000000",
      alignment: "left",
    },
  })

  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const layout = await getLayout()
        setTemplate((prev) => ({ ...prev, layout }))
      } catch (error) {
        console.error("Error fetching layout:", error)
      }
    }
    fetchLayout()
  }, [])

  const handleSave = async () => {
    try {
      await saveTemplate(template)
      alert("Template saved successfully!")
      navigate("/")
      return

    } catch (error) {
      console.error("Error saving template:", error)
    }
  }

  const handleStyleChange = (key, value) => {
    setTemplate((prev) => ({
      ...prev,
      styles: { ...prev.styles, [key]: value },
    }))
  }

  return (
    <div className="flex h-screen">
      {/* Preview Panel */}
      <div className="w-2/3 bg-gray-100 p-4">
        <div className="bg-white shadow-lg p-6 min-h-full">
          <header className="flex items-center mb-4">
            <button className="text-gray-600 hover:text-gray-800">
              <span>← Back</span>
            </button>
            <h1 className="ml-4 text-xl font-semibold">Welcome email</h1>
          </header>

          <div className="text-center mb-6">
            <button className="bg-gray-200 px-4 py-2 rounded">ADD LOGO</button>
          </div>

          <div
            className="prose max-w-none"
            style={{
              fontFamily: template.styles.contentFont,
              fontSize: template.styles.contentSize,
              color: template.styles.contentColor,
              textAlign: template.styles.alignment,
            }}
          >
            <h1
              dangerouslySetInnerHTML={{__html: template.title}}
            />
           
            <div dangerouslySetInnerHTML={{ __html: template.content }} />
            {template.imageUrl && (
              <img src={`http://localhost:5000${template.imageUrl}` || "/placeholder.svg"} alt="Email content" className="my-4 max-w-full" />
            )}
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="w-1/3 bg-gray-50 p-4 border-l">
        <TextEditor title={template.title} 
        onChangeTitle={(title) => setTemplate((prev) => ({ ...prev, title }))}
        content={template.content} 
        onChange={(content) => setTemplate((prev) => ({ ...prev, content }))} />

        <div className="mt-4">
          <h3 className="font-medium mb-2">Alignment</h3>
          <div className="flex gap-2">
            {["left", "center", "right", "justify"].map((align) => (
              <button
                key={align}
                onClick={() => handleStyleChange("alignment", align)}
                className={`p-2 border rounded ${template.styles.alignment === align ? "bg-blue-500 text-white" : ""}`}
              >
                {align.charAt(0).toUpperCase() + align.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-medium mb-2">Font</h3>
          <div className="grid grid-cols-2 gap-4">
            <select
              value={template.styles.contentFont}
              onChange={(e) => handleStyleChange("contentFont", e.target.value)}
              className="border rounded p-2"
            >
              <option value="Arial">Body font</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Helvetica">Helvetica</option>
            </select>
            <select
              value={template.styles.titleFont}
              onChange={(e) => handleStyleChange("titleFont", e.target.value)}
              className="border rounded p-2"
            >
              <option value="Arial">Heading font</option>
              <option value="Georgia">Georgia</option>
              <option value="Verdana">Verdana</option>
            </select>
          </div>
        </div>

        <ImageUploader onUpload={(url) => setTemplate((prev) => ({ ...prev, imageUrl: url }))} />

        <div className="mt-4 flex justify-end gap-2">
          <button className="px-4 py-2 border rounded hover:bg-gray-100">Discard</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmailEditor

