const indianMarketService =
    require("../services/indianMarketService");

const ApiResponse =
    require("../utils/apiResponse");


class IndianMarketController {


    // ============================================================
    // Indian Market Overview
    // ============================================================

    async getIndianMarket(req, res, next) {

        try {

            const market =
                await indianMarketService
                    .getIndianMarketOverview();

            return ApiResponse.success(
                res,
                market,
                "Indian market data fetched successfully"
            );

        } catch (error) {

            next(error);

        }

    }


    // ============================================================
    // Historical Index Data
    // ============================================================

    async getIndianIndexHistory(req, res, next) {

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
                        "Index symbol is required."

                });

            }


            const allowedSymbols = [
                "^NSEI",
                "^BSESN",
                "^NSEBANK"
            ];


            if (!allowedSymbols.includes(symbol)) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid Indian market index."

                });

            }


            const history =
                await indianMarketService
                    .getIndianIndexHistory(
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
                "Historical market data fetched successfully"
            );

        } catch (error) {

            next(error);

        }

    }


    // ============================================================
    // Indian Market Status
    // ============================================================

    async getIndianMarketStatus(req, res, next) {

        try {

            const status =
                indianMarketService
                    .getIndianMarketStatus();

            return ApiResponse.success(
                res,
                status,
                "Indian market status fetched successfully"
            );

        } catch (error) {

            next(error);

        }

    }

}


module.exports =
    new IndianMarketController();