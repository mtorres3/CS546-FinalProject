const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;

router.get("/", async(request, response) => {
  try{
    response.render('extras/profile');
  }
  catch(e){
    response.status(404).render('extras/error')
  }
});

module.exports = router;

