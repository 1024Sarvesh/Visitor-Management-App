import mongoose from "mongoose"
import "dotenv/config"
const Connectdb = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("DataBase Connected Successfully")
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }

}

export default Connectdb;