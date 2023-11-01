const express = require("express");
const router = express.Router();

const goods = [
  {
    goodsId: 4,
    name: "상품 4",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
    category: "drink",
    price: 0.1,
  },
  {
    goodsId: 3,
    name: "상품 3",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
    category: "drink",
    price: 2.2,
  },
  {
    goodsId: 2,
    name: "상품 2",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
    category: "drink",
    price: 0.11,
  },
  {
    goodsId: 1,
    name: "상품 1",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
    category: "drink",
    price: 6.2,
  },
];

// 상품 전체 목록 조회 API
router.get("/goods", (req, res) => {
  res.json(goods);
});

// 상품 상세 조회 API
router.get("/goods/:goodsId", (req, res) => {
  const { goodsId } = req.params;
  const result = goods.filter((good) => {
    return Number(goodsId) === good.goodsId;
  });
  res.json({ result });
});

const Cart = require("../schemas/cart");
router.post("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existCarts = await Cart.find({ goodsId });
  if (existCarts.length) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "이미 장바구니에 존재합니다." });
  }

  await Cart.create({ goodsId, quantity });

  res.json({ result: "success", quantity: quantity });
});

router.put("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existCarts = await Cart.find({ goodsId });
  if (existCarts.length) {
    await Cart.updateOne(
      { goodsId: goodsId },
      { $set: { quantity: quantity } }
      // goodsId에 해당한느 값이 있을 때 수정한다는 $set
    );
  }

  res.status(200).json({ success: true, quantity: quantity });
});

router.delete("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;

  const existsCarts = await Cart.find({ goodsId });

  if (existsCarts.length) {
    await Cart.deleteOne({ goodsId });
  }

  res.json({ result: "success" });
});

const Goods = require("../schemas/goods");
// 데이터베이스에 접근해야하기 때문에 async 동기적 처리
router.post("/goods", async (req, res) => {
  const { goodsId, name, thumnailUrl, category, price } = req.body;

  const goods = await Goods.find({ goodsId });

  if (goods.length) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "이미 존재하는 GoodsId입니다." });
  }

  const createGoods = await Goods.create({
    goodsId,
    name,
    thumnailUrl,
    category,
    price,
  });
  res.json({ goods: createGoods });
});

module.exports = router;

// // localhost:3000/api/ GET
// router.get("/", (req, res) => {
//   // req에 실제로 API에 받은 데이터는 req에 있다. url, data
//   res.send("default url for goods.js GET Method");
// });

// // localhost:3000/api/about GET
// router.get("/about", (req, res) => {
//   res.send("goods.js about PATH");
// });
