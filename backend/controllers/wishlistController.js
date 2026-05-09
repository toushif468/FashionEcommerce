import wishlistModel from "../models/wishlistModel";

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
        await newItem.save()
        return res.json({ success: true, message: "Added to wishlist" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export default addToWishlist;