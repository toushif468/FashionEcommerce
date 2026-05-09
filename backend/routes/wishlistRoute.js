import express from 'express'
import authUser from '../middleware/auth'
import addToWishlist from '../controllers/wishlistController'

const wishlistRouter = express.Router()

wishlistRouter.post('/add', authUser, addToWishlist)

export default wishlistRouter