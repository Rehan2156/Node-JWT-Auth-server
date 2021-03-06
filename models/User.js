const mongoose = require('mongoose');
const {isEmail} = require('validator')
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required: [true,'Please enter an email address'],
        unique: true,
        lowercase:true,
        validate: [isEmail,'Please enter a valid email address']
    },
    password: {
        type:String,
        required: [true,'Please enter a password'],
        minlength: [6,'Minimum password length is 6 characters']
    }
})

// userSchema.post('save', function(doc,next){
//     console.log('user saved ',doc);
//     next();
// })

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

// static method to login users
userSchema.statics.login = async function(email,password){
    const user = await this.findOne({ email }); //check if email exists in database. if not it will return undefined.
    if(user){
        const auth = await bcrypt.compare(password,user.password)
        if(auth)
            return user;
        throw Error('incorrect password')    
    }
    throw Error('incorrect email')

}

const User = mongoose.model('users',userSchema)

module.exports = User;