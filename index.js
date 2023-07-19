import  express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {dirname,join} from 'path';
import { fileURLToPath } from 'url';

// dotenv.config();

// const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {credentials:true, origin: process.env.URL|| '*'};

//Middleware
app.use(cors(corsOptions));
app.use(json()); //req.body()


//Routes 
// app.use('/',express.static(join(__dirname,'public')));

app.listen(PORT, ()=>console.log(`Server is Listening on ${PORT}`));