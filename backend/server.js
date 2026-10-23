
import express from "express";

const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Crypto Tracker Backend is running!",
  });
});

app.get("/user", (req, res) => {
  res.status(200).json({
    message: "Hello world",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
