import jwt from 'jsonwebtoken'
import Doctor from '../models/DoctorSchema.js'
import User from '../models/UserSchema.js'

export const authenticate = (req, res, next) => {

    // get token
    const authToken = req.headers.authorization

    //check the token
    if(!authToken || !authToken.startsWith('Bearer ')){
        return res.status(401).json({
            success: false,
            message: 'No token provided, authorization denied'
        })
    }
    
    try {
        console.log(authToken);
        next();
    } catch (err) {
        
    }
}