const { GoogleGenAI } = require("@google/genai");

const primaryAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const backupAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY_BACKUP,
});

module.exports = {
    primaryAI,
    backupAI
};