import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required: [true,'product name is required']
    },
    quantity:{
        type:Number,
        required: true,
        default:0
    },
    price:{
        type:Number,
        required: true
    },
    Image:{
        type:String,
        required: false
    },

},{timestamps:true})

export const Product = mongoose.model("Product",productSchema)