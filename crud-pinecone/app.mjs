import express from "express";
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890', 20)
import { MongoClient, ObjectId } from "mongodb"
import morgan from 'morgan';
import cors from 'cors'
import path from 'path';
const __dirname = path.resolve();
// import { PineconeClient } from "@pinecone-database/pinecone";
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from "openai";
// import { config } from 'dotenv';
// config()
import "dotenv/config.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
import './config/index.mjs'

// const mongodbURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.9ha3mra.mongodb.net/?retryWrites=true&w=majority`
// const client = new MongoClient(mongodbURI);
// const database = client.db('ecom');
// const productsCollection = database.collection('products');

// const pinecone = new PineconeClient();
// await pinecone.init({
//   environment: process.env.PINECONE_ENVIRONMENT,
//   apiKey: process.env.PINECONE_API_KEY,
// });

const pinecone = new Pinecone({ 
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT
})
await pinecone.listIndexes()


const app = express();
app.use(express.json());
// app.use(cors(["http://localhost:3000", "127.0.0.1"]));
// app.use(cors(["http://localhost:3000/"]));
// app.use(cors())
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}))
app.use(morgan('combined'));


// Get All
app.get('/api/v1/story/', async (req, res) => {
  const queryText = ""
  // const queryText = "retreated"
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: queryText,
  });

  const vector = response?.data[0]?.embedding
  console.log("vector: ", vector);

  const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);
  const queryResponse = await index.query({
    queryRequest: {
      vector: vector,
      // id: "vec1",
      topK: 100,
      includeValues: true,
      includeMetadata: true,
      // namespace: process.env.PINECONE_NAME_SPACE
    }
  });

  queryResponse.matches.map(eachMatch => {
    console.log(`score ${eachMatch.score.toFixed(1)} => ${JSON.stringify(eachMatch.metadata)}\n\n`);
  })
  console.log(`${queryResponse.matches.length} records found `);

  res.send(queryResponse.matches)

})

// Upload 
app.post('/api/v1/story', async (req, res) => {
  console.log("req.body: ", req.body);
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: `${req.body?.title} ${req.body?.body}`,
  });
  console.log("response?.data: ", response?.data);
  const vector = response?.data[0]?.embedding
  console.log("vector: ", vector);
  const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);
  const upsertRequest = {
    vectors: [
      {
        id: nanoid(),
        values: vector,
        metadata: {
          title: req.body?.title,
          body: req.body?.body,
        }
      }
    ],
    // namespace: process.env.PINECONE_NAME_SPACE,
  };
  try {
    const upsertResponse = await index.upsert({ upsertRequest });
    console.log("upsertResponse: ", upsertResponse);

    res.send({
      message: "story created successfully"
    });
  } catch (e) {
    console.log("error: ", e)
    res.status(500).send({
      message: "failed to create story, please try later"
    });
  }
})


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


app.get(express.static(path.join(__dirname, "./web/build")))
app.use("/", express.static(path.join(__dirname, './web/build')))

const port = process.env.PORT || 5001
app.listen(port, () => {
  // console.log(`App running on port ${port} 🚀`, config())
  console.log(`App running on port ${port} 🚀`)
})