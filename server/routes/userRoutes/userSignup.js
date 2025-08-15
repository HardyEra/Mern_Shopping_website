const User = require("../../models/userModel");
const bcrypt = require('bcrypt');


const userSignup =  async (req,res)=>{
    try{
    const {username,email,password} = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({username,email,password:hashedPassword});
    await user.save();
    return res.status(200).json({message:"Successfuly created!"});
    }catch(error){
       return res.status(500).json({message:"Error",error});
    }

};

module.exports = userSignup;