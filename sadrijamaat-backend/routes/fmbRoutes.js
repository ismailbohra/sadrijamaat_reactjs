const express = require('express');
const menuController = require('../controllers/fmbContorller');
const { verifyToken } = require('../middelwares/Jwt');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: FMB Menu
 *   description: API to manage FMB Thali menus.
 */

/**
 * @swagger
 * /fmb/menu:
 *   post:
 *     summary: Create a new FMB menu
 *     tags: [FMB Menu]
 *     requestBody:
 *       description: The menu data for a specific date
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 example: '2024-10-10'
 *               occasion:
 *                 type: string
 *                 example: 'Eid-ul-Fitr'
 *               menu:
 *                 type: string
 *                 example: 'Biryani, Salad, Dessert'
 *     responses:
 *       201:
 *         description: The menu was successfully created
 */
router.post('/menu', menuController.createMenu);

/**
 * @swagger
 * /fmb/menu:
 *   get:
 *     summary: Retrieve all menus
 *     tags: [FMB Menu]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         description: Filter by menu date
 *       - in: query
 *         name: occasion
 *         schema:
 *           type: string
 *         description: Filter by occasion
 *     responses:
 *       200:
 *         description: The list of menus
 */
router.get('/menu', menuController.getAllMenus);

/**
 * @swagger
 * /fmb/menu/{id}:
 *   get:
 *     summary: Get a menu by ID
 *     tags: [FMB Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The menu ID
 *     responses:
 *       200:
 *         description: The menu details
 */
router.get('/menu/:id', menuController.getMenuById);

/**
 * @swagger
 * /fmb/menu/{id}:
 *   put:
 *     summary: Update a menu by ID
 *     tags: [FMB Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The menu ID
 *     requestBody:
 *       description: Updated menu data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 example: '2024-10-10'
 *               occasion:
 *                 type: string
 *                 example: 'Eid-ul-Fitr'
 *               menu:
 *                 type: string
 *                 example: 'Biryani, Salad, Dessert, Juice'
 *     responses:
 *       200:
 *         description: The menu was successfully updated
 */
router.put('/menu/:id', menuController.updateMenuById);

/**
 * @swagger
 * /fmb/menu/{id}:
 *   delete:
 *     summary: Delete a menu by ID
 *     tags: [FMB Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The menu ID
 *     responses:
 *       204:
 *         description: The menu was successfully deleted
 */
router.delete('/menu/:id', menuController.deleteMenuById);



/**
 * @swagger
 * /fmb/skipthali:
 *   post:
 *     summary: Create a new SkipThali request
 *     tags: [SkipThali]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               thaliNumber:
 *                 type: number
 *                 description: Thali number
 *               address:
 *                 type: string
 *                 description: Address for the skip request
 *               fromDate:
 *                 type: string
 *                 description: Starting date to skip thali (YYYY-MM-DD)
 *               toDate:
 *                 type: string
 *                 description: Ending date to skip thali (YYYY-MM-DD)
 *     responses:
 *       201:
 *         description: SkipThali created
 *       500:
 *         description: Error
 */
router.post('/skipthali/',verifyToken, menuController.createSkipThali);

/**
 * @swagger
 * /fmb/upcommingSkipthali:
 *   get:
 *     summary: Get Upcoming SkipThali requests
 *     tags: [SkipThali]
 *     responses:
 *       200:
 *         description: List of all SkipThali requests
 *       500:
 *         description: Error
 */
router.get('/upcommingSkipthali/', menuController.getUpcomingSkippedThalis);
/**
 * @swagger
 * /fmb/todaySkipThali:
 *   get:
 *     summary: Get Today SkipThali requests
 *     tags: [SkipThali]
 *     responses:
 *       200:
 *         description: List of all SkipThali requests
 *       500:
 *         description: Error
 */
router.get('/todaySkipThali/', menuController.getTodaySkippedThalis);

/**
 * @swagger
 * /fmb/skipthali/{id}:
 *   get:
 *     summary: Get a SkipThali request by ID
 *     tags: [SkipThali]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the SkipThali
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: SkipThali found
 *       404:
 *         description: SkipThali not found
 *       500:
 *         description: Error
 */
router.get('/skipthali/:id', menuController.getSkipThaliById);

/**
 * @swagger
 * /fmb/skipthali/{id}:
 *   delete:
 *     summary: Delete a SkipThali request by ID
 *     tags: [SkipThali]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the SkipThali
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: SkipThali deleted
 *       404:
 *         description: SkipThali not found
 *       500:
 *         description: Error
 */
router.delete('/skipthali/:id', menuController.deleteSkipThaliById);


module.exports = router;
