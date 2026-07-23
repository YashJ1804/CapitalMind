const swaggerJsdoc = require("swagger-jsdoc");

const options = {

    definition: {

    openapi: "3.0.0",

    info: {

        title: "CapitalMind API",

        version: "1.0.0",

        description: "AI Powered Stock Portfolio API"

    },

    servers: [

        {
            url: "http://localhost:5000",
            description: "Local Development Server"
        }

    ],

    components: {

        securitySchemes: {

            bearerAuth: {

                type: "http",

                scheme: "bearer",

                bearerFormat: "JWT"

            }

        }

    }

},

    apis: [

        "./src/routes/*.js"

    ]

};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;