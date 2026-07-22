function parseAIResponse(text) {

    text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start === -1 || end === -1) {
        throw new Error("Gemini returned invalid JSON.");
    }

    return JSON.parse(
        text.substring(start, end + 1)
    );
}

module.exports = {
    parseAIResponse
};