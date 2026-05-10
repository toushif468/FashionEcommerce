import express from 'express'
import authUser from '../middleware/auth.js'
import { addToWishlist, clearWishlist, getUserWishlist } from '../controllers/wishlistController.js'

const wishlistRouter = express.Router()

wishlistRouter.post('/add', authUser, addToWishlist);
wishlistRouter.post('/get', authUser, getUserWishlist);
wishlistRouter.post('/clear', authUser, clearWishlist);

export default wishlistRouter