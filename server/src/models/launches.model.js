const launches = new Map();
let latestFlightNumber  = 100;
const launch = {
    flightNumber: 100,
    mission: 'One piece',
    rocket: 'Explorer IS1', 
    launchDate:new Date('December 27, 2030'),
    target:'kepler-442 b',
    customer: ['Luffy','Zoro'],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber,launch);//flightNumber as key and launch as value

function eixstsLaunchWithId(lauchId){
    return launches.has(lauchId);
}
function getAllLaunches(){
    return Array.from(launches.values());
}

function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(latestFlightNumber,
        Object.assign(launch, {
            success:true,
            upcoming:true,
            customer: ['Luffy','Zoro'],
            flightNumber:latestFlightNumber,
        }));
}

function abortLaunchById(lauchId){
    const aborted =launches.get(lauchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;

}
module.exports = {
    eixstsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
};