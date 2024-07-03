const fs = require("fs");
// const log = require('../5.Logger/logger');

const filePath = "./data.json";

const FILE_HELPER = {
  readFile: function () {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      if (data) {
        console.log("File Read Successfully");
        return data;
      }
    } catch (error) {
      console.log("Error Occurred: " + error.message);
    }
    return null;
  },

  writeFile: function (data) {
    if (!data) {
      console.log("Data is mandatory");
      return;
    }
    try {
      fs.writeFileSync(filePath, data, "utf-8");
      console.log("File Written Successfully");
    } catch (error) {
      console.log("Error Occurred: " + error.message);
    }
  },
};

// Utility

const DATA = {
  insert: function (data) {
    let existingData = FILE_HELPER.readFile();
    let parsedData = existingData ? JSON.parse(existingData) : [];

    let newID = parsedData.length
      ? Number(parsedData[parsedData.length - 1].id) + 1
      : 1;

    // schema
    let newObject = {
      id: newID,
      ...data,
    };

    parsedData.push(newObject);
    FILE_HELPER.writeFile(JSON.stringify(parsedData, null, 2));
  },

  select: function (key = "", uniqueKey = "") {
    let existingData = FILE_HELPER.readFile();
    let parsedData = existingData ? JSON.parse(existingData) : [];

    if (uniqueKey === "" && key === "") {
      return parsedData;
    }

    for (let i = 0; i < parsedData.length; i++) {
      if (parsedData[i][key] === uniqueKey) {
        return parsedData[i];
      }
    }
    return {};
  },

  update: function (id, data) {
    let oldData = DATA.select();

    console.log("oldData ==> ", oldData);
    let i = 0;
    for (;;) {
      if (oldData[i]["id"] == id) {
        Object.keys(data).forEach((key) => {
          oldData[i][key] = data[key];
        });
        break;
      }

      i++;
    }

    console.log("Updated Value ==>");
    FILE_HELPER.writeFile(JSON.stringify(oldData, null, 2));
    return DATA.select("id", id);
  },

  delete: function (id) {
    let oldData = DATA.select();

    console.log("oldData ==> ", oldData);
    let i = 0;
    for (;;) {
      if (oldData[i]["id"] == id) {
        oldData.splice(i, 1);

        break;
      }

      i++;
    }

    console.log("Value Deleted ==>");
    FILE_HELPER.writeFile(JSON.stringify(oldData, null, 2));
    return DATA.select();
  },

  read: function () {
    return DATA.select();
  },
};

module.exports = DATA;
