import mongoose from "mongoose"

const connectDB = () => {
   mongoose.connect(process.env.DATABASE_URL)
   .then(() => {
      console.log("Database connected")
   })
   .catch((error) => {
      console.log("MongoDB connection failed")
      console.log(error)
      process.exit(1)
   })
}

export default connectDB