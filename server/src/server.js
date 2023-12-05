require("dotenv").config();
const express = require("express");
const path = require("path");
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const userRoutes = require("./routes/user");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

// Sử dụng middleware CORS
app.use(cors());

//config template engine
configViewEngine(app);

//khai báo route
app.use("/", webRoutes);
app.use("/user", userRoutes);

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
