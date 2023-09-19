import express from "express";
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890', 20)
import { MongoClient, ObjectId } from "mongodb"
import morgan from 'morgan';
import cors from 'cors'
import path from 'path';
const __dirname = path.resolve();
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from "openai";
import "dotenv/config.js";
import './config/index.mjs'
import http from "http"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const pinecone = new Pinecone({ 
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT
})
// await pinecone.listIndexes()


const app = express();
app.use(express.json());
// app.use(cors())
app.use(cors(["http://localhost:3000", "127.0.0.1"]));
app.use(morgan('combined'));

// Get All
app.get('/api/v1/stories/', async (req, res) => {
  const queryText = ""
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: queryText,
  });

  const vector = response?.data[0]?.embedding
  console.log("vector: ", vector);

  const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);
  await index.query({
      vector: vector,
      topK: 100,
      includeValues: false,
      includeMetadata: true,
  }).then((resp)=>{
    res.send({
      response: resp,
      message:"All Stories Are Here"
    })
  }).catch((error)=>{
    res.status(400).send({
      message: "Error While Getting Stories",
      error
    })
  })
});

// Search
app.get('/api/v1/search/', async (req, res) => {
  const queryText = req.query.q
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: queryText,
  });

  const vector = response?.data[0]?.embedding
  console.log("vector: ", vector);

  const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);
  await index.query({
      vector: vector,
      topK: 3,
      includeValues: false,
      includeMetadata: true,
  }).then((resp)=>{
    res.send({
      response: resp,
      message:"All Stories Are Here"
    })
  }).catch((error)=>{
    res.status(400).send({
      message: "Error While Getting Stories",
      error
    })
  })
});


// Upload 
app.post('/api/v1/story', async (req, res) => {
  console.log("req.body: ", req.body);
  try{
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: `${req.body?.title} ${req.body?.text}`,
    });
    console.log("response?.data: ", response?.data);
    const vector = response?.data[0]?.embedding
    console.log("vector: ", vector);
    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);
    const upsertResponse = await index.upsert([{
      id: nanoid(),
      values: vector,
      metadata: {
        title: req.body.title,
        text: req.body.text
      },
    }])

    console.log(upsertResponse)


    res.send({
      upsertResponse,
      message: "story created successfully"
    });

  } catch(error){
    res.status(500).send({
      error,
      message: "Failed to Create Story Plz Try Again"
    })
  }
});

// update 
app.put("/api/v1/story/:id", async (req, res) => {

  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: `${req.body?.title} ${req.body?.text}`,
  });
  console.log("response?.data: ", response?.data);
  const vector = response.data[0].embedding

  const index = pinecone.index(process.env.PINECONE_INDEX_NAME);
  try {
    const upsertResponse = await index.upsert([{
      id: req.params.id,
      values: vector,
      metadata: {
        title: req.body.title,
        text: req.body.text
      },
    }])
    console.log("upsertResponse: ", upsertResponse);

    res.send({
      message: "story updated successfully"
    });
  } catch (e) {
    console.log("error: ", e)
    res.status(500).send({
      message: "failed to update story, please try later"
    });
  }
});

// delete
app.delete("/api/v1/story/:id", async (req, res) => {
  try {

    const index = pinecone.index(process.env.PINECONE_INDEX_NAME);

    const deleteResponse = await index.deleteOne(String(req.params.id))

    res.send({
      deleteResponse,
      message: "Deleted Successfully"
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Failed to delete Story"
    })
  }

});


app.get("/",express.static(path.join(__dirname, "./web/build")))
app.use( express.static(path.join(__dirname, './web/build')))

app.use((req, res) => {
  res.status(404).send("Not Found");
})

const server = http.createServer(app)

const port = process.env.PORT || 5001
server.listen(port, () => {
  console.log(`App running on port ${port} 🚀`)
})