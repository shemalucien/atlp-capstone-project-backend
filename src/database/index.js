import mongoose from 'mongoose';
import "dotenv/config";
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("App connected to Mongodb successfully")
    })
    .catch((e) => {
        console.log("Mongodb connection error " + e.message);
    })
