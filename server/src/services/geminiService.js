const ai = require("../config/gemini");

const generateContent = async (prompt) => {

    const response = await ai.models.generateContent({

        model: "gemini-2.5-flash",

        contents: prompt

    });

    let text = response.text;

    text = text.replace(/```json/g, "");

    text = text.replace(/```/g, "");

    text = text.trim();

    return text;

}

module.exports={

    generateContent

}