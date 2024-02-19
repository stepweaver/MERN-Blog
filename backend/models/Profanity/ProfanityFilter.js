const mongoose = require('mongoose');

const profanityFilterSchema = new mongoose.Schema({
  banndedWords: [String]
});

const ProfanityFilter = mongoose.model(
  'ProfanityFilter',
  profanityFilterSchema
);

module.exports = ProfanityFilter;
