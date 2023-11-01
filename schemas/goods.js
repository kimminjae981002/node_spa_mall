const mongoose = require("mongoose");
// 모델 생성?
const goodsSchema = new mongoose.Schema({
  goodsId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String, // 이름은 문자
    required: true, // 이름이 없는 물건은 존재하지 않아 , 무조건 있어야 한다.
    unique: true, // 중복 허용하지 않아.
  },
  thumnailUrl: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  },
});

module.exports = mongoose.model("Goods", goodsSchema);
// Goods가 컬렉션 이름
