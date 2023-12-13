const Classroom = require("../models/Classroom");

// Xử lý logic tạo phòng học
const createClassroom = async (req, res) => {
  try {
    const { classroom } = req.body;
    const { name_classroom, code_classroom, description } = classroom;

    const existingClassroom = await Classroom.findOne({
      code_classroom,
    }).exec();
    if (!!existingClassroom) {
      return res.status(401).json({
        success: false,
        message: "Phòng học đã tồn tại",
      });
    }

    //insert to DB
    const newClassroom = await Classroom.create({
      name_classroom,
      code_classroom,
      description,
    });

    res.status(200).json({
      success: true,
      message: "Tạo phòng học thành công",
      data: { ...newClassroom._doc },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.toString(),
    });
  }
};

// Xử lý logic chỉnh sửa phòng học
const updateClassroom = async (req, res) => {
  try {
    const { classroom } = req.body;
    const { name_classroom, code_classroom, description } = classroom;
    const classroomId = req.params.id;
    const existingClassroom = await Classroom.findById(classroomId).exec();
    if (!existingClassroom) {
      return res.status(401).json({
        success: false,
        message: "Phòng học không tồn tại",
        classroomId,
      });
    }

    existingClassroom.name_classroom = name_classroom;
    existingClassroom.code_classroom = code_classroom;
    existingClassroom.description = description;

    existingClassroom.save();

    return res.status(200).json({ message: "Thay đổi phòng học thành công." });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Đã xảy ra lỗi trong quá trình xử lý." });
  }
};

// Xử lý logic xoá phòng học
const deleteClassroom = async (req, res) => {
  try {
    const classroomId = req.params.id;
    const existingClassroom = await Classroom.findById(classroomId).exec();
    if (!existingClassroom) {
      return res.status(401).json({
        success: false,
        message: "Phòng học không tồn tại",
        classroomId,
      });
    }

    // Nếu phòng học tồn tại, thực hiện xóa
    await Classroom.findByIdAndDelete(classroomId).exec();
    res.status(200).json({
      success: true,
      message: "Xóa phòng học thành công",
      classroomId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi xóa phòng học",
      error: error.message,
    });
  }
};

// Xử lý logic lấy thông tin phòng học
const getInfoClassroom = async (req, res) => {
  try {
    let { limit, page } = req.query;
    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;

    const skip = (page - 1) * limit;

    const totalClassrooms = await Classroom.countDocuments(); // Đếm tổng số phòng học

    const classrooms = await Classroom.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    // Kiểm tra nếu không có phòng học nào được tìm thấy
    if (!classrooms || classrooms.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin phòng học" });
    }

    const totalPages = Math.ceil(totalClassrooms / limit); // Tính tổng số trang

    // Trả về thông tin phòng học
    res.status(200).json({
      data: classrooms,
      status: "success",
      paging: {
        total: totalClassrooms,
        total_page: totalPages,
        current_page: page,
        limit: limit,
        next_page: page + 1,
      },
    });
  } catch (error) {
    console.error("Lỗi khi lấy thông tin phòng học:", error);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi lấy thông tin phòng học" });
  }
};

const getDetailClassroom = async (req, res) => {
  try {
    const classroomId = req.params.id;
    const existingClassroom = await Classroom.findById(classroomId).exec();
    if (!existingClassroom) {
      return res.status(401).json({
        success: false,
        message: "Phòng học không tồn tại",
        classroomId,
      });
    }
    res.status(200).json({
      data: { ...existingClassroom._doc },
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createClassroom,
  updateClassroom,
  deleteClassroom,
  getInfoClassroom,
  getDetailClassroom,
};
