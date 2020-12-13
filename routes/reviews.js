const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;


router.get("/", async(request, response) => {
  try{
    response.render('extras/reviewAll');
  }
  catch(e){
    response.status(404).render('extras/error')
  }
});

router.get("/create", async(request, response) => {
  try{
    response.render('extras/reviewForm');
  }
  catch(e){
    response.status(404).render('extras/error')
  }
});

router.get("/:id", async(request, response) => {
  try{
    response.render('extras/reviewSingle');
  }
  catch(e){
    response.status(404).render('extras/error')
  }
});

router.post("/", async(request, response) => {

  //TO-DO

});

module.exports = router;
