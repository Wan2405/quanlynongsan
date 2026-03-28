const app = require('../app');
const connectDB = require('../config/db');
const { ensureDefaultAdmin } = require('../services/authService');

let initPromise = null;

const initializeOnce = async () => {
  if (!initPromise) {
    initPromise = connectDB()
      .then(() => ensureDefaultAdmin().catch((error) => {
        console.error('⚠️ Không thể khởi tạo admin mặc định:', error.message);
      }))
      .catch((error) => {
        initPromise = null;
        throw error;
      });
  }

  return initPromise;
};

module.exports = async (req, res) => {
  try {
    await initializeOnce();
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Khởi tạo backend thất bại trên Vercel.',
      detail: error?.message || 'Lỗi không xác định',
    });
  }

  return app(req, res);
};
