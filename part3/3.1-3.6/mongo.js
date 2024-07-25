const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const nombre = process.argv[3];
const numero = process.argv[4];

const url = `mongodb+srv://gracianacho:${password}@cluster0.lym7hu9.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const PhoneNumber = mongoose.model("PhoneNumber", noteSchema);
if (!nombre && !numero) {
  PhoneNumber.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((phoneNumber) => {
      console.log(phoneNumber.name, phoneNumber.number);
    });
    mongoose.connection.close();
  });
} else {
  const phoneNumber = new PhoneNumber({
    name: `${nombre}`,
    number: `${numero}`,
  });

  phoneNumber.save().then((result) => {
    console.log(`added ${nombre} number ${numero} to phonebook`);
    mongoose.connection.close();
  });
}
