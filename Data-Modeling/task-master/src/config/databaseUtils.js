const mongoose = require('./db');
const User = require('../models/User'); 
async function getAll(model) {
  return await model.find();
}

async function isFieldValueTaken(model, field, value) {
  try {
   
    const object = await model.findOne({ [field]: value }); 
    return object;
  } catch (err) {
    console.error(`Error in checking for isFieldValueTaken: ${err}`);
    return null; 
  }
}
async function getById(model, id){
  try {
   
    const object = await model.findById(id); 
    return object;
  } catch (err) {
    console.error(`Error in checking for isFieldValueTaken: ${err}`);
    return null; 
  }
}

async function updateDataToDB(model,id,updateData){
try{
  const filter = { _id: id }; 
  const updatedObject = await model.findOneAndUpdate(filter, updateData, { new: true });
  return updatedObject;
}catch(err){
  console.error(`Error while updating data: ${err}`);
  return null; 
}
}
async function saveToDatabase(document) {
  try {
    await document.save();
    return true;
  }
  catch(err){
    console.log(`error saving the document` + err);
  }
}



module.exports = {
  getAll, 
  isFieldValueTaken,
  saveToDatabase,
  getById,
  updateDataToDB,
 
};