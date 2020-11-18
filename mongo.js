const key = require('./mongoKey');
const mongoose = require('mongoose');

const password = key.password;

const url =
  `mongodb+srv://neoKhan:${password}@cluster0.ledcg.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

const numArgs = process.argv.length;

if (numArgs === 4) {
  const personName = process.argv[numArgs - 2];
  const personNum = process.argv[numArgs - 1];
  const person = new Person({
    name: personName,
    number: personNum
  });
  
  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);

    mongoose.connection.close();
  });
} else if (numArgs === 2) {
  Person
    .find({})
    .then(result => {
      console.log('phonebook:');

      result.forEach(person => {
        console.log(`${person.name} ${person.number}`);
      });

      mongoose.connection.close();
    });
} else {
  console.log('Usage: node mongo.js [name] [number]');
  process.exit(1);
}

