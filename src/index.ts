import { connectDB, sequelize } from "./dbConnection";
import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
const main = async () => {
  try {
    await connectDB();
    console.log("Connection has been established successfully.");
    await sequelize.sync({alter: true});
    const PORT = process.env.PORT|| 3005;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
main()