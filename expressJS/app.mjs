import express from 'express'
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Salam Pakistan!')
})

app.get('/name/:yourName', (req, res) => {
  const name = req.params.yourName;
  res.send({message: `Welcome ${name}`})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})