const fs = require('fs');
const path = require('path');
const {parse} = require('csv-parse');

const planets = require('./planets.mongo');


function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}
/* const promise */
function loadPlanetsData(){
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '..','..','data','kepler_data.csv'))
    .pipe(parse({
      comment: '#',
      columns: true,
    }))
    .on('data', async (data) => {
      if (isHabitablePlanet(data)) {
      
        savePlanet(data);
      }
    })
    .on('error', (err) => {
      console.log(err);
      reject(err);
    })
    .on('end', async() => {
      const countPlanetsFound =(await getAllPlanets()).length;
      console.log(`${countPlanetsFound} habitable planets found!`);
      resolve();
    });
  

  });

}

async function  getAllPlanets(){
  return await planets.find({},{
    '_id': 0, '__v': 0,
  });
}
async function savePlanet(planet){
  try{
    await planets.updateOne({
      keplerName: planet.kepler_name,
    },{
      keplerName:planet.kepler_name,
    },{
        //insert + update = upsert(an upsert in inserts data into a collection if it doesn't already exist in that collection.And if that document does exist, then it updates that document)
      upsert:true,
    });
  }catch(err){
    console.error(`Could not save planets ${err}`);
  }
  
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
}