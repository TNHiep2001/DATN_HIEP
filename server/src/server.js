require("dotenv").config();
const express = require("express");
const path = require("path");
const userRoutes = require("./routes/user");
const scheduleRoutes = require("./routes/schedule");
const classroomRoutes = require("./routes/classroom");
const courseRoutes = require("./routes/course");
const shareScheduleRoutes = require("./routes/shareSchedule");
const cors = require("cors");
const connect = require("./database/database");

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

// Sử dụng middleware CORS
app.use(cors());

//khai báo route
app.use("/user", userRoutes);
app.use("/schedule", scheduleRoutes);
app.use("/classroom", classroomRoutes);
app.use("/course", courseRoutes);
app.use("/shareSchedule", shareScheduleRoutes);

app.listen(port, hostname, async () => {
  await connect();
  console.log(`App listening on port ${port}`);
});
