const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET = process.env.JWT_SECRET || 'hardy123';

const userlogin = async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
       return res.status(404).json({message:"No user found"});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
       return res.status(404).json({message:"Wrong password"});
    }
    
    const token = jwt.sign({id:user._id,email:user.email,name:user.username,role:'user'},SECRET,{expiresIn:'1h'});

    return res.status(200).json({ message: "Login Successful",token, user: { _id: user._id, email: user.email, username: user.username } });
};

module.exports = userlogin;