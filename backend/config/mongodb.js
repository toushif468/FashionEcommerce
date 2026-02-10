import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connect.on('connected', ()=> {
        console.log("DB Connected")
    })
    await mongoose.connect(`${process.env.MONODB_URL}/E-commerceClothing`)
}

export default connectDB;