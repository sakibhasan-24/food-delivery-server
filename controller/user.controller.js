import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
export const userUpdate = async (req, res) => {
  const validUser = await User.find({ _id: req.params.id });
  if (!validUser) {
    return res.status(401).send({ message: "User not found", success: false });
  }
  console.log(req.params.id, req.user._id);
  if (req.params.id !== req.user._id) {
    return res.status(401).send({ message: "Unauthorized", success: false });
  }
  try {
    if (req.body.password) {
      const hashedPassword = await bcryptjs.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    console.log(updatedUser);
    return res.status(200).send({
      message: "User updated successfully",
      success: true,
      updatedUser,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error updating user", success: false });
  }
};
