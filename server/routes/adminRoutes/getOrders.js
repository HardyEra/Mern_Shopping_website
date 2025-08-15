const Order = require("../../models/order");

const adminGetorder = async (req, res) => {
    try {
        if(req.user.role!='admin') return res.status(403).json({message:"Only Admins Allowed"});
        const adminId = req.params.ad_id;

        const orderInfo = await Order.find({ adminId });
        res.status(200).json(orderInfo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching orders' });
    }
};

module.exports = adminGetorder;