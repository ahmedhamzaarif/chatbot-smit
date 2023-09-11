import express from 'express'
import cors from "cors"
import { MongoClient, ObjectId } from 'mongodb';

import { config } from 'dotenv';
config()


const mongodbURI =  "mongodb+srv://zafirabdullah1534:DellInspiren990@cluster0.ishtbna.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(mongodbURI).then((result)=>{
  console.log("db connected")
}).catch((error)=>{
  console.log(error)
})
const database = client.db('ecom');
const productsCollection = database.collection('products');

import bodyParser from 'body-parser'
import { DB } from './dbconfig.js';

const app = express()
const port = process.env.PORT || 3200
// var cors = require('cors') 

var corsOptions = {
  origin: '*', //frontend link
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.get('/', (req, res) => {
  res.send('Salam Pakistan!')
})

let products = [
  {
    id : 123,
    name: "ABC Product",
    price: "$59",
    description: "Lorem ipsum dolor imet"
  },
  {
    id : 456,
    name: "DEF Product",
    price: "$59",
    description: "Lorem ipsum dolor imet"

  }
]

// Get All Products
app.get('/products', async (req, res) => {
  const products = await productsCollection.find({}).toArray()
  res.send({
    message: "All Products",
    data: products
  })
})

// Get Single Product
app.get('/product/:id', (req, res) => {
  if (isNaN(req.params.id)){
    res.status(403).send("invalid product id")
  }

  let isFound = false;
  
  for (let i = 0; i < products.length; i++){
    if (products[i].id == req.params.id){
      isFound = i;
      break;
    }
  }
  if (isFound === false){
    res.status(404).send({message: "product not found"})
    return
  }
  else{
    res.send({
      message: "product found with id: " + products[isFound].id,
      data: products[isFound]})
  }
})

// Upload Product
app.post('/product', async (req, res) => {
try {
  if(!req.body.name
    || !req.body.price
    || !req.body.description){

      res.status(403).send(`
        required parameter missing. example JSON request body:
        {
          name: "abc product",
          price: "$12,
          description: "Lorem ipsum sit emet"
        }
      `);
      return
    }
    const doc = {
      name:req.body.name,
      price:req.body.price,  
      description:req.body.description
    }
    const result = await productsCollection.insertOne(doc)
    .then((result)=>{
      res.status(201).send({message: "create product",result})
    }).catch((error)=>{
      res.status(500).send({error})
    })
  } catch (error) {
    res.status(400).send({error})
  }
  });

// update 
app.put("/product/:id", async (req, res) => {

  if (
    !req.body.name
    && !req.body.price
    && !req.body.description) {

    res.status(403).send(`
      required parameter missing. 
      atleast one parameter is required: name, price or description to complete update
      example JSON request body:
      {
        name: "abc product",
        price: "$23.12",
        description: "abc product description"
      }`);
  }

 await productsCollection.findOneAndUpdate( {_id:new ObjectId(req.params.id)},{
  $set:{
    name: req.body.name,
    price: req.body.price,
    description: req.body.description
  }
 }).then(()=>{
  res.send("Product Updated!")
 }).catch((err)=>{
  res.send(err)
 })
});

//   let isFound = false;

//   for (let i = 0; i < products.length; i++) {
//     if (products[i].id == req.params.id) {
//       isFound = i;
//       break;
//     }
//   }

//   if (isFound === false) {
//     res.status(404);
//     res.send({
//       message: "product not found"
//     });
//   } else {

//     if (req.body.name) products[isFound].name = req.body.name
//     if (req.body.price) products[isFound].price = req.body.price
//     if (req.body.description) products[isFound].description = req.body.description

//     res.send({
//       message: "product is updated with id: " + products[isFound].id,
//       data: products[isFound]
//     });
//   }
// });

// delete product
app.delete('/product/:id', async (req, res) => {
  await productsCollection.findOneAndDelete({
    _id: new ObjectId(req.params.id)
  }).then(()=>{
    res.send("Product Deleted!")
  }).catch((err)=>{
    res.send(err)
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port} 🚀`,config())
})