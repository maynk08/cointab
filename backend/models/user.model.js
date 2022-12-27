const mongoose = require("mongoose")



const UserSchema = mongoose.Schema({
    photo: {type:String, required:true,},
    firstName: {type:String, required:true,},
    lastName: {type:String, required:true,},
    gender: {type:String, required:true,},
    email: {type:String, required:true,},
    country: {type:String, required:true,},
    city:{type:String, required:true,}
    
})

const UserModel = mongoose.model("user",UserSchema)

module.exports = {
    UserModel
}