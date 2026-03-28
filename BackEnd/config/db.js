const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('Thiếu biến môi trường MONGODB_URI.');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Đã kết nối MongoDB (nongsan_v2)!');
  } catch (err) {
    console.error('❌ Lỗi DB:', err.message);
    throw err;
  }
};

module.exports = connectDB;
