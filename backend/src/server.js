const express = require('express');
const cors = require('cors');

const chatbotRoutes = require('./routes/chatbot.routes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/', chatbotRoutes);

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
