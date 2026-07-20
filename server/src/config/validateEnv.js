const requiredEnv = [
    "MONGO_URI",
    "JWT_SECRET",
    "GEMINI_API_KEY",
    "FINNHUB_API_KEY"
];

function validateEnv() {
    const missing = requiredEnv.filter((key) => !process.env[key]);

    if (missing.length > 0) {
        console.error(
            `❌ Missing environment variables:\n${missing.join("\n")}`
        );

        process.exit(1);
    }

    console.log("✅ Environment variables validated.");
}

module.exports = validateEnv;