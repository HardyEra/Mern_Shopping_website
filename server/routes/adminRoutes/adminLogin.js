const Admin = require("../../models/adminModel");
const SECRET = process.env.JWT_SECRET || 'hardy123';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminlogin = async(req,res)=>{
    const {email,password} = req.body;
    const admin = await Admin.findOne({email});
    if(!admin){
       return res.status(404).json({message:"No user found"});
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if(!isMatch){
       return res.status(404).json({message:"Wrong password"});
    }

    const token = jwt.sign({adminId:admin._id, email:admin.email, name:admin.username, role:'admin'},SECRET,{expiresIn:'1h'});

    return res.status(200).json({token,admin: { _id: admin._id, email: admin.email, username: admin.username } });
};

module.exports = adminlogin;