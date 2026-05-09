import express from 'express'
import authUser from '../middleware/auth.js'
import { addToWishlist, getUserWishlist } from '../controllers/wishlistController.js'

const wishlistRouter = express.Router()

wishlistRouter.post('/add', authUser, addToWishlist);
wishlistRouter.post('/get', authUser, getUserWishlist);

export default wishlistRouter