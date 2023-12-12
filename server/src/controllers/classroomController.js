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
      throw new Error("Phòng học đã tồn tại");
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
const updateClassroom = async (req, res) => {};

// Xử lý logic xoá phòng học
const deleteClassroom = async (req, res) => {};

// Xử lý logic lấy thông tin phòng học
const getInfoClassroom = async (req, res) => {};

module.exports = {
  createClassroom,
  updateClassroom,
  deleteClassroom,
  getInfoClassroom,
};
