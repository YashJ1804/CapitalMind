require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

connectDB();
const PORT = process.env.PORT || 5000;
console.log("API Key:", process.env.GEMINI_API_KEY);
console.log(process.env.JWT_SECRET);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});