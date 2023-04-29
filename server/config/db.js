const mongoose = require('mongoose')
//mongoose.set('strictQuery', false)
//let conn = null
const connectDB = async () => {
    try {
        //if (!conn) {
            const conn = await mongoose.connect(process.env.MONGODB_URI)
            console.log(`Database Connected: ${conn.connection.host}`)
       // }

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB