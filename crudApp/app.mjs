import express from 'express'
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Salam Pakistan!')
})

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
app.post('/product', (req, res) => {
  // res.send('Salam Pakistan!')

  if(!req.body.name
    || !req.body.price
    || !req.body.description){

      res.status(403).send(`
        required parameter missing. example JSON request body:
        {
          id: 123, // always a number
          name: "abc product",
          price: "$12,
          description: "Lorem ipsum sit emet"
        }
      `);
    }
    
    products.push({
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    });

    res.status(201).send({message: "create product"})
});

// -------------------------------------
app.put('/product/:id', (req, res) => {
  res.send('Salam Pakistan!')
})

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