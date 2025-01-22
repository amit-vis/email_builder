import React, { useState } from "react"
import { uploadImage } from "../services/api"

const ImageUploader = ({ onUpload }) => {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const formData = new FormData()
      formData.append("image", file)
      const imageUrl = await uploadImage(formData)
      onUpload(imageUrl)
    } catch (error) {
      console.error("Error uploading image:", error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="mt-4">
      <h3 className="font-medium mb-2">Image</h3>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
      {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
    </div>
  )
}

export default ImageUploader

