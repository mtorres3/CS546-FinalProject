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

router.get("/edit", async(request, response) => {
  try{
    response.render('extras/profileEdit');
  }
  catch(e){
    response.status(404).render('extras/error')
  }
});

router.post('/', async(request,response) => {

  //TO-DO
  
})

module.exports = router;
