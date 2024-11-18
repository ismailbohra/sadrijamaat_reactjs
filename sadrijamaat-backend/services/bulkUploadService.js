const fs = require("fs");
const csv = require("csv-parser");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { RazaType } = require("../models/razaType");

// Function to process CSV and prepare users array
const processCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const users = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", async (row) => {
        try {
          // Console log the row being processed
          console.log(
            `Processing ITS_ID: ${row.ITS_ID}, Name: ${row.Full_Name}`
          );

          const hashedPassword = await bcrypt.hash(String(row.ITS_ID), 10);
          const age = parseInt(row.Age);
          const user = {
            name: row.Full_Name,
            its: parseInt(row.ITS_ID),
            email: row.Email,
            is_hof: row.HOF_FM_TYPE === "HOF" ? true : false,
            contact: row.Mobile,
            hof: parseInt(row.HOF_ID),
            password: hashedPassword,
            address: row.Address ? row.Address : "",
            sector: row.TanzeemFile_No,
            age: isNaN(age) ? 0 : age,
            gender: row.Gender,
          };
          users.push(user);
        } catch (error) {
          reject(error);
        }
      })
      .on("end", () => {
        resolve(users);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

// Function to add users to the database, skipping existing users
const addUsers = async (users) => {
  const insertedUsers = [];
  for (const user of users) {
    try {
      // Check if user with the same ITS_ID already exists
      const existingUser = await User.findOne({ its: user.its });
      if (existingUser) {
        console.log(`Skipping ITS_ID: ${user.its} (already exists)`);
        continue;
      }

      // Insert the user into the database
      const newUser = new User(user);
      await newUser.save();
      insertedUsers.push(newUser);

      console.log(`Inserted ITS_ID: ${user.its}, Name: ${user.name}`);
    } catch (error) {
      console.error(
        `Error inserting ITS_ID: ${user.its}, Name: ${user.name} - ${error.message}`
      );
    }
  }

  return insertedUsers;
};

const convertFieldName = (original) => {
  return {
    transformed: original.toLowerCase().replace(/\s+/g, "-"),
    original: original,
  };
};

// Function to process and insert RazaType data from a CSV file
const uploadRazaTypeCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const razatypeRecords = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        try {
          const fields = JSON.parse(row.fields); // Parse the fields JSON string
          const transformedFields = fields.fields.map((field) => {
            const { transformed, original } = convertFieldName(field.name);
            
            // Modify options by mapping each element to an object with value and label
            const transformedOptions = field.options?.map((element) => ({
              value: element.name,
              label: element.name,
            })) || [];

            return {
              name: original,
              type: field.type,
              is_required: field.required || false,
              options: transformedOptions,
            };
          });

          let umoorName;
          let type;

          if (row.umoor.startsWith("Umoor")) {
            umoorName = "Umoor " + row.umoor.slice(5); // keep original 'Umoor' part
            type = "UMOOR_RAZA";
          } else {
            umoorName = row.umoor;
            type = "EVENT_RAZA";
          }

          const razatypeRecord = {
            tempId:row.id,
            name: row.name,
            fields: transformedFields,
            timestamp: row.timestamp,
            umoorName,
            type,
            isConflictedRaza: false,
            approval_status: ["JAMAAT", "AMILSAHEB"],
          };

          razatypeRecords.push(razatypeRecord);
        } catch (error) {
          console.error("Error processing row:", error);
        }
      })
      .on("end", async () => {
        try {
          const result = await RazaType.insertMany(razatypeRecords);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};


// Define route to handle CSV file upload
const uploadRazaTypeRoute = async (req) => {
  try {
    const filePath = req.file.path;

    const insertedRecords = await uploadRazaTypeCSV(filePath);
    return insertedRecords;
  } catch (error) {
    console.error("Error processing file:", error);
    throw error;
  }
};





module.exports = {
  uploadRazaTypeCSV,
  uploadRazaTypeRoute,
  addUsers,
  processCSV
};
