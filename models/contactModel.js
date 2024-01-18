const mongoose=require('mongoose')

const contactSchema= mongoose.Schema(
    {
        name: {
            type: String,
            required: [true,"Please add contact name"],
        },
        email:{
            type: String,
            required: [true, "Please add contact email address"],
        },
        phone:{
            type :String,
            required:[true, "Please add contact phone number"],
        },
        image:{
            type:String,
            required:[true,"Please add contact image"]
        }
    },
    {
        timeStamps:{
            required: true,
        }
    }

);
module.exports=mongoose.model("contact",contactSchema)