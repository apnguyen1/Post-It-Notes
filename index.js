import mongoose from "mongoose";
import express from 'express';
import cors from 'cors';
import {router} from "./routes/updateNotes.js";
import * as path from "path";
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const port = process.env.PORT || 5000;
const DB = "mongodb+srv://andrew1767:Andrew1767@notes.o0una4b.mongodb.net/?retryWrites=true&w=majority";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
.use(cors())
.use(express.json())
.use(express.urlencoded({extended: true}))
.use("/api", router)

app.use(express.static('post-it/dist/post-it'));

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, 'post-it/dist/post-it/index.html'));
});



mongoose.connect(DB)
.then( () => {
    app.listen(port);
    console.log(`Running on http://localhost:${port}`);
})
.catch( error => {
    console.log(error);
})