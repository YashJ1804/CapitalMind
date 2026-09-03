const usMarketService =
    require("../services/usMarketService");

const ApiResponse =
    require("../utils/apiResponse");


class USMarketController {


    async getUSMarket(req, res, next) {

        try {

            const market =
                await usMarketService
                    .getUSMarketOverview();

            return ApiResponse.success(
                res,
                market,
                "US market data fetched successfully"
            );

        } catch (error) {

            next(error);

        }

    }


    async getUSIndexHistory(req, res, next) {

        try {

            const {
                symbol,
                range = "1mo",
                interval = "1d"
            } = req.query;


            if (!symbol) {

                return res.status(400).json({

                    success: false,

                    message:
                        "US index symbol is required."

                });

            }


            const allowedSymbols = [
                "^GSPC",
                "^IXIC",
                "^DJI"
            ];


            if (!allowedSymbols.includes(symbol)) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid US market index."

                });

            }


            const history =
                await usMarketService
                    .getUSIndexHistory(
                        symbol,
                        range,
                        interval
                    );


            return ApiResponse.success(
                res,
                {
                    symbol,
                    range,
                    interval,
                    history
                },
                "Historical US market data fetched successfully"
            );

        } catch (error) {

            next(error);

        }

    }
    async getUSMarketStatus(req, res, next) {

    try {

        const status =
            usMarketService
                .getUSMarketStatus();

        return ApiResponse.success(
            res,
            status,
            "US market status fetched successfully"
        );

    } catch (error) {

        next(error);

    }

}

}


module.exports =
    new USMarketController();