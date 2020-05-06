const seeder = require("mongoose-seed");
const db = require("../config/keys").mongoURI;

const data = [
  {
    model: "User",
    documents: [
      {
        name: "Pacifique Clemene Ndayisenga",
        email: "pacifiqueclement@gmail.com",
        password: "password",
      },
    ],
  },
];

seeder.connect(db, function () {
  seeder.loadModels(["./models/User"]);
  seeder.clearModels(["User"], function () {
    seeder.populateModels(data, function (err, done) {
      if (err) return console.log("seed err", err);
      if (done) return console.log("seed done", done);
      seeder.disconnect();
    });
  });
});
