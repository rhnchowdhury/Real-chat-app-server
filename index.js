const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ajoxj5t.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('realChat').collection('users');

        // users save into mongodb
        app.post('/users', async (req, res) => {
            const users = req.body;
            const result = await userCollection.insertOne(users);
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(console.log);


app.get('/', async (req, res) => {
    res.send('Real time app is running');
});

app.listen(port, () => console.log(`Real time app running on ${port}`));

