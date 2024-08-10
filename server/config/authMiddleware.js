import jwt from 'jsonwebtoken';
import { secretKey } from './jwtConfig.js'

export const authenticateToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    // const role = req.header("Role");
    if(!authHeader) {
        return res.status(401).json({ message: "Missing Token!" });
    }
    let [bearer, token] = authHeader.split(" ");
    // token = token.replace(/"/g, '');

    if(bearer != "Bearer" || !token) {
        return res.status(401).json({ message: "Invalid token format!" });
    }

    jwt.verify(token, secretKey, (err, user) => {
        // if (err || user.role !== role) {
        //     return res.status(403).json({ message: "Invalid token/role!" });
        // }
        req.user = user;
        next();
    });
}

export const authenticateUserToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    // const role = req.header("Role");
    if(!authHeader) {
        return res.status(401).json({ message: "Missing Token!" });
    }
    let [bearer, token] = authHeader.split(" ");
    // token = token.replace(/"/g, '');

    if(bearer != "Bearer" || !token) {
        return res.status(401).json({ message: "Invalid token format!" });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err ) { //|| user.role !== role
          console.log(err);
            return res.status(403).json({ message: "Invalid token!" });
        }
        if(user.role === 'user'){
            req.user = user;
        } else {
            return res.status(403).json({ message: "Access Forbidden!" });
        }

        req.user = user;
        next();
    });
}