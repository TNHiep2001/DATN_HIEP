const moment = require("moment");

const Schedule = require("../models/Schedule");
const Classroom = require("../models/Classroom");
const Course = require("../models/Course");

const createSchedule = async (req, res) => {
  try {
    const { schedule } = req.body;
    const {
      id_user_create,
      type_schedule,
      course_schedule,
      lecture_content,
      total_num_lessons,
      total_credit_points,
      responsible_teacher,
      description,
      schedules_attributes,
    } = schedule;

    let createScheduleFail = false;
    let indexScheduleFail;
    const schedules = await Schedule.find();
    schedules.forEach((val) => {
      val.schedules.forEach((val_) => {
        schedules_attributes.forEach((val__, index) => {
          const time_start_create = `${val__.schedule_date} ${val__.time_start}`;
          const time_end_create = `${val__.schedule_date} ${val__.time_end}`;
          const time_start_created = `${val_.schedule_date} ${val_.time_start}`;
          const time_end_created = `${val_.schedule_date} ${val_.time_end}`;

          if (
            val_.schedule_date === val__.schedule_date &&
            (moment(time_start_create).isBetween(
              time_start_created,
              time_end_created
            ) ||
              moment(time_end_create).isBetween(
                time_start_created,
                time_end_created
              ) ||
              (moment(time_start_create).isBefore(time_start_created) &&
                moment(time_end_create).isBefore(time_end_created))) &&
            val_.room.value === val__.room
          ) {
            createScheduleFail = true;
            indexScheduleFail = index;
          }
        });
      });
    });
    if (createScheduleFail) {
      return res.status(401).json({
        success: false,
        message: `Thời gian và địa điểm lịch trình số ${
          indexScheduleFail + 1
        } đã có trong lịch trình khác`,
      });
    }

    // kiểm tra xem lịch trình đã tồn tại chưa
    const existingCourseSchedule = await Schedule.findOne({
      "course_schedule.value": course_schedule,
    }).exec();
    if (!!existingCourseSchedule) {
      return res.status(401).json({
        success: false,
        message: "Môn học này đã có trong lịch trình khác",
      });
    }

    // tìm kiếm khóa học
    const existingCourse = await Course.findOne({
      code_course: course_schedule,
    }).exec();

    const listSchedule = await Promise.all(
      schedules_attributes.map(async (schedule) => {
        // tìm kiếm phòng học
        const existingClassroom = await Classroom.findOne({
          code_classroom: schedule.room,
        }).exec();

        return {
          schedule_date: schedule.schedule_date,
          time_start: schedule.time_start,
          time_end: schedule.time_end,
          room: {
            label: `${existingClassroom.name_classroom}, ${existingClassroom.code_classroom}`,
            value: existingClassroom.code_classroom,
          },
          content_schedule: schedule.content_schedule,
          num_of_lessons: schedule.num_of_lessons || 0,
          name_teacher: schedule.name_teacher,
          status_schedule: schedule.status_schedule,
        };
      })
    );

    // Tạo một bản ghi mới trong bảng Schedule
    const newSchedule = await Schedule.create({
      id_user_create,
      type_schedule,
      course_schedule: existingCourse
        ? {
            label: `${existingCourse.name_course} - ${existingCourse.academic_term} - ${existingCourse.department} - ${existingCourse.major}`,
            value: existingCourse.code_course,
          }
        : { label: "", value: "" },
      lecture_content,
      total_num_lessons: total_num_lessons || 0,
      total_credit_points: total_credit_points || 0,
      responsible_teacher,
      description,
      schedules: listSchedule,
    });

    // Trả về kết quả thành công
    res.status(200).json({
      message: "Lịch trình đã được tạo thành công.",
      data: { ...newSchedule._doc },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: error, message: "Đã xảy ra lỗi khi tạo lịch trình." });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const { schedule } = req.body;
    const {
      id_user_create,
      type_schedule,
      course_schedule,
      lecture_content,
      total_num_lessons,
      total_credit_points,
      responsible_teacher,
      description,
      schedules_attributes,
    } = schedule;

    let createScheduleFail = false;
    let indexScheduleFail;
    const schedules = await Schedule.find();
    schedules.forEach((val) => {
      val.schedules.forEach((val_) => {
        schedules_attributes.forEach((val__, index) => {
          const time_start_create = `${val__.schedule_date} ${val__.time_start}`;
          const time_end_create = `${val__.schedule_date} ${val__.time_end}`;
          const time_start_created = `${val_.schedule_date} ${val_.time_start}`;
          const time_end_created = `${val_.schedule_date} ${val_.time_end}`;

          if (
            val_.schedule_date === val__.schedule_date &&
            (moment(time_start_create).isBetween(
              time_start_created,
              time_end_created
            ) ||
              moment(time_end_create).isBetween(
                time_start_created,
                time_end_created
              ) ||
              (moment(time_start_create).isBefore(time_start_created) &&
                moment(time_end_create).isBefore(time_end_created))) &&
            val_.room.value === val__.room
          ) {
            createScheduleFail = true;
            indexScheduleFail = index;
          }
        });
      });
    });
    if (createScheduleFail) {
      return res.status(401).json({
        success: false,
        message: `Thời gian và địa điểm lịch trình số ${
          indexScheduleFail + 1
        } đã có trong lịch trình khác`,
      });
    }

    // kiểm tra xem lịch trình đã tồn tại chưa
    const existingCourseSchedule = await Schedule.findOne({
      "course_schedule.value": course_schedule,
    }).exec();
    if (!!existingCourseSchedule) {
      return res.status(401).json({
        success: false,
        message: "Môn học này đã có trong lịch trình khác",
      });
    }

    // tìm kiếm khóa học
    const existingCourse = await Course.findOne({
      code_course: course_schedule,
    }).exec();

    const scheduleId = req.params.id;
    const existingSchedule = await Schedule.findById(scheduleId).exec();
    if (!existingSchedule) {
      return res.status(401).json({
        success: false,
        message: "Lịch trình không tồn tại",
        scheduleId,
      });
    }

    const listSchedule = await Promise.all(
      schedules_attributes.map(async (schedule) => {
        // tìm kiếm phòng học
        const existingClassroom = await Classroom.findOne({
          code_classroom: schedule.room,
        }).exec();

        // Nếu có id và _destroy, thì xóa đối tượng lịch trình
        if (schedule.id && schedule._destroy) {
          // await Schedule.schedules.findByIdAndRemove(schedule.id).exec();
          return null; // Không trả về bất kỳ đối tượng nào
        }

        return {
          schedule_date: schedule.schedule_date,
          time_start: schedule.time_start,
          time_end: schedule.time_end,
          room: {
            label: `${existingClassroom.name_classroom}, ${existingClassroom.code_classroom}`,
            value: existingClassroom.code_classroom,
          },
          content_schedule: schedule.content_schedule,
          num_of_lessons: schedule.num_of_lessons,
          name_teacher: schedule.name_teacher,
          status_schedule: schedule.status_schedule,
        };
      })
    );

    existingSchedule.id_user_create = id_user_create;
    existingSchedule.type_schedule = type_schedule;
    existingSchedule.course_schedule = existingCourse
      ? {
          label: `${existingCourse.name_course} - ${existingCourse.academic_term} - ${existingCourse.department} - ${existingCourse.major}`,
          value: existingCourse.code_course,
        }
      : { label: "", value: "" };
    existingSchedule.lecture_content = lecture_content;
    existingSchedule.total_num_lessons = total_num_lessons;
    existingSchedule.total_credit_points = total_credit_points;
    existingSchedule.responsible_teacher = responsible_teacher;
    existingSchedule.description = description;
    existingSchedule.schedules = listSchedule.filter(
      (schedule) => schedule !== null
    );

    existingSchedule.save();

    return res.status(200).json({ message: "Thay đổi lịch trình thành công." });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Đã xảy ra lỗi trong quá trình xử lý." });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const scheduleId = req.params.id;
    const existingSchedule = await Schedule.findById(scheduleId).exec();
    if (!existingSchedule) {
      return res.status(401).json({
        success: false,
        message: "lịch trình không tồn tại",
        scheduleId,
      });
    }

    // Nếu lịch trình tồn tại, thực hiện xóa
    await Schedule.findByIdAndDelete(scheduleId).exec();
    res.status(200).json({
      success: true,
      message: "Xóa lịch trình thành công",
      scheduleId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi xóa lịch trình",
      error: error.message,
    });
  }
};

