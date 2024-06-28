const express = require("express");
const joi = require("joi");
const router = express.Router();
const makeMongo = require("../mongoose/mongoose");
// mongoose
//   .connect("mongodb://localhost/MyDB")
//   .then(console.log("...connecting"))
//   .catch((error) => console.log(error.message));

// const schema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: function () {
//       return this.title && true;
//     },
//     min: 10,
//     max: 100,
//     get: (v) => Math.ceil(v),
//     set: (v) => Math.round(v),
//   },
// });
// const Genre = mongoose.model("Genres", schema);
const Genre = makeMongo("MyDB").createClass();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.get("/", async (req, res) => {
  try {
    const results = await Genre.find();
    res.send(results);
  } catch (error) {
    res.status(404).send({ Error: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Genre.findById({ _id: id });
    res.send(data);
    findById(id);
  } catch (error) {}
});

router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    console.log(title);
    const { error } = validateData(req.body);
    if (error) {
      res.status(404).send({ Error: error.message });
      return;
    }

    const price = req.body.price;
    console.log(title, price);
    const newGenre = Genre({
      title,
      price: parseInt(price),
    });

    const result = await newGenre.save();
    res.send(result);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const resp = await Genre.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
        },
      },
      { new: true }
    );
    res.send(resp);
  } catch (error) {
    res.send({ error: error.message });
  }
});

function validateData(title) {
  const schema = joi.object({
    title: joi.string().min(3),
  });
  return schema.validate(title);
}

module.exports = router;
