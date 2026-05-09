import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, // Professional way: Use ObjectId reference
        ref: 'user', 
        required: true 
    },
    productId: { 
        type: mongoose.Schema.Types.ObjectId, // Professional way: Use ObjectId reference
        ref: 'product', 
        required: true 
    },
    size: { type: String},
    color: { type: String},
    date: { type: Number, default: Date.now } // Standard timestamp
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

// CRITICAL: Compound Index
// This prevents the same user from adding the same product/size/color combination twice
// It also makes searching for a user's wishlist incredibly fast
wishlistSchema.index({ userId: 1, productId: 1, size: 1, color: 1 }, { unique: true });

const wishlistModel = mongoose.models.wishlist || mongoose.model('wishlist', wishlistSchema);

export default wishlistModel;