const getInfoSchedule = async (req, res) => {
  try {
    let { limit, page, idUser, name_schedule_search } = req.query;
    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;

    let query = { id_user_create: idUser };

    if (name_schedule_search) {
      const regex = new RegExp(name_schedule_search, "i");
      query = {
        ...query,
        $or: [
          { lecture_content: { $regex: regex } },
          { "course_schedule.label": { $regex: regex } },
        ],
      };
    }

    const skip = (page - 1) * limit;

    const totalSchedules = await Schedule.find(query).countDocuments(); // Đếm tổng số lịch trình

    const schedules = await Schedule.find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    // Kiểm tra nếu không có lịch trình nào được tìm thấy
    if (!schedules || schedules.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin lịch trình" });
    }

    const totalPages = Math.ceil(totalSchedules / limit); // Tính tổng số trang

    // Trả về thông tin lịch trình
    res.status(200).json({
      data: schedules,
      status: "success",
      paging: {
        total: totalSchedules,
        total_page: totalPages,
        current_page: page,
        limit: limit,
        next_page: page + 1,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi lấy thông tin lịch trình" });
  }
};

const getDetailSchedule = async (req, res) => {
  try {
    const scheduleId = req.params.id;
    const existingSchedule = await Schedule.findById(scheduleId).exec();

    if (!existingSchedule) {
      return res.status(401).json({
        success: false,
        message: "Lịch trình không tồn tại",
        scheduleId,
      });
    }
    res.status(200).json({
      data: { ...existingSchedule._doc },
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getFullSchedule = async (req, res) => {
  try {
    let { name_teacher_search } = req.query;
    let query = {};

    if (name_teacher_search) {
      const regex = new RegExp(name_teacher_search, "i");
      query = { responsible_teacher: { $regex: regex } };
    }

    const schedule = await Schedule.find(query).sort({
      _id: -1,
    });

    // Kiểm tra nếu không có lịch trình nào được tìm thấy
    if (!schedule || schedule.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin lịch trình", data: [] });
    }

    // Trả về thông tin lịch trình
    res.status(200).json({
      data: schedule,
      status: "success",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi lấy thông tin lịch trình" });
  }
};

const getShareSchedule = async (req, res) => {
  try {
    const scheduleId = req.params.id;
    const existingSchedule = await Schedule.findById(scheduleId).exec();

    if (!existingSchedule) {
      return res.status(401).json({
        success: false,
        message: "Lịch trình không tồn tại",
        scheduleId,
      });
    }
    res.status(200).json({
      data: {
        label:
          existingSchedule.type_schedule === "eduType"
            ? existingSchedule.course_schedule.label
            : existingSchedule.lecture_content,
        value: existingSchedule._id,
      },
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getInfoSchedule,
  getDetailSchedule,
  getFullSchedule,
  getShareSchedule,
};
