const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken')
const {verifytoken} = require('./auth');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const multer = require('multer');
const {storage} = require('./cloudinaryConfig')
const upload = multer({storage});
const app = express();
const User = require('./models/userModel');
const Admin = require('./models/adminModel');
const Product = require('./models/products');
const Cart = require('./models/cart');
const Order = require('./models/order');

const SECRET = process.env.JWT_SECRET || 'hardy123';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type','Authorization'],
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.post('/api/userSignup', async (req,res)=>{
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

});

app.post('/api/adminSignup',async (req,res)=>{
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

});

app.post('/api/userlogin' ,async(req,res)=>{
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
});

app.post('/api/adminlogin',async(req,res)=>{
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
});

app.post('/api/products',verifytoken, upload.single('image'), async (req, res) => {
  try {
    if(req.user.role!='admin') return res.status(403).json({message:"Only Admins Allowed to post"});


    const { adminId, title, price, description } = req.body;
    const image = req.file.path || req.file.secure_url;  // ← Cloudinary handles this
    const product = new Product({ adminId, title, price, description, image });
    await product.save();

    return res.status(200).json({ message: "Success: Admin Products" });
  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({ message: "Error uploading product" });
  }
});

app.get('/api/products',verifytoken,async(req,res)=>{
    try{
    const allProducts = await Product.find();

    return res.status(200).json(allProducts);
    }catch(error){
        console.error(error);
        return res.status(500).json({message:"Error"});
    }

})

app.get('/api/products/:ad_id',verifytoken,async(req,res)=>{
    try{
        if(req.user.role!='admin') return res.status(202).json({message:"Only Admins Allowed"});

    const adminId = req.params.ad_id;

    const products = await Product.find({adminId});
    
    return res.status(200).json(products);
    }
    catch (error){
        console.error(error);
        return res.status(404).json({message:"Error"});
    }
});
app.post('/api/cartProducts', verifytoken, async (req, res) => {
  if (req.user.role !== 'user') return res.status(403).json({ message: "Login as User" });

  const userId = req.user.id;
  const { prodId } = req.body;

  const product = await Product.findById(prodId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const { title, price, description, adminId } = product;

  const cartProd = new Cart({
    adminId,
    userId,
    prodId,
    title,
    price,
    description
  });

  await cartProd.save();

  return res.status(200).json({ message: "Product added to cart" });
});

app.get('/api/cartProd/:user_id',verifytoken,async(req,res)=>{
    if(req.user.role!='user') return res.status(403).json({message:"Login as User"});
    const userId =req.params.user_id;

    const cartProd = await Cart.find({userId});
    return res.status(200).json(cartProd);
})

app.post('/api/Orders',verifytoken,async(req,res)=>{
    if(req.user.role!='user') return res.status(403).json({message:"Login as User"});

    const userId = req.user.id;
    const{prodId} = req.body;

    const product = await Product.findById(prodId)
    if(!product) return res.status(404).json({message:"Not Found: Product"});
    const {adminId, title, price, description} = product;
    const orderList = new Order({ prodId, userId, adminId, title, price, description});
    await orderList.save();

    await Cart.findOneAndDelete({ userId, prodId });
    return res.status(200).json({message:"Product added to order list."});
});

app.get('/api/Orders/:ad_id', verifytoken ,async (req, res) => {
    try {
        if(req.user.role!='admin') return res.status(403).json({message:"Only Admins Allowed"});
        const adminId = req.params.ad_id;

        const orderInfo = await Order.find({ adminId });
        res.status(200).json(orderInfo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching orders' });
    }
});

app.listen(PORT,()=>{
    console.log('Connect to server!');
})