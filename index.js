const express = require('express')
const app = express()
var cors = require('cors')

// require('dotenv').config()

const port = 5000

app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')

//

const uri =
  'mongodb+srv://softbook:softbook@cluster0.wy2w6g2.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})
const booksCollection = client.db('softBook').collection('books')
// const reviewCollection = client.db('softBook').collection('review')

const run = () => {
  try {
    app.get('/books', async (req, res) => {
      const query = {}

      const result = await booksCollection.find(query).toArray()

      const books = result.reverse()
      res.send(books)
    })

    app.get('/books/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await booksCollection.findOne(query)
      res.send(result)
    })

    app.post('/book', async (req, res) => {
      const book = req.body
      const result = await booksCollection.insertOne(book)
      res.send(result)
    })

    //
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  } finally {
  }
}

run()
