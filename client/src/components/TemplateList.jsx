import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const TemplateList = () => {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch("https://email-builder-npyp.onrender.com/api/templates")
        const data = await response.json()
        setTemplates(data)
      } catch (error) {
        console.error("Error fetching templates:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTemplates()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Email Templates</h1>
          <Link to="/editor" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Create New Template
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{template.title}</h2>
                <p className="text-gray-600 mb-4">Created: {new Date(template.createdAt).toLocaleDateString()}</p>
                <div className="flex space-x-2">
                  <Link
                    to={`/preview/${template._id}`}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Preview
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {templates.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600">No templates yet</h2>
            <p className="text-gray-500 mt-2">Create your first email template!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TemplateList

