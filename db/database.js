const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/connected-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true,    // Remove if problematic
    useFindAndModify: false
})
.then(() => {console.log('MongoDB Connected')})
.catch((e) => {console.log('MongoDB Failure')})