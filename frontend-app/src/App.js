import React, { useState } from "react";

function App() {
  const [originalImage, setOriginalImage] = useState(null);
  const [restoredImage, setRestoredImage] = useState(null);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Show original image
    setOriginalImage(URL.createObjectURL(file));

    // Prepare form data
    const formData = new FormData();
    formData.append("file", file);

    // Send to backend
    const response = await fetch("http://127.0.0.1:8000/restore", {
  method: "POST",
  body: formData,
});
    // Convert backend response to image
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    setRestoredImage(url);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Art Restore AI</h1>
      <input type="file" onChange={handleUpload} />

      {originalImage && (
        <div>
          <h3>Original Image</h3>
          <img
            src={originalImage}
            alt="Original"
            style={{ maxWidth: "400px", marginTop: "10px" }}
          />
        </div>
      )}

      {restoredImage && (
        <div>
          <h3>Restored Image</h3>
          <img
            src={restoredImage}
            alt="Restored"
            style={{ maxWidth: "400px", marginTop: "10px" }}
          />
        </div>
      )}
    </div>
  );
}

export default App;