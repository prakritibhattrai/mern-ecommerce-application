const mongoose = require("mongoose")

const connectDB = async () => {
    try {

        const DATABASE_URL = process.env.DATABASE_URL
        const connect = await mongoose.connect(DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Database Connected Successfully")
    } catch (error) {
        console.log(`Error Connecting to Database ${error.message}`)
        process.exit(1)
    }

}

module.exports = connectDB