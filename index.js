import express from 'express';
import  connectDB  from './db.js';
import ArticleRouter from "./routes/ArticleRoute.js"
import { configDotenv } from 'dotenv';

const app = express();

app.use(express.json());


configDotenv();

const PORT = process.env.PORT || 3000;
connectDB();

app.use("/api", ArticleRouter)

app.get('/', (_, res) => {
    res.send({'Hello World': 'Welcome to the Node.js World!'});
});


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});