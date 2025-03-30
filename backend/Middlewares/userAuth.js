import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    if (!token) {
      // return res.status(401).json({ message: "Token is missing" });
      throw new Error("missing token");
    }

    // Replace hardcoded secret with an environment variable
    const decoded = jwt.verify(token, '12345');
    if (!decoded) {
      res.status(401).json({ message: "invalid token" }); //
      throw new Error("invalid token");
    }
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authorization Error:", error.message);
    res.status(401).json({ message: "Unauthorized access" });
  }
};
// export const userAuth = (req,res,next)=>{
//   const token = req.headers["authorization"].split("Bearer")[1]
//   if (!token) {
//     return res.status(401).json({ message: "Token is missing or invalid" });
//   }
//   console.log(token);
//   next()
//   
// }
