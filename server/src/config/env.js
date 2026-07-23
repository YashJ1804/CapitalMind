const required = [

    "PORT",

    "MONGO_URI",

    "JWT_SECRET",

    "FINNHUB_API_KEY",

    "GEMINI_API_KEY"

];

required.forEach((key) => {

    if (!process.env[key]) {

        throw new Error(`Missing environment variable: ${key}`);

    }

});