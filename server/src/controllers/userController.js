const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Hàm tạo JWT
const generateToken = async (email) => {
  // Thực hiện các cấu hình khác cho token nếu cần
  const secretKey = "your-secret-key"; // Thay thế bằng một khóa bí mật thực tế
  const expiresIn = "1h";

  // Tạo token
  const token = jwt.sign({ email }, secretKey, { expiresIn });

  return token;
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
      const token = await generateToken(existingUser.id);
      // Gửi token và thông báo thành công về phía client
      res.status(200).json({
        success: true,
        message: "Đăng nhập thành công",
        token,
        email: employee.email,
        name: `${existingUser.first_name} ${existingUser.last_name}`,
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
  const data = req.body;
  console.log(data);
};

module.exports = {
  register,
  login,
  changePassword,
};
