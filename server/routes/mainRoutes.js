const express = require('express');
const multer = require('multer');
const {storage} = require('../cloudinaryConfig')
const upload = multer({storage});
const { verifytoken } = require('../auth');
const userlogin = require('./userRoutes/userLogin');
const postorders = require('./userRoutes/postOrders');
const adminGetorder = require('./adminRoutes/getOrders');
const allproducts = require('./userRoutes/userShowProducts');
const usersearch = require('./userRoutes/userSearch');
const usercartprod = require('./userRoutes/getCartProducts');
const usercartproducts = require('./userRoutes/postCartProducts');
const adminpostproducts = require('./adminRoutes/postProducts');
const admingetproducts = require('./adminRoutes/getProducts');
const userSignup = require('./userRoutes/userSignup');
const adminSignup = require('./adminRoutes/adminSignup');
const adminlogin = require('./adminRoutes/adminLogin');
const router = express.Router();


router.post('/userSignup',userSignup);
router.post('/adminSignup',adminSignup);
router.post('/userlogin' ,userlogin);
router.post('/adminlogin',adminlogin);
router.post('/Orders',verifytoken,postorders);
router.post('/cartProducts',verifytoken,usercartproducts);
router.post('/products',verifytoken, upload.single('image'),adminpostproducts);
router.get('/Orders/:ad_id',verifytoken, adminGetorder);
router.get('/products',verifytoken, allproducts);
router.get('/search',verifytoken , usersearch);
router.get('/cartProd',verifytoken, usercartprod);
router.get('/products/:ad_id',verifytoken , admingetproducts);

module.exports = router;