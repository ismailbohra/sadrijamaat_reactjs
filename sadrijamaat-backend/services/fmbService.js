const Menu = require("../models/fmbMenu");
const SkipThali = require("../models/SkipThali");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

// Create a new menu
const createMenu = async (menuBody) => {
  const menu = await Menu.create(menuBody);
  return menu;
};

// Get all menus, optionally filter by date or occasion
const getAllMenus = async (filter = {}) => {
  const menus = await Menu.find(filter);
  return menus;
};

// Get menu by ID
const getMenuById = async (id) => {
  const menu = await Menu.findById(id);
  if (!menu) {
    throw new ApiError(httpStatus.NOT_FOUND, "Menu not found");
  }
  return menu;
};

// Update an existing menu by ID
const updateMenuById = async (id, updateBody) => {
  const menu = await Menu.findByIdAndUpdate(id, updateBody, { new: true });
  if (!menu) {
    throw new ApiError(httpStatus.NOT_FOUND, "Menu not found");
  }
  return menu;
};

// Delete a menu by ID
const deleteMenuById = async (id) => {
  const menu = await Menu.findByIdAndDelete(id);
  if (!menu) {
    throw new ApiError(httpStatus.NOT_FOUND, "Menu not found");
  }
};

const createSkipThali = async (req) => {
  const { fromDate, thaliNumber, address, toDate } = req.body;
  const data = {
    thaliNumber,
    submittedBy: req.user._id,
    address,
    fromDate,
    toDate
  };
  const skipThali = new SkipThali(data);
  return await skipThali.save();
};

const getAllSkippedThalis = async (filter) => {
  return await SkipThali.find(filter);
};

const getSkipThaliById = async (id) => {
  return await SkipThali.find({ submittedBy: id });
};

const deleteSkipThaliById = async (id) => {
  return await SkipThali.findByIdAndDelete(id);
};

module.exports = {
  createMenu,
  getAllMenus,
  getMenuById,
  updateMenuById,
  deleteMenuById,
  createSkipThali,
  getAllSkippedThalis,
  getSkipThaliById,
  deleteSkipThaliById,
};
