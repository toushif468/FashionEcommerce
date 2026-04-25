import userModel from "../models/userModel.js";

// add products to user Cart 

const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size, color } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }
        if (!cartData[itemId][size]) {
            cartData[itemId][size] = {};
        }
        if (cartData[itemId][size][color]) {
            cartData[itemId][size][color] += 1;
        } else {
            cartData[itemId][size][color] = 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData })

        res.json({ success: true, message: "Added To Cart" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// add products to user Cart 
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, color, quantity } = req.body;

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData || {};


        cartData[itemId][size][color] = quantity

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Cart Updated" });



    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// add products to user Cart 
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData;
        res.json({ success: true, cartData });


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { addToCart, updateCart, getUserCart }