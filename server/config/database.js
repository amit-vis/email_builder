const mongoose = require('mongoose');
require('dotenv').config();

const connecttoDb = async ()=>{
    try {
        const db = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family:4
        });
        if(db){
            console.log("database connected successfull")
        }

    } catch (error) {
        console.error("error in connecting to database", error)
    }
}

connecttoDb();
module.exports = mongoose.connection;