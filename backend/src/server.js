const express = require("express");
const app = express();

const chatbotRoutes = require("./routes/chatbot.routes");

app.use(express.json());
app.use("/api", chatbotRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
