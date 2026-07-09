const { runInvestmentWorkflow } = require("../graph/investmentGraph");

const analyzeCompany = async (req, res, next) => {

    try {

        const { company } = req.body;
        const result = await runInvestmentWorkflow(company);

        return res.json({

            success: true,

            data: result

        });

    }

    catch (error) {

        next(error);
    }

}

module.exports = {

    analyzeCompany

}