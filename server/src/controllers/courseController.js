const Course = require("../models/Course");

// Xử lý logic tạo course
const createCourse = async (req, res) => {
  try {
    const { course } = req.body;
    const {
      name_course,
      code_course,
      academic_term,
      department,
      major,
      description,
    } = course;

    const existingCourse = await Course.findOne({
      code_course,
    }).exec();
    if (!!existingCourse) {
      return res.status(401).json({
        success: false,
        message: "Môn học đã tồn tại",
      });
    }

    //insert to DB
    const newCourse = await Course.create({
      name_course,
      code_course,
      academic_term,
      department,
      major,
      description,
    });

    res.status(200).json({
      success: true,
      message: "Tạo môn học thành công",
      data: { ...newCourse._doc },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.toString(),
    });
  }
};

// Xử lý logic chỉnh sửa môn học
const updateCourse = async (req, res) => {
  try {
    const { course } = req.body;
    const {
      name_course,
      code_course,
      academic_term,
      department,
      major,
      description,
    } = course;
    const courseId = req.params.id;
    const existingCourse = await Course.findById(courseId).exec();
    if (!existingCourse) {
      return res.status(401).json({
        success: false,
        message: "Môn học không tồn tại",
        courseId,
      });
    }

    existingCourse.name_course = name_course;
    existingCourse.code_course = code_course;
    existingCourse.academic_term = academic_term;
    existingCourse.department = department;
    existingCourse.major = major;
    existingCourse.description = description;

    existingCourse.save();

    return res.status(200).json({ message: "Thay đổi môn học thành công." });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Đã xảy ra lỗi trong quá trình xử lý." });
  }
};

// Xử lý logic xoá môn học
const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const existingCourse = await Course.findById(courseId).exec();
    if (!existingCourse) {
      return res.status(401).json({
        success: false,
        message: "Môn học không tồn tại",
        courseId,
      });
    }

    // Nếu môn học tồn tại, thực hiện xóa
    await Course.findByIdAndDelete(courseId).exec();
    res.status(200).json({
      success: true,
      message: "Xóa môn học thành công",
      courseId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi xóa môn học",
      error: error.message,
    });
  }
};

// Xử lý logic lấy thông tin môn học
const getInfoCourse = async (req, res) => {
  try {
    let { limit, page } = req.query;
    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;

    const skip = (page - 1) * limit;

    const totalCourses = await Course.countDocuments(); // Đếm tổng số môn học

    const courses = await Course.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    // Kiểm tra nếu không có môn học nào được tìm thấy
    if (!courses || courses.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin môn học" });
    }

    const totalPages = Math.ceil(totalCourses / limit); // Tính tổng số trang

    // Trả về thông tin môn học
    res.status(200).json({
      data: courses,
      status: "success",
      paging: {
        total: totalCourses,
        total_page: totalPages,
        current_page: page,
        limit: limit,
        next_page: page + 1,
      },
    });
  } catch (error) {
    console.error("Lỗi khi lấy thông tin môn học:", error);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi lấy thông tin môn học" });
  }
};

const getDetailCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const existingCourse = await Course.findById(courseId).exec();
    if (!existingCourse) {
      return res.status(401).json({
        success: false,
        message: "Môn học không tồn tại",
        courseId,
      });
    }
    res.status(200).json({
      data: { ...existingCourse._doc },
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createCourse,
  getInfoCourse,
  getDetailCourse,
  updateCourse,
  deleteCourse,
};
