const Admin = require("../../models/adminModel");
const bcrypt = require('bcrypt');

const adminSignup = async (req,res)=>{
    try{
        const {username,email,password} = req.body;

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({username,email,password:hashedPassword});
        await admin.save();

        return res.status(200).json({message:"Successfuly created!"});
        }catch(error){
            console.log({message:error});
            return res.status(500).json({message:"Error",error});
    }

};

module.exports = adminSignup;