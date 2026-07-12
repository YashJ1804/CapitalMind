const router=require("express").Router();

const {marketData}=require("../controllers/marketController");

router.get("/",marketData);

module.exports=router;