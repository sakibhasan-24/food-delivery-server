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

export const getItems = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const pageSize = parseInt(req.query.pageSize) || 6;
    //  const items = await Item.find().skip(startIndex).limit(pageSize);
    const sort = req.query.order === "asc" ? 1 : -1;
    const priceHighToLow = req.query.price === "desc" ? -1 : 1;
    const items = await Item.find({
      ...(req.query.category && {
        category: req.query.category,
      }),
      ...(req.query.name && {
        name: { $regex: req.query.name, $options: "i" },
      }),
      ...(req.query.price && {
        price: { $gte: parseInt(req.query.price) },
      }),
      ...(req.query.itemId && {
        _id: req.query.itemId,
      }),
      ...(req.query.userId && {
        userId: req.query.userId,
      }),
      ...(req.query.searchTerm && {
        name: { $regex: req.query.searchTerm, $options: "i" },
        description: { $regex: req.query.searchTerm, $options: "i" },
        category: { $regex: req.query.searchTerm, $options: "i" },
        ingredients: { $regex: req.query.searchTerm, $options: "i" },
      }),
    })
      .sort({ price: priceHighToLow })
      .skip(startIndex * pageSize)
      .limit(pageSize);

    const totalItems = await Item.countDocuments();
    return res.status(200).json({
      items,
      totalItems,
      message: "Items fetched successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const deleteItem = async (req, res) => {
  // console.log(req.user);
  if (!req.user.isAdmin) {
    return res.status(401).json({
      message: "You are not authorized to perform this action",
      success: false,
    });
  }
  try {
    const item = await Item.findById(req.params.id);
    // console.log(item);
    if (!item) {
      return res.status(404).json({
        message: "Item not found",
        success: false,
      });
    }
    const result = await Item.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      success: true,
      result,
      message: "successfully deleted",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
