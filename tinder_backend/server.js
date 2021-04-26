import express from 'express';
import mongoose  from 'mongoose';
import dbCards from './dbCards.js';
import Card from './dbCards.js';
import Cors from 'cors';
import dotenv from 'dotenv';

//App config
const app = express();
dotenv.config();
const port = process.env.PORT || 8001;
const connection_url = process.env.CONNECTION_URL;
//Middlewares
app.use(express.json());
app.use(Cors())
//DB config
mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
const db = mongoose.connection;

db.on('connected',()=>{
    app.listen(port,()=>{console.log(`Listening on port ${port}`)});
});
db.on('error',()=>{
    console.log("Connection error");
});


//API Endpoints
app.get("/",(req, res)=>{
    res.status(200).send('Hello');
})

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;
    dbCards.create(dbCard, (err, data) =>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
});

app.get("/tinder/cards",(req,res)=>{
    dbCards.find((err,data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})


//Listener