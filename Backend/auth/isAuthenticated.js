import jwt from "jsonwebtoken"


export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided, authentication required",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.id = decoded.userId || decoded.id;
 // make sure your JWT has `userId`
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};
