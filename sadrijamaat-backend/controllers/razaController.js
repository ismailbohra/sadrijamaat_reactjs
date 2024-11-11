const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {
  successResponseGenerator,
  errorResponse,
} = require("../utils/ApiHelpers");
const razaService = require("../services/razaService");

const createRazaType = catchAsync(async (req, res) => {
  try {
    const user = await razaService.createRazaType(req.body);
    res
      .status(httpStatus.CREATED)
      .send(
        successResponseGenerator(
          httpStatus.CREATED,
          "raza created successfully",
          user
        )
      );
  } catch (error) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(errorResponse(httpStatus.BAD_REQUEST, error.message));
  }
});
const updateRazaType = catchAsync(async (req, res) => {
  try {
    const user = await razaService.updateRazaType(req.body);
    res
      .status(httpStatus.CREATED)
      .send(
        successResponseGenerator(
          httpStatus.OK,
          "raza type updated successfully",
          user
        )
      );
  } catch (error) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(errorResponse(httpStatus.BAD_REQUEST, error.message));
  }
});
const deleteRazaType = catchAsync(async (req, res) => {
  try {
    const user = await razaService.deleteRazaType(req.params.id);
    res
      .status(httpStatus.CREATED)
      .send(
        successResponseGenerator(
          httpStatus.OK,
          "raza Deleted successfully",
          user
        )
      );
  } catch (error) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(errorResponse(httpStatus.BAD_REQUEST, error.message));
  }
});

const updateRaza = catchAsync(async (req, res) => {
  try {
    const user = await razaService.updateRaza(req.body);
    res
      .status(httpStatus.CREATED)
      .send(
        successResponseGenerator(
          httpStatus.OK,
          "raza updated successfully",
          user
        )
      );
  } catch (error) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(errorResponse(httpStatus.BAD_REQUEST, error.message));
  }
});

const deleteRaza = catchAsync(async (req, res) => {
  try {
    const user = await razaService.deleteRaza(req.params.id);
    res
      .status(httpStatus.CREATED)
      .send(
        successResponseGenerator(
          httpStatus.OK,
          "raza Deleted successfully",
          user
        )
      );
  } catch (error) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(errorResponse(httpStatus.BAD_REQUEST, error.message));
  }
});
const getAllRazaTypes = catchAsync(async (req, res) => {
  try {
    const razas = await razaService.getAllRazaTypes(req);
    res
      .status(httpStatus.OK)
      .send(
        successResponseGenerator(
          httpStatus.OK,
          "Raza Types retrieved successfully",
          razas
        )
      );
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send(errorResponse(httpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
});

const getRazaTypeById = catchAsync(async (req, res) => {
  try {
    const raza = await razaService.getRazaTypeById(req.params.id);
    if (!raza) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send(errorResponse(httpStatus.NOT_FOUND, "Raza Type not found"));
    }
    res
      .status(httpStatus.OK)
      .send(
        successResponseGenerator(
          httpStatus.OK,
          "Raza Type retrieved successfully",
          raza
        )
      );
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send(errorResponse(httpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
});

const applyForRaza = catchAsync(async (req, res) => {
  try {
    const application = await razaService.applyForRaza(req);
    res
      .status(httpStatus.CREATED)
      .send(
        successResponseGenerator(
          httpStatus.CREATED,
          "Application submitted successfully",
          application
        )
      );
  } catch (error) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(errorResponse(httpStatus.BAD_REQUEST, error.message));
  }
});

const approveRaza = catchAsync(async (req, res) => {
  try {
    const approveRaza = await razaService.approveRaza(req);
    res
      .status(httpStatus.OK)
      .send(
        successResponseGenerator(httpStatus.OK, "Raza Approved", approveRaza)
      );
  } catch (error) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(errorResponse(httpStatus.BAD_REQUEST, error.message));
  }
});

const getAllRaza = catchAsync(async (req, res) => {
  try {
    const razas = await razaService.getAllRaza(req);
    res
      .status(httpStatus.OK)
      .send(
        successResponseGenerator(
          httpStatus.OK,
          "Raza retrieved successfully",
          razas
        )
      );
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send(errorResponse(httpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
});

const getRazaById = catchAsync(async (req, res) => {
  try {
    const raza = await razaService.getRazaById(req.params.id);
    if (!raza) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send(errorResponse(httpStatus.NOT_FOUND, "Raza not found"));
    }
    res
      .status(httpStatus.OK)
      .send(
        successResponseGenerator(
          httpStatus.OK,
          "Raza retrieved successfully",
          raza
        )
      );
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send(errorResponse(httpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
});

module.exports = {
  createRazaType,
  getAllRazaTypes,
  getRazaTypeById,
  applyForRaza,
  approveRaza,
  getRazaById,
  getAllRaza,
  updateRaza,
  deleteRaza,
  updateRazaType,
  deleteRazaType,
};
