const fs = require('fs');
const csv = require('csv-parser');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Function to process CSV and prepare users array
const processCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const users = [];
    
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', async (row) => {
        try {
          // Console log the row being processed
          console.log(`Processing ITS_ID: ${row.ITS_ID}, Name: ${row.Full_Name}`);
          
          const hashedPassword = await bcrypt.hash(String(row.ITS_ID), 10);
          const age = parseInt(row.Age);
          const user = {
            name: row.Full_Name,
            its: parseInt(row.ITS_ID),
            email: row.Email,
            is_hof: row.HOF_FM_TYPE === 'HOF' ? true : false,
            contact: row.Mobile,
            hof: parseInt(row.HOF_ID),
            password: hashedPassword,
            address: row.Address?row.Address:"",
            sector: row.TanzeemFile_No,
            age: isNaN(age) ? 0 : age,
            gender: row.Gender,
          };
          users.push(user);
        } catch (error) {
          reject(error);
        }
      })
      .on('end', () => {
        resolve(users);
      })
      .on('error', (error) => {
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
      console.error(`Error inserting ITS_ID: ${user.its}, Name: ${user.name} - ${error.message}`);
    }
  }
  
  return insertedUsers;
};

module.exports = {
  processCSV,
  addUsers,
};
