const http = require('http');

const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer(){
    await loadPlanetsData();/* our planet's data is available for any request that ever comes into our server */
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}....`);
});

}
startServer();


