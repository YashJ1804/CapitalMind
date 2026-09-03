const indianCompanyService =
    require("../services/indianCompanyService");


class IndianCompanyController {


    // ========================================================
    // Search Indian Companies
    // ========================================================


    async getCompanyAnalysis(req, res, next) {

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
                    "Company symbol is required."

            });

        }


        const data =
            await indianCompanyService
                .getIndianCompanyAnalysisData(
                    symbol,
                    range,
                    interval
                );


        return res.status(200).json({

            success: true,

            data

        });

    } catch (error) {

        next(error);

    }

}

    async searchCompany(req, res, next) {

        try {

            const { q } = req.query;


            if (!q || !q.trim()) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Search query is required."

                });

            }


            const results =
                await indianCompanyService
                    .searchCompany(q);


            return res.status(200).json({

                success: true,

                data: results

            });

        } catch (error) {

            next(error);

        }

    }


    // ========================================================
    // Company Quote
    // ========================================================

    async getCompanyQuote(req, res, next) {

        try {

            const { symbol } = req.query;


            if (!symbol) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Company symbol is required."

                });

            }


            const quote =
                await indianCompanyService
                    .getCompanyQuote(symbol);


            return res.status(200).json({

                success: true,

                data: quote

            });

        } catch (error) {

            next(error);

        }

    }


    // ========================================================
    // Company History
    // ========================================================

    async getCompanyHistory(req, res, next) {

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
                        "Company symbol is required."

                });

            }


            const history =
                await indianCompanyService
                    .getCompanyHistory(
                        symbol,
                        range,
                        interval
                    );


            return res.status(200).json({

                success: true,

                data: history

            });

        } catch (error) {

            next(error);

        }

    }

}


module.exports =
    new IndianCompanyController();