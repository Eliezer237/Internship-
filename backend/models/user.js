const mongoose=require('mongoose');
const {Schema}=mongoose;

const userSchema=new Schema({
  email: {
    type: String,
    required: true, // You can add validation here if needed, like 'required'
    unique: true,   // Ensures the email is unique
  },
  password: {
    type: String,  // Should be a String because passwords are usually stored as strings
    required: true, // Ensure password is provided
  }
});
const UserModel=mongoose.model('User',userSchema);

module.exports=UserModel;