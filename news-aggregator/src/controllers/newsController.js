const { json } = require('express');
const newsHelper = require('../helpers/NewsHelper');

var getNews = async (req, res) => {
  if (req.email) {
    const data = await newsHelper.fetchNewsByPreferences(req.preferences); // Corrected function call
    if (data) {
      return res.status(200).json(data); // Corrected response syntax
    } else {
      return res.status(200).send("No data exists for your preferences");
    }
  } else {
    return res.status(401).send(req.message);
  }
};

module.exports = {
  getNews,
};