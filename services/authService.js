const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/index'); 

const register = (email, password, genderType) =>{
    let user = new User({email, password, genderType});
    
    return user.save();
}

const login = async (email, password) => {
    let user = await User.findOne({email})

    // if(!user) return Promise.reject({message: 'No such user found!', status:404});
    if(!user) throw ({message: 'No such user found!', status:404});

    let areEqual = await bcrypt.compare(password, user.password)
        
    if(!areEqual) throw ({message: 'Invalid password!', status:404});

    let token = jwt.sign({_id: user._id, email: user.email}, SECRET)
    return token;
    console.log(user);        
}

module.exports = {
    register,
    login,
}