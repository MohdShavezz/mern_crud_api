import express, { urlencoded } from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import {Product} from './models/productModel.js'
dotenv.config()


const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:false})) // can give payload form-encode key-value

app.get('/',(req,res)=>{
  res.send("defalut")
})

//get all
app.get('/products',async(req,res)=>{
    try {
        const resp = await Product.find()
        if(resp){
            res.send(resp)
        }
    } catch (error) {
        res.send(error)
    }
})
// get by id
app.get('/product/:id',async(req,res)=>{
    try {
        const resp = await Product.findById(req.params.id)
        if(resp){
            res.send(resp)
        }
    } catch (error) {
        res.send(error)
    }
})
// create prod
app.post('/product',async(req,res)=>{
    try {
        const resp = await Product.create(req.body)
        if(resp){
            res.send(resp)
        }
    } catch (error) {
        res.send(error)
    }
})
app.delete('/product/:id',async(req,res)=>{
    try {
        const resp = await Product.findByIdAndDelete(req.params.id)
        if(!resp) res.status(404  ).send({ error: 'Something failed!' })
        res.send({"deletion":true})
    } catch (error) {
        res.send(error)
    }
})
// update
app.put('/product/:id',async(req,res)=>{
    try {
        const resp = await Product.findByIdAndUpdate(req.params.id,req.body, { new: true })
        if(!resp) res.status(404  ).send({ error: 'Something failed!' })
        res.send(resp) // new:true for updated response
    } catch (error) {
        res.status(500).json( {message: error.message})
    }
})

mongoose.connect(process.env.MONGO_PASS)
.then(()=>{
    const port = process.env.PORT | 3000;
    app.listen(port,()=>{
        console.log("connected at "+port)
    })
}).catch((error)=>{
    console.log(error)
})
