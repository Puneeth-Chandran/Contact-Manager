const express=require('express')
const asyncHandler = require("express-async-handler")
const {Contact} = require("../models/contactModel")
const axios = require('axios');
const app=express();
const multer=require('multer')
const upload = multer({ dest: 'public/images' });
app.use(upload.single('image'));
//get all contacts

const getContacts=asyncHandler (async(req,res)=>{
    const contacts=await Contact.find();
    res.json(contacts   )
});

// const createContact= asyncHandler (async(req,res)=>{
//     console.log("This is req.body",req.body);
//     const {name, phone, email} = req.body
//     if(!name || !phone|| !email){
//         res.status(400)
//         throw new Error("All field is mandatory")
//     }

//      const contact=await Contact.create({
//         name,
//         email,
//         phone,
//     })
//     res.json(contact)
// });

const createContact = asyncHandler(async (req, res) => {
    console.log("This is req.body", req.body);
    const { name, phone, email,image} = req.body;
    if (!name || !phone || !email) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        image
    });
    res.json(contact);
});

app.post('/api/contacts', async (req, res) => {
    // Add the Axios code here to send the form data to the server
    const formData = new FormData();
    formData.append('name', req.body.name);
    formData.append('phone', req.body.phone);
    formData.append('email', req.body.email);
    formData.append('image', req.body.image);
console.log(formData,"heyy theree");
    axios.post('http://localhost:5000/api/contacts', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    .then(response => {
        console.log('Server response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});


const getContact = asyncHandler (async(req,res)=>{
    const contact= await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error ("No such contact");
    }
    res.json(contact)
})

const updateContact = asyncHandler (async(req,res)=>{
    const contact= await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error ("No such contact found")
    }

    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.json(updatedContact)
})

const deleteContact= asyncHandler (async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("No such contact exist!!!")
    }
    await Contact.findByIdAndRemove(req.params.id);
    res.json(contact)
})

module.exports= {getContact,createContact,getContacts,deleteContact,updateContact}