const express = require("express");
const router = express.Router();

const cors = require("cors");
router.use(cors());

const productModel = require("../schema/recipeModel");

router.post("/", async (req,res)=>{
    try{
        const product = await productModel.create(req.body)
        res.json({
            status: "Success",
            product
        });
    }
    catch (e){
        res.status(400).json({
            status: "Failed",
            message: e.message,
        });
    }
})

router.get("/", async (req, res) => {
    try {
        const products = await productModel.find()
        res.json({
            status: "Success",
            products
        });
    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e.message,
        });
    }
});

router.get("/:title", async (req, res) => {
    try {
        const products = await productModel.find({title:req.params.title})
        res.json({
            status: "Success",
            products
        });
    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e.message,
        });
    }
});


module.exports = router;