import bodyParser from 'body-parser'
import express from 'express'
import { DB } from './dbconfig.js';
import { config } from 'dotenv';
import { MongoClient } from 'mongodb';
config()
const app = express()
const port = process.env.PORT || 3000
var cors = require('cors')

app.use(cors())
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.get('/', (req, res) => {
  res.send('Salam Pakistan!')
})


const mongodbURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.nabnixg.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(mongodbURI);
const database = client.db('ecom');
const productsCollection = database.collection('products');

let products = [
  {
    id : 123,
    name: "ABC Product",
    price: "$59",
    desccription: "Lorem ipsum dolor imet"
  },
  {
    id : 456,
    name: "DEF Product",
    price: "$59",
    desccription: "Lorem ipsum dolor imet"

  }
]

app.get('/products', (req, res) => {
  res.send({
    message: "All Products",
    data: products
  })
})
app.get('/product/:id', (req, res) => {
  // const prdId = req.params.id;
  // res.send({message: `Welcome ${prdId}`})
  // res.send('Single Products! ' + prdId)

  if (isNaN(req.params.id)){
    res.status(403).send("invalid product id")
  }

  let isFound = false;
  
  for (let i = 0; i < products.length; i++){
    // Both Ways are correct, Use parseInt for id when using === otherwise this will compares it as string
    // if (products[i].id === parseInt(req.params.id)){
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

// upload product
app.post('/product', async (req, res) => {
  // res.send('Salam Pakistan!')
try {
  

  if(!req.body.name
    || !req.body.price
    || !req.body.description){

    return  res.status(403).send(`
        required parameter missing. example JSON request body:
        {
          id: 123, // always a number
          name: "abc product",
          price: "$12,
          description: "Lorem ipsum sit emet"
        }
      `);
    }
    
    await productsCollection.insertOne({
      name:req.body.name,
      desccription:req.body.description,
      price:req.body.description  
    }).then((result)=>{
      res.status(201).send({message: "create product",result})

    })


  } catch (error) {
    res.status(400).send({message: error})

  }

  });

// -------------------------------------
// app.put('/product/:id', (req, res) => {
//   res.send('Salam Pakistan!')
// })
app.put("/product/:id", (req, res) => {

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


  let isFound = false;

  for (let i = 0; i < products.length; i++) {
    if (products[i].id == req.params.id) {
      isFound = i;
      break;
    }
  }

  if (isFound === false) {
    res.status(404);
    res.send({
      message: "product not found"
    });
  } else {

    if (req.body.name) products[isFound].name = req.body.name
    if (req.body.price) products[isFound].price = req.body.price
    if (req.body.description) products[isFound].description = req.body.description

    res.send({
      message: "product is updated with id: " + products[isFound].id,
      data: products[isFound]
    });
  }
});
// delete product
app.delete('/product/:id', (req, res) => {
  // res.send('Delete Product!')
  let isFound = false;
  for(let i = 0; i < products.length; i++){
    if(products[i].id == req.params.id)
    isFound = i;
    break;
  } 

  if(isFound === false){
    res.status(404).send({message: "product not found"});
  }
  else{
    products.splice(isFound,1)
    res.send({
      message: "product is deleted"
    });
  }
})


app.listen(port, () => {
  console.log(`App running on port ${port} 🚀`)
})