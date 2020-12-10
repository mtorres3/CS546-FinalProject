const axios = require('axios');

async function getAllGames(){
  axios({
    url: "https://api.igdb.com/v4/games",
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Client-ID: Client ID',
        'Authorization: Bearer access_token',
    },
    data: "fields artworks,genres,keywords,name,platforms,rating,rating_count,tags;"
  })
    .then(response => {
        console.log(response.data);
        //return response.data;
    })
    .catch(err => {
        console.error(err);
    });
}

async function getShows(){
  const { data } = await axios.get('http://api.tvmaze.com/shows');
  return data // this will be the array of show objects
}

async function getAll(){

  const shows = await getShows();
  return shows;
}


async function getShowById(id){

  if(!id || typeof id != 'number') throw 'ID cannot be empty and must be a number';
  if(id < 0 || id > 243) throw 'ID must be between 1 and 243';
  const shows = await getShows();

  return shows[id-1];
}


module.exports = {getShows, getAll, getShowById, getAllGames};

async function test() {
   try {
    let test = await getAllGames();
     console.log(test);
   }
   catch(error) {
     console.log(error);
   }
 }

 async function main(){
     await test();
 }

 main();
