const { instrument } = require('@socket.io/admin-ui');
const disconnectHandler = require('./disconnectSocket');
const distributeurHandler = require('./distributeurSocket');
const panneHandler = require('./panneSocket');
const {milkHandler,waterHandler,coffeeHandler,sugarHandler} = require('./ingredientsSocket')

const socketHandler = (io) => {
    instrument(io, {
        auth: false,
    });
    io.use((socket, next) => {
        if (socket.handshake.auth.idClient) {
            const idClient = socket.handshake.auth.idClient;
            socket.idClient = idClient;
            next();
        } else {
            next(new Error('authentication error'));
        }
    })
    io.on('connection', (socket) => {
        console.log('New client connected to room:', socket.idClient);

        socket.join(socket.idClient.toString());
        socket.on('distributeur', async (data) => {
            await distributeurHandler(socket, data, 'distributeur')
        });
        socket.on('location', async (data) => {
            await distributeurHandler(socket, data, 'location')
        });
        socket.on('panne', async (data) => {
            await panneHandler(socket, data)
        });
        socket.on('coffeeLevel', async (data) => {
            await coffeeHandler(socket, data)
        });
        socket.on('waterLevel', async (data) => {
            await waterHandler(socket, data)
        });
        socket.on('sugarLevel', async (data) => {
            await sugarHandler(socket, data)
        });
        socket.on('milkLevel', async (data) => {
            await milkHandler(socket, data)
        });
        socket.on('disconnect', () => {
            disconnectHandler(socket)
        });
    });

}

module.exports = { socketHandler };
