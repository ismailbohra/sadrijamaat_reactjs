const express = require('express');
const router = express.Router();
const validate = require('../middelwares/validate');
const userController = require('../controllers/userController');
const userValidation = require('../validations/userValidation');
const { verifyToken } = require('../middelwares/Jwt');
const { isAdmin } = require('../middelwares/adminAccess');
const limiter = require('../middelwares/rateLimiter');

/**
 * @swagger
 * /user:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       '200':
 *         description: User registered successfully
 */
router.route('/').post(validate(userValidation.registerUser), userController.registerUser);

/**
 * @swagger
 * /user/getUserbyid/{userId}:
 *   get:
 *     tags:
 *       - User
 *     summary: Get user by ID
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.route('/getUserbyid/:userId').get(verifyToken, validate(userValidation.getUser), userController.getUser);

/**
 * @swagger
 * /user/getAllUser:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get all users
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       '200':
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.route('/getAllUser').get(verifyToken, userController.getAllUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: Login with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginCredentials'
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 */
router.route('/login').post(limiter, validate(userValidation.login), userController.login);

/**
 * @swagger
 * /user/logout:
 *   get:
 *     tags:
 *       - User
 *     summary: logout user
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       '200':
 *         description: successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.route('/logout').get(verifyToken, userController.logout);

/**
 * @swagger
 * /user/forgotpassword:
 *   post:
 *     tags:
 *       - User
 *     summary: Forgot password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPsd'
 *     responses:
 *       '200':
 *         description: Password sent to your email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Confirmation
 */
router.route('/forgotpassword').post(limiter, validate(userValidation.forgotPassword), userController.forgotPassword);

/**
 * @swagger
 * /user/changepassword:
 *   post:
 *     tags:
 *       - User
 *     summary: Change password
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePsd'
 *     responses:
 *       '200':
 *         description: Password changed successfully
 */
router.route('/changepassword').post(limiter, verifyToken, validate(userValidation.changePassword), userController.changePassword);

/**
 * @swagger
 * /user:
 *   put:
 *     tags:
 *       - User
 *     summary: Update user information
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User information updated successfully
 */
router.route('/').put(verifyToken, validate(userValidation.updateUser), userController.updateUser);

/**
 * @swagger
 * /user/verifyToken:
 *   get:
 *     tags:
 *       - User
 *     summary: verify jwt token
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       '200':
 *         description: verify jwt token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.route('/verifyToken').get(verifyToken, userController.verifyToken);

/**
 * @swagger
 * /user/search:
 *   get:
 *     summary: Search users by name and role and rolename
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Name of the user
 *       - in: query
 *         name: its
 *         schema:
 *           type: number
 *         description: ITS of the user
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Role of the user
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *             $ref: '#/components/schemas/search'
 */
router.get('/search', userController.searchUsers);

/**
 * @swagger
 * /user/assignRole:
 *   post:
 *     summary: Assign roles to users
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of user IDs
 *               rolename:
 *                 type: string
 *                 description: Role name to assign
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Role assigned successfully
 */
router.post('/assignRole', userController.assignRole);


/**
 * @swagger
 * /user/removeRole:
 *   delete:
 *     summary: Remove a role from a user
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: userid
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *       - in: query
 *         name: rolename
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the role to remove
 *     responses:
 *       200:
 *         description: Role removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Role admin removed successfully from user
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User ID and role name are required
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User with ID 12345 not found
 *       500:
 *         description: Internal server error
 */
router.delete('/removeRole', userController.removeRole);


/**
 * @swagger
 * /user/updateFcmToken:
 *   post:
 *     summary: Update user's FCM token on login
 *     description: Update the user's FCM token each time they log in.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               fcmToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: FCM token updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating FCM token
 */
router.post('/updateFcmToken', userController.updateFcmToken);


/** 
* @swagger
* components:
*    schemas:
*      User:
*        type: object
*        properties:
*          userId:
*            type: string
*          name:
*            type: string
*          email:
*            type: string
*          is_hof:
*            type: boolean
*          hof:
*            type: string
*          its:
*            type: string
*      RegisterUser:
*        type: object
*        properties:
*          name:
*            type: string
*          email:
*            type: string
*          is_hof:
*            type: boolean
*          hof:
*            type: integer
*          its:
*            type: integer
*          role:
*            type: array
*            items:
*              type: string
*      LoginCredentials:
*        type: object
*        properties:
*          its:
*            type: number
*          password:
*            type: string
*      ForgotPsd:
*        type: object
*        properties:
*          its:
*            type: integer
*      ChangePsd:
*        type: object
*        properties:
*          oldpassword:
*            type: string
*          newpassword:
*            type: string
*  
*    securitySchemes:
*      ApiKeyAuth: 
*        type: apiKey
*        in: header 
*        name: Authorization
*
*    search:
*        type: object
*        properties:
*          status:
*            type: number
*            example: 200
*          message:
*            type: string
*            example: "Success"
*          data:
*            type: array
*            items:
*              type: object
*              properties:
*                _id:
*                  type: string
*                name:
*                  type: string
*                role:
*                  type: string
*/

module.exports = router;

