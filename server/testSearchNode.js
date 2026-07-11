require("dotenv").config();
const { searchNode } = require("./src/graph/nodes/searchNode");

(async () => {

    const result = await searchNode({

        company: "Apple"

    });

    console.log(result);

})();