import wishlistModel from "../models/wishlistModel.js";

const addToWishlist = async (req, res) => {
    try {
        const { userId, productId, size, color } = req.body;
        if (!productId) {
            return res.json({ success: false, message: "Product ID is required" });
        }
        const exist = await wishlistModel.findOne({
            userId,
            productId,
            size,
            color,
        })
        if (exist) {
            return res.json({ success: false, message: "Item already in wishlist" })
        }

        const newItem = new wishlistModel({
            userId,
            productId,
            size: size || "",
            color: color || "",
        })
        await newItem.save();

        return res.json({ success: true, newItem, message: "Added to wishlist" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const getUserWishlist = async (req, res) => {
    try {
        const { userId } = req.body;

        const wishlistData = await wishlistModel.find({ userId })
            .populate({
                path: 'productId', 
                select:'name image price',
            })
            .sort({ date: -1 });

        res.json({ success: true, wishlist: wishlistData })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export { getUserWishlist, addToWishlist };