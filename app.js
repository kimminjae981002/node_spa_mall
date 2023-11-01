const express = require("express");
const app = express();
const port = 3000;
const goodsRouter = require("./routes/goods");
const cartsRouter = require("./routes/carts");
const connect = require("./schemas/index");
const goods = require("./schemas/goods");
connect();
// 미들웨어 사용
app.use(express.json());
app.use("/api", [goodsRouter, cartsRouter]);
// app.use("/", [cartsRouter]);

// 경로 '/'에서 실행
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// port 실행
app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});

// app.post("/", (req, res) => {
//   console.log(req.body);

//   res.send("기본 url에 post다 임마.");
// });

// app.get("/", (req, res) => {
//   const query = req.query;
//   console.log(query);

//   const obj = {
//     key: "value",
//     name: "김민재",
//   };

//   res.json(obj);
// });

// //id로 뭐든지 받아온다
// app.get("/abc/:id", (req, res) => {
//   console.log(req.params);

//   res.send(":id URL에 정상");
// });

// /api라는 url에서 goodsRouter API를 실행하라.
// app.use("/", goodsRouter);
