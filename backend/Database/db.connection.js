import mongoose from "mongoose";

const dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.DBURL)
        console.log('db connect successfully');
        
    } catch (error) {
        console.log('error',error);
        
    }
}


export default dbConnect