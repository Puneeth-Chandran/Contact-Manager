const express=require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const app=express()
const dotenv=require('dotenv').config();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'public/images' });
const creatContact=require('././controllers/contactController')
app.use(upload.single('image'));
connectDb();

const port=process.env.PORT || 5000

// app.get("/api/contacts",(req,res)=>{
//     res.json({message:"Get all contacts"})
// })

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.post('/api/contacts', upload.single('file'), createContact); 

app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/users/", require("./routes/userRoutes"))
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});