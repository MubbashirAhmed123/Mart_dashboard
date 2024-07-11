const express=require('express')
const cors=require('cors')
const path = require('path');
require('dotenv').config()
const app=express()

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(require('./routes/adminRoutes'))
app.use(require('./routes/categoryRoutes'))
app.use(require('./routes/subCategoryRoutes'))
app.use(require('./routes/productRoutes'))
app.use(require('./routes/forgetPasswordRoutes'))



app.get('/',(req,res)=>{
    res.send('hello')
})
app.listen(process.env.PORT || 5000,()=>{
    console.log('server running')
})