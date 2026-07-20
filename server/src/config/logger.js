const morgan = require("morgan");

const isDevelopment = process.env.NODE_ENV !== "production";

// Custom Morgan tokens
morgan.token("timestamp", () => new Date().toISOString());
morgan.token("user-agent", (req) => req.headers["user-agent"] || "Unknown");

const logger = morgan((tokens, req, res) => {
    return [
        "",
        "========================================",
        `🕒 ${tokens.timestamp(req, res)}`,
        `📌 ${tokens.method(req, res)} ${tokens.url(req, res)}`,
        `📊 Status      : ${tokens.status(req, res)}`,
        `⏱ Response    : ${tokens["response-time"](req, res)} ms`,
        `🌍 IP          : ${tokens["remote-addr"](req, res)}`,
        `💻 User-Agent  : ${tokens["user-agent"](req, res)}`,
        "========================================",
    ].join("\n");
}, {
    skip: (req) => {
        // Don't spam logs for health checks in production
        return !isDevelopment && req.url === "/";
    }
});

module.exports = logger;