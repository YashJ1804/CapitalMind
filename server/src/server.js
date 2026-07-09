process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

console.log("API Key:", process.env.GEMINI_API_KEY);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});