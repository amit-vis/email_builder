const API_BASE_URL = "http://localhost:5000/api"

export const getLayout = async () => {
  const response = await fetch(`${API_BASE_URL}/getEmailLayout`)
  if (!response.ok) throw new Error("Failed to fetch layout")
  return response.text()
}

export const uploadImage = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/uploadImage`, {
    method: "POST",
    body: formData,
  })
  if (!response.ok) throw new Error("Failed to upload image")
  const data = await response.json()
  return data.imageUrl
}

export const saveTemplate = async (template) => {
  console.log("Sending template:", template); // Log the data being sent
  const response = await fetch(`${API_BASE_URL}/uploadEmailConfig`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(template),
  });
  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("Server response error:", errorDetails); // Log server error
    throw new Error(`Failed to save template: ${response.status} ${response.statusText}`);
  }
  return response.json();
};


