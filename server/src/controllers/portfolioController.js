const portfolioService = require("../services/portfolioService");
const ApiResponse = require("../utils/apiResponse");

class PortfolioController {
    async getPortfolio(req, res, next) {
        try {
            const portfolio = await portfolioService.getPortfolio(req.user.id);

            return ApiResponse.success(
                res,
                portfolio,
                "Portfolio fetched successfully"
            );
        } catch (error) {
            next(error);
        }
    }
    
    async addHolding(req, res, next) {
        try {
            const portfolio = await portfolioService.addHolding(
                req.user.id,
                req.body
            );
            
            return ApiResponse.success(
                res,
                portfolio,
                "Holding added successfully",
                201
            );
        } catch (error) {
            next(error);
        }
    }
    async updateHolding(req, res, next) {
        try {
            const portfolio = await portfolioService.updateHolding(
                req.user.id,
                req.params.holdingId,
                req.body
            );
            
            return ApiResponse.success(
                res,
                portfolio,
                "Holding updated successfully"
            );
        } catch (error) {
            next(error);
        }
    }
    
    async removeHolding(req, res, next) {
        try {
            const portfolio = await portfolioService.removeHolding(
                req.user.id,
                req.params.holdingId
            );
            
            return ApiResponse.success(
                res,
                portfolio,
                "Holding removed successfully"
            );
        } catch (error) {
            next(error);
        }
    }
    async getPortfolioSummary(req, res, next) {
    try {
        const summary = await portfolioService.getPortfolioSummary(req.user.id);
    
        return ApiResponse.success(
            res,
            summary,
            "Portfolio summary fetched successfully"
        );
    } catch (error) {
        next(error);
    }
    }
}

module.exports = new PortfolioController();