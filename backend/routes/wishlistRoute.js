import express from 'express'
import authUser from '../middleware/auth.js'
import {addToWishlist, clearOne, clearWishlist, getUserWishlist } from '../controllers/wishlistController.js'

const wishlistRouter = express.Router()

wishlistRouter.post('/add', authUser, addToWishlist);
wishlistRouter.post('/get', authUser, getUserWishlist);
wishlistRouter.post('/clear-all', authUser, clearWishlist);
wishlistRouter.post('/clear', authUser, clearOne);

export default wishlistRouter