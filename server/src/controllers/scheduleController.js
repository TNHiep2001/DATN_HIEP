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
          num_of_lessons: schedule.num_of_lessons,
          name_teacher: schedule.name_teacher,
          status_schedule: schedule.status_schedule,
        };
      })
    );

    // Tạo một bản ghi mới trong bảng Schedule
    const newSchedule = await Schedule.create({
      id_user_create,
      type_schedule,
      course_schedule: {
        label: `${existingCourse.name_course} - ${existingCourse.academic_term} - ${existingCourse.department} - ${existingCourse.major}`,
        value: existingCourse.code_course,
      },
      lecture_content,
      total_num_lessons,
      total_credit_points,
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

    console.log(schedules_attributes);

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
    existingSchedule.course_schedule = {
      label: `${existingCourse.name_course} - ${existingCourse.academic_term} - ${existingCourse.department} - ${existingCourse.major}`,
      value: existingCourse.code_course,
    };
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
  } catch (error) {}
};

const getInfoSchedule = async (req, res) => {
  try {
    let { limit, page, idUser } = req.query;
    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;

    const skip = (page - 1) * limit;

    const totalSchedules = await Schedule.countDocuments(); // Đếm tổng số lịch trình

    const schedules = await Schedule.find({ id_user_create: idUser })
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

module.exports = {
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getInfoSchedule,
  getDetailSchedule,
};
