const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./src/routes/user.route");

const app = express();
dotenv.config();
app.use(express.json());

app.use("/api/users", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
