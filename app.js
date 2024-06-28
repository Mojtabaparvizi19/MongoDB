const router = require("./router/routes");

const express = require("express");
const app = express();

//========================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/genres", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("...listening on port " + PORT);
});
