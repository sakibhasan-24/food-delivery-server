import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.model";

export const userSignUp = async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).send({ message: "Data not found", success: false });
  }

  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    return res
      .status(400)
      .send({ message: "User already exists", success: false });
  }
  const hashedPassword = await bcryptjs.hash(data.password, 10);
  const profilePicture =
    data.profilePicture || User.schema.paths.profilePicture.default();
  const user = new User({
    userName,
    email,
    password: hashedPassword,
    profilePicture,
    isAdmin,
    role,
  });
  try {
    await user.save();
    return res
      .status(201)
      .send({ message: "User created successfully", success: true, user });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error creating user", success: false });
  }
};
