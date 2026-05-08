const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next) => {

  try {

    const token =req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message:"Unauthorized"
      });
    }

    const user = jwt.verify(token,process.env.JWT_SECRET);
      

    req.user = user;

    next();

  } catch (error) {

    res.status(401).json({
      message: "Invalid Token"
    });

  }
};

module.exports = authMiddleware;