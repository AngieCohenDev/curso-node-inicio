const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Base de datos online");
  } catch (error) {
    console.log(error);
    throw new Error("Error al momento de iniciar la base de datos");
  }
};

module.exports = {
  dbConnection,
};
