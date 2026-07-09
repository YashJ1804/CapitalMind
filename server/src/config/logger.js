const morgan = require("morgan");

const logger = morgan((tokens, req, res) => {

    return [
        "",
        "==============================",
        `📌 ${tokens.method(req, res)} ${tokens.url(req, res)}`,
        `📊 Status : ${tokens.status(req, res)}`,
        `⏱ Time   : ${tokens["response-time"](req, res)} ms`,
        `🌍 IP     : ${tokens["remote-addr"](req, res)}`,
        "=============================="
    ].join("\n");

});

module.exports = logger;