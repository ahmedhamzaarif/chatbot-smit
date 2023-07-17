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
  res.send(products)
})
app.get('/product/:id', (req, res) => {
  const prdId = req.params.id;
  // res.send({message: `Welcome ${prdId}`})
  // res.send('Single Products! ' + prdId)

  if (isNaN(req.params.id)){
    res.status(403).send("invalid product id")
  }
  let isFound = false;
  for (let i = 0; i < products.length; i++){
    if (products[i].id === req.params.id){
      isFound = i;
      break;
    }
  }
  if (isFound === false){
    res.status(404).send("product not found")
  } else {
    res.send(products[isFound])
  }
  // res.send(products)
})
app.post('/product', (req, res) => {
  res.send('Salam Pakistan!')

})
app.put('/product/:id', (req, res) => {
  res.send('Salam Pakistan!')
})
app.delete('/product/:id', (req, res) => {
  res.send('Delete Product!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port} 🚀`)
})