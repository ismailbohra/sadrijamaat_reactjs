// role.service.js
const { Role } = require('../models/role');

// Create a new Role
const createRole = async (data) => {
  return await Role.create(data);
};

// Get all Roles
const getAllRoles = async () => {
  return await Role.find();
};

// Get a Role by ID
const getRoleById = async (id) => {
  return await Role.findById(id);
};

// Update a Role by ID
const updateRoleById = async (id, data) => {
  return await Role.findByIdAndUpdate(id, data, { new: true });
};

// Delete a Role by ID
const deleteRoleById = async (id) => {
  return await Role.findByIdAndDelete(id);
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
};
