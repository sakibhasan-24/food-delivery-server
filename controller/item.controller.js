import Item from "../model/item.model.js";

export const createItems = async (req, res) => {
  console.log(req.user);
  if (!req.user.isAdmin) {
    return res.status(403).json({
      message: "You are not allowed to perform this action",
      success: false,
    });
  }
  try {
    const item = await Item.create(req.body);
    return res.status(201).json({
      item,
      message: "Item created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
