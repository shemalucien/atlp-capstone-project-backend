import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://shemalucien:Shema123@articles.2pt7v.mongodb.net/PortfolioDb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("App connected to Mongodb successfully")
    })
    .catch((e) => {
        console.log("Mongodb connection error " + e.message);
    })