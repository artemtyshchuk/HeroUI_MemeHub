import fs from "fs";
import path from "path";
import { Meme } from "./types";

const memesPath = path.join(__dirname, "..", "memes.json");

console.log("Checking if file exists:", fs.existsSync(memesPath));
if (fs.existsSync(memesPath)) {
  console.log("File content:", fs.readFileSync(memesPath, "utf8"));
} else {
  console.log("File does not exist!");
}

export const getMemes = (): Meme[] => {
  if (!fs.existsSync(memesPath)) {
    return [];
  }

  const data = fs.readFileSync(memesPath, "utf8");
  return JSON.parse(data);
};

export const saveMemes = (memes: Meme[]): void => {
  fs.writeFileSync(memesPath, JSON.stringify(memes, null, 2));
};
