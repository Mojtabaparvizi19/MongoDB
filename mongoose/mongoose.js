const mongoose = require("mongoose");

class MongoDBConnection {
  constructor(folder) {
    this.fName = folder;
    this.connect();
  }

  connect() {
    return mongoose
      .connect(`mongodb://localhost/${this.fName}`)
      .then(console.log("...connecting"))
      .catch((error) => console.log(error.message));
  }

  createSchema() {
    const schema = new mongoose.Schema({
      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: function () {
          return this.title && true;
        },
        min: 10,
        max: 100,
        get: (v) => Math.ceil(v),
        set: (v) => Math.round(v),
      },
    });
    return schema;
  }

  createClass() {
    const Genre = mongoose.model("Genres", this.createSchema());
    return Genre;
  }
}
function makeMongo(name) {
  return new MongoDBConnection(name);
}

module.exports = makeMongo;
