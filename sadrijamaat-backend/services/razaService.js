const httpStatus = require("http-status");
const { RazaType } = require("../models/razaType");
const RazaData = require("../models/raza");
const User = require("../models/user");
const ApiError = require("../utils/ApiError");
const pick = require("../utils/pick");
const { sendTopicNotification, sendDeviceNotification } = require("./NotificationService");

const updateRaza = async (userBody) => {
  try {
    const { id, data } = userBody;

    const newRaza = await RazaData.updateOne(
      { _id: id },
      {
        data,
      }
    );

    if (!newRaza) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Raza not udpated");
    }

    return newRaza;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const deleteRaza = async (id) => {
  try {
    const newRaza = await RazaData.deleteOne({ _id: id });

    if (!newRaza) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Raza not deleted");
    }

    return newRaza;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getRazaById = async (id) => {
  try {
    const raza = await RazaData.findById(id);
    return raza;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};
const getAllRaza = async (req) => {
  try {
    let razas = [];
    if (req.query.approver) {
      query = {
        approval_status: {
          $elemMatch: { approver: req.query.approver },
        },
      };
      razas = await RazaData.find(query);
    } else if (req.query.all) {
      razas = await RazaData.find();
    } else {
      razas = await RazaData.find({
        submitted_by: req.user._id,
      });
    }

    const updatedRazas = await Promise.all(
      razas.map(async (element) => {
        const razatype = await RazaType.findById(element.razatype);
        const user = await User.findById(element.submitted_by);
        return {
          ...element.toObject(),
          razatype: razatype.name,
          type: razatype.type,
          umoorName: razatype.umoorName,
          user,
        };
      })
    );

    return updatedRazas;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const applyForRaza = async (req) => {
  try {
    const { razaType, data } = req.body;

    const razaTypeDetails = await RazaType.findById(razaType);
    if (!razaTypeDetails) {
      throw new ApiError(httpStatus.NOT_FOUND, "Raza Type not found");
    }

    const approvalStatus = razaTypeDetails.approval_status.map((approver) => ({
      approver: approver,
    }));

    const newApplication = await RazaData.create({
      submitted_by: req.user._id,
      razatype: razaType,
      data,
      approval_status: approvalStatus,
    });
    await sendTopicNotification(
      [razaTypeDetails.approval_status[0]],
      "New Raza Application",
      `${req.user.name} - (ITS:${req.user.its} ) has applied for ${razaTypeDetails.name} raza`
    ).then(()=>{
      console.log('message sent successfully')
    });
    return newApplication;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const approveRaza = async (req) => {
  try {
    const {
      razaId,
      comment,
      status,
      fmbThali,
      date,
      time,
      jaman,
      darees,
      shitabi,
      marasiyah,
      approve_as,
    } = req.body;

    let raza = await RazaData.findById(razaId);
    if (!raza) {
      throw new ApiError(httpStatus.NOT_FOUND, "Raza not found");
    }
    let approver_index = 1;
    raza.approval_status.map((e,index) => {
      if (e.approver == approve_as) {
        e.status = status;
        e.comment = comment;
        approver_index = index;
      }
      return e;
    });
    const razatype = await RazaType.findById(raza.razatype)
    await sendDeviceNotification(
      [raza.submitted_by],
      "Raza Updated",
      `Your Raza for ${razatype.name} Status has been Updated`
    );
    if(approver_index+1<raza.approval_status.length && status=='APPROVED'){
      const user = await User.findById(raza.submitted_by)
      await sendTopicNotification(
        [raza.approval_status[approver_index+1].approver],
        "New Raza Application",
        `${user.name} - (ITS:${user.its} ) has applied for ${razatype.name} raza`
      );
    }

    raza.fmbThali = fmbThali;
    raza.date = date;
    raza.time = time;
    raza.jaman = jaman;
    raza.darees = darees;
    raza.shitabi = shitabi;
    raza.marasiyah = marasiyah;

    await raza.save();

    return raza;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const createRazaType = async (userBody) => {
  try {
    const { name, type, fields, approval_status, isConflictedRaza } = userBody;

    const newRaza = await RazaType.create({
      name,
      type,
      fields,
      approval_status,
      isConflictedRaza,
    });

    if (!newRaza) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Raza not created");
    }

    return newRaza;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateRazaType = async (userBody) => {
  try {
    const { id, data } = userBody;

    const newRaza = await RazaType.updateOne({ _id: id }, data);

    if (!newRaza) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Raza not udpated");
    }

    return newRaza;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const deleteRazaType = async (id) => {
  try {
    const newRaza = await RazaType.deleteOne({ _id: id });

    if (!newRaza) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Raza Type not deleted"
      );
    }

    return newRaza;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getAllRazaTypes = async (req) => {
  try {
    const filter = pick(req.query, ["type", "umoorName"]);
    console.log(filter);
    const razas = await RazaType.find(filter);
    return razas;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getRazaTypeById = async (id) => {
  try {
    const raza = await RazaType.findById(id);
    return raza;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

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


let d={
  "razatype": "6666f6fac1542cdce21245bf",
  "data": [
    {
      "name": "date",
      "type": "date",
      "value": "2024-10-18T13:31:51.158Z",
      "options": [],
      "is_required": true
    },
    {
      "name": "venue",
      "type": "select",
      "value": "masjid",
      "options": [
        {
          "value": "home",
          "label": "home"
        },
        {
          "value": "masjid",
          "label": "masjid"
        }
      ],
      "is_required": true
    }
  ]
}