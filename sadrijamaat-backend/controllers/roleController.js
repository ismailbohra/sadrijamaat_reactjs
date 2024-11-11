// role.controller.js
const roleService = require('../services/role');

// Create a new Role
const createRole = async (req, res) => {
  try {
    const role = await roleService.createRole(req.body);
    res.status(201).json({
      status: 201,
      message: "Role created successfully",
      data: role,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
      data: {},
    });
  }
};

// Get all Roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await roleService.getAllRoles();
    res.status(200).json({
      status: 200,
      message: "Success",
      data: roles,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
      data: {},
    });
  }
};

// Get a Role by ID
const getRoleById = async (req, res) => {
  try {
    const role = await roleService.getRoleById(req.params.id);
    if (!role) {
      return res.status(404).json({
        status: 404,
        message: "Role not found",
        data: {},
      });
    }
    res.status(200).json({
      status: 200,
      message: "Success",
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
      data: {},
    });
  }
};

// Update a Role by ID
const updateRoleById = async (req, res) => {
  try {
    const updatedRole = await roleService.updateRoleById(req.params.id, req.body);
    if (!updatedRole) {
      return res.status(404).json({
        status: 404,
        message: "Role not found",
        data: {},
      });
    }
    res.status(200).json({
      status: 200,
      message: "Role updated successfully",
      data: updatedRole,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
      data: {},
    });
  }
};

// Delete a Role by ID
const deleteRoleById = async (req, res) => {
  try {
    const deletedRole = await roleService.deleteRoleById(req.params.id);
    if (!deletedRole) {
      return res.status(404).json({
        status: 404,
        message: "Role not found",
        data: {},
      });
    }
    res.status(200).json({
      status: 200,
      message: "Role deleted successfully",
      data: deletedRole,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
      data: {},
    });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
};
