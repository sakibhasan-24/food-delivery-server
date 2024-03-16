import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

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
  const { userName, email, password, isAdmin, role } = data;
  const hashedPassword = await bcryptjs.hash(password, 10);
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
  //   console.log(user);
  try {
    await user.save();

    return res
      .status(201)
      .send({ message: "User created successfully", success: true, user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Error creating user", success: false });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "All fields are required", success: false });
  }
  try {
    const existingUser = await User.findOne({ email });
    console.log("existing user", existingUser);
    if (!existingUser) {
      return res.status(404).send({
        message: `Invalid credentials`,
        success: false,
      });
    }
    const passwordMatch = bcryptjs.compareSync(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(200).send({
        message: "Invalid credentials",
        success: false,
      });
    }

    const token = jwt.sign({ user: existingUser }, process.env.JWT_TOKEN);
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json({ success: true, user: existingUser });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Error logging in", success: false });
  }
};
