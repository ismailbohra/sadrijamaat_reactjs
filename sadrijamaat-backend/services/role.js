// role.service.js
const { Role } = require('../models/role');
const User = require('../models/user');

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


async function removeRoleFromAllUsers(roleToRemove) {
  try {
    const result = await User.updateMany(
      { role: roleToRemove }, // Find users having the role
      { $pull: { role: roleToRemove } } // Remove the role from the role array
    );
    
    console.log(`Role "${roleToRemove}" removed from users:`, result);
    return result;
  } catch (error) {
    console.error("Error removing role:", error);
    throw error; 
  }
}

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
  removeRoleFromAllUsers
};
