
require('dotenv/config')
const express = require('express');
const mongo = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json())

const url = process.env.MONGO_URL
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

let menudb, customersdb


mongo.connect(url, option, (err, mongoClient) => {
    if(err) {
        console.error(err)
        return
    }
    console.log('We are connected!')

    app.listen(3000, () => console.log('app is lisening on port 3000'))

    const db = mongoClient.db('restaurant')
    customersdb = db.collection('customers')
    menudb = db.collection('menu')
})


// get
app.get('/', (req, res) => res.status(200).send('Heres my API on AWS'))

// post
app.post('/', (req, res) => {
    menudb.insertOne(req.body)
    res.status(201).send('Item was added')
})
// patch
app.patch('/', (req, res) => {
    menudb.updateOne(req.body,
    {$set: 
        {name: "tequila", cost: 30, stock: true}
    }
    )
    .then(() => res.status(200).send("item was updated"))
})
// delete
app.delete('/', (req, res) => {
    menudb.deleteOne({name: req.body.name })
    .then(() => res.send('Item was deleted'))
})