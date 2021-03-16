const express = require('express')
const app=express()
const bodyParser =require('body-parser')
const morgan=require('morgan')
const mongoose=require('mongoose')
const cors = require('cors')
require('dotenv/config')
const authJwt=require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options('*',cors())

 
//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'))
app.use(authJwt());
app.use('/public/uploads',express.static(__dirname + '/public/uploads'));
app.use(errorHandler); 
//routes 
const categoriesRoutes = require('./routers/categories');
const productsRoutes = require('./routers/products');
const usersRoutes = require('./routers/users');
const ordersRoutes = require('./routers/orders');



const api = process.env.API_URL

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes); 



//database
mongoose.connect(process.env.DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName:'eshop'
})
.then(()=>{
    console.log('database is connected..')
})
.catch((err)=>{
    console.log(err)
})  

 

app.listen(3000,()=>{
    console.log("this app is running on port 3000")
})