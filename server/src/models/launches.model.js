const launches = new Map();

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

function getAllLaunches(){
    return Array.from(launches.values());
}

module.exports = {
    getAllLaunches,
};