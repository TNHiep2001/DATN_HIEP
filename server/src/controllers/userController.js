const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Hàm tạo JWT
const generateToken = (id) => {
  const expiresIn = "1h";

  // Tạo token
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });

  return token;
};

// Hàm decode JWT
const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error.message);
    return null;
  }
};

// xử lý logic đăng ký
const register = async (req, res) => {
  try {
    const { employee } = req.body;
    const existingUser = await User.findOne({ email: employee.email }).exec();
    if (!!existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(
      employee.password,
      parseInt(process.env.SALT_ROUNDS)
    );

    //insert to DB
    const newUser = await User.create({
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email,
      password: hashedPassword,
      role: employee.role,
    });

    res.status(200).json({
      success: true,
      message: "Đăng ký thành công",
      data: { ...newUser._doc, password: "hehe đoán đi" },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.toString(),
    });
  }
};

// xử lý logic đăng nhập
const login = async (req, res) => {
  const { employee } = req.body;
  const existingUser = await User.findOne({ email: employee.email }).exec();
  if (!!existingUser) {
    const isMatch = await bcrypt.compare(
      employee.password,
      existingUser.password
    );
    if (!!isMatch) {
      const token = await generateToken(existingUser._id);
      // Gửi token và thông báo thành công về phía client
      res.status(200).json({
        success: true,
        message: "Đăng nhập thành công",
        token,
        email: employee.email,
        name: `${existingUser.first_name} ${existingUser.last_name}`,
        role: existingUser.role,
        tokenID: decodeToken(token),
        id: existingUser._id,
      });
    } else {
      // Nếu xác thực thất bại, gửi thông báo thất bại về phía client
      res.status(401).json({
        success: false,
        message: "Mật khẩu hoặc tài khoản không chính xác",
      });
    }
  } else {
    // Nếu xác thực thất bại, gửi thông báo thất bại về phía client
    res.status(401).json({
      success: false,
      message: "Tài khoản không tồn tại",
    });
  }
};

// xử lý logic đổi mật khẩu
const changePassword = async (req, res) => {
  try {
    const { profile } = req.body;
    const { new_password, confirm_password, _id } = profile;

    // Kiểm tra xem mật khẩu mới và mật khẩu xác nhận có khớp nhau không
    if (new_password !== confirm_password) {
      return res
        .status(400)
        .json({ error: "Mật khẩu mới và mật khẩu xác nhận không khớp nhau." });
    }

    // Thực hiện các bước xác thực người dùng (điều này phụ thuộc vào cách bạn xác thực người dùng trong hệ thống của mình)
    // Ví dụ: Tìm người dùng trong cơ sở dữ liệu bằng _id
    const user = await User.findById(_id);

    // Kiểm tra xem người dùng có tồn tại không
    if (!user) {
      return res.status(404).json({ error: "Người dùng không tồn tại." });
    }

    // Thực hiện các bước xử lý thay đổi mật khẩu, ví dụ: lưu mật khẩu mới vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(
      new_password,
      parseInt(process.env.SALT_ROUNDS)
    );
    user.password = hashedPassword;
    await user.save();

    // Trả về thông báo thành công nếu mọi thứ hợp lệ
    return res.status(200).json({ message: "Thay đổi mật khẩu thành công." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Đã xảy ra lỗi trong quá trình xử lý." });
  }
};

// lấy ra thông tin user
const getInfoUser = async (req, res) => {
  try {
    const userId = req.query.id;
    const existingUser = await User.findById(userId).exec();
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "Tài khoản không tồn tại",
        userId,
      });
    }
    res.status(200).json({
      data: { ...existingUser._doc, password: "********" },
      success: true,
    });
  } catch (error) {
    console.error("Error in getInfoUser route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getListUser = async (req, res) => {
  try {
    const user = await User.find();
    const dataUser = user.filter((value) => value.role !== "admin");
    const listUser = dataUser.map((value) => {
      return {
        label: `${value.first_name} ${value.last_name}`,
        value: value._id,
      };
    });

    // Kiểm tra nếu không có user nào được tìm thấy
    if (!listUser || listUser.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy thông tin user" });
    }

    // Trả về thông tin user
    res.status(200).json({
      data: listUser,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi khi lấy thông tin user" });
  }
};

const getListInfoUser = async (req, res) => {
  try {
    let { limit, page } = req.query;
    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;

    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments({ role: { $ne: "admin" } }); // Đếm tổng số người dùng

    const users = await User.find({ role: { $ne: "admin" } })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    // Kiểm tra nếu không có người dùng nào được tìm thấy
    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin người dùng" });
    }

    const totalPages = Math.ceil(totalUsers / limit); // Tính tổng số trang

    // Trả về thông tin người dùng
    res.status(200).json({
      data: users,
      status: "success",
      paging: {
        total: totalUsers,
        total_page: totalPages,
        current_page: page,
        limit: limit,
        next_page: page + 1,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi lấy thông tin người dùng" });
  }
};

// Xử lý logic xoá người dùng
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const existingUser = await User.findById(userId).exec();
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "Người dùng không tồn tại",
        userId,
      });
    }

    // Nếu người dùng tồn tại, thực hiện xóa
    await User.findByIdAndDelete(userId).exec();
    res.status(200).json({
      success: true,
      message: "Xóa người dùng thành công",
      userId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi xóa người dùng",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  changePassword,
  getInfoUser,
  getListUser,
  getListInfoUser,
  deleteUser,
};
