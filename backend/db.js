const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/urbanMobility";

const connectToMongo = async()=>{
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}
connectToMongo().catch(err => console.log(err));
module.exports = connectToMongo;
