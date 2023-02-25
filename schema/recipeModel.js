const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
    title:{type:String ,unique: true, index: true},
    author:{type:String},
    image:{type:String},
    ingredients:[],
    directions:{type:String}
})

const model = mongoose.model("recipes", recipeSchema)

module.exports = model