const bulkUploadService = require('../services/bulkUploadService');
const fs = require('fs');

const uploadCSV = async (req, res) => {
  const filePath = req.file.path;
  
  try {
    const users = await bulkUploadService.processCSV(filePath);
    const result = await bulkUploadService.addUsers(users);
    res.status(200).json({
      message: 'Users added successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    // Clean up the file after processing
    fs.unlinkSync(filePath);
  }
};

module.exports = {
  uploadCSV,
};
