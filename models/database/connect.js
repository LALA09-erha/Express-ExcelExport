// import mongoose from env 
const env = require('./../../env');

// setting for mongoose
env.mongoose.set("strictQuery", false);


// Connection URL

env.mongoose.connect('mongodb://127.0.0.1:27017/db_siswa', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true });