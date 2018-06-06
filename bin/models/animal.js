const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var animalSchema = new Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: String,
  image: String,
  detachment: String,
  family: String,
  description: String,
  titleEng: String,
  subtitleEng: String,
  detachmentEng: String,
  familyEng: String,
  descriptionEng: String,
  language: String
});

const Animal = mongoose.model('animal', animalSchema);

module.exports = Animal;