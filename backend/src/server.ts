import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { getMemes, saveMemes } from "./memes";
import { Request, Response } from "express";
import { isValidImageUrl, handleError } from "./utils";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/api/memes", (req: Request, res: Response) => {
  console.log("Received request for /api/memes");
  const memes = getMemes();
  res.json(memes);
});

app.put("/api/memes/:id", (req: Request, res: Response) => {
  const memes = getMemes();
  const id = parseInt(req.params.id, 10);
  const meme = memes.find((m) => m.id === id);

  if (!meme) {
    return handleError(res, "Meme not found", 404);
  }

  const updatedMeme = { ...meme, ...req.body };

  if (updatedMeme.image && !isValidImageUrl(updatedMeme.image)) {
    return handleError(res, "Image must be in JPG or JPEG format");
  }

  const updatedMemes = memes.map((m) => (m.id === id ? updatedMeme : m));
  saveMemes(updatedMemes);
  res.json(updatedMeme);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
