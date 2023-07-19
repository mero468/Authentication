const express = require('express');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = {credentials:true, origin: process.env.URL|| '*'};

//Middleware
app.use(cors(corsOptions));
app.use(express.json()); //req.body()


//Routes 
app.use("/auth",require('./routes/jwtAuth'));
app.use("/users",require('./routes/users'));

app.listen(PORT, ()=>console.log(`Server is Listening on ${PORT}`));