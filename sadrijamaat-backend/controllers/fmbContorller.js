const menuService = require("../services/fmbService");
const httpStatus = require("http-status");

// Create a new menu
const createMenu = async (req, res, next) => {
  try {
    const menu = await menuService.createMenu(req.body);
    res.status(200).json({
      status: 200,
      message: "Success",
      data: menu,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
      data: {},
    });
  }
};

// Controller
const getAllMenus = async (req, res, next) => {
  try {
    const filters = {};

    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const todayString = today.toISOString().split("T")[0]; // "YYYY-MM-DD"

    if (req.query.date) {
      // Use the provided date directly if it's in the correct format
      filters.date = { $gte: req.query.date };
    } else {
      // Default: fetch all menus from today onwards
      filters.date = { $gte: todayString };
    }

    const menus = await menuService.getAllMenus(filters);
    res.status(200).json({
      status: 200,
      message: "Success",
      data: menus,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
      data: {},
    });
  }
};

// Get a menu by ID
const getMenuById = async (req, res, next) => {
  try {
    const menu = await menuService.getMenuById(req.params.id);
    res.status(200).json({
      status: 200,
      message: "Success",
      data: menu,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
      data: {},
    });
  }
};

// Update a menu by ID
const updateMenuById = async (req, res, next) => {
  try {
    const menu = await menuService.updateMenuById(req.params.id, req.body);
    res.status(200).json({
      status: 200,
      message: "Success",
      data: menu,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
      data: {},
    });
  }
};

// Delete a menu by ID
const deleteMenuById = async (req, res, next) => {
  try {
    await menuService.deleteMenuById(req.params.id);
    res.status(200).json({
      status: 200,
      message: "Success",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
      data: {},
    });
  }
};

const createSkipThali = async (req, res) => {
  try {
    const skipThali = await menuService.createSkipThali(req);
    res.status(201).json({ success: true, data: skipThali });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all skip thali requests
const getTodaySkippedThalis = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const filter = {
      fromDate: { $lte: today },
      toDate: { $gte: today },
    };

    const skippedThalis = await menuService.getAllSkippedThalis(filter);
    res.status(200).json({ success: true, data: skippedThalis });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUpcomingSkippedThalis = async (req, res) => {
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0); 
      const formattedTomorrow = tomorrow.toISOString().split('T')[0];
  
      const filter = {
        fromDate: { $gte: formattedTomorrow } 
      };
  
      const skippedThalis = await menuService.getAllSkippedThalis(filter);
      res.status(200).json({ success: true, data: skippedThalis });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

// Get a specific skip thali request by ID
const getSkipThaliById = async (req, res) => {
  try {
    const skipThali = await menuService.getSkipThaliById(req.params.id);
    if (!skipThali) {
      return res
        .status(404)
        .json({ success: false, message: "Skip Thali not found" });
    }
    res.status(200).json({ success: true, data: skipThali });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a skip thali request by ID
const deleteSkipThaliById = async (req, res) => {
  try {
    const skipThali = await menuService.deleteSkipThaliById(req.params.id);
    if (!skipThali) {
      return res
        .status(404)
        .json({ success: false, message: "Skip Thali not found" });
    }
    res.status(200).json({ success: true, message: "Skip Thali deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createMenu,
  getAllMenus,
  getMenuById,
  updateMenuById,
  deleteMenuById,
  createSkipThali,
  getTodaySkippedThalis,
  getSkipThaliById,
  deleteSkipThaliById,
  getUpcomingSkippedThalis
};
