const mongoose = require('mongoose');
const  mongoosePaginate =require ('mongoose-paginate');


const CarnetSchema = mongoose.Schema({
  nom: { type: String, required: true },
  age: { type: String, required: true },
  famille: { type: String, required: true },
  race: { type: String, required: true }
});

const Carnet = mongoose.model('Carnet', CarnetSchema);

module.exports = Carnet;
