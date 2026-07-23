const ApiError = require("../utils/apiError");
const HTTP_STATUS = require("../constants/httpStatus");

const analyzeStock = async (
    company,
    risk = "Moderate"
) => {

    try {

        const cacheKey = `${company.trim().toUpperCase()}-${risk}`;

        // Check cache first
        const cachedData = cacheService.get(cacheKey);

        if (cachedData) {
            console.log(`⚡ Cache Hit: ${cacheKey}`);
            return cachedData;
        }

        // Search company
        const stock = await searchCompany(company);

        if (!stock || !stock.symbol) {
            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Company not found.",
                "COMPANY_NOT_FOUND"
            );
        }

        // Fetch data in parallel
        const [
            profile,
            quote,
            news
        ] = await Promise.all([

            getCompanyProfile(stock.symbol),

            getQuote(stock.symbol),

            getCompanyNews(stock.symbol)

        ]);

        // AI Analysis
        const analysis = await makeInvestmentDecision(
            profile,
            quote,
            news,
            risk
        );

        // Final response
        const response = {

            stock: {
                symbol: stock.symbol,
                profile,
                quote
            },

            news,

            analysis

        };

        // Store in cache
        cacheService.set(cacheKey, response);

        return response;

    } catch (error) {

        console.error({
            service: "AI Service",
            company,
            risk,
            message: error.message
        });

        // Already a handled API error
        if (error instanceof ApiError) {
            throw error;
        }

        // Axios/Finnhub timeout
        if (error.code === "ECONNABORTED") {
            throw new ApiError(
                HTTP_STATUS.SERVICE_UNAVAILABLE,
                "Market data request timed out.",
                "MARKET_API_TIMEOUT"
            );
        }

        // External API failure
        if (error.response) {
            throw new ApiError(
                HTTP_STATUS.SERVICE_UNAVAILABLE,
                "Market data provider is unavailable.",
                "MARKET_API_ERROR"
            );
        }

        // Unknown server error
        throw new ApiError(
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            "Failed to analyze stock.",
            "AI_ANALYSIS_FAILED"
        );
    }

};