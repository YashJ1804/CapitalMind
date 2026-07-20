require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const validateEnv = require("./config/validateEnv");
connectDB();
validateEnv();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});