from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import shutil

app = FastAPI()

# Allow frontend (React) to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3002"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/restore")
async def restore_image(file: UploadFile = File(...)):
    # Save uploaded file
    with open("uploaded.png", "wb") as f:
        f.write(await file.read())

    # Dummy restoration: copy uploaded file to restored.png
    shutil.copy("uploaded.png", "restored.png")

    # Return restored file
    return FileResponse("restored.png")