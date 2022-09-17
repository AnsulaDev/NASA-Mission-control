const { 
    eixstsLaunchWithId,
    getAllLaunches,
    abortLaunchById,
    scheduleNewLaunch,
} = require('../../models/launches.model');

const {
    getPagination,
} = require('../../services/query');

async function httpGetAllLaunches(req, res) {
    const {skip, limit} = getPagination(req.query);
    const launches = await getAllLaunches(skip, limit);
    return res.status(200).json(launches);
}

async function httpAddNewLaunch(req, res){
    const launch = req.body;
    if (!launch.mission || !launch.rocket || !launch.launchDate 
        || !launch.target){
            return res.status(400).json({
                error: 'Missing  reqired launch property',
            });
        }
    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error:'Invalid launch date',
        });
    }
    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
}
async function httpAbortLaunch(req, res){
    const lauchId =  Number(req.params.id);

    //if launch dosent exist
    const existsLaunch = await eixstsLaunchWithId(launchId);
    if(!eixstsLaunch){
        return res.status(404).json({
            error: 'Launch not found',
        });
    }
    //if launch dose exist
    const aborted = await abortLaunchById(lauchId);
    if(!aborted){
        return res.status(400).json({
            error: 'Launch is not aborted',
        });
    }
    return res.status(200).json({
        ok:true,
    });
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
};