import express from 'express'
import { customAlphabet } from 'nanoid'

import './config/index.mjs'
import { MongoClient } from "mongodb" 

// const mongodbURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.o747jgn.mongodb.net/?retryWrites=true&w=majority`
const mongodbURI = "mongodb+srv://zafirabdullah1534:DellInspiren990@cluster0.ishtbna.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(mongodbURI)

const database = client.db('ecom2');
const productsCollection = database.collection('products');

const nanoid = customAlphabet('1234567890', 10)
const app = express()
app.use(express.json())
      
app.get('/', (req, res) => {
    res.send("Hello World!")
})

let products = [
    {
        id: nanoid(),
        name: "iPhone X",
        price: "$1000",
        description: "Lorem Ipsum"
    }
]

app.get('/products', (req, res) => {
    res.send({message: "All Products", data: products})
})

app.get('/product/:id', (req, res) => {

    if(isNaN(req.params.id)){
        res.status(403).send({message: "invalid product id"})
    }

    let isFound = false

    for(let i = 0; i < products.length; i++){
        if(products[i].id == req.params.id){
            isFound = i
            break;
        }
    }

    if(isFound === false){
        res.status(404).send({message: "Product not found"})
    }else{
        res.send({message: "Product found with id " + products[isFound].id, 
        data:products[isFound]})
    }
})

app.post('/product', async (req, res) => { 
    if(!req.body.name
        || !req.body.price
        || !req.body.description){
            res.status(403).send(`
                required parameter missing. Example JSON request body
                // {
                //     name: "iPhone X",
                //     price: "$1000",
                //     description: "Lorem Ipsum"
                // }
            `)
        }

        const doc = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description 
          }
      
        const result =  await productsCollection.insertOne(doc)
        .then((result)=>{
            res.status(201).send({message: "Product Created",result})
        }).catch((err)=>{
            res.status(400).send({err})
        })

        

})

app.put('/product/:id', (req, res) => {
    if(!req.body.name
        && !req.body.price
        && !req.body.description){
            res.status(403).send(`
                required parameter missing, atleat one parameter is required: name, price or description to complete update. Example JSON request body
                // {
                //     name: "iPhone X",
                //     price: "$1000",
                //     description: "Lorem Ipsum"
                // }
            `)
        }
        
        let isFound = false

        for(let i = 0; i < products.length; i++){
            if(products[i].id == req.params.id){
                isFound = i
                break;
            }
        }
    
        if(isFound === false){
            res.status(404).send({message: "Product not found"})
        }else{
            if (req.body.name) products[isFound].name = req.body.name
            if (req.body.price) products[isFound].price = req.body.price
            if (req.body.description) products[isFound].description = req.body.description

            res.send({message: "Product is updated with id " + products[isFound].id, 
            data:products[isFound]})
        }

})

app.delete('/product/:id', (req, res) => {
    let isFound = false

        for(let i = 0; i < products.length; i++){
            if(products[i].id == req.params.id){
                isFound = i
                break;
            }
        }
    
        if(isFound === false){
            res.status(404).send({message: "Product not found"})
        }else{
            products.splice(isFound, 1)
            res.send({message: "Product deleted"})
        }

})

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`App listening on port ${port} 🚀`)
})