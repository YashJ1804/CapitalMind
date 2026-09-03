const {
    getUsdToInrRate
} = require("../services/currencyService");

const ApiResponse = require("../utils/apiResponse");

const getExchangeRate = async (req, res, next) => {

    try {

        const rate = await getUsdToInrRate();

        return ApiResponse.success(
            res,
            rate,
            "Exchange rate fetched successfully."
        );

    } catch (error) {

        next(error);

    }

};

module.exports = {
    getExchangeRate
};