import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const TemplatePreview = () => {
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/renderAndDownloadTemplate/${id}`);
        const html = await response.text();
        setTemplate(html);
      } catch (error) {
        console.error("Error fetching template:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTemplate();
    }
  }, [id]);

  const downloadHTML = () => {
    const blob = new Blob([template], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "template.html"; // File name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Template Preview</h1>
            <button
              onClick={downloadHTML}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Download HTML
            </button>
          </div>
          <div className="preview-container" dangerouslySetInnerHTML={{ __html: template }} />
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
