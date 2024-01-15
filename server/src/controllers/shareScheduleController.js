const Schedule = require("../models/Schedule");
const ShareSchedule = require("../models/ShareSchedule");
const User = require("../models/User");

const createShareSchedule = async (req, res) => {
  try {
    const { share_schedule } = req.body;
    const { id_user, share_with_user, id_schedule_share } = share_schedule;

    //insert to DB
    const newShareSchedule = await ShareSchedule.create({
      id_user_share: id_user,
      share_with_user_id: share_with_user,
      id_schedule_share,
    });

    res.status(200).json({
      success: true,
      message: "Chia sẻ lịch trình thành công",
      data: { ...newShareSchedule._doc },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error,
      message: "Đã xảy ra lỗi khi chia sẻ lịch trình",
    });
  }
};

const getListShareSchedule = async (req, res) => {
  try {
    let { limit, page, idUser } = req.query;
    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;

    const skip = (page - 1) * limit;

    const totalShareSchedule = await ShareSchedule.find({
      share_with_user_id: idUser,
    }).countDocuments(); // Đếm tổng số lịch trình chia sẻ

    const listShareSchedule = await ShareSchedule.find({
      share_with_user_id: idUser,
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    // Kiểm tra nếu không có lịch trình chia sẻ nào được tìm thấy
    if (!listShareSchedule || listShareSchedule.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy thông tin lịch trình chia sẻ",
        data: [],
      });
    }

    const realDataShareSchedule = await Promise.all(
      listShareSchedule?.map(async (value) => {
        const dataUserShare = await User.findOne({
          _id: value?.id_user_share,
        }).exec();
        const dataSchedule = await Schedule.findOne({
          _id: value?.id_schedule_share,
        }).exec();
        return {
          user_share: `${dataUserShare?.last_name} ${dataUserShare?.first_name}`,
          ...dataSchedule?._doc,
        };
      })
    );

    const totalPages = Math.ceil(totalShareSchedule / limit); // Tính tổng số trang

    // Trả về thông tin phòng học
    res.status(200).json({
      data: realDataShareSchedule,
      status: "success",
      paging: {
        total: totalShareSchedule,
        total_page: totalPages,
        current_page: page,
        limit: limit,
        next_page: page + 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Đã xảy ra lỗi khi lấy thông tin lịch trình chia sẻ",
      error: error,
    });
  }
};

module.exports = {
  createShareSchedule,
  getListShareSchedule,
};
