const jwt = require("jsonwebtoken");

// Hàm tạo JWT
const generateToken = async (email) => {
  // Thực hiện các cấu hình khác cho token nếu cần
  const secretKey = "your-secret-key"; // Thay thế bằng một khóa bí mật thực tế
  const expiresIn = "1h";

  // Tạo token
  const token = jwt.sign({ email }, secretKey, { expiresIn });

  return token;
};

const register = async (req, res) => {
  const data = req.body;
  console.log(data);
};

const login = async (req, res) => {
  const { employee } = req.body;
  if (employee.email === "hiep@gmail.com" && employee.password === "12345678") {
    const token = generateToken(employee.email);
    // Gửi token và thông báo thành công về phía client
    res.status(200).json({
      success: true,
      message: "Đăng nhập thành công",
      token,
      email: employee.email,
      name: employee.email.split("@")[0],
    });
  } else {
    // Nếu xác thực thất bại, gửi thông báo thất bại về phía client
    res.status(401).json({
      success: false,
      message: "Mật khẩu hoặc tài khoản không chính xác",
    });
  }
};

const changePassword = async (req, res) => {
  const data = req.body;
  console.log(data);
};

module.exports = {
  register,
  login,
  changePassword,
};
