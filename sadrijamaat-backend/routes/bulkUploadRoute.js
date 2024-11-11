const express = require('express');
const router = express.Router();
const bulkUploadController = require('../controllers/bulkUploadContoller');
const upload = require('../utils/multer');


/**
 * @swagger
 * tags:
 *   name: Bulk Upload
 *   description: Upload Data in CSV file
 */

/**
 * @swagger
 * /bulkUpload/upload-csv:
 *   post:
 *     tags: [Bulk Upload]
 *     summary: Upload a CSV file to add users
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Users added successfully
 *       500:
 *         description: Internal server error
 */
router.post('/upload-csv', upload.single('file'), bulkUploadController.uploadCSV);

module.exports = router;
