const express = require("express");
const RazaController = require("../controllers/razaController");
const validate = require("../middelwares/validate");
const razaApplicationValidation = require("../validations/razaValidation");
const { isAdmin } = require("../middelwares/adminAccess");
const { verifyToken } = require("../middelwares/Jwt");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Option:
 *       type: object
 *       properties:
 *         value:
 *           type: string
 *         label:
 *           type: string
 *     Field:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           required: true
 *         type:
 *           type: string
 *           required: true
 *         options:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Option'
 *         is_required:
 *           type: boolean
 *     ApprovalStatus:
 *       type: string
 *     RazaType:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           required: true
 *         umoorName:
 *           type: string
 *         isConflictedRaza:
 *           type: boolean
 *         type:
 *           type: string
 *           enum: ["EVENT_RAZA", "UMOOR_RAZA"]
 *           default: "EVENT_RAZA"
 *         fields:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Field'
 *         approval_status:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ApprovalStatus'
 */

/**
 * @swagger
 * /raza/manageRaza:
 *   post:
 *     summary: Create a new RazaType
 *     tags: [RazaType]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RazaType'
 *     responses:
 *       200:
 *         description: RazaType created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.route("/manageRaza").post(RazaController.createRazaType);
/**
 * @swagger
 * /raza/manageRaza:
 *   put:
 *     summary: update RazaType
 *     tags: [RazaType]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RazaType'
 *     responses:
 *       200:
 *         description: RazaType created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.route("/manageRaza").put(RazaController.updateRazaType);
/**
 * @swagger
 * /raza/manageRaza/{id}:
 *  delete:
 *     tags:
 *       - RazaType
 *     summary: Delete Raza Type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Raza Type retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RazaType'
 */
router.route("/manageRaza/:id").delete(RazaController.deleteRazaType);

/**
 * @swagger
 * /raza/manageRaza/getall:
 *   get:
 *     tags:
 *       - RazaType
 *     summary: Get all Raza Types
 *     responses:
 *       '200':
 *         description: Raza Types retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RazaType'
 */
router.route("/manageRaza/getall").get(RazaController.getAllRazaTypes);

/**
 * @swagger
 * /raza/manageRaza/getraza/{id}:
 *   get:
 *     tags:
 *       - RazaType
 *     summary: Get Raza Type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Raza Type retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RazaType'
 */
router.route("/manageRaza/getraza/:id").get(RazaController.getRazaTypeById);

/**
 * @swagger
 * /raza/applyraza:
 *   post:
 *     tags:
 *       - RazaApplication
 *     summary: Apply for a Raza
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RazaApplication'
 *     responses:
 *       '201':
 *         description: Application submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RazaApplication'
 *       '400':
 *         description: Bad Request
 */
router
  .route("/applyraza")
  .post(
    verifyToken,
    validate(razaApplicationValidation.applyForRaza),
    RazaController.applyForRaza
  );

/**
 * @swagger
 * /raza/approveRaza:
 *   post:
 *     tags:
 *       - RazaApplication
 *     summary: Approve Raza
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApproveRaza'
 *     responses:
 *       '201':
 *         description: Application submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApproveRaza'
 *       '400':
 *         description: Bad Request
 */
router
  .route("/approveRaza")
  .post(
    verifyToken,
    validate(razaApplicationValidation.approveRaza),
    RazaController.approveRaza
  );

/**
 * @swagger
 * /raza/getallraza:
 *   get:
 *     tags:
 *       - RazaApplication
 *     summary: Get all Raza
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: approver
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Raza retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RazaType'
 */
router.route("/getallraza").get(verifyToken, RazaController.getAllRaza);

/**
 * @swagger
 * /raza/getraza/{id}:
 *   get:
 *     tags:
 *       - RazaApplication
 *     summary: Get Raza by ID
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Raza retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RazaType'
 */
router.route("/getraza/:id").get(verifyToken, RazaController.getRazaById);


/**
 * @swagger
 * /raza/updateRaza:
 *   put:
 *     tags:
 *       - RazaApplication
 *     summary: Update a Raza
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateRaza'
 *     responses:
 *       '201':
 *         description: successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RazaApplication'
 *       '400':
 *         description: Bad Request
 */
router
  .route("/updateRaza")
  .put(
    verifyToken,
    RazaController.updateRaza
  );

/**
 * @swagger
 * /raza/deleteRaza/{id}:
 *   delete:
 *     tags:
 *       - RazaApplication
 *     summary: Delete Raza Type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Raza Type retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RazaType'
 */
router.route("/deleteRaza/:id").delete(RazaController.deleteRaza);





  /**
 * @swagger
 * components:
 *  schemas:
 *    RazaApplication:
 *      type: object
 *      properties:
 *        razaType:
 *          type: string
 *          description: Raza Type ID
 *        data:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              value:
 *                type: string
 *    updateRaza:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: Raza ID
 *        data:
 *          type: object
 *          description: fields
 *    ApproveRaza:
 *      type: object
 *      properties:
 *        razaId:
 *          type: string
 *          description: Raza Type ID
 *        fmbThali:
 *          type: boolean
 *          description: Raza Type is Fmb Thali Distribution
 *        date:
 *          type: string
 *          description: Raza Type is Fmb Thali Distribution
 *        time:
 *          type: string
 *          description: Raza Type is Fmb Thali Distribution
 *        jaman:
 *          type: boolean
 *          description: Raza Type is gaav nu jaman
 *        darees:
 *          type: boolean
 *          description: Raza Type is gaav ni darees
 *        shitabi:
 *          type: boolean
 *          description: gaav ni shitabi
 *        marasiyah:
 *          type: boolean
 *          description: gaav na marasiyah
 *        approve_as:
 *          type: string
 *        status:
 *          type: string
 *          description: Raza Status
 *          enum: ["PENDING", "APPROVED", "REJECTED"]
 *          default: "APPROVED"
 *        comment:
 *          type: string
 *          description: comment
 */



  module.exports = router;