const { primaryAI, backupAI } = require("../config/gemini");

const cleanResponse = (text) => {
    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");
    return text.trim();
};

const generateWithAI = async (client, prompt) => {

    const response = await client.models.generateContent({

        model: "gemini-2.5-flash",

        contents: prompt

    });

    return cleanResponse(response.text);

};

const generateContent = async (prompt) => {

    try {

        console.log("🟢 Using Primary Gemini Key");

        return await generateWithAI(primaryAI, prompt);

    } catch (error) {

        const status = error.status || error.error?.code;

        if (
            status === 429 ||
            status === 401 ||
            status === 403
        ) {

            console.log("🟡 Primary Key Failed");
            console.log("🔄 Switching to Backup Gemini Key...");

            try {

                return await generateWithAI(backupAI, prompt);

            } catch (backupError) {

                console.log("🔴 Backup Key Failed");

                throw backupError;

            }

        }

        throw error;

    }

};

module.exports = {

    generateContent

};