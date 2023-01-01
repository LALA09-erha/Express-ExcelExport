const env = require('./../env')

// schema user 
const user = env.mongoose.model('user' , {
    _id: env.mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required:true
    },
    password : {
        type: String,
        required:true
    },
    role : {
        type:String ,
        required: true
    }

})

module.exports =user;