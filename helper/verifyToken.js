import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  //   console.log(token);
  if (!token) {
    return res
      .status(401)
      .send({ message: "Please login to access this resource" });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    // console.log(verified);
    req.user = verified.user;
    // console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ message: "Invalid Token" });
  }
};
