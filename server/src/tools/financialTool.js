const httpClient = require("../services/httpClient");

const getQuote = async(symbol)=>{

    const url=`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`;

    const { data } = await httpClient.get(url);

    return{

        currentPrice:data.c,

        high:data.h,

        low:data.l,

        open:data.o,

        previousClose:data.pc,

        change:data.d,

        percentChange:data.dp

    };

}

module.exports={
    getQuote
